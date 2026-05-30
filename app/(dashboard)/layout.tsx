import Link from "next/link";
import { LukaLogo } from "@/components/brand/LukaLogo";
import { Button } from "@/components/ui/Button";
import { ArrowRight, LogOut } from "lucide-react";
import type { ReactNode } from "react";

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[color:var(--border-subtle)] bg-white/75 backdrop-blur-xl dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8">
          <Link href="/" className="transition hover:opacity-90">
            <LukaLogo compact responsiveWordmark />
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button href="/apps/new" size="sm">
              Build
              <ArrowRight className="h-4 w-4" />
            </Button>
            <div className="hidden rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)] md:block">
              Workspace
            </div>
            <Button href="/logout" size="sm" variant="outline" className="hidden sm:inline-flex">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
