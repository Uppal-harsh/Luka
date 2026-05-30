import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "live" | "draft" | "error" | "building";

const variants: Record<BadgeVariant, string> = {
  live: "bg-brand-gold/15 text-brand-gold border-brand-gold/20",
  draft: "bg-white/5 text-slate-300 border-white/10",
  error: "bg-red-500/15 text-red-300 border-red-500/20",
  building: "bg-brand-gray/15 text-brand-gray border-brand-gray/20"
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
