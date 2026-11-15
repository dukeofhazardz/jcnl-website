/**
 * Typed image manifest.
 *
 * Every image on the site is referenced by filename from here and points at
 * /public/images/<page>/<name>.jpg. Drop a real file in at the same path and
 * <SmartImage> shows it without any code change. If the file is missing,
 * <SmartImage> renders the branded placeholder instead.
 *
 * See public/images/README.md for the full shot list and public/images/CREDITS.md
 * for attribution of licensed images.
 */

export type ImageAsset = {
  /** Path under /public. */
  src: string;
  /** Alt text. Required: every image needs one. */
  alt: string;
  /** Intended subject, used by the placeholder label. */
  subject: string;
  /** Intended pixel size, used by the placeholder label and the shot list. */
  width: number;
  height: number;
};

export const siteImages = {
  logo: {
    src: "/images/logo.png",
    alt: "JCNL logo",
    subject: "Logo",
    width: 320,
    height: 320,
  },
  socialCard: {
    src: "/images/og/default.jpg",
    alt: "JCNL — a logistics and business services company",
    subject: "Social share card · wordmark on jungle green",
    width: 1200,
    height: 630,
  },
} as const satisfies Record<string, ImageAsset>;

/** Demonstration asset for the /styleguide route. Deliberately missing. */
export const styleguideImages = {
  sample: {
    src: "/images/styleguide/sample.jpg",
    alt: "Placeholder sample used to demonstrate the fallback",
    subject: "Obudu cable car",
    width: 1920,
    height: 1080,
  },
} as const satisfies Record<string, ImageAsset>;
