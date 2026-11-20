"use client";

import { LazyMotion, domMax } from "motion/react";
import type { ReactNode } from "react";

/**
 * Ship the animation runtime in a smaller bundle.
 *
 * Importing `motion.*` components pulls in every feature Framer Motion has.
 * `LazyMotion` + `m.*` loads only the features the site uses, and `domMax`
 * covers scroll-linked transforms and the layout animations in the property
 * explorer. `strict` makes a stray `motion.*` fail loudly in development
 * instead of silently re-adding the full runtime.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domMax} strict>
      {children}
    </LazyMotion>
  );
}
