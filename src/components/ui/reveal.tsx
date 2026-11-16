"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

import { revealTransition, revealViewport } from "@/lib/motion";

/**
 * Scroll reveal.
 *
 * The element is always a `motion.div`, because the server cannot read the
 * reduced-motion media query; branching here would break hydration. Reduced
 * motion is handled in CSS, which forces these elements visible, and a
 * `<noscript>` rule in the root layout does the same when JS never runs.
 */
export function Reveal({
  children,
  delay = 0,
  y = 22,
  className,
}: {
  children: ReactNode;
  /** Stagger lists by 0.05–0.08s per item. */
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal=""
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={revealViewport}
      transition={{ ...revealTransition, delay }}
    >
      {children}
    </motion.div>
  );
}
