import { NavBar } from "@/components/marketing/NavBar";
import { Footer } from "@/components/marketing/Footer";
import { Card } from "@/components/ui/Card";

const plans = [
  { name: "Starter", price: "$0", note: "For prototypes and internal tools." },
  { name: "Pro", price: "$39", note: "For serious app generation workflows." },
  { name: "Team", price: "$99", note: "For collaborative product teams." }
];

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">Pricing</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white sm:text-5xl">
            Simple plans for teams shipping generated apps.
          </h1>
          <p className="mt-4 text-lg leading-8 text-slate-300">
            Start free, then expand when you need auth, automation, or GitHub export.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.name} className="flex flex-col justify-between">
              <div>
                <h2 className="font-display text-2xl font-semibold">{plan.name}</h2>
                <p className="mt-2 text-sm text-slate-400">{plan.note}</p>
              </div>
              <div className="mt-8">
                <div className="text-4xl font-semibold text-white">{plan.price}</div>
                <div className="mt-1 text-sm text-slate-400">per month</div>
              </div>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
