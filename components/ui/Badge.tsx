import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type BadgeVariant = "live" | "draft" | "error" | "building";

const variants: Record<BadgeVariant, string> = {
  live: "bg-emerald-500/15 text-emerald-300 border-emerald-500/20",
  draft: "bg-slate-500/15 text-slate-300 border-slate-500/20",
  error: "bg-red-500/15 text-red-300 border-red-500/20",
  building: "bg-amber-500/15 text-amber-300 border-amber-500/20"
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
