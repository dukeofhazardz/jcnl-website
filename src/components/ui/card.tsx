import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/cn";

type CardTone = "surface" | "raised" | "sand" | "ink" | "outline";

const tones: Record<CardTone, string> = {
  surface: "bg-ivory-100 text-ink-900",
  raised: "bg-[var(--surface-raised)] text-ink-900",
  sand: "bg-ivory-200 text-ink-900",
  ink: "bg-jungle-950 text-ivory-50",
  outline: "border border-line bg-transparent text-ink-900",
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
