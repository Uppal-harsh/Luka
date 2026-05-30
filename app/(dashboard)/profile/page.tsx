import { Card } from "@/components/ui/Card";

export default function ProfilePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">Profile</p>
      <h1 className="mt-2 font-display text-3xl font-semibold">Your workspace profile</h1>
      <Card className="mt-8">
        <p className="text-sm text-slate-400">
          Profile settings and GitHub connection state will be wired in during the next pass.
        </p>
      </Card>
    </div>
  );
}
