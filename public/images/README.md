# Image assets

Every image is referenced from a typed manifest in `src/content/images.ts`.
`<SmartImage>` reads the path; if the file is missing or fails to load it renders
a branded placeholder in the page accent, so the site never shows a broken
image and never shows a blank box.

To publish a real image, drop the file at the exact path below. No code change
is needed. The manifest is the single source of truth: the placeholder label,
the intrinsic size and this shot list all come from it.

## How the hero uses these files

All eight pages open with the same `<HeroCarousel>`. Each slide is full-bleed
behind a dark legibility scrim, so an image must survive three things:

1. **A crop to a tall viewport.** At 360px wide the frame is roughly 3:7; the
   same file is cropped to 16:9 at 1920px wide. Keep the subject's centre of
   interest inside the middle 60% of the frame, and keep the bottom-left third
   quiet — the headline, sub and CTA sit there.
2. **A slow zoom.** The active slide scales from 1.02 to 1.06 over nine seconds,
   so don't choose an image whose edges matter (crowds at the frame edge, text,
   faces at the border).
3. **A colour scrim.** Images are pushed towards deep green. Warm, mid-contrast
   photography survives this best; flat, hazy or very dark images do not.

Photography only. No stock illustration, no text baked in, no watermarks.

## Current manifest

Heroes are 1920×1080 (16:9). "Subject" matches the placeholder label exactly, so
a filled slot and an empty slot describe the same shot.

### Home — `/`

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `home/obudu-mountain-resort.jpg` | 1920×1080 | 16:9 | Obudu cable car, Cross River State |
| 2 | `home/yankari-game-reserve.jpg` | 1920×1080 | 16:9 | Yankari Game Reserve, Bauchi State |
| 3 | `home/la-campagne-tropicana.jpg` | 1920×1080 | 16:9 | La Campagne Tropicana beach huts |
| 4 | `home/lagos-city-tour.jpg` | 1920×1080 | 16:9 | Lagos Island waterfront |
| 5 | `home/tropical-beach-aerial.jpg` | 1920×1080 | 16:9 | Atlantic beach from the air |
| 6 | `home/safari-wildlife.jpg` | 1920×1080 | 16:9 | Safari wildlife at first light |

### About — `/about`

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `about/business-travel.jpg` | 1920×1080 | 16:9 | Business travel, airport departures |
| 2 | `about/hotel-reception.jpg` | 1920×1080 | 16:9 | Hotel reception at dusk |
| 3 | `about/airport-meet-and-greet.jpg` | 1920×1080 | 16:9 | Airport meet and greet |
| 4 | `about/tour-group.jpg` | 1920×1080 | 16:9 | Tour group in a city market |

### Visa & Tours — `/visa-and-tours`

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `visa-and-tours/obudu-mountain-resort.jpg` | 1920×1080 | 16:9 | Obudu Mountain Resort |
| 2 | `visa-and-tours/la-campagne-tropicana.jpg` | 1920×1080 | 16:9 | La Campagne Tropicana |
| 3 | `visa-and-tours/lagos-city-tour.jpg` | 1920×1080 | 16:9 | Lagos city tour |
| 4 | `visa-and-tours/yankari-game-reserve.jpg` | 1920×1080 | 16:9 | Yankari Game Reserve |
| 5 | `visa-and-tours/visa-desk.jpg` | 1920×1080 | 16:9 | Visa desk, documents on a table |
| 6 | `visa-and-tours/airport-lounge.jpg` | 1920×1080 | 16:9 | Airport lounge seating |

Five of these also appear in the page body, so they are cropped harder than a
hero:

| File | Used in | Crop |
|---|---|---|
| `obudu-mountain-resort.jpg` | Tour360 product frame, gallery | 4:5 portrait, then 7:5 |
| `airport-lounge.jpg` | TRAVELCredit product frame | 4:5 portrait |
| `visa-desk.jpg` | VISA-Assist247 product frame | 4:5 portrait |
| `la-campagne-tropicana.jpg` | Gallery | square |
| `lagos-city-tour.jpg` | Gallery | 21:9 panorama |

A 16:9 source loses roughly half its width at 4:5. Frame the subject centrally
and leave the top third calm enough that the product caption can sit over it.

