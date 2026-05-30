import Image from "next/image";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

type LukaMarkProps = Omit<ComponentPropsWithoutRef<typeof Image>, "src" | "alt" | "width" | "height"> & {
  size?: number;
};

export function LukaMark({ size = 44, className, ...props }: LukaMarkProps) {
  return (
    <Image
      src="/favicon.png"
      alt=""
      width={size}
      height={size}
      className={cn("rounded-[24px] shadow-[0_12px_30px_rgba(13,13,13,0.18)]", className)}
      aria-hidden="true"
      {...props}
    />
  );
}
