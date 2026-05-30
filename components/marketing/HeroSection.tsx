import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { Code2, Layers3, Rocket, WandSparkles } from "lucide-react";

const codeSample = `{
  "name": "Task Manager",
  "theme": "dark",
  "entities": [
    { "name": "tasks", "fields": ["title", "status", "due_date"] }
  ],
  "workflows": [
    { "trigger": "schedule", "actions": ["notify_overdue"] }
  ]
}`;

const highlights = [
  {
    icon: Layers3,
    title: "Metadata driven UI",
    copy: "Convert JSON into pages, forms, and data views without rewiring your stack."
  },
  {
    icon: WandSparkles,
    title: "Live preview",
    copy: "Render configs into production-like screens while you iterate on schema and layout."
  },
  {
    icon: Rocket,
    title: "Deployable outputs",
    copy: "Ship generated apps with auth, workflows, and exportable GitHub projects."
  }
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-60" />
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <motion.div
          className="relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={fadeUp} className="mb-5 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1 text-sm text-violet-200">
            <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(6,182,212,0.8)]" />
            Base44-style app generation for modern teams
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display max-w-3xl text-5xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl"
          >
            Turn JSON into full-stack apps with a cosmic-grade workflow engine.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
            Forge reads a config object and generates apps, APIs, database schema, preview screens,
            and deployment-ready exports. Build the product definition once, then iterate visually.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Button href="/signup" size="lg">
              <WandSparkles className="h-4 w-4" />
              Start generating
            </Button>
            <Button href="/docs" size="lg" variant="outline">
              <Code2 className="h-4 w-4" />
              Read the spec
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-5">
                  <Icon className="h-5 w-5 text-cyan-300" />
                  <h3 className="mt-4 font-semibold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-400">{item.copy}</p>
                </Card>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div
          className="relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card glow className="relative overflow-hidden border-white/10 p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(124,58,237,0.24),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_30%)]" />
            <div className="relative border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
              </div>
            </div>
            <div className="relative p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-violet-200/70">Config preview</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-white">Task Manager</h2>
                </div>
                <div className="rounded-full border border-cyan-400/20 bg-cyan-500/10 px-3 py-1 text-xs text-cyan-200">
                  Live preview
                </div>
              </div>

              <motion.pre
                className="animate-float overflow-auto rounded-2xl border border-white/10 bg-black/40 p-4 font-mono text-xs leading-6 text-slate-300"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
              >
                <code>{codeSample}</code>
              </motion.pre>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Auth enabled", "GitHub export", "Workflow automation", "RLS ready"].map((label) => (
                  <div key={label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-3 text-sm text-slate-200">
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
