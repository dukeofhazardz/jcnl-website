import type { MetadataRoute } from "next";

import { nav, site } from "@/config/site";
import { getPublishedProperties } from "@/content/properties";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const pages: MetadataRoute.Sitemap = nav.map((item) => ({
    url: new URL(item.href, site.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority: item.href === "/" ? 1 : 0.7,
  }));

  /**
   * Property pages join the sitemap only once the record is real. The sample
   * listings ship for layout review and are `noindex` until they are replaced,
   * so announcing them here would contradict the page metadata.
   */
  const listings: MetadataRoute.Sitemap = getPublishedProperties().map(
    (property) => ({
      url: new URL(`/real-estate/${property.slug}`, site.url).toString(),
      lastModified: new Date(property.listedAt),
      changeFrequency: "weekly",
      priority: 0.6,
    }),
  );

  return [...pages, ...listings];
}
