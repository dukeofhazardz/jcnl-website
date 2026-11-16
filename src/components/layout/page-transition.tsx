import type { ReactNode } from "react";

/**
 * Route transition. `template.tsx` remounts this on every navigation, so a
 * one-shot fade is enough.
 *
 * It is CSS rather than JS on purpose: the server has no media query, so a
 * Motion `useReducedMotion` branch renders different markup on the server and
 * the client and breaks hydration. A media query in the stylesheet honours
 * `prefers-reduced-motion` before the first paint, with no JS at all.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
