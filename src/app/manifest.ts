import type { MetadataRoute } from "next";

import { site } from "@/config/site";

/**
 * `theme_color` is the brand sky (the token that fills the logo), so the
 * installed app's status bar matches the mark. The icons are generated from
 * the main logo by `scripts/generate-icons.mjs` — the tab icon never switches
 * to the Christmas artwork.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#00bafc",
    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icons/icon-512-maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
