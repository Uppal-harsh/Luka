import { NavBar } from "@/components/marketing/NavBar";
import { Footer } from "@/components/marketing/Footer";
import { ScrollStack, ScrollStackItem } from "@/components/reactbits";

const steps = [
  {
    number: "01",
    title: "Describe your app in JSON.",
    copy: "Start with a clean config and define the product structure in one place."
  },
  {
    number: "02",
    title: "Validate and resolve the config.",
    copy: "Detect missing fields early and fill safe defaults before anything is rendered."
  },
  {
    number: "03",
    title: "Preview the generated UI live.",
    copy: "See the actual app shell, data views, and layout behavior before you deploy."
  },
  {
    number: "04",
    title: "Export to GitHub and deploy.",
    copy: "Ship the generated project with a repo-ready codebase and automation hooks."
  }
];

export default function DocsPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.4em] text-brand-gold/70">Docs</p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-5xl lg:text-6xl">
            Build apps from JSON, one config block at a time.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-[color:var(--text-secondary)] sm:text-lg">
            Follow the stack below to move from description to preview to deployment.
          </p>
        </div>

        <div className="mt-12">
          <ScrollStack className="space-y-6" itemDistance={120} itemStackDistance={28} baseScale={0.88}>
            {steps.map((step, index) => (
              <ScrollStackItem key={step.number}>
                <div className="flex min-h-[180px] flex-col justify-between gap-6 bg-[color:var(--bg-surface)] px-6 py-6 sm:flex-row sm:items-center sm:px-8">
                  <div className="flex items-center gap-5">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-[color:var(--border-subtle)] bg-brand-gold/10 text-lg font-medium text-brand-gold">
                      {step.number}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold text-[color:var(--text-primary)] sm:text-3xl">{step.title}</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
                        {step.copy}
                      </p>
                    </div>
                  </div>

                  <div className="text-sm uppercase tracking-[0.3em] text-[color:var(--text-muted)] sm:pl-4">
                    Step {index + 1}
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </div>
      </main>
      <Footer />
    </div>
  );
}
