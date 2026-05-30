import { Card } from "@/components/ui/Card";

export default function AppBuilderPage({
  params
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-violet-200/70">Builder</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Visual builder for {params.id}</h1>
      <Card className="mt-8">
        <p className="text-sm text-slate-400">This page will host the JSON editor and component palette.</p>
      </Card>
    </div>
  );
}
