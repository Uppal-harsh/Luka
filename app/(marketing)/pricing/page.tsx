import { NavBar } from "@/components/marketing/NavBar";
import { Footer } from "@/components/marketing/Footer";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Check, Sparkles } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "$0",
    note: "For experiments, prototypes, and internal tools.",
    accent: "from-[#ffffff] to-[#ece8df]",
    features: ["1 app workspace", "Core JSON editor", "Local preview", "Community support"]
  },
  {
    name: "Pro",
    price: "$39",
    note: "For serious teams shipping production-ready apps.",
    accent: "from-[#262933] to-[#585858]",
    featured: true,
    features: ["Unlimited apps", "Supabase auth + workflows", "GitHub export", "Priority support"]
  }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg-base)] text-[color:var(--text-primary)] transition-colors duration-300">
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm uppercase tracking-[0.42em] text-brand-gold/80">Pricing</p>
          <h1 className="mt-4 font-display text-3xl font-semibold tracking-tight text-[color:var(--text-primary)] sm:text-5xl lg:text-6xl">
            Straightforward pricing for teams building with LUKA.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base sm:leading-8">
            Start with a clean workspace, then scale into automation, exports, and collaboration when you need
            them. No clutter. No confusing tiers.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={[
                "relative overflow-hidden border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] p-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.12)]",
                plan.featured ? "shadow-[0_24px_90px_rgba(204,170,75,0.14)]" : ""
              ].join(" ")}
              glow={plan.featured}
            >
              <div className={`h-2 bg-gradient-to-r ${plan.accent}`} />
              <div className="flex h-full flex-col justify-between p-6 sm:p-8 sm:p-10">
                <div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h2 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">{plan.name}</h2>
                      <p className="mt-2 max-w-md text-sm leading-7 text-[color:var(--text-secondary)]">
                        {plan.note}
                      </p>
                    </div>
                    {plan.featured ? (
                      <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-2 text-xs font-medium text-brand-gold">
                        <Sparkles className="h-3.5 w-3.5" />
                        Most popular
                      </div>
                    ) : null}
                  </div>

                  <div className="mt-7 flex items-end gap-2 sm:mt-8">
                    <div className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{plan.price}</div>
                    <div className="pb-1 text-sm text-[color:var(--text-muted)]">/month</div>
                  </div>

                  <p className="mt-3 text-sm text-[color:var(--text-muted)]">
                    {plan.featured ? "Everything in Starter, plus:" : "What’s included:"}
                  </p>

                  <ul className="mt-6 space-y-4">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm text-[color:var(--text-secondary)]">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold">
                          <Check className="h-3.5 w-3.5" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 sm:mt-10">
                  <Button
                    href="/signup"
                    size="lg"
                    variant={plan.featured ? "primary" : "outline"}
                    className="w-full"
                  >
                    {plan.featured ? "Choose Pro" : "Start free"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
