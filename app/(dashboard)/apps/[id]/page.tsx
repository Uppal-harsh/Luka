import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AppDetailPage({
  params
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-brand-gold/70">App detail</p>
          <h1 className="mt-2 font-display text-3xl font-semibold">App {params.id}</h1>
        </div>
        <div className="flex gap-3">
          <Badge variant="draft">draft</Badge>
          <Button variant="outline">Preview</Button>
        </div>
      </div>
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-display text-2xl font-semibold">Config</h2>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            The JSON editor and renderer will live here once the generator engine is wired in.
          </p>
        </Card>
        <Card>
          <h2 className="font-display text-2xl font-semibold">Preview</h2>
          <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
            This slot will render the generated UI, data entities, and workflows.
          </p>
        </Card>
      </div>
    </div>
  );
}
