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
`--accent-ink`, `--field`.

Utilities: `bg-surface`, `text-ink`, `text-ink-muted`, `border-line`,
`bg-accent`, `text-accent-text`, `bg-accent-soft`, `bg-field`, `fill-accent`.

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

- Reveals travel 22px, fire once, and are skipped entirely under
  `prefers-reduced-motion`.
- No animation may block reading: the page is legible before the transition ends.
- Magnetic buttons move at most 5px and only for `pointerType === "mouse"`.
- Hover styles are gated behind `hover-fine` (`hover: hover` + `pointer: fine`)
  so touch devices do not keep a stuck state.
- With JavaScript disabled, a `<noscript>` rule forces `[data-reveal]` visible.

---

## 6. Components

| Component | Path | Notes |
|---|---|---|
| `Button` | `components/ui/button.tsx` | primary / dark / ghost; sm, md, lg; renders `<button>`, `<Link>` or `<a>` |
| `Card` | `components/ui/card.tsx` | surface / raised / sand / ink / outline; optional hover lift |
| `Section` | `components/ui/section.tsx` | tone, spacing, top divider, patterned field |
| `SectionDivider` | `components/ui/section.tsx` | arch, dune, blade, wave |
| `Container` | `components/ui/container.tsx` | default, narrow, prose, full |
| `Eyebrow` / `Heading` / `Lead` | `components/ui/typography.tsx` | eyebrow tone follows section |
| `Reveal` | `components/ui/reveal.tsx` | once-only scroll reveal |
| `Parallax` | `components/ui/parallax.tsx` | ±distance scroll drift |
| `SmartImage` | `components/ui/smart-image.tsx` | `next/image` + branded placeholder fallback |
| `GeometricPattern` | `components/ui/geometric-pattern.tsx` | lattice, chevron, rays |
| `Header` | `components/layout/header.tsx` | transparent → blurred ivory at 24px scroll |
| `MobileMenu` | `components/layout/mobile-menu.tsx` | full-screen dialog, focus trap, Escape |
| `Footer` | `components/layout/footer.tsx` | tagline, nav, both offices, channels |
| `WhatsAppFab` | `components/layout/whatsapp-fab.tsx` | appears after 420px of scroll |
| `PageIntro` | `components/sections/page-intro.tsx` | dark opening band; hero carousel replaces it in phase 2 |

---

## 7. Content rules

- Brand facts only. No invented credentials, awards, clients, statistics or
  projects. If a page needs a fact nobody has supplied, say the page is in
  preparation and give a real way to make contact.
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
- `prefers-reduced-motion` removes reveals, parallax, magnetic pull and the
  page transition.
- Text must pass 4.5:1; 3:1 only for ≥24px or ≥19px bold.
