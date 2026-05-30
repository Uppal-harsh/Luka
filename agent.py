#!/usr/bin/env python3
"""LUKA static-site generation agent.

This script asks OpenRouter for a structured static site response and writes
three local files for the generated project:
- index.html
- styles.css
- script.js

The default model is `openrouter/free`, but you can override it with
OPENROUTER_MODEL or the --model flag.
"""

from __future__ import annotations

import argparse
import json
import os
import re
import sys
import textwrap
import time
from dataclasses import dataclass
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


OPENROUTER_CHAT_URL = "https://openrouter.ai/api/v1/chat/completions"
DEFAULT_MODEL = "openrouter/free"
FALLBACK_MODELS = [
    "openai/gpt-oss-120b:free",
    "openai/gpt-oss-20b:free",
]
MAX_ATTEMPTS_PER_MODEL = 3
BASE_DIR = Path(__file__).resolve().parent
DEFAULT_OUTPUT_ROOT = BASE_DIR / "generated-sites"
DEFAULT_SITE_TITLE = "LUKA Generated Site"


@dataclass(slots=True)
class ProjectFiles:
    project_name: str
    index_html: str
    styles_css: str
    script_js: str


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        prog="agent.py",
        description="Generate a local static website with OpenRouter.",
    )
    parser.add_argument(
        "prompt",
        nargs="?",
        help="What the generated site should be about. If omitted, stdin is used.",
    )
    parser.add_argument(
        "-o",
        "--output-dir",
        default=str(DEFAULT_OUTPUT_ROOT),
        help="Directory where generated projects are saved.",
    )
    parser.add_argument(
        "-m",
        "--model",
        default=os.getenv("OPENROUTER_MODEL", DEFAULT_MODEL),
        help="OpenRouter model to use. Default: openrouter/free",
    )
    parser.add_argument(
        "--site-url",
        default=os.getenv("NEXT_PUBLIC_SITE_URL", "http://localhost:3000"),
        help="Used for OpenRouter HTTP-Referer metadata.",
    )
    parser.add_argument(
        "--app-title",
        default="LUKA",
        help="Used for OpenRouter X-Title metadata.",
    )
    parser.add_argument(
        "--max-tokens",
        type=int,
        default=5000,
        help="Maximum completion tokens to request from OpenRouter.",
    )
    return parser.parse_args()


def read_prompt(args: argparse.Namespace) -> str:
    if args.prompt:
        return args.prompt.strip()

    if not sys.stdin.isatty():
        stdin_text = sys.stdin.read().strip()
        if stdin_text:
            return stdin_text
        raise SystemExit("No prompt provided on stdin.")

    try:
        return input("Describe the site you want LUKA to generate: ").strip()
    except EOFError as exc:  # pragma: no cover - interactive fallback
        raise SystemExit("No prompt provided.") from exc


def load_openrouter_credentials() -> tuple[str, str]:
    api_key = os.getenv("OPENROUTER_API_KEY", "").strip()
    if not api_key:
        raise SystemExit(
            "OPENROUTER_API_KEY is missing. Add it to .env.local and restart your shell."
        )

    model = os.getenv("OPENROUTER_MODEL", DEFAULT_MODEL).strip() or DEFAULT_MODEL
    return api_key, model


def load_env_file(path: Path) -> None:
    if not path.exists():
        return

    for raw_line in path.read_text(encoding="utf-8").splitlines():
        line = raw_line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        key = key.strip()
        value = value.strip().strip("\"").strip("'")
        if key and key not in os.environ:
            os.environ[key] = value


def load_local_env() -> None:
    # Load shared env first, then allow .env.local to override it.
    load_env_file(BASE_DIR / ".env")
    load_env_file(BASE_DIR / ".env.local")


def extract_retry_after_seconds(body: str) -> float | None:
    if not body:
        return None

    try:
        payload = json.loads(body)
    except json.JSONDecodeError:
        return None

    error = payload.get("error", {})
    metadata = error.get("metadata", {})
    for key in ("retry_after_seconds", "retry_after_seconds_raw"):
        value = metadata.get(key)
        if value is None:
            continue
        try:
            return max(0.5, float(value))
        except (TypeError, ValueError):
            continue

    return None


def build_messages(user_prompt: str) -> list[dict[str, Any]]:
    system_prompt = textwrap.dedent(
        """
        You are LUKA, a senior front-end generator.

        Create a polished local static website that can be saved as exactly three files:
        1. index.html
        2. styles.css
        3. script.js

        Requirements:
        - Return ONLY a valid JSON object, no markdown, no code fences, no explanations.
        - The JSON object must have exactly these keys:
          - project_name
          - index_html
          - styles_css
          - script_js
        - index_html must reference styles.css and script.js with relative paths.
        - Use modern, professional, readable design.
        - Keep the layout responsive and polished.
        - Include semantic HTML and accessible labels where relevant.
        - Use vanilla HTML, CSS, and JavaScript only.
        - The site should feel like a production-ready local preview.
        - The code should be self-contained and ready to open locally.
        - If the user provides JSON, treat it as the authoritative source of app details,
          extract the important fields, and generate the site from that structure.
        """
    ).strip()

    user_content = textwrap.dedent(
        f"""
        Build a local static website for the following request:

        {user_prompt}

        Return the three files now.
        """
    ).strip()

    return [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_content},
    ]


