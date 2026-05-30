'use client';

import Link from "next/link";
import { LukaLogo } from "@/components/brand/LukaLogo";
import { Button } from "@/components/ui/Button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { ArrowRight, BadgeCheck } from "lucide-react";

const navItems = [
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/login", label: "Sign in" }
] as const;

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] backdrop-blur-2xl shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:bg-black/80 dark:shadow-none">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <LukaLogo />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-[color:var(--text-secondary)] transition hover:text-[color:var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] px-3 py-2 text-xs text-[color:var(--text-secondary)] lg:flex">
            <BadgeCheck className="h-4 w-4 text-brand-gold" />
            Private beta
          </div>
          <ThemeToggle />
          <Button href="/docs" size="sm" variant="outline" className="hidden sm:inline-flex">
            Docs
          </Button>
          <Button href="/login" size="sm">
            Launch
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
