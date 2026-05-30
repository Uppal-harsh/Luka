import { Card } from "@/components/ui/Card";

export default function SettingsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-brand-gold/70">Settings</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Workspace settings</h1>
      <Card className="mt-8 space-y-2">
        <p className="text-sm text-[color:var(--text-secondary)]">Environment variables, auth providers, and export settings go here.</p>
      </Card>
    </div>
  );
}
