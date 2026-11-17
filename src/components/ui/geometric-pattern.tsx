import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";

type PatternVariant = "lattice" | "chevron" | "rays";

const line = (angle: number) =>
  `repeating-linear-gradient(${angle}deg, currentColor 0 1px, transparent 1px 36px)`;

/** Each variant is a pure CSS background, painted in place. */
const variants: Record<PatternVariant, CSSProperties> = {
  /** Crossed 45° lines: diamonds 36px on a side. */
  lattice: {
    backgroundImage: `${line(45)}, ${line(-45)}`,
    backgroundSize: "72px 72px",
  },
  /** The same geometry, doubled up into chevrons. */
  chevron: {
    backgroundImage: `${line(45)}, ${line(-45)}`,
    backgroundSize: "72px 36px",
  },
  /** A single direction, for quieter fields. */
  rays: {
    backgroundImage: line(45),
    backgroundSize: "72px 72px",
  },
};

/**
 * Low-opacity geometric field, used as a texture inside placeholders and as a
 * quiet accent in dark sections. Never carries meaning, so it is hidden from
 * assistive tech.
 *
 * Gradients rather than an SVG `<pattern>` or a CSS mask: masks push the whole
 * painted area through an offscreen layer, which is expensive for full-bleed
 * hero fields, and inline patterns duplicate ids when several render on one
 * page. Gradients paint in place and inherit `currentColor`.
 */
export function GeometricPattern({
  variant = "lattice",
  className,
}: {
  variant?: PatternVariant;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none h-full w-full", className)}
      style={variants[variant]}
    />
  );
}