### Business Services — `/business-services`

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `business-services/boardroom.jpg` | 1920×1080 | 16:9 | Boardroom, glass and daylight |
| 2 | `business-services/city-skyline.jpg` | 1920×1080 | 16:9 | Lagos business district skyline |
| 3 | `business-services/handshake.jpg` | 1920×1080 | 16:9 | Handshake at a contract signing |
| 4 | `business-services/finance-charts.jpg` | 1920×1080 | 16:9 | Finance charts and a laptop |
| 5 | `business-services/hospitality.jpg` | 1920×1080 | 16:9 | Hotel lobby, staff at the desk |

### Cargo & Freight — `/cargo-and-freight`

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `cargo-and-freight/cargo-aircraft.jpg` | 1920×1080 | 16:9 | Cargo aircraft being loaded |
| 2 | `cargo-and-freight/container-ship.jpg` | 1920×1080 | 16:9 | Container ship at sea |
| 3 | `cargo-and-freight/port-cranes.jpg` | 1920×1080 | 16:9 | Port cranes over containers |
| 4 | `cargo-and-freight/warehouse.jpg` | 1920×1080 | 16:9 | Warehouse racking and pallets |
| 5 | `cargo-and-freight/parcel-handover.jpg` | 1920×1080 | 16:9 | Parcel handover, signed for |

### Integrated Farms — `/integrated-farms`

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `integrated-farms/fish-ponds.jpg` | 1920×1080 | 16:9 | Fish ponds under netting |
| 2 | `integrated-farms/livestock.jpg` | 1920×1080 | 16:9 | Cattle in a shaded pen |
| 3 | `integrated-farms/greenhouse.jpg` | 1920×1080 | 16:9 | Greenhouse beds in rows |
| 4 | `integrated-farms/solar-farm.jpg` | 1920×1080 | 16:9 | Solar array beside a farm building |
| 5 | `integrated-farms/farm-aerial.jpg` | 1920×1080 | 16:9 | Farm layout from the air |

### Engineering — `/engineering`

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `engineering/construction-site.jpg` | 1920×1080 | 16:9 | Construction site at work |
| 2 | `engineering/civil-works.jpg` | 1920×1080 | 16:9 | Civil works, drainage and road |
| 3 | `engineering/facility-management.jpg` | 1920×1080 | 16:9 | Facility maintenance on site |
| 4 | `engineering/power-infrastructure.jpg` | 1920×1080 | 16:9 | Power distribution infrastructure |
| 5 | `engineering/building-retrofit.jpg` | 1920×1080 | 16:9 | Building retrofit in progress |

### Contact — `/contact`

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `contact/lagos-island.jpg` | 1920×1080 | 16:9 | Lagos Island, Simpson Street |
| 2 | `contact/abuja-skyline.jpg` | 1920×1080 | 16:9 | Abuja skyline |
| 3 | `contact/service-desk.jpg` | 1920×1080 | 16:9 | Customer service desk |
| 4 | `contact/phones-whatsapp.jpg` | 1920×1080 | 16:9 | Phone and WhatsApp on a desk |

### Brand and utility

| File | Size | Ratio | Subject | Notes |
|---|---|---|---|---|
| `logo.png` | 320×320 | 1:1 | JCNL logo, transparent background | Optional. When present, the header shows it beside the wordmark. |
| `og/default.jpg` | 1200×630 | 1.91:1 | Wordmark on jungle green | Default social share card, used by `openGraph.images` and `twitter.images`. |
| `styleguide/sample.jpg` | 1920×1080 | 16:9 | Demo image for the placeholder | Dev only; may stay missing. |

## Conventions

- Folder per route: `public/images/<route-slug>/<name>.jpg`. The folder names
  match the URL segment, so `visa-and-tours/` is `/visa-and-tours`.
- JPEG or WebP, sRGB, quality ~80, 1920×1080 or larger, no text baked in.
- Aim for under 350 KB per hero after compression; the carousel preloads every
  slide on its page, not just the first.
- Alt text lives with the slide copy in `src/content/slides.ts`, not in the file.
  It describes what the picture shows and why it is on this page; never repeat
  the headline verbatim.
- Keep the filename stable. Renaming a file means editing the manifest, and the
  placeholder would silently fall back to a missing file until it is fixed.
- Placeholders are intentional, not an error state: a missing file is expected
  until photography is delivered, and the layout must look finished either way.

## Current state

None of the 40 hero files exist yet. Every hero renders the placeholder. This is
the brief-sanctioned fallback, not a broken build: the placeholder is generated
in code (page-accent gradient, lattice pattern, shot label) and carries a
`role="img"` label for assistive technology.
