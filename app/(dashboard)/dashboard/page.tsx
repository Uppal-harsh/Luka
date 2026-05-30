import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

const stats = [
  { label: "Apps generated", value: "18" },
  { label: "Live previews", value: "7" },
  { label: "Workflows run", value: "142" }
];

const apps = [
  { name: "Task Manager", status: "live" as const, description: "Internal PM tooling with workflows." },
  { name: "Sales Hub", status: "building" as const, description: "Config-driven CRM prototype." },
  { name: "Studio OS", status: "draft" as const, description: "Multi-tenant operations workspace." }
];

const workflowSteps = [
  {
    title: "1. Paste JSON",
    copy: "Describe the app structure, sections, style, and behavior in one config."
  },
  {
    title: "2. Run agent",
    copy: "LUKA generates index.html, styles.css, and script.js from your input."
  },
  {
    title: "3. Preview & refine",
    copy: "Review the live output on the same page, then iterate as needed."
  },
  {
    title: "4. Save locally",
    copy: "The generated project is written into a local folder for later use."
  }
];

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Card className="mb-8 overflow-hidden">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-brand-gold/70">Main workflow</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
              Build from a JSON config, preview instantly, and save a local project.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
              The build flow lives in the agent workspace. Paste your config, run the generator,
              and LUKA produces the three core files in a local folder you can open and inspect.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/apps/new">
                Open build workspace
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button href="/apps" variant="outline">
                View apps
              </Button>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {workflowSteps.map((step) => (
              <div
                key={step.title}
                className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] p-4"
              >
                <p className="font-medium text-[color:var(--text-primary)]">{step.title}</p>
                <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-[color:var(--text-secondary)]">{stat.label}</p>
            <div className="mt-3 text-4xl font-semibold">{stat.value}</div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-brand-gold/70">Recent apps</p>
            <h1 className="mt-2 font-display text-3xl font-semibold">Builds in progress</h1>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {apps.map((app) => (
            <Card key={app.name} className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold">{app.name}</h2>
                  <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{app.description}</p>
                </div>
                <Badge variant={app.status}>{app.status}</Badge>
              </div>
              <div className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] px-4 py-3 text-sm text-[color:var(--text-secondary)]">
                Preview, validate, and export in one flow.
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
