import { NavBar } from "@/components/marketing/NavBar";
import { Footer } from "@/components/marketing/Footer";
import { Card } from "@/components/ui/Card";

const steps = [
  "Describe your app in JSON.",
  "Validate and resolve the config.",
  "Preview the generated UI live.",
  "Export to GitHub and deploy."
];

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-sm uppercase tracking-[0.25em] text-violet-200/70">Docs</p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">
          Build apps from JSON, one config block at a time.
        </h1>
        <div className="mt-10 grid gap-4">
          {steps.map((step, index) => (
            <Card key={step} className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-200">
                {index + 1}
              </div>
              <p className="text-slate-300">{step}</p>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
