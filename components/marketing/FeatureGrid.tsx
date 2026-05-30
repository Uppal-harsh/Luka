import { Card } from "@/components/ui/Card";
import { motion } from "framer-motion";
import { Blocks, Github, Workflow } from "lucide-react";

const features = [
  {
    icon: Blocks,
    title: "Config engine",
    copy: "Zod-backed validation, safe defaults, and resilient rendering when the config is incomplete."
  },
  {
    icon: Github,
    title: "GitHub export",
    copy: "Generate a deployable Next.js project and push it into a repo with one action."
  },
  {
    icon: Workflow,
    title: "Automations",
    copy: "Define triggers and actions that execute against your app data and external APIs."
  }
];

export function FeatureGrid() {
  return (
    <section className="px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/70">Why Forge</p>
          <h2 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
            Designed for builders who want motion, structure, and speed.
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
              >
                <Card className="h-full">
                  <Icon className="h-6 w-6 text-violet-300" />
                  <h3 className="mt-5 font-display text-2xl font-semibold">{feature.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-400">{feature.copy}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
