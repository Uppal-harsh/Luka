import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "live" | "draft" | "error" | "building";

const variants: Record<BadgeVariant, string> = {
  live: "bg-brand-gold/15 text-brand-gold border-brand-gold/20",
  draft: "bg-[color:var(--bg-surface)] text-[color:var(--text-secondary)] border-[color:var(--border-subtle)]",
  error: "bg-red-500/15 text-red-300 border-red-500/20",
  building: "bg-[color:var(--bg-surface-hover)] text-[color:var(--text-secondary)] border-[color:var(--border-subtle)]"
};

export function Badge({
  variant = "draft",
  className,
  children,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { variant?: BadgeVariant; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
