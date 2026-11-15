import type { AccentKey } from "@/config/site";

/**
 * The accent scopes available to pages. Kept in typed content so the styleguide
 * can enumerate them without importing delivery data.
 */
export const accentKeys: readonly AccentKey[] = [
  "tours",
  "farms",
  "freight",
  "engineering",
  "business",
  "brand",
] as const;
