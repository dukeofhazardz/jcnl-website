import type { Transition } from "motion/react";

/** Custom curves. Built-in CSS easings are too weak for intentional motion. */
export const EASE_OUT_STRONG: [number, number, number, number] = [0.23, 1, 0.32, 1];
export const EASE_IN_OUT_SOFT: [number, number, number, number] = [
  0.77, 0, 0.175, 1,
];
export const EASE_SOFT: [number, number, number, number] = [0.16, 1, 0.3, 1];

/** Press feedback: 120ms, fast enough to feel like a direct response. */
export const pressTransition: Transition = {
  duration: 0.12,
  ease: EASE_OUT_STRONG,
};

/** UI transitions stay under 300ms. */
export const uiTransition: Transition = {
  duration: 0.22,
  ease: EASE_OUT_STRONG,
};

/** Section reveals: long enough to read as an entrance, short enough not to wait. */
export const revealTransition: Transition = {
  duration: 0.62,
  ease: EASE_SOFT,
};

export const revealViewport = {
  once: true,
  amount: 0.2,
  margin: "0px 0px -8% 0px",
} as const;

/** Extra travel for decorative elements. */
export const cardHoverTransition: Transition = {
  duration: 0.3,
  ease: EASE_OUT_STRONG,
};