def call_openrouter(
    api_key: str,
    model: str,
    user_prompt: str,
    max_tokens: int,
    site_url: str,
    app_title: str,
) -> str:
    candidate_models = [model]
    for fallback in FALLBACK_MODELS:
        if fallback not in candidate_models:
            candidate_models.append(fallback)

    last_error: Exception | None = None

    for candidate_model in candidate_models:
        payload = {
            "model": candidate_model,
            "messages": build_messages(user_prompt),
            "temperature": 0.7,
            "max_tokens": max_tokens,
            "response_format": {"type": "json_object"},
        }

        request = Request(
            OPENROUTER_CHAT_URL,
            data=json.dumps(payload).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {api_key}",
                "Content-Type": "application/json",
                "HTTP-Referer": site_url,
                "X-Title": app_title,
            },
            method="POST",
        )

        attempts = 0
        while attempts < MAX_ATTEMPTS_PER_MODEL:
            attempts += 1

            try:
                with urlopen(request, timeout=120) as response:
                    raw = response.read().decode("utf-8")
            except HTTPError as exc:
                body = exc.read().decode("utf-8", errors="replace") if exc.fp else ""
                error_text = body or exc.reason or "Unknown OpenRouter error"

                if exc.code == 429:
                    retry_after = extract_retry_after_seconds(body)
                    if retry_after is None:
                        retry_after = min(30.0, 2.0 ** attempts)

                    last_error = RuntimeError(
                        f"{candidate_model} was rate-limited (attempt {attempts}/{MAX_ATTEMPTS_PER_MODEL}); "
                        f"retrying in {retry_after:.1f}s: {error_text}"
                    )
                    time.sleep(retry_after)
                    continue

                if exc.code == 404 and "model not found" in error_text.lower():
                    last_error = RuntimeError(
                        f"{candidate_model} was unavailable: {error_text}"
                    )
                    break

                raise RuntimeError(
                    f"OpenRouter request failed for {candidate_model} ({exc.code}): {error_text}"
                ) from exc
            except URLError as exc:
                last_error = RuntimeError(
                    f"OpenRouter request failed for {candidate_model}: {exc.reason}"
                )
                break

            data = json.loads(raw)
            try:
                return data["choices"][0]["message"]["content"]
            except (KeyError, IndexError, TypeError) as exc:
                raise RuntimeError(
                    f"Unexpected OpenRouter response shape from {candidate_model}: {raw[:1000]}"
                ) from exc

    if last_error is not None:
        raise RuntimeError(
            f"OpenRouter could not serve the request with the configured free models. Last error: {last_error}"
        ) from last_error

    raise RuntimeError("OpenRouter could not serve the request.")


def strip_code_fences(text: str) -> str:
    cleaned = text.strip()
    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```[a-zA-Z0-9_-]*\n?", "", cleaned)
        cleaned = re.sub(r"\n?```$", "", cleaned)
    return cleaned.strip()


def parse_project_files(raw_text: str) -> ProjectFiles:
    cleaned = strip_code_fences(raw_text)

    try:
        payload = json.loads(cleaned)
    except json.JSONDecodeError:
        start = cleaned.find("{")
        end = cleaned.rfind("}")
        if start == -1 or end == -1 or end <= start:
            raise ValueError("The model did not return valid JSON.")
        payload = json.loads(cleaned[start : end + 1])

    required = {"project_name", "index_html", "styles_css", "script_js"}
    missing = required.difference(payload)
    if missing:
        raise ValueError(f"Missing required keys from model output: {sorted(missing)}")

    return ProjectFiles(
        project_name=str(payload["project_name"]).strip() or DEFAULT_SITE_TITLE,
        index_html=str(payload["index_html"]),
        styles_css=str(payload["styles_css"]),
        script_js=str(payload["script_js"]),
    )


def slugify(value: str) -> str:
    slug = re.sub(r"[^a-zA-Z0-9]+", "-", value.lower()).strip("-")
    return slug or "generated-site"


def ensure_asset_links(index_html: str) -> str:
    html = index_html
    if "styles.css" not in html:
        html = html.replace("</head>", '  <link rel="stylesheet" href="styles.css" />\n</head>', 1)
    if "script.js" not in html:
        html = html.replace("</body>", '  <script src="script.js" defer></script>\n</body>', 1)
    return html


def save_project(project: ProjectFiles, output_root: Path) -> Path:
    project_dir = output_root / slugify(project.project_name)
    project_dir.mkdir(parents=True, exist_ok=True)

    index_html = ensure_asset_links(project.index_html)
    (project_dir / "index.html").write_text(index_html, encoding="utf-8")
    (project_dir / "styles.css").write_text(project.styles_css.strip() + "\n", encoding="utf-8")
    (project_dir / "script.js").write_text(project.script_js.strip() + "\n", encoding="utf-8")
    return project_dir


def main() -> None:
    load_local_env()
    args = parse_args()
    user_prompt = read_prompt(args)
    api_key, model = load_openrouter_credentials()

    raw_response = call_openrouter(
        api_key=api_key,
        model=model,
        user_prompt=user_prompt,
        max_tokens=args.max_tokens,
        site_url=args.site_url,
        app_title=args.app_title,
    )
    project = parse_project_files(raw_response)
    project_dir = save_project(project, Path(args.output_dir))

    print(f"Saved project: {project.project_name}")
    print(f"Location: {project_dir.resolve()}")
    print("Files: index.html, styles.css, script.js")


if __name__ == "__main__":
    main()
