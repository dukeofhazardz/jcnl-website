# JCNL — JESRUDEB@CONNECT NIGERIA LIMITED

Website for JCNL, an indigenous Nigerian logistics and business services
company established in 2003, with offices in Lagos and Abuja.

Built with Next.js 16 (App Router, `cacheComponents`) + TypeScript strict +
Tailwind CSS v4, `motion` for animation, `lucide-react` for icons, Fraunces +
Hanken Grotesk via `next/font`.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm run start
npm run lint
npm run typecheck  # next typegen && tsc --noEmit
```

Node 20+ is required by Next 16.

On Windows PowerShell, `npm` resolves to `npm.ps1`, which the execution policy
blocks. Run the scripts as `cmd /c "npm.cmd run build"` instead.

## Routes

| Route | Content |
|---|---|
| `/` | Home — hero carousel, mission, five-service index, contact |
| `/about` | Live: the company record, mission, five service lines, both offices |
| `/visa-and-tours` | Live: Tour360, TRAVELCredit, VISA-Assist247, LESS 20.0, timeline, gallery |
| `/business-services` | Live: four service lines, seven sectors, funding support, eight instruments, two-path CTA |
| `/cargo-and-freight` | Live: platform, air and sea, scroll-drawn route, cargo desk, quote form |
| `/integrated-farms` | Live: story, 16-facility grid, values band, location, enquiry |
| `/engineering` | Live: four capabilities, three sectors, delivery approach, project records, CTA |
| `/contact` | Live: two offices, four direct channels, message form with `?service=` preselection, WhatsApp band, closing tagline |
| `/styleguide` | Dev only. Returns 404 in production. |

Every route opens with the same `<HeroCarousel>`: 4–6 slides, 6s autoplay, and
that page's accent. Every route also has its own `<h1>`, its own
`title`/`description`/canonical, and its own social card title, so a shared link
describes the page it points at.

`/about` is built from brief facts only: registered name, 2003, the two offices,
the sectors and the five service lines. No history, headcount, client, award or
credential was invented. Copy lives in `src/content/about.ts`.

`/visa-and-tours` is assembled from `src/components/sections/tours/`:
`tour360-section`, `travelcredit-section`, `visaassist-section`,
`less20-section`, `tour-timeline`, `tour-gallery` (with a lazily loaded,
focus-trapped lightbox) and `tour-enquiry`. All of its copy lives in
`src/content/tours.ts`.

`/integrated-farms` is assembled from `src/components/sections/farms/`:
`farm-story`, `farm-facilities` (the sixteen-item animated grid),
`farm-values` (the clay band), `farm-location` and `farm-enquiry`. Copy and the
facility list live in `src/content/farms.ts`. Both service pages close with the
shared `components/sections/enquiry-band.tsx`.

`/cargo-and-freight` is assembled from `src/components/sections/freight/`:
`freight-intro` (the platform and its three traits), `freight-modes` (air
against sea), `freight-route` (the four steps on a line that draws as you
scroll), `freight-contact` (the cargo desk) and `freight-quote`. Copy lives in
`src/content/freight.ts`.

`/engineering` is assembled from `src/components/sections/engineering/`:
`engineering-capabilities` (four service lines), `engineering-sectors` (the
three sectors as a numbered list), `engineering-approach` (consult, design,
build, maintain on the slate band), `engineering-portfolio` (six empty project
records) and `engineering-cta` (the amber closing band). Copy lives in
`src/content/engineering.ts`.

`/business-services` is assembled from `src/components/sections/business/`:
`business-intro` (the positioning and four service lines), `business-sectors`
(seven sectors as a ruled index), `business-funding` (the deep green band and
the HYP project types), `business-instruments` (eight documents and the
due-diligence note) and `business-cta` (the two enquiry paths). Copy lives in
`src/content/business-services.ts`.

**Service pages can carry a subject into `/contact`.** The Business
Services closing cards link to `/contact?service=…`, and the contact page uses
that value to preselect the service dropdown. `resolveContactService` in
`src/content/contact.ts` maps the navigation slugs, the short page keys and the
two Business Services intents onto the six form options, so an older link still
lands on the right row. The form sits inside its own `Suspense` boundary, which
keeps `/contact` static.

`/contact` is assembled from `src/app/contact/page.tsx` (offices, channels, the
WhatsApp band and the tagline) and
`src/components/sections/contact/contact-form.tsx` (the form, validation and its
idle, submitting, success and error states). Copy lives in
`src/content/contact.ts`; addresses, numbers, emails and Maps links come from
`src/config/site.ts`.

**Engineering is built from verified facts only.** The client supplied four
service lines and three sectors. Every other detail a buyer would expect, such
as project names, dates, photographs, certifications, equipment or headcount,
is rendered as a visible `[CLIENT TO PROVIDE]` marker through
`components/ui/client-todo.tsx`. The full list of outstanding items is in
`CLIENT_TODO.md`; remove a marker only when the fact is supplied.

Both forms post to `src/app/api/contact/route.ts`. **That route is a stub:** it
validates the payload, refuses bad JSON, invalid fields and oversized values,
then returns `{ ok: true }`. The contact form sends `form: "contact"` with its
five fields; the cargo quote omits `form` and keeps its six-field contract. No
email is sent and nothing is stored. To connect a provider, replace the marked
block in `handleContact` and read `CONTACT_EMAIL_API_KEY`, `CONTACT_EMAIL_FROM`
and `CONTACT_EMAIL_TO`, keeping the `{ ok: true }` response so the form does not
change. The same details can always be sent by hand from the WhatsApp button,
which prefills the message from whatever is in the form.

## Structure

```
src/
  app/                 routes, layout, sitemap, robots, manifest, icons, 404
  components/
    carousel/          hero-carousel
    layout/            header, mobile menu, footer, WhatsApp FAB
    sections/          accent scope, enquiry band, about/*, tours/*, farms/*,
                       freight/*, engineering/*, business/*, contact/*
    ui/                button, card, section, container, typography, reveal,
                       parallax, smart image, geometric pattern, client todo
  config/site.ts       single source of truth: brand facts, nav, contact
  content/             slides, page copy for every route, typed image manifests
  lib/                 cn, motion tokens, metadata, structured data, media and
                       visibility hooks, brand asset probe
```

Server components by default. `"use client"` is limited to the header, mobile
menu, WhatsApp FAB, button (magnetic pull), reveals, parallax, the carousel, the
timeline, the gallery, the two forms and `SmartImage`.

## Rendering and performance

- Every public route is static. There is no `loading.tsx`: with
  `cacheComponents` it made each page stream a placeholder shell first, which
  shifted the footer by thousands of pixels, delayed LCP and left a no-JS
  visitor on "Loading page" forever. The full page now arrives in the first HTML
  response.
- There is no route-transition wrapper. A full-page opacity animation suppresses
  LCP candidates in Chrome and cost more than the fade was worth. The hero `h1`
  is the LCP element.
- The hero renders all slides stacked at opacity 0, so the next image decodes
  before it is needed. Only the first slide is `priority`; the rest lazy-load.
  Images go through `next/image` with `sizes` matched to the frame.
- The gallery lightbox and its larger images are imported dynamically, so they
  are not in the first bundle for someone who never opens them.
- Fonts are self-hosted by `next/font` with `display: "swap"` and `size-adjust`
  fallbacks, and only the two variable families are loaded.
- Every image sits in a fixed aspect box, so no image load can move the layout.
  Cumulative layout shift is 0 on every route.
- Motion is limited to `transform` and `opacity`, and every animation is off
  under `prefers-reduced-motion`.

Measured with Lighthouse against `next start`, mobile preset: Performance 65–68,
Accessibility 100, SEO 100, CLS 0, FCP 1.2–1.4s. Performance on this machine is
noisy (identical builds scored 24–68, TBT 850ms–9.3s depending on background
load), so treat the number as indicative and re-measure on the target host.
Accessibility and SEO are stable.

## SEO and metadata

- `src/lib/metadata.ts` builds the per-page `title`, `description`, canonical,
  Open Graph and Twitter tags. Call `pageMetadata({ title, description, path })`
  in each route's `metadata` export. Omit `title` only on the home page, which
  uses the site default.
- `src/app/sitemap.ts` lists the eight public routes; `src/app/robots.ts` allows
  everything and points at the sitemap.
- `src/lib/structured-data.ts` emits one `Organization` JSON-LD block from
  `src/config/site.ts`: registered name, acronym, URL, slogan, founding year,
  description, both postal addresses, both phone numbers, email and social
  profile.
- `src/app/not-found.tsx` is the 404, marked `noindex`.
- Icons: `src/app/favicon.ico`, `src/app/apple-icon.png` and
  `src/app/manifest.ts` (with `/icons/icon-192.png` and `/icons/icon-512.png`).

## Assets

### Logo

The real logo is used in the header, mobile menu and footer. The two colourways
and their intrinsic dimensions live in `src/config/site.ts` under `logo`:

| Variant | File | Ground |
|---|---|---|
| Cream | `public/logos/cream-logo-transparent.png` | dark or photographic |
| Black | `public/logos/black-logo-transparent.png` | ivory / light |

`src/components/ui/Logo.tsx` wraps the image in a link home. The header stacks
both colourways and cross-fades on opacity as the header turns solid, so the
artwork and layout never jump. Replace the paths in `site.ts` to swap files.

`public/logos/cream-logo.png` and `black-logo.png` are the client's originals.
Both arrived flattened onto a checkerboard with no alpha channel. The
`*-transparent.png` files were derived from the alpha of `white-logo.png`; the
originals are kept untouched.

### Photography

Every image is referenced from the typed manifest in `src/content/images.ts`.
`<SmartImage>` reads the path; if the file is missing or fails to load it renders
a branded placeholder in the page accent, so the site never shows a broken image
and never shows a blank box. To publish a real photo, drop the file at the exact
path in the manifest and rebuild. The shot list, dimensions and framing rules are
in `public/images/README.md`; attribution goes in `public/images/CREDITS.md`.

### Social card and icons

| File | Size | Used by |
|---|---|---|
| `public/images/og/default.jpg` | 1200×630 | every page's Open Graph and Twitter card |
| `src/app/favicon.ico` | 16/32/48 | browser tab |
| `src/app/apple-icon.png` | 180×180 | iOS home screen |
| `public/icons/icon-192.png`, `icon-512.png` | 192, 512 | web app manifest |

The icon PNGs are generated from the brand field and the `JCNL` wordmark, and the
social card is the brand field with the name and descriptor. Replace any of them
with artwork from the client at the same path and size; nothing else needs to
change. If the client supplies a square logo, regenerate all four from it so the
tab, the home-screen icon and the manifest stay consistent.

## Editing content

- **Contact details, nav, socials:** `src/config/site.ts`. Nothing else should
  contain a phone number, email or address.
- **Hero slides:** `src/content/slides.ts`. One entry per slide: `id`, `image`,
  `alt`, `headline`, `sub`, `cta`. Page-level framing (label, eyebrow, accent)
  is in `src/content/page-copy.ts`.
- **About copy:** `src/content/about.ts`. The story, mission, five service lines,
  office framing and the closing band. Offices themselves come from
  `src/config/site.ts`.
- **Visa & Tours copy:** `src/content/tours.ts`. Four products, the 14 LESS 20.0
  services, the four Tour360 steps, the gallery entries and the anchor list.
- **Integrated Farms copy:** `src/content/farms.ts`. The farm record, the sixteen
  facilities in the client's order and the three values.
- **Cargo & Freight copy:** `src/content/freight.ts`. The platform paragraph and
  traits, the two modes, the four route steps, the cargo desk and the quote form
  states. The form's own labels and validation messages sit in
  `components/sections/freight/freight-quote.tsx`, next to the fields they
  describe.
- **Engineering copy:** `src/content/engineering.ts`. The four capabilities,
  three sectors, four approach steps, the portfolio framing and the closing CTA.
  Add real project records in `src/content/images.ts` and swap the literal
  marker in `components/sections/engineering/engineering-portfolio.tsx` for the
  supplied name. Do not add a claim that is not in `CLIENT_TODO.md` as answered.
- **Business Services copy:** `src/content/business-services.ts`. The four
  service lines, seven sectors, funding paragraph, seven HYP project types, eight
  instruments, the exact due-diligence note and the two enquiry intents. The
  instruments are listed by name and family only; do not add a rate, return or
  eligibility claim. `businessIntents` is shared by the closing cards and the
  hero; the contact page maps each `value` onto the service dropdown, so edit a
  label or `value` there once.
- **Contact page copy:** `src/content/contact.ts`. The office and channel
  framing, the six service options and their aliases, the form labels, notes and
  validation messages, the WhatsApp band and the closing tagline. Addresses and
  numbers stay in `src/config/site.ts`.
- **Images:** add the file under `public/images/...`, then point its manifest
  entry in `src/content/images.ts` at the path. `<SmartImage>` shows a branded
  placeholder until the file exists, so a missing image is never a broken one.
- **Colour, type, motion:** `src/app/globals.css` and `DESIGN.md`.

Nothing on a page is typed into JSX. If a sentence needs to change, it lives in
`src/content/`; if a number needs to change, it lives in `src/config/site.ts`.

## Accessibility

Semantic landmarks, skip link, visible focus, keyboard-operable menu with focus
trap, alt text on every meaningful image, WCAG AA contrast (measured, see
`DESIGN.md`), and full support for `prefers-reduced-motion`. Without JavaScript,
reveal-animated content is forced visible and the hero still renders.

The hero carousel is a named region with `aria-roledescription="carousel"`,
arrow-key and swipe navigation, a live region for slide changes, and no autoplay
under reduced motion. Forms announce validation and success through `aria-live`,
and focus moves to the success heading.

Known, accepted deviations: `<main>` and the two form success headings carry
`outline-none`. The first is the skip-link target and is never tabbed to; the
second is focused programmatically after a submit and the heading itself is not
an interactive control.

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://jesrudebconnect.org` | Canonical origin for metadata, sitemap, robots, JSON-LD |

**Open item:** the production domain has not been confirmed. Set
`NEXT_PUBLIC_SITE_URL` before launch.

## Deployment

Any Node host that supports Next 16 (Vercel is the path of least resistance).
`next build` prerenders every static route; `/sitemap.xml`, `/robots.txt` and
`/manifest.webmanifest` are generated from code.

Before the first deploy:

1. Set `NEXT_PUBLIC_SITE_URL` to the real domain.
2. Upload the client's photography and the logo (see `CLIENT_TODO.md`).
3. Point the contact API route at an email provider, or leave it returning
   `{ ok: true }` and rely on the WhatsApp and mailto channels.
4. Re-run Lighthouse on the deployed URL, not locally.

## Project documents

- `PROJECT_BRIEF.md` — the brief, verbatim.
- `SKILLS_MAP.md` — which installed skill covers which part of the brief.
- `DESIGN.md` — tokens, contrast measurements, component and motion rules.
- `CLIENT_TODO.md` — outstanding client input, page by page.
- `public/images/README.md` — image conventions and the current shot list.
- `public/images/CREDITS.md` — attribution for licensed assets.
