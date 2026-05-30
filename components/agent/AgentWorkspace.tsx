'use client';

import { useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  CircleAlert,
  FileCode2,
  FolderOpen,
  Loader2,
  Play,
  Sparkles
} from "lucide-react";

type AgentResult = {
  projectName: string;
  projectDir: string;
  files: {
    "index.html": string;
    "styles.css": string;
    "script.js": string;
  };
  stdout: string;
};

const defaultJson = JSON.stringify(
  {
    projectName: "Atlas Dashboard",
    objective: "Build a polished dashboard landing page for a product team.",
    audience: "Product managers and founders",
    style: "Clean, dark, premium, and responsive",
    sections: [
      "Hero with headline and CTA",
      "Feature cards",
      "Metrics strip",
      "Footer with contact and legal"
    ],
    cta: {
      label: "Launch project",
      href: "#"
    }
  },
  null,
  2
);

const randomProjectIdeas = [
  {
    projectName: "Pulse Studio",
    objective: "Build a modern analytics workspace for product teams.",
    audience: "Growth teams and founders",
    style: "Sharp, minimal, high-contrast, and premium",
    sections: ["Hero", "Metrics", "Feature grid", "Insights panel", "Footer"],
    cta: { label: "Open dashboard", href: "#" }
  },
  {
    projectName: "Northstar CRM",
    objective: "Design a clean CRM landing page with strong calls to action.",
    audience: "Sales operators and small teams",
    style: "Editorial, structured, and professional",
    sections: ["Hero", "Pricing", "Use cases", "Testimonials", "Footer"],
    cta: { label: "Start free", href: "#" }
  },
  {
    projectName: "Vertex Ops",
    objective: "Create an operations command center for internal workflows.",
    audience: "Operations managers",
    style: "Dark, calm, and enterprise-ready",
    sections: ["Overview", "Workflow cards", "Status timeline", "Audit trail", "Footer"],
    cta: { label: "Launch workspace", href: "#" }
  },
  {
    projectName: "Nimbus Board",
    objective: "Generate a lightweight project board with task tracking.",
    audience: "Product teams",
    style: "Clean, airy, and dashboard-like",
    sections: ["Hero", "Kanban preview", "Automation strip", "Team notes", "Footer"],
    cta: { label: "Create board", href: "#" }
  }
] as const;

function makeRandomProjectJson() {
  const idea = randomProjectIdeas[Math.floor(Math.random() * randomProjectIdeas.length)];
  return JSON.stringify(idea, null, 2);
}

