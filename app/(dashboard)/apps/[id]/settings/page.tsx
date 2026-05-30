import { Card } from "@/components/ui/Card";

export default function AppSettingsPage({
  params
}: {
  params: { id: string };
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-violet-200/70">App settings</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Settings for {params.id}</h1>
      <Card className="mt-8">
        <p className="text-sm text-slate-400">App metadata, visibility, and deployment settings will live here.</p>
      </Card>
    </div>
  );
}
