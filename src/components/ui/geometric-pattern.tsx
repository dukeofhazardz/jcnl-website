import { cn } from "@/lib/cn";

type PatternVariant = "lattice" | "chevron" | "rays";

/**
 * Low-opacity geometric field, drawn from interlocking diamonds. Used as a
 * texture inside placeholders and as a quiet accent in dark sections. Never
 * carries meaning, so it is hidden from assistive tech.
 */
export function GeometricPattern({
  variant = "lattice",
  className,
}: {
  variant?: PatternVariant;
  className?: string;
}) {
  const id = `jcnl-pattern-${variant}`;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className={cn("pointer-events-none h-full w-full", className)}
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern
          id={id}
          width="72"
          height="72"
          patternUnits="userSpaceOnUse"
          patternTransform="translate(0 0)"
        >
          {variant === "lattice" ? (
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M36 1 L71 36 L36 71 L1 36 Z" />
              <path d="M36 19 L53 36 L36 53 L19 36 Z" />
              <path d="M0 0 L72 72 M72 0 L0 72" strokeWidth="0.5" />
            </g>
          ) : null}
          {variant === "chevron" ? (
            <g fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M0 48 L18 30 L36 48 L54 30 L72 48" />
              <path d="M0 24 L18 6 L36 24 L54 6 L72 24" />
              <path d="M0 72 L18 54 L36 72 L54 54 L72 72" />
            </g>
          ) : null}
          {variant === "rays" ? (
            <g fill="none" stroke="currentColor" strokeWidth="0.75">
              <path d="M-12 36 L36 -12 M0 72 L72 0 M36 84 L84 36" />
            </g>
          ) : null}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
