import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type LukaLogoProps = HTMLAttributes<HTMLDivElement> & {
  showWordmark?: boolean;
  compact?: boolean;
};

export function LukaLogo({ showWordmark = true, compact = false, className, ...props }: LukaLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", compact && "gap-2", className)} {...props}>
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(204,170,75,0.96),rgba(88,88,88,0.92))] shadow-[0_12px_30px_rgba(204,170,75,0.22)]">
        <div className="absolute inset-[1px] rounded-[14px] bg-black" />
        <svg
          viewBox="0 0 48 48"
          className="relative h-6 w-6 text-brand-gold"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M15 12v18.5c0 2.9 2.3 5.5 5.2 5.5H34"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M17 33h15"
            stroke="currentColor"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {showWordmark ? (
        <div className="leading-tight">
          <div className="font-display text-lg font-semibold tracking-[0.18em] text-[color:var(--text-primary)]">
            LUKA
          </div>
          <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">
            Build from JSON
          </div>
        </div>
      ) : null}
    </div>
  );
}
