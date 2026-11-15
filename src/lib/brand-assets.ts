import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * The client logo is an optional asset. When /public/images/logo.png exists the
 * header shows it; otherwise the wordmark stands alone. Resolved once at build
 * time, so there is no runtime file-system work.
 */
export const hasLogo = existsSync(
  join(process.cwd(), "public", "images", "logo.png"),
);
