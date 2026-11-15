"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { revealTransition, revealViewport } from "@/lib/motion";

/**
 * Scroll reveal. Under reduced motion the content is rendered untouched, and a
 * <noscript> rule in the root layout forces it visible when JS never runs.
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
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

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
