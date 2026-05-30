import Link from "next/link";
import type { ReactNode } from "react";

export default function DashboardLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-white/5 bg-[#050508]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="font-display text-lg font-semibold">
            Forge
          </Link>
          <div className="text-sm text-slate-400">Dashboard shell</div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
