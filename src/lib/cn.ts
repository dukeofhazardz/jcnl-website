import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * tailwind-merge does not know the project's font-size tokens, so it treated
 * `text-display-2` and `text-white` as the same class group and dropped the
 * size. Registering the custom scale keeps size and colour independent.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "display-1",
        "display-2",
        "display-3",
        "title",
        "lead",
        "body",
        "small",
        "micro",
      ],
    },
  },
});

/** Merge conditional class names, letting later Tailwind utilities win. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
