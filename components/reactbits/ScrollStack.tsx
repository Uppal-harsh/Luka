'use client';

import { cn } from "@/lib/utils";
import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode
} from "react";

type ScrollStackProps = {
  children: ReactNode;
  className?: string;
  itemDistance?: number;
  itemScale?: number;
  itemStackDistance?: number;
  stackPosition?: string;
  scaleEndPosition?: string;
  baseScale?: number;
};

type ScrollStackItemProps = {
  children: ReactNode;
  className?: string;
};

export function ScrollStackItem({ children, className }: ScrollStackItemProps) {
  return (
      <div
      className={cn(
        "overflow-hidden rounded-[2rem] border border-[color:var(--border-subtle)] bg-[color:var(--bg-surface)] text-[color:var(--text-primary)] shadow-[0_18px_60px_rgba(0,0,0,0.16)] transition-transform duration-300 dark:shadow-[0_18px_60px_rgba(0,0,0,0.28)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function ScrollStack({
  children,
  className,
  itemDistance = 100,
  itemScale = 0.03,
  itemStackDistance = 30,
  stackPosition = "20%",
  scaleEndPosition = "10%",
  baseScale = 0.85
}: ScrollStackProps) {
  const items = Children.toArray(children).filter(isValidElement) as ReactElement<ScrollStackItemProps>[];

  return (
    <div
      className={cn("relative", className)}
      style={{
        paddingBottom: `${Math.max(0, items.length - 1) * itemDistance}px`
      }}
    >
      {items.map((item, index) => {
        const scale = Math.min(1, baseScale + index * itemScale);
        const offsetY = index * itemStackDistance;
        const zIndex = items.length - index;

        return (
          <div
            key={item.key ?? index}
            className="sticky mx-auto max-w-5xl"
            style={{
              top: stackPosition,
              zIndex,
              transform: `translateY(${offsetY}px) scale(${scale})`,
              transformOrigin: "center top",
              marginTop: index === 0 ? 0 : `-${itemStackDistance}px`
            }}
          >
            {cloneElement(item, {
              className: cn(
                item.props.className,
                "group cursor-pointer will-change-transform hover:-translate-y-1 hover:shadow-[0_22px_70px_rgba(0,0,0,0.38)]"
              )
            })}
          </div>
        );
      })}
    </div>
  );
}

export type { ScrollStackItemProps, ScrollStackProps };
