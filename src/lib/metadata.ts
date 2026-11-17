import type { Metadata } from "next";

import { site } from "@/config/site";
import { siteImages } from "@/content/images";

/** The default browser title, also used as the social title for the home page. */
export const defaultTitle = `${site.shortName} — A Logistics & Business Services Company`;

/**
 * Per-page metadata. Every public route sets its own title, description and
 * canonical path; the Open Graph and Twitter cards inherit the same pair so a
 * shared link describes the page it points at, not the home page.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  /** Omit only on the home page, which uses the site's default title. */
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const socialTitle = title ? `${title} — ${site.shortName}` : defaultTitle;
  const url = new URL(path, site.url).toString();

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_NG",
      url,
      title: socialTitle,
      description,
      images: [
        {
          url: siteImages.socialCard.src,
          width: siteImages.socialCard.width,
          height: siteImages.socialCard.height,
          alt: siteImages.socialCard.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [siteImages.socialCard.src],
    },
  };
}
