# Design system — JCNL

Direction: **EXOTIC.** Warm, lush and cinematic — a travel brand that also moves
cargo and builds things. Ivory paper, jungle ink, laterite and saffron; an
expressive serif doing the talking and a quiet humanist sans doing the reading.

Priority when rules conflict: **brand facts > accessibility > performance >
style advice.**

Tokens live in `src/app/globals.css`. Components consume them through Tailwind
utilities; nothing hard-codes a hex value.

---

## 1. Colour

### Core palette

| Token | Hex | Use |
|---|---|---|
| `ivory-50` | `#fbf7ee` | Page ground, light text on dark |
| `ivory-100` | `#f6efe1` | Secondary ground, cards |
| `ivory-200` | `#ede3d1` | Sunken panels |
| `sand-300` | `#dfd2bc` | Borders on ivory, large muted text |
| `ink-900` | `#15130f` | Body text, dark sections |
| `ink-700` | `#3a342b` | Long-form text |
| `ink-500` | `#6b6154` | Muted text (never on sand for body copy) |
| `jungle-950` | `#0a241c` | Dark sections, footer |
| `jungle-900` | `#0e2e23` | Secondary dark |
| `teal-900` | `#0b3b3b` | Tours field |
| `terracotta-600` | `#b0562f` | Warm accent, rules |
| `saffron-500` | `#d9a03c` | Primary action, default accent |
| `gold-400` | `#c9a227` | Business accent detail |
| `leaf-700` | `#3f6630` | Farms accent |
| `navy-900` | `#102e4a` | Freight accent |
| `slate-900` | `#1b2027` | Engineering field |
| `amber-500` | `#e0a21b` | Engineering accent |
| `cta-600` | `#0e7a44` | WhatsApp action (darkened for contrast) |

### Measure, don't assume

Contrast was computed, not eyeballed. Passing pairs (WCAG AA):

- ink on ivory — **17.35**
- ivory on jungle-950 — **15.32**
- ink on saffron-500 — **7.99**
- ink on saffron-300 — **11.76**
- ink on ivory-200 — **14.58**
- muted on ivory — **5.67**
- terracotta-600 on ivory — **4.66**
- leaf-700 on ivory — **6.23**
- navy-900 on ivory — **12.99**
- amber-500 on slate-900 — **7.29**
- ivory on cta-600 — **5.05** (WhatsApp button text)

Known constraint: `ink-500` on `sand-300` measures **4.07** — large text only.
On sand, use `ink-700` or `ink-900` for body copy.

Muted text on dark is set with opacity, so it was measured as a blend, not a
named token. `ivory-100` at 65% is the floor for small text: **5.49** on
`teal-900` and **6.74** on `jungle-950`. At 45% it falls to **3.93** and fails.
Icons are the only elements allowed below that, and only when `aria-hidden`.

White on WhatsApp brand green `#25D366` measures **1.98** and is not used. The
action carries ivory text on `cta-600`.

### Semantic tokens

Resolved at runtime, so a page can switch accent without regenerating utilities:

`--surface`, `--surface-raised`, `--surface-sunken`, `--line`, `--ink`,
`--ink-muted`, `--accent`, `--accent-strong`, `--accent-text`, `--accent-soft`,
`--accent-ink`, `--accent-bright`, `--field`.

`--accent-bright` is the variant of the accent that survives on a dark
photographic field (progress bar, active dot, placeholder marker). It is not used
for text on light grounds. On `/business-services` it resolves to gold-400, which
is only legible on that page's deep green field.

Utilities: `bg-surface`, `text-ink`, `text-ink-muted`, `border-line`,
`bg-accent`, `text-accent-text`, `bg-accent-soft`, `bg-accent-bright`, `bg-field`,
`fill-accent`.

### Accent scopes

Set `data-accent` on a page wrapper (`<AccentScope accent="tours">`).

