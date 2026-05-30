import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] px-4 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] outline-none transition focus:border-brand-gold/60 focus:ring-2 focus:ring-brand-gold/20",
        className
      )}
      {...props}
    />
  );
}
