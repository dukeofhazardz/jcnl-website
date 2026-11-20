import type { ReactNode } from "react";

import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { cn } from "@/lib/cn";

export type SectionTone = "white" | "tint" | "mist" | "ink" | "accent";
export type DividerVariant = "arch" | "dune" | "blade" | "wave";

const toneClasses: Record<SectionTone, string> = {
  white: "bg-white text-ink-950",
  /** Very light sky: the default secondary surface. */
  tint: "bg-sky-50 text-ink-950",
  /** Soft cool grey, for a quieter band. */
  mist: "bg-mist-50 text-ink-950",
  /** Rare feature band. Deep ink from the sky scale; never green. */
  ink: "bg-ink-950 text-white",
  /** Sky field: dark ink text at 8.08:1. */
  accent: "bg-sky-500 text-ink-950",
};

const dividerFills: Record<SectionTone, string> = {
  white: "fill-white",
  tint: "fill-sky-50",
  mist: "fill-mist-50",
  ink: "fill-ink-950",
  accent: "fill-sky-500",
};

const spacingClasses = {
  none: "",
  sm: "py-section-sm",
  md: "py-section",
  lg: "py-[clamp(6rem,12vw,11rem)]",
} as const;

/** Top edges. The path is filled with the section's own colour. */
const dividerPaths: Record<DividerVariant, string> = {
  arch: "M0 120 L0 104 C 360 6, 1080 6, 1440 104 L1440 120 Z",
  dune: "M0 120 L0 98 C 250 26, 480 118, 720 92 C 980 64, 1180 8, 1440 66 L1440 120 Z",
  blade: "M0 120 L0 70 L1440 118 L1440 120 Z",
  wave: "M0 120 L0 84 C 240 18, 480 18, 720 74 C 960 130, 1200 130, 1440 56 L1440 120 Z",
};

export function SectionDivider({
  variant = "arch",
  tone = "white",
  className,
}: {
  variant?: DividerVariant;
  tone?: SectionTone;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-x-0 top-0 z-10 -translate-y-[calc(100%-1px)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="block h-[clamp(40px,7vw,110px)] w-full"
      >
        <path d={dividerPaths[variant]} className={dividerFills[tone]} />
      </svg>
    </div>
  );
}

type SectionProps = {
  children: ReactNode;
  id?: string;
  tone?: SectionTone;
  spacing?: keyof typeof spacingClasses;
  /** Renders a curved top edge in the section's own colour. */
  topDivider?: DividerVariant;
  /** Adds a low-opacity geometric field behind the content. */
  pattern?: boolean;
  patternClassName?: string;
  labelledBy?: string;
  className?: string;
  as?: "section" | "div" | "article";
};

export function Section({
  children,
  id,
  tone = "white",
  spacing = "md",
  topDivider,
  pattern = false,
  patternClassName,
  labelledBy,
  className,
  as: Tag = "section",
}: SectionProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={labelledBy}
      className={cn(
        "relative isolate",
        toneClasses[tone],
        spacingClasses[spacing],
        className,
      )}
    >
      {topDivider ? (
        <SectionDivider variant={topDivider} tone={tone} />
      ) : null}
      {pattern ? (
        <GeometricPattern
          variant="lattice"
          className={cn(
            "absolute inset-0 -z-10 opacity-[0.07]",
            patternClassName,
          )}
        />
      ) : null}
      {children}
    </Tag>
  );
}
