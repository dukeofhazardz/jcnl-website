import type { ReactNode } from "react";

import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { cn } from "@/lib/cn";

export type SectionTone =
  | "ivory"
  | "sand"
  | "jungle"
  | "ink"
  | "accent"
  | "clay";
export type DividerVariant = "arch" | "dune" | "blade" | "wave";

const toneClasses: Record<SectionTone, string> = {
  ivory: "bg-ivory-50 text-ink-900",
  sand: "bg-ivory-100 text-ink-900",
  jungle: "bg-jungle-950 text-ivory-50",
  ink: "bg-ink-900 text-ivory-50",
  accent: "bg-accent text-accent-ink",
  /** Fixed late-clay band. Used where the page accent would be too quiet. */
  clay: "bg-clay-500 text-ivory-50",
};

const dividerFills: Record<SectionTone, string> = {
  ivory: "fill-ivory-50",
  sand: "fill-ivory-100",
  jungle: "fill-jungle-950",
  ink: "fill-ink-900",
  accent: "fill-accent",
  clay: "fill-clay-500",
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
  tone = "ivory",
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
  tone = "ivory",
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
