import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

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

export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-slate-400">{stat.label}</p>
            <div className="mt-3 text-4xl font-semibold">{stat.value}</div>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.25em] text-violet-200/70">Recent apps</p>
            <h1 className="mt-2 font-display text-3xl font-semibold">Builds in progress</h1>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {apps.map((app) => (
            <Card key={app.name} className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-display text-2xl font-semibold">{app.name}</h2>
                  <p className="mt-2 text-sm text-slate-400">{app.description}</p>
                </div>
                <Badge variant={app.status}>{app.status}</Badge>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                Preview, validate, and export in one flow.
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
