import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function NewAppPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-brand-gold/70">New app</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Start from a JSON config</h1>
      <Card className="mt-8 space-y-4">
        <Input defaultValue="Task Manager" placeholder="App name" />
        <textarea
          className="min-h-[280px] w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] p-4 font-mono text-sm text-[color:var(--text-primary)] outline-none"
          defaultValue={`{\n  "name": "Task Manager",\n  "entities": []\n}`}
        />
        <div className="flex justify-end">
          <Button>Create app</Button>
        </div>
      </Card>
    </div>
  );
}
