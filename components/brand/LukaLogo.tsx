import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import { LukaMark } from "@/components/brand/LukaMark";

type LukaLogoProps = HTMLAttributes<HTMLDivElement> & {
  showWordmark?: boolean;
  compact?: boolean;
};

export function LukaLogo({ showWordmark = true, compact = false, className, ...props }: LukaLogoProps) {
  return (
    <div className={cn("flex items-center gap-3", compact && "gap-2", className)} {...props}>
      <LukaMark size={compact ? 40 : 44} className="shrink-0" />

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
