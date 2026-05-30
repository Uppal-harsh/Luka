import Link from "next/link";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import { LukaLogo } from "@/components/brand/LukaLogo";

const quickLinks = [
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/login", label: "Login" }
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[color:var(--border-subtle)] px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 rounded-[2rem] border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] px-6 py-8 shadow-[0_18px_60px_rgba(0,0,0,0.08)] backdrop-blur-sm sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
          <div className="space-y-5">
            <LukaLogo compact />
            <p className="max-w-xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
              LUKA is a premium AI app generator for product teams that want to build, preview,
              and ship with clarity.
            </p>

            <div className="flex flex-wrap gap-3 pt-1">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--bg-base)] px-4 py-2 text-sm text-[color:var(--text-secondary)] transition hover:border-brand-gold/40 hover:text-[color:var(--text-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-[color:var(--border-subtle)] bg-[color:var(--bg-base)] p-6">
            <p className="text-xs uppercase tracking-[0.35em] text-brand-gold/80">Contact</p>
            <h2 className="mt-3 font-display text-2xl font-semibold text-[color:var(--text-primary)]">
              Let&apos;s build something solid.
            </h2>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
              For feedback, partnerships, or product questions, reach out directly.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:harshuppal300@gmail.com"
                className="flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] px-4 py-3 text-sm text-[color:var(--text-primary)] transition hover:border-brand-gold/40 hover:bg-[color:var(--bg-surface-hover)]"
              >
                <span className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-brand-gold" />
                  harshuppal300@gmail.com
                </span>
                <ArrowUpRight className="h-4 w-4 text-brand-gold" />
              </a>

              <a
                href="https://github.com/uppal-harsh"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-4 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] px-4 py-3 text-sm text-[color:var(--text-primary)] transition hover:border-brand-gold/40 hover:bg-[color:var(--bg-surface-hover)]"
              >
                <span className="flex items-center gap-3">
                  <Github className="h-4 w-4 text-brand-gold" />
                  github.com/uppal-harsh
                </span>
                <ArrowUpRight className="h-4 w-4 text-brand-gold" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-3 border-t border-[color:var(--border-subtle)] pt-5 text-sm text-[color:var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} LUKA. All rights reserved.</p>
          <p className="uppercase tracking-[0.24em]">
            Designed for teams that value polish and precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
