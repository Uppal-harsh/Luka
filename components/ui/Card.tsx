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
        "glass rounded-3xl p-6 text-[color:var(--text-primary)] shadow-card",
        glow && "shadow-glow-gold",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