| Scope | Accent | Field | Route |
|---|---|---|---|
| `tours` | saffron-500 | teal-900 | `/`, `/visa-and-tours` |
| `farms` | leaf-700 | `#2e4a24` | `/integrated-farms` |
| `freight` | navy-900 | `#0a2237` | `/cargo-and-freight` |
| `engineering` | amber-500 | slate-900 | `/engineering` |
| `business` | `#123c2e` | jungle-950 | `/business-services` |
| `brand` | saffron-500 | jungle-950 | `/about`, `/contact`, 404 |

Every accent defines `--accent-text` (for small text on ivory) separately from
`--accent` (for fills), because a fill that works at 24px rarely works at 15px.

---

## 2. Typography

- **Display:** Fraunces (variable). Headlines, numerals, the wordmark. Weight
  400; the serif is loud enough without bold.
- **Sans:** Hanken Grotesk (variable). Body, labels, controls.

| Token | Range | Use |
|---|---|---|
| `display-1` | 3.1 → 8.25rem | Hero headlines only |
| `display-2` | 2.5 → 5rem | Page titles |
| `display-3` | 2 → 3.5rem | Section headlines, pull quotes |
| `title` | 1.5 → 2rem | Card and list headings |
| `lead` | 1.125 → 1.375rem | Intro paragraph |
| `body` | 1.0625rem / 1.62 | Reading copy |
| `small` | 0.9375rem | Secondary copy, contacts |
| `micro` | 0.6875rem, 0.16em tracking, uppercase | Eyebrows, labels |

Rules:

- Display sizes use negative tracking (`-0.026em` to `-0.038em`) and line-height
  below 1.1. Never add tracking to a serif headline.
- Measure caps at ~46–52ch for body copy, ~17–22ch for display headlines.
- `text-wrap: balance` on headings, `pretty` on paragraphs.
- Numerals in lists use `tabular-nums`.

---

## 3. Space and layout

- Page max width: **82.5rem** (`--page-max`), gutter `clamp(1.25rem, 4vw, 2.75rem)`.
- Section rhythm: `py-section` = `clamp(4.5rem, 9vw, 8rem)`; compact variant
  `py-section-sm`.
- Header height: 4.5rem, 5.5rem from 1024px, exposed as `--header-h` so anchors
  and hero padding can subtract it.
- Breakpoints follow Tailwind defaults; the header switches to the inline nav at
  `xl` (1280px) because eight labels will not sit comfortably before that.

---

## 4. Shape, elevation, texture

- Radii stay small: 2px controls, 6px cards, 12px for image frames. This is an
  editorial brand, not a soft app.
- Shadows are warm and low: `shadow-soft` for hover, `shadow-lift` for cards,
  `shadow-float` for the WhatsApp button and tooltips. Never on flat panels.
- Grain: one fixed SVG noise layer at 4.5% opacity, multiply. Global, once.
- Dividers: `arch`, `dune`, `blade`, `wave` — SVG top edges drawn in the
  incoming section's colour. Use at most one per boundary; a page with a divider
  on every section reads as a template.
- Pattern: interlocking-diamond lattice at 7% opacity in dark fields and inside
  image placeholders. Decorative only (`aria-hidden`).

---

## 5. Motion

Implemented with `motion` (`motion/react`), transform and opacity only.

| Role | Duration | Curve |
|---|---|---|
| Press | 120ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Hover / colour / underline | 200–300ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Route fade | 340ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Scroll reveal | 620ms | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Mobile menu stagger | 400ms, 35ms per item | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Carousel slide | 720ms | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Carousel copy stagger | 600ms, 75ms per item | `cubic-bezier(0.23, 1, 0.32, 1)` |
| Carousel Ken-Burns | 9s, linear-ish, 1.02 → 1.06 | `cubic-bezier(0.16, 1, 0.3, 1)` |
| Carousel progress | 6s | linear |

