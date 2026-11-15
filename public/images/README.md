# Image assets

Every image is referenced from a typed manifest (`src/content/images.ts` and,
from phase 2, one manifest per page). `<SmartImage>` reads the path, and if the
file is missing or fails to load it renders a branded placeholder in the page
accent — so the site never shows a broken image.

To publish a real image, drop the file at the exact path below. No code change
is needed.

## Current manifest

| File | Size | Ratio | Subject | Notes |
|---|---|---|---|---|
| `logo.png` | 320×320 | 1:1 | JCNL logo, transparent background | Optional. When present, the header shows it beside the wordmark. |
| `og/default.jpg` | 1200×630 | 1.91:1 | Wordmark on jungle green | Default social share card, used by `openGraph.images` and `twitter.images`. |
| `styleguide/sample.jpg` | 1920×1080 | 16:9 | Demo image for the placeholder | Dev only; may stay missing. |

## Conventions

- Folder per page: `public/images/<route-slug>/<name>.jpg`.
- Photography: JPEG or WebP, sRGB, no text baked in.
- Hero images: 1920×1080 (16:9) or larger, safe crop centred.
- Card images: 800×1000 (4:5) or 1200×800 (3:2).
- Keep each file under ~300 KB after export. `next/image` handles resizing and
  format negotiation at request time.
- Alt text lives in the manifest, not in the file name. It must describe what
  the image shows; decorative images get `alt=""`.

## Planned for phase 2

The hero carousel (one per page) and the service/section imagery will add
entries here as each page is built. Each entry gets: file name, pixel size,
aspect ratio, intended subject, and whether it is decorative.
