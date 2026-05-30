import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Sparkles } from "lucide-react";

const navItems = [
  { href: "/pricing", label: "Pricing" },
  { href: "/docs", label: "Docs" },
  { href: "/login", label: "Sign in" }
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#050508]/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-cyan-400 shadow-glow-violet">
            <Sparkles className="h-5 w-5 text-white" />
          </span>
          <div>
            <div className="font-display text-lg font-semibold tracking-tight">Forge</div>
            <div className="text-xs text-slate-400">Build from JSON</div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-slate-300 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button href="/signup" size="sm" variant="outline" className="hidden sm:inline-flex">
            Explore
          </Button>
          <Button href="/login" size="sm">
            Launch app
          </Button>
        </div>
      </div>
    </header>
  );
}
