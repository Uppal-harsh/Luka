'use client';

import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  glow?: boolean;
  children: ReactNode;
};

export function Card({ className, glow = false, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "glass rounded-3xl p-6 text-[color:var(--text-primary)] shadow-[0_14px_38px_rgba(13,13,13,0.08)] dark:shadow-card",
        glow && "shadow-[0_20px_60px_rgba(13,13,13,0.12)] dark:shadow-glow-gold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
