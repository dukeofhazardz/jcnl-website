# JCNL — JESRUDEB@CONNECT NIGERIA LIMITED

Website for JCNL, an indigenous Nigerian logistics and business services
company established in 2003, with offices in Lagos and Abuja.

Built with Next.js (App Router) + TypeScript strict + Tailwind CSS v4, `motion`
for animation, `lucide-react` for icons, Fraunces + Hanken Grotesk via
`next/font`.

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

## Routes

| Route | Status |
|---|---|
| `/` | Home — hero carousel, mission, service index, contact |
| `/about` | Hero carousel + in-preparation notice |
| `/visa-and-tours` | Live: Tour360, TRAVELCredit, VISA-Assist247, LESS 20.0, timeline, gallery |
| `/business-services` | Hero carousel + in-preparation notice |
| `/cargo-and-freight` | Live: platform, air and sea, scroll-drawn route, cargo desk, quote form |
| `/integrated-farms` | Live: story, 16-facility grid, values band, location, enquiry |
| `/engineering` | Live: four capabilities, three sectors, delivery approach, project records, CTA |
| `/contact` | Live: both offices and every published channel |
| `/styleguide` | Dev only. Returns 404 in production. |

Every route opens with the same `<HeroCarousel>`: 4–6 slides, 6s autoplay, and
that page's accent. `/about` and `/business-services` land in later phases and
show an honest notice and a way to reach a person until then.

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

**Engineering is built from verified facts only.** The client supplied four
service lines and three sectors. Every other detail a buyer would expect, such
as project names, dates, photographs, certifications, equipment or headcount,
is rendered as a visible `[CLIENT TO PROVIDE]` marker through
`components/ui/client-todo.tsx`. The full list of outstanding items is in
`CLIENT_TODO.md`; remove a marker only when the fact is supplied.

The quote form posts to `src/app/api/contact/route.ts`. **That route is a stub:**
it validates the six fields, refuses bad JSON, an unknown mode and oversized
values, then returns `{ ok: true }` and logs nothing but the mode. No email is
sent, and nothing is stored. To connect a provider, replace the marked block in
the `POST` handler and keep the `{ ok: true }` response so the form does not
change. The same details can always be sent by hand from the WhatsApp button,
which prefills the message from whatever is in the form.

## Structure

```
src/
  app/                 routes, layout, template, sitemap, robots, 404, loading
  components/
    carousel/          hero-carousel
    layout/            header, mobile menu, footer, WhatsApp FAB, page transition
    sections/          stub page, stub notice, accent scope, enquiry band,
                       tours/*, farms/*, freight/*, engineering/*
    ui/                button, card, section, container, typography,
                       reveal, parallax, smart image, geometric pattern
  config/site.ts       single source of truth: brand facts, nav, contact
  content/             slides, page metadata, tours copy, typed image manifests
  lib/                 cn, motion tokens, media/visibility hooks, structured data
```

Server components by default. `"use client"` is limited to the header, mobile
menu, WhatsApp FAB, button (magnetic pull), reveals, parallax, the carousel,
the timeline, the gallery and `SmartImage`.

## Editing content

- **Contact details, nav, socials:** `src/config/site.ts`. Nothing else should
  contain a phone number, email or address.
- **Hero slides:** `src/content/slides.ts`. One entry per slide: `id`, `image`,
  `alt`, `headline`, `sub`, `cta`. Page-level framing (label, eyebrow, accent)
  is in `src/content/page-copy.ts`.
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
- **Images:** add the file under `public/images/...`, then point its manifest
  entry in `src/content/images.ts` at the path. `<SmartImage>` shows a branded
  placeholder until the file exists, so a missing image is never a broken one.
- **Colour, type, motion:** `src/app/globals.css` and `DESIGN.md`.

## Accessibility

Semantic landmarks, skip link, visible focus, keyboard-operable menu with focus
trap, alt text on every meaningful image, WCAG AA contrast (measured, see
`DESIGN.md`), and full support for `prefers-reduced-motion`. Without JavaScript,
reveal-animated content is forced visible.

The hero carousel is a named region with `aria-roledescription="carousel"`,
arrow-key and swipe navigation, a live region for slide changes, and no autoplay
under reduced motion.

## Environment

| Variable | Default | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://jesrudebconnect.org` | Canonical origin for metadata, sitemap, robots, JSON-LD |

**Open item:** the production domain has not been confirmed. Set
`NEXT_PUBLIC_SITE_URL` before launch.

## Deployment

Any Node host that supports Next 16 (Vercel is the path of least resistance).
`next build` prerenders every static route; `/sitemap.xml` is generated on
request.

## Project documents

- `PROJECT_BRIEF.md` — the brief, verbatim.
- `SKILLS_MAP.md` — which installed skill covers which part of the brief.
- `DESIGN.md` — tokens, contrast measurements, component and motion rules.
- `public/images/README.md` — image conventions and the current shot list.
- `public/images/CREDITS.md` — attribution for licensed assets.
