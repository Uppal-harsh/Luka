'use client';

import { useTheme } from "next-themes";
import { Moon, SunMedium } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-11 items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] px-3.5 text-sm text-[color:var(--text-primary)] shadow-sm transition hover:bg-[color:var(--bg-surface-hover)]"
      aria-label="Toggle theme"
    >
      {mounted && isDark ? <Moon className="h-4 w-4" /> : <SunMedium className="h-4 w-4" />}
      <span className="hidden sm:inline">{mounted && isDark ? "Dark" : "Light"}</span>
    </button>
  );
}
