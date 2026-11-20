import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardTone = "surface" | "raised" | "tint" | "ink" | "outline";

const tones: Record<CardTone, string> = {
  /** Soft grey, one step off white. */
  surface: "bg-mist-50 text-ink-950",
  raised: "bg-white text-ink-950",
  /** Very light sky. */
  tint: "bg-sky-50 text-ink-950",
  ink: "bg-ink-950 text-white",
  outline: "border border-line bg-transparent text-ink-950",
};

export function Card({
  children,
  tone = "surface",
  interactive = false,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  tone?: CardTone;
  /** Adds a lift on hover for pointer devices, never on touch or reduced motion. */
  interactive?: boolean;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag
      className={cn(
        "relative flex flex-col overflow-hidden rounded-md",
        tones[tone],
        interactive &&
          "transition-[transform,box-shadow] duration-300 ease-strong motion-safe:hover-fine:-translate-y-1 motion-safe:hover-fine:shadow-lift",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