- Reveals travel 22px, fire once.
- No animation may block reading: the page is legible before the transition ends.
- Magnetic buttons move at most 5px and only for `pointerType === "mouse"`.
- Hover styles are gated behind `hover-fine` (`hover: hover` + `pointer: fine`)
  so touch devices do not keep a stuck state.
- With JavaScript disabled, a `<noscript>` rule forces `[data-reveal]` visible.

### Reduced motion

The server cannot read a media query, so any component that branches its markup
on `useReducedMotion()` produces different server and client trees and breaks
hydration. Two rules follow:

1. **Preference in CSS where markup would change.** The route fade
   (`.page-enter`) lives in `@media (prefers-reduced-motion: no-preference)`, and
   reduced motion forces `[data-reveal]` visible with `!important` instead of
   skipping the animation in JS. Both look identical on the server and client.
2. **`usePrefersReducedMotion()` where only props change.** It is a
   `useSyncExternalStore` hook with a server snapshot of `false`, so the first
   client render matches the server and the real value arrives immediately after
   hydration. Use it instead of Motion's `useReducedMotion` anywhere the value
   reaches a style or a prop (`Button`, `Parallax`, `MobileMenu`, `WhatsAppFab`,
   `HeroCarousel`).

The carousel additionally stops its timer, hides its progress bar and hides the
play/pause control under reduced motion; manual navigation stays available.

---

## 6. Components

| Component | Path | Notes |
|---|---|---|
| `Button` | `components/ui/button.tsx` | primary / dark / slate / ghost; sm, md, lg; renders `<button>`, `<Link>` or `<a>` |
| `Card` | `components/ui/card.tsx` | surface / raised / sand / ink / outline; optional hover lift |
| `Section` | `components/ui/section.tsx` | tone, spacing, top divider, patterned field |
| `SectionDivider` | `components/ui/section.tsx` | arch, dune, blade, wave |
| `Container` | `components/ui/container.tsx` | default, narrow, prose, full |
| `Eyebrow` / `Heading` / `Lead` | `components/ui/typography.tsx` | eyebrow tones: accent, ink, muted, light (dim on dark), ivory (full on mid-dark) |
| `Reveal` | `components/ui/reveal.tsx` | once-only scroll reveal |
| `Parallax` | `components/ui/parallax.tsx` | ±distance scroll drift |
| `SmartImage` | `components/ui/smart-image.tsx` | `next/image` + branded placeholder fallback |
| `GeometricPattern` | `components/ui/geometric-pattern.tsx` | lattice, chevron, rays |
| `Header` | `components/layout/header.tsx` | transparent → blurred ivory at 24px scroll |
| `MobileMenu` | `components/layout/mobile-menu.tsx` | full-screen dialog, focus trap, Escape |
| `Footer` | `components/layout/footer.tsx` | tagline, nav, both offices, channels |
| `WhatsAppFab` | `components/layout/whatsapp-fab.tsx` | appears after 420px of scroll |
| `PageTransition` | `components/layout/page-transition.tsx` | CSS route fade, 340ms |
| `HeroCarousel` | `components/carousel/hero-carousel.tsx` | full-bleed hero, 4–6 slides per page |
| `Tour360Section` … `TourEnquiry` | `components/sections/tours/*` | the `/visa-and-tours` body: four products, timeline, gallery, closing band |
| `EnquiryBand` | `components/sections/enquiry-band.tsx` | shared closing band; `textTone` ink or ivory |
| `FarmStory` … `FarmEnquiry` | `components/sections/farms/*` | the `/integrated-farms` body: story, facilities, clay values, location, closing band |
| `BusinessIntro` … `BusinessCta` | `components/sections/business/*` | the `/business-services` body: service lines, sectors, funding, instruments, two-path CTA |
| `ServiceIntent` | `components/sections/contact/service-intent.tsx` | reads `?service=` on `/contact` and carries the subject into WhatsApp and email |

### Hero carousel

