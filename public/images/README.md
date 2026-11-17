# Image assets

Every image is referenced from a typed manifest in `src/content/images.ts`.
`<SmartImage>` reads the path; if the file is missing or fails to load it renders
a branded placeholder in the page accent, so the site never shows a broken
image and never shows a blank box.

To publish a real image, drop the file at the exact path below. No code change
is needed. The manifest is the single source of truth: the placeholder label,
the intrinsic size and this shot list all come from it.

## How the hero uses these files

All nine pages open with the same `<HeroCarousel>`. Each slide is full-bleed
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
| 5 | `business-services/power-and-energy.jpg` | 1920×1080 | 16:9 | Solar array and power infrastructure |

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

`fish-ponds.jpg` is also cropped to **4:3** in the story section, so keep the
ponds and netting inside the centre of the frame. The other four are hero only.

### Engineering — `/engineering`

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `engineering/construction-site.jpg` | 1920×1080 | 16:9 | Construction site at work |
| 2 | `engineering/civil-works.jpg` | 1920×1080 | 16:9 | Civil works, drainage and road |
| 3 | `engineering/facility-management.jpg` | 1920×1080 | 16:9 | Facility maintenance on site |
| 4 | `engineering/power-infrastructure.jpg` | 1920×1080 | 16:9 | Power distribution infrastructure |
| 5 | `engineering/building-retrofit.jpg` | 1920×1080 | 16:9 | Building retrofit in progress |

The six project records use their own 4:3 slot, `engineering/projects/`:

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `engineering/projects/project-01.jpg` | 1600×1200 | 4:3 | Project photograph |
| 2 | `engineering/projects/project-02.jpg` | 1600×1200 | 4:3 | Project photograph |
| 3 | `engineering/projects/project-03.jpg` | 1600×1200 | 4:3 | Project photograph |
| 4 | `engineering/projects/project-04.jpg` | 1600×1200 | 4:3 | Project photograph |
| 5 | `engineering/projects/project-05.jpg` | 1600×1200 | 4:3 | Project photograph |
| 6 | `engineering/projects/project-06.jpg` | 1600×1200 | 4:3 | Project photograph |

Only add a project photograph once the client has supplied the name, sector,
year and scope for that record. Until then the card is a marked placeholder.

### Real Estate — `/real-estate` and `/real-estate/[slug]`

Hero slides, 1920×1080:

| # | File | Size | Ratio | Subject |
|---|---|---|---|---|
| 1 | `real-estate/residential-exterior.jpg` | 1920×1080 | 16:9 | Residential estate exterior |
| 2 | `real-estate/land-aerial.jpg` | 1920×1080 | 16:9 | Aerial view of land and plots |
| 3 | `real-estate/modern-home.jpg` | 1920×1080 | 16:9 | Modern home exterior |
| 4 | `real-estate/commercial-building.jpg` | 1920×1080 | 16:9 | Commercial building exterior |
| 5 | `real-estate/living-space.jpg` | 1920×1080 | 16:9 | Interior living space |
| 6 | `real-estate/neighbourhood-street.jpg` | 1920×1080 | 16:9 | Neighbourhood street scene |

All six of these files are present. They arrived at 1280px wide (one portrait),
so they upscale on a large screen; re-export at 1920×1080.

Listing photographs, 1600×1067 (3:2), three per record, named after the record's
slug in `src/content/properties.ts`. The six sample slugs are listed here; a new
record adds `<slug>-1.jpg` and so on with no other change:

| Slug | Files | Used by |
|---|---|---|
| `residential-property` | `residential-property-1.jpg` … `-3.jpg` | card, gallery, lightbox |
| `commercial-plot` | `commercial-plot-1.jpg` … `-3.jpg` | card, gallery, lightbox |
| `estate-land` | `estate-land-1.jpg` … `-3.jpg` | card, gallery, lightbox |
| `terrace-house` | `terrace-house-1.jpg` … `-3.jpg` | card, gallery, lightbox |
| `mixed-use-building` | `mixed-use-building-1.jpg` … `-3.jpg` | card, gallery, lightbox |
| `residential-land` | `residential-land-1.jpg` … `-3.jpg` | card, gallery, lightbox |

Number 1 is the card image and the first frame in the gallery, so make it the
strongest exterior or establishing shot. Keep the subject inside the middle of
the frame: the card crops to 4:3, the gallery frame to 16:10 and the thumbnails
to 4:3. Do not photograph a building or plot the client has not listed; these
slots stay empty until a real record replaces a sample.

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
| `../logos/cream-logo-transparent.png` | 1989×791 | 2.51:1 | JCNL logo, cream, transparent | Header over hero, mobile menu, footer. Source: `white-logo.png` alpha. |
| `../logos/black-logo-transparent.png` | 1989×791 | 2.51:1 | JCNL logo, ink, transparent | Header once solid; light grounds. Source: `white-logo.png` alpha. |
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

Twelve of the 46 hero files exist. The six `/` slides in `home/` were supplied
by the client on 17 November 2026; they are served through `next/image` and
appear at every width. The six `/real-estate` hero slides arrived the same day
and are in use, so that carousel also shows photographs. Those files are 1280px
wide (four at 1280×853, `land-aerial.jpg` at 1280×719 and
`residential-exterior.jpg` at 1280×1707); re-export them at 1920×1080 before
launch. The remaining 34 hero files, the 18 real-estate listing frames, the
engineering project records, the `/visa-and-tours` gallery frames and
`styleguide/sample.jpg` are not there yet; those slots render the placeholder.
The logo files in `public/logos/` are present and are used by the header, mobile
menu and footer.

This is the brief-sanctioned fallback, not a broken build: the placeholder is
generated in code (page-accent gradient, lattice pattern, shot label) and
carries a `role="img"` label for assistive technology. A missing file is
expected until photography is delivered, and the layout must look finished
either way.

`og/default.jpg` exists at 1200×630 and is the social card for every page. The
favicon, the Apple touch icon and the manifest icons also exist; they were drawn
from the brand field and the wordmark, not from client artwork.

