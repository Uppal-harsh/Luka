import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

const apps = [
  { name: "Task Manager", status: "live" as const },
  { name: "Sales Hub", status: "building" as const },
  { name: "Studio OS", status: "draft" as const }
];

export default function AppsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-violet-200/70">Apps</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">All generated apps</h1>
        </div>
        <Button href="/apps/new">New app</Button>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        {apps.map((app) => (
          <Card key={app.name} className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl font-semibold">{app.name}</h2>
              <Badge variant={app.status}>{app.status}</Badge>
            </div>
            <p className="text-sm text-slate-400">
              This is the starter index for the app catalogue. The renderer and config editor will plug in here.
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}