`<HeroCarousel slides={heroSlides[page]} eyebrow={…} label={…} accent={…} />`.
The slides come from `src/content/slides.ts`, the image paths resolve through
`src/content/images.ts`, and both are typed. Adding a slide is a data change.

- Frame: `min-h-[88svh]`, full width, copy set at the bottom-left over
  `.scrim-hero`. Header padding is subtracted with `--header-h`, so the headline
  never sits under the fixed header.
- Media: all slides stay mounted and stacked, opacity 0 when inactive, so the
  next image is already decoded. Only the first slide is `priority`.
- Motion: the incoming slide travels 6% and fades in over 720ms; the copy block
  remounts and staggers 75ms per line. Ken-Burns runs inside the slide layer.
- Controls: previous, next, one dot per slide (`aria-current="true"` on the
  active one), counter, and a pause/play button. A 3px progress bar shows time to
  the next slide and is decorative (`aria-hidden`).
- Clock: 6s. The CSS progress animation and the JS timeout are paused and
  resumed together, so the bar never drifts. Hover, focus and a hidden tab pause
  it; an explicit play/pause choice overrides hover so the button cannot trap the
  visitor in a paused state.
- Input: pointer swipe (48px horizontal threshold, ignored when the gesture
  starts on a control), arrow keys, and buttons. A swipe does not activate a link
  it ends on.
- Accessibility: `role="region"`, `aria-roledescription="carousel"`, a named
  region, slides labelled "n of N", all but the active slide `aria-hidden`, and a
  live region that is `polite` while paused and `off` while autoplaying. A slide
  change that destroys the focused CTA moves focus to the new slide's CTA.
- The hero carries the page's only `h1`; its text is prefixed with a screen
  reader-only page label so the heading still says which page it belongs to.

### Placeholder modes

`<SmartImage>` has two placeholder temperaments. `variant="default"` is the
shot-list card: framing marks, label line and the subject in display type.
`variant="background"` is the quiet one used behind the hero copy and the gallery
captions: a single small `role · subject · dimensions` label in the top-right, no
framing marks, and the accent gradient moved to the wrapper so a slow or missing
file never shows an empty box.

`fill` means the parent owns the frame. The wrapper gets `h-full` rather than
`absolute inset-0`, so it cannot escape a parent that is not a containing block;
the parent must have a height, which in practice is an aspect-ratio box.

The branded field is painted from the first frame and stays until the file
paints, not only after a failure, so a slow image is never a bare gradient. When
the file does paint, the field is removed; while it is loading it is
`aria-hidden` and the image's `alt` carries the meaning. A failed file drops the
`<img>` entirely, so the placeholder label is not announced twice.

### Visa & Tours composition

