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
| `/` | Home — intro band, mission, service index, contact |
| `/about` | Stub — in preparation |
| `/visa-and-tours` | Stub — in preparation |
| `/business-services` | Stub — in preparation |
| `/cargo-and-freight` | Stub — in preparation |
| `/integrated-farms` | Stub — in preparation |
| `/engineering` | Stub — in preparation |
| `/contact` | Live: both offices and every published channel |
| `/styleguide` | Dev only. Returns 404 in production. |

## Structure

```
src/
  app/                 routes, layout, template, sitemap, robots, 404, loading
  components/
    layout/            header, mobile menu, footer, WhatsApp FAB, page transition
    sections/          page intro, stub notice, accent scope
    ui/                button, card, section, container, typography,
                       reveal, parallax, smart image, geometric pattern
  config/site.ts       single source of truth: brand facts, nav, contact
  content/             typed page copy and image manifests
  lib/                 cn, motion tokens, scroll hook, structured data
```

Server components by default. `"use client"` is limited to the header, mobile
menu, WhatsApp FAB, button (magnetic pull), reveals, parallax and the page
transition.

## Editing content

- **Contact details, nav, socials:** `src/config/site.ts`. Nothing else should
  contain a phone number, email or address.
- **Page headings:** `src/content/page-copy.ts`.
- **Images:** add the file under `public/images/...`, then point its manifest
  entry in `src/content/images.ts` at the path. `<SmartImage>` shows a branded
  placeholder until the file exists.
- **Colour, type, motion:** `src/app/globals.css` and `DESIGN.md`.

## Accessibility

Semantic landmarks, skip link, visible focus, keyboard-operable menu with focus
trap, alt text on every meaningful image, WCAG AA contrast (measured, see
`DESIGN.md`), and full support for `prefers-reduced-motion`. Without JavaScript,
reveal-animated content is forced visible.

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
