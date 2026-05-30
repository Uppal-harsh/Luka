import Link from "next/link";
import { LukaLogo } from "@/components/brand/LukaLogo";
import type { ReactNode } from "react";

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-[color:var(--border-subtle)] bg-white/75 backdrop-blur-xl dark:bg-black/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <Link href="/" className="transition hover:opacity-90">
            <LukaLogo compact />
          </Link>
          <div className="hidden rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] px-3 py-1.5 text-xs uppercase tracking-[0.24em] text-[color:var(--text-muted)] sm:block">
            Workspace
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