function buildPreviewDoc(indexHtml: string, stylesCss: string, scriptJs: string) {
  const safeCss = stylesCss.replace(/<\/style>/gi, "<\\/style>");
  const safeJs = scriptJs.replace(/<\/script>/gi, "<\\/script>");

  let html = indexHtml;
  const linkPattern = /<link[^>]+href=["']styles\.css["'][^>]*\/?>/i;
  const scriptPattern = /<script[^>]+src=["']script\.js["'][^>]*><\/script>/i;

  if (linkPattern.test(html)) {
    html = html.replace(linkPattern, `<style>${safeCss}</style>`);
  } else if (html.includes("</head>")) {
    html = html.replace("</head>", `<style>${safeCss}</style></head>`);
  } else {
    html = `<style>${safeCss}</style>${html}`;
  }

  if (scriptPattern.test(html)) {
    html = html.replace(scriptPattern, `<script>${safeJs}</script>`);
  } else if (html.includes("</body>")) {
    html = html.replace("</body>", `<script>${safeJs}</script></body>`);
  } else {
    html = `${html}<script>${safeJs}</script>`;
  }

  return html;
}

export function AgentWorkspace() {
  const [jsonText, setJsonText] = useState(defaultJson);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AgentResult | null>(null);
  const [activeFile, setActiveFile] = useState<keyof AgentResult["files"]>("index.html");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const previewDoc = useMemo(() => {
    if (!result) return "";
    return buildPreviewDoc(
      result.files["index.html"],
      result.files["styles.css"],
      result.files["script.js"]
    );
  }, [result]);

  const activeContent = result?.files[activeFile] ?? "";

  const runAgent = async () => {
    setError(null);
    setLoading(true);

    try {
      const parsed = JSON.parse(jsonText);
      const response = await fetch("/api/agent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          promptJson: JSON.stringify(parsed, null, 2)
        })
      });

      const data = (await response.json()) as AgentResult & { error?: string };

      if (!response.ok) {
        throw new Error(data.error || "Agent generation failed.");
      }

      setResult(data);
      setActiveFile("index.html");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleJsonUpload = async (file: File | null) => {
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      setJsonText(JSON.stringify(parsed, null, 2));
      setError(null);
      setResult(null);
      setActiveFile("index.html");
    } catch {
      setError("Please upload a valid JSON file.");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-sm uppercase tracking-[0.32em] text-brand-gold/70">Agent</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-5xl">
          Paste JSON, run the agent, and inspect the generated site in place.
        </h1>
        <p className="mt-4 max-w-2xl text-base leading-8 text-[color:var(--text-secondary)] sm:text-lg">
          Drop in a JSON config, press Run or <span className="font-medium text-[color:var(--text-primary)]">Ctrl+Enter</span>, and LUKA will save a local project with <code className="rounded bg-[color:var(--bg-surface-hover)] px-1.5 py-0.5">index.html</code>, <code className="rounded bg-[color:var(--bg-surface-hover)] px-1.5 py-0.5">styles.css</code>, and <code className="rounded bg-[color:var(--bg-surface-hover)] px-1.5 py-0.5">script.js</code>.
        </p>
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <Card className="space-y-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
                Input JSON
              </p>
              <h2 className="mt-2 font-display text-2xl font-semibold">Project details</h2>
            </div>
            <Badge variant={loading ? "building" : "live"}>
              {loading ? "Running" : result ? "Ready" : "Idle"}
            </Badge>
          </div>

          <div className="rounded-[1.5rem] border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] p-3">
            <textarea
              value={jsonText}
              onChange={(event) => setJsonText(event.target.value)}
              onKeyDown={(event) => {
                if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
                  event.preventDefault();
                  void runAgent();
                }
              }}
              spellCheck={false}
              className="min-h-[520px] w-full resize-y rounded-[1.25rem] border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] p-4 font-mono text-sm leading-7 text-[color:var(--text-primary)] outline-none placeholder:text-[color:var(--text-muted)] focus:border-[color:var(--border-active)]"
              aria-label="JSON input"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={runAgent} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
              {loading ? "Generating..." : "Run agent"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              <FileCode2 className="h-4 w-4" />
              Add JSON
            </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setJsonText(makeRandomProjectJson());
                  setResult(null);
                  setError(null);
                  setActiveFile("index.html");
                }}
              >
              Reset JSON
              </Button>
            <span className="text-sm text-[color:var(--text-muted)]">
              Tip: press <span className="font-medium text-[color:var(--text-primary)]">Ctrl+Enter</span> to generate.
            </span>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json,text/json"
            className="hidden"
            onChange={(event) => {
              void handleJsonUpload(event.target.files?.[0] ?? null);
              event.currentTarget.value = "";
            }}
          />

          {error ? (
            <div className="flex items-start gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}
        </Card>

        <div className="space-y-6">
          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
                  Output
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">Saved project</h2>
              </div>
              <Badge variant={result ? "live" : "draft"}>{result ? "Saved" : "Waiting"}</Badge>
            </div>

            {result ? (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)]">
                    Project folder
                  </p>
                  <div className="mt-2 flex items-start gap-3">
                    <FolderOpen className="mt-0.5 h-4 w-4 text-brand-gold" />
                    <p className="break-all font-mono text-sm text-[color:var(--text-primary)]">
                      {result.projectDir}
                    </p>
                  </div>
                </div>

                <div className="rounded-[1.5rem] border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] p-3">
                  <div className="flex flex-wrap gap-2">
                    {Object.keys(result.files).map((file) => (
                      <button
                        key={file}
                        type="button"
                        onClick={() => setActiveFile(file as keyof AgentResult["files"])}
                        className={[
                          "inline-flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
                          activeFile === file
                            ? "border-[color:var(--border-active)] bg-[color:var(--bg-surface)] text-[color:var(--text-primary)]"
                            : "border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-surface-hover)]"
                        ].join(" ")}
                      >
                        <FileCode2 className="h-4 w-4" />
                        {file}
                      </button>
                    ))}
                  </div>

                  <pre className="mt-4 max-h-[280px] overflow-auto rounded-[1.25rem] border border-[color:var(--border-subtle)] bg-black px-4 py-4 font-mono text-xs leading-6 text-slate-100">
                    <code>{activeContent}</code>
                  </pre>
                </div>
              </div>
            ) : (
              <div className="rounded-[1.5rem] border border-dashed border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] px-5 py-10 text-center">
                <Sparkles className="mx-auto h-6 w-6 text-brand-gold" />
                <p className="mt-3 font-medium text-[color:var(--text-primary)]">
                  Your generated site will appear here.
                </p>
                <p className="mt-2 text-sm text-[color:var(--text-muted)]">
                  The preview, saved folder path, and code files update on the same page after the agent finishes.
                </p>
              </div>
            )}
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
                  Live preview
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">Rendered output</h2>
              </div>
              <ArrowRight className="h-4 w-4 text-[color:var(--text-muted)]" />
            </div>

            {result ? (
              <iframe
                title="Generated project preview"
                className="h-[520px] w-full rounded-[1.5rem] border border-[color:var(--border-subtle)] bg-white"
                srcDoc={previewDoc}
                sandbox="allow-scripts allow-forms allow-modals"
              />
            ) : (
              <div className="flex h-[520px] items-center justify-center rounded-[1.5rem] border border-dashed border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] text-sm text-[color:var(--text-muted)]">
                Run the agent to render a live preview here.
              </div>
            )}
          </Card>

          {result ? (
            <Card className="space-y-4">
              <div>
                <p className="text-sm uppercase tracking-[0.28em] text-[color:var(--text-muted)]">
                  Agent log
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold">Output trace</h2>
              </div>
              <pre className="max-h-[220px] overflow-auto rounded-[1.25rem] border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] px-4 py-4 font-mono text-xs leading-6 text-[color:var(--text-secondary)]">
                <code>{result.stdout}</code>
              </pre>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