`/visa-and-tours` alternates tone to give each product its own register:
Tour360 (sand, image left of the argument), TRAVELCredit (jungle, the 76,000+
figure set large), VISA-Assist247 (ivory, two check lists and a protection
card), LESS 20.0 (sand, a 14-item icon grid). The Tour360 timeline is a
scroll-linked rail: the connector is a `scaleY` transform on the compositor, the
steps fade and rise once, and the rail sits outside the `<ol>` because a list may
only contain list items. The gallery pairs a 7/5 and a square frame to share one
height, then a full-width 21/9. The lightbox is a `document.body` portal (the
section's `isolation: isolate` would otherwise clip it), traps focus, returns
focus to the thumbnail that opened it, and is loaded on demand.

---

### Integrated Farms composition

`/integrated-farms` runs leaf green with one fixed clay band, so the accent does
not carry the whole page alone. Order: story (ivory, `arch`), sixteen facilities
(sand, `dune`, the number 16 set large), values (clay, `blade`, three words on
hairline rules), location (ivory, map card with a search link) and the shared
enquiry band on leaf.

`Section` gained a `clay` tone for the values band only. `bg-clay-500` carries
`text-ivory-50` at **4.65:1**; clay on ivory is **4.65:1** for icons and rules.
Clay never carries small ink text (**3.73:1**) and never appears as body copy on
sand (**4.34:1**).

The facility grid is one `motion.li` per facility, revealed with a 40ms stagger
capped at 480ms. On a phone each row is horizontal (icon, label, number); from
`sm` it stacks, and from `lg` it is four columns. The icon square fills clay on
hover, pointer-only.

The location card uses the diamond lattice as a map field rather than an
embedded map: no API key, no third-party script, and the address stays as text.
The pin is clay and the button opens a Google Maps search in a new tab.

---

### Cargo & Freight composition

`/cargo-and-freight` carries the `freight` accent: navy-900 ink, sky-300 as the
bright note, `accent-soft` for tinted surfaces. Order: platform (ivory, `arch`,
traits on a hairline list), air against sea (sand, `dune`), the route band
(navy, the only accent-filled section), the cargo desk (ivory, compact) and the
quote form (sand).

The two mode panels are the page's one contrast pair: Air is `ivory-50` on
`ink-900/15` and Sea is `navy-900` carrying `ivory-50`. Body copy on navy is
**12.14:1** and the sky rule and label on navy is **8.23:1**. Both panels push
their footer tag to the same baseline with `mt-auto`, so the hairline rules line
up however the copy wraps.

The route line is a single SVG path across 75% of the container, drawn by
`pathLength` from scroll progress between `start 85%` and `end 60%` of the
wrapper. `motion` writes `pathLength` as the `stroke-dasharray` attribute, so an
assertion has to read the attribute, not `style`. Under reduced motion the
component renders a plain path with no dash at all. On a phone the same four
stations run down a vertical rail: one `w-px` segment per station, `group-last`
on the final item so the line stops at the last dot.

The quote form validates in the browser, posts JSON to `/api/contact`, and shows
four states: idle, submitting (fields disabled, button reads "Sending"), success
(confirmation card with a WhatsApp hand-off) and error (a `role="alert"` note
above the buttons). Errors are `text-terracotta-600`, which is **4.66:1** on
`ivory-50`; it is never placed on sand (**4.35:1**). The success heading takes
focus, so a keyboard user lands on the confirmation instead of losing the
cursor.

---

### Engineering composition

`/engineering` carries the `engineering` accent: amber-500 as the bright note,
`accent-text` (#7a5606) for amber type on light grounds, and slate-900 as the
page's ink. Order: capabilities (ivory, `arch`, four cards on a hairline grid),
sectors (sand, `dune`, the three names set large), delivery approach (slate,
`blade`, four numbered columns) and project records (ivory), then the amber CTA
band (`blade`).

Amber-500 is a ground and a numeral, never small text on ivory (**2.10:1**).
On slate it is **7.29:1**, so the approach numerals take `var(--accent)` and the
step copy takes `ivory-100` (**14.31:1**). The CTA band is `accent` tone, where
`accent-ink` resolves to ink-900: **8.26:1**. The slate button variant carries
`ivory-50` on slate (**15.31:1**); the ghost button inherits ink-900.

`Section` gained a fixed `slate` tone (`bg-slate-900`, `fill-slate-900`) and
`Button` gained a `slate` variant, both following the `clay` precedent. The
slate band exists because this page's accent is a colour rather than a ground;
without it the dark note would be amber and the section would shout.

The page is built from verified facts only: four service lines and three
sectors. Everything else a buyer expects is a visible `[CLIENT TO PROVIDE]`
marker from `components/ui/client-todo.tsx`, a dashed pill with the literal
bracketed text so it survives print and screen readers. The portfolio is six
empty records: the card, the 4:3 frame and the placeholder are built, and the
heading carries the slot number and the literal marker. No project name, year
or client is implied. The outstanding items are itemised in `CLIENT_TODO.md`.

Each capability card is a `Reveal` inside its list item, staggered by 50ms and
capped at 200ms. The sectors list reveals each row at 60ms. The approach keeps
its numerals `aria-hidden` because the `ol` already carries the order.

---

### Business Services composition

`/business-services` carries the `business` accent: deep green `#123c2e` as the
ground and the accent text, gold-400 as the bright note, `accent-soft` (#e3e9dc)
for tinted surfaces. Order: positioning and the four service lines (ivory,
`arch`), seven sectors (sand, `dune`), funding support (deep green, `blade`),
eight instruments (ivory) and the two enquiry paths (sand, `wave`).

Measured pairs:

- gold-400 on deep green — **5.07** (funding eyebrow, numerals, rules)
- ivory-50 on deep green — **11.48**
- ivory-100 on deep green — **10.72**
- deep green on ivory-50 — **11.48**
- deep green on accent-soft — **9.91**
- gold-400 on ivory-50 — **2.26**, so gold is never text on ivory and never a
  meaningful UI boundary there. On light grounds the accent-text deep green does
  that work.

The funding band is the page's one dark section and the only place gold appears
as type. `--accent-bright` for this scope was changed from a pale green to
gold-400, which is where the carousel progress bar, the active dot and the
placeholder marker pick it up. Gold-400 is 6.77 on jungle-950, so the hero
placeholder stays legible.

The four service lines and the eight instruments are ruled indexes rather than
cards: a number, a name, one line. The funding list is split into two `<ol>`
elements (four and three) so each column rules itself and a wrapped label cannot
knock the opposite column's hairlines out of step. Visible numbers are
`aria-hidden`; the `ol` carries the order.

The closing section is two cards with different grounds: deep green carrying
`accent-ink` (ivory) and ivory-50 carrying ink. Each card's link text is the
client's exact label, and the card is stretched with `after:absolute` so there is
one link, one accessible name and a full-card target. The gold hairline appears
only on the deep green card.

The two paths append `?service=` to `/contact` and land on `#channels`. The
contact page reads the value in `service-intent.tsx` inside a `Suspense`
boundary, so the route stays static and the subject only appears when the
parameter matches `businessIntents`. The component writes the subject into the
WhatsApp message and the `mailto:` subject; it never echoes arbitrary input.

---

## 7. Content rules

- Brand facts only. No invented credentials, awards, clients, statistics or
  projects. If a page needs a fact nobody has supplied, either say the page is in
  preparation or mark the gap `[CLIENT TO PROVIDE]`, list it in `CLIENT_TODO.md`,
  and give a real way to make contact. Never fill the gap with an estimate.
- Navigation labels are service names: Home, About, Visa & Tours, Business
  Services, Cargo & Freight, Integrated Farms, Engineering, Contact. Never repeat
  "JCNL" or "Jesrudeb" in a link label.
- Contact data has one home: `src/config/site.ts`. Never type a phone number into
  JSX.
- Voice: plain, specific, unhurried. Short sentences. No "unlock", "seamless",
  "world-class solutions" or rhetorical triads.

---

## 8. Accessibility baseline

- Semantic landmarks: one `<header>`, one `<main id="main">`, one `<footer>`.
- Skip link to `#main` as the first focusable element.
- All controls reachable and operable by keyboard; the mobile menu traps focus
  and restores it on close.
- Focus ring: 2px `currentColor` with 3px offset, visible on every interactive
  element.
- Decorative graphics `aria-hidden`; every meaningful image has alt text.
- External links announce "(opens in a new tab)".
- The hero carousel is keyboard operable (arrow keys), swipeable on touch, and
  announces slide changes through a live region. Autoplay is off under reduced
  motion, and its own controls can stop it in one click.
- `prefers-reduced-motion` removes reveals, parallax, magnetic pull, the page
  transition, the carousel autoplay, Ken-Burns and the progress bar.
- Text must pass 4.5:1; 3:1 only for ≥24px or ≥19px bold.
