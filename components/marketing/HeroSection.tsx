'use client';

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { fadeUp, staggerContainer } from "@/lib/motion";
import { motion } from "framer-motion";
import { FileCode2, Layers3, Rocket, WandSparkles } from "lucide-react";

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
    <section className="relative overflow-hidden px-4 pt-12 sm:px-6 lg:px-8 lg:pt-16">
      <div className="pointer-events-none absolute inset-0 grid-noise opacity-45" />
      <div className="mx-auto grid max-w-7xl gap-10 rounded-[2rem] border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] px-5 py-8 shadow-[0_30px_120px_rgba(0,0,0,0.10)] backdrop-blur-sm lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:px-8 lg:py-10 dark:shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
        <motion.div
          className="relative z-10"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-sm text-brand-gold"
          >
            <span className="h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_18px_rgba(204,170,75,0.55)]" />
            LUKA • premium app generation for modern teams
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-display max-w-3xl text-5xl font-extrabold tracking-tight text-[color:var(--text-primary)] sm:text-6xl lg:text-7xl"
          >
            Turn JSON into full-stack apps with a clean, professional workflow engine.
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-[color:var(--text-secondary)]">
            LUKA reads a config object and generates apps, APIs, database schema, preview screens,
            and deployment-ready exports. Define the product once, then iterate visually.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <Button href="/signup" size="lg">
              <WandSparkles className="h-4 w-4" />
              Start generating
            </Button>
            <Button href="/docs" size="lg" variant="outline">
              <FileCode2 className="h-4 w-4" />
              Read the spec
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-10 grid gap-4 sm:grid-cols-3">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} className="p-5">
                  <Icon className="h-5 w-5 text-brand-gold" />
                  <h3 className="mt-4 font-semibold text-[color:var(--text-primary)]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">{item.copy}</p>
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
          <Card glow className="relative overflow-hidden border-[color:var(--border-subtle)] p-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(204,170,75,0.18),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(88,88,88,0.12),transparent_30%)]" />
            <div className="relative border-b border-[color:var(--border-subtle)] px-5 py-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#e4d7ad]" />
                <span className="h-3 w-3 rounded-full bg-[#585858]" />
                <span className="h-3 w-3 rounded-full bg-[#262933]" />
              </div>
            </div>
            <div className="relative p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.25em] text-brand-gold/70">Config preview</p>
                  <h2 className="mt-2 font-display text-2xl font-semibold text-[color:var(--text-primary)]">Task Manager</h2>
                </div>
                <div className="rounded-full border border-brand-gold/20 bg-brand-gold/10 px-3 py-1 text-xs text-brand-gold">
                  Live preview
                </div>
              </div>

              <motion.pre
                className="animate-float overflow-auto rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] p-4 font-mono text-xs leading-6 text-[color:var(--text-secondary)]"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45 }}
              >
                <code>{codeSample}</code>
              </motion.pre>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {["Auth enabled", "GitHub export", "Workflow automation", "RLS ready"].map((label) => (
                  <div
                    key={label}
                    className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface-hover)] px-4 py-3 text-sm text-[color:var(--text-primary)]"
                  >
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
