import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

type EyebrowTone = "accent" | "light" | "ivory" | "muted" | "ink";

const eyebrowTones: Record<EyebrowTone, string> = {
  accent: "text-accent-text",
  light: "text-ivory-100/75",
  ivory: "text-ivory-50",
  muted: "text-ink-muted",
  ink: "text-ink-700",
};

/**
 * A short label that names the section. The rule gives it an edge without a
 * boxed badge.
 */
export function Eyebrow({
  children,
  tone = "accent",
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  tone?: EyebrowTone;
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return (
    <Tag
      className={cn(
        "flex items-center gap-3 text-micro font-semibold uppercase",
        eyebrowTones[tone],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="h-px w-6 shrink-0 bg-current opacity-60"
      />
      <span>{children}</span>
    </Tag>
  );
}

type HeadingSize = "display" | "xl" | "lg" | "md";
type HeadingTag = "h1" | "h2" | "h3" | "h4" | "p";

const headingSizes: Record<HeadingSize, string> = {
  display: "text-display-1",
  xl: "text-display-2",
  lg: "text-display-3",
  md: "text-title",
};

export function Heading({
  children,
  as: Tag = "h2",
  size = "lg",
  className,
  id,
}: {
  children: ReactNode;
  as?: HeadingTag;
  size?: HeadingSize;
  className?: string;
  id?: string;
}) {
  return (
    <Tag
      id={id}
      className={cn(
        "font-display font-normal text-balance",
        headingSizes[size],
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/** Lead paragraph that follows a heading. */
export function Lead({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("max-w-[46ch] text-lead text-ink-muted", className)}>
      {children}
    </p>
  );
}
