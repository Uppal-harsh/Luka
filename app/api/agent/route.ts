import { spawn } from "node:child_process";
import { promises as fs } from "node:fs";
import path from "node:path";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

type AgentResponse = {
  projectName: string;
  projectDir: string;
  files: {
    "index.html": string;
    "styles.css": string;
    "script.js": string;
  };
  stdout: string;
};

function runPythonAgent(input: string): Promise<{ stdout: string; stderr: string }> {
  const cwd = process.cwd();
  const scriptPath = path.join(cwd, "agent.py");
  const commands: Array<[string, string[]]> = [
    [process.env.PYTHON || "python", [scriptPath]],
    ["python3", [scriptPath]],
    ["py", ["-3", scriptPath]]
  ];

  const execute = (
    command: string,
    args: string[]
  ): Promise<
    | { status: "ok"; stdout: string; stderr: string }
    | { status: "missing" }
    | { status: "failed"; error: Error }
  > =>
    new Promise((resolve, reject) => {
      const child = spawn(command, args, {
        cwd,
        windowsHide: true,
        stdio: ["pipe", "pipe", "pipe"]
      });

      let stdout = "";
      let stderr = "";

      child.stdout.on("data", (chunk) => {
        stdout += chunk.toString();
      });

      child.stderr.on("data", (chunk) => {
        stderr += chunk.toString();
      });

      child.on("error", (error: NodeJS.ErrnoException) => {
        if (error.code === "ENOENT") {
          resolve({ status: "missing" });
          return;
        }

        reject(error);
      });
      child.on("close", (code) => {
        if (code === 0) {
          resolve({ status: "ok", stdout, stderr });
        } else {
          resolve({
            status: "failed",
            error: new Error(
              `agent.py exited with code ${code ?? "unknown"}.\n${stderr || stdout || "No output."}`
            )
          });
        }
      });

      child.stdin.write(input);
      child.stdin.end();
    });

  return (async () => {
    let missingCount = 0;
    for (const [command, args] of commands) {
      const result = await execute(command, args);
      if (result.status === "ok") {
        return { stdout: result.stdout, stderr: result.stderr };
      }

      if (result.status === "failed") {
        throw result.error;
      }

      missingCount += 1;
    }

    if (missingCount === commands.length) {
      throw new Error(
        "Could not find a Python runtime. Install Python or set the PYTHON environment variable to the full path of your interpreter."
      );
    }

    throw new Error("Failed to launch agent.py.");
  })();
}

function parseAgentOutput(stdout: string) {
  const projectName = stdout.match(/Saved project:\s*(.+)/)?.[1]?.trim() || "Generated Site";
  const projectDir = stdout.match(/Location:\s*(.+)/)?.[1]?.trim();

  if (!projectDir) {
    throw new Error(`Could not determine generated project path.\n${stdout}`);
  }

  return { projectName, projectDir };
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { promptJson?: string };
    const promptJson = body.promptJson?.trim();

    if (!promptJson) {
      return NextResponse.json(
        { error: "Please provide a JSON payload." },
        { status: 400 }
      );
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(promptJson);
    } catch {
      return NextResponse.json(
        { error: "The payload must be valid JSON." },
        { status: 400 }
      );
    }

    const normalizedPrompt = JSON.stringify(parsed, null, 2);
    const { stdout, stderr } = await runPythonAgent(normalizedPrompt);
    const { projectName, projectDir } = parseAgentOutput(stdout);

    const [indexHtml, stylesCss, scriptJs] = await Promise.all([
      fs.readFile(path.join(projectDir, "index.html"), "utf8"),
      fs.readFile(path.join(projectDir, "styles.css"), "utf8"),
      fs.readFile(path.join(projectDir, "script.js"), "utf8")
    ]);

    const response: AgentResponse = {
      projectName,
      projectDir,
      files: {
        "index.html": indexHtml,
        "styles.css": stylesCss,
        "script.js": scriptJs
      },
      stdout: stderr ? `${stdout}\n${stderr}` : stdout
    };

    return NextResponse.json(response);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Agent generation failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
