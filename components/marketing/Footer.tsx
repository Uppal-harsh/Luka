import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">Forge</p>
          <p className="mt-1 text-sm text-slate-400">Cosmic app generation for modern teams.</p>
        </div>
        <div className="flex gap-5 text-sm text-slate-400">
          <Link href="/pricing" className="transition hover:text-white">
            Pricing
          </Link>
          <Link href="/docs" className="transition hover:text-white">
            Docs
          </Link>
          <Link href="/login" className="transition hover:text-white">
            Login
          </Link>
        </div>
      </div>
    </footer>
  );
}
