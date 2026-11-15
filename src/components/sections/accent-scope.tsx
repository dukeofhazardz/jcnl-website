import type { ReactNode } from "react";

import type { AccentKey } from "@/config/site";

/**
 * Applies a page's accent variables. Any element inside inherits the accent
 * utilities (bg-accent, text-accent-text, fill-accent …) without regenerating
 * them, because the semantic tokens resolve at runtime.
 */
export function AccentScope({
  accent,
  children,
}: {
  accent: AccentKey;
  children: ReactNode;
}) {
  return <div data-accent={accent}>{children}</div>;
}
