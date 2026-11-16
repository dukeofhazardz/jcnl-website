"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

import { cn } from "@/lib/cn";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * Small scroll-linked drift for imagery. The transform string keeps the move
 * on the compositor; reduced motion drops it entirely.
 */
export function Parallax({
  children,
  distance = 36,
  className,
}: {
  children: ReactNode;
  /** Total travel in pixels across the viewport pass. */
  distance?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const transform = useTransform(
    scrollYProgress,
    [0, 1],
    [
      `translate3d(0, ${distance}px, 0)`,
      `translate3d(0, ${-distance}px, 0)`,
    ],
  );

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        style={reduceMotion ? undefined : { transform }}
        className="h-full w-full will-change-transform"
      >
        {children}
      </motion.div>
    </div>
  );
}
