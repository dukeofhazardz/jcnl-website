# SKILLS (already installed globally; do not reinstall)
Read the SKILL.md of each relevant skill before the phase that needs it.
- emilkowalski/skill: animation craft (easing, springs, durations,
  micro-interactions, hover/press feel). Apply to ALL motion.
- pbakaus/impeccable, leonxlnx/taste-skill,
  nextlevelbuilder/ui-ux-pro-max-skill, anthropics frontend-design:
  visual direction, typography, color, layout, anti-generic look.
- vercel-labs web-design-guidelines: audit at the end of phases.
- vercel-labs vercel-react-best-practices: Next.js/React performance and
  structure (server components by default, client only where
  interactive, image/font optimization, bundle size).
- addyosmani/agent-skills: engineering workflow, quality gates, testing,
  performance, accessibility checks.
- mattpocock code-review: review pass at the end of every phase.
- browser-use: drive a real browser to screenshot/verify pages at 375,
  768, 1280 and 1920px and to test carousel behavior.
- stop-slop + coreyhaines31 marketingskills: all copy (headlines, CTAs,
  meta descriptions). Remove filler, clichés, AI-sounding phrasing while
  keeping the facts below exact.
- mcp-builder: not needed. Ignore.
Priority if skills conflict: brand facts > accessibility > performance >
skill style advice.

# BRAND FACTS (use accurately; never invent credentials, awards, clients,
# statistics or projects)
- Full name: JESRUDEB@CONNECT NIGERIA LIMITED. Short form: JCNL.
  JCNL is an acronym for JESRUDEB@CONNECT NIGERIA LIMITED.
- Descriptor: A LOGISTICS & BUSINESS SERVICES COMPANY
- Tagline: EVOLVE – INNOVATE – RELAX
- Indigenous Nigerian company, established 2003, HQ Lagos. Serves
  private and public sectors in Energy, Transport, Construction, TMC and
  related business services: designs, operational trainings, travel
  logistics, hospitality, facility service management, civil engineering
  works and construction.
- Mission quote: "To PROVIDE our customers with World class and value
  added services that matches international standards globally."
- Social: @jesrudeb247 (X/Twitter)

# NAVIGATION (service name only; NEVER repeat "JCNL" or "Jesrudeb" in
# nav link labels)
Home | About | Visa & Tours | Business Services | Cargo & Freight |
Integrated Farms | Engineering | Contact
Routes: /, /about, /visa-and-tours, /business-services,
/cargo-and-freight, /integrated-farms, /engineering, /contact
("Visa & Tours" replaces the old "Products" page. "Engineering" is new.)

# CONTACT DETAILS (single source of truth: src/config/site.ts)
Offices:
- ABUJA: Suite 14, War College Estate Plaza, 3rd Avenue, Gwarinpa,
  Abuja, Nigeria.
- LAGOS: Block A4, Suite 16, Sura Shopping Complex, Simpson Street,
  Lagos Island, Lagos, Nigeria.
Channels:
- Call: +234-803-469-0000
- WhatsApp / Call: +234-816-082-6809 (wa.me click-to-chat link)
- Email: info.services@jesrudebconnect.org
- Cargo enquiries: info.jcnl@gmail.com, jesrudeb.connect@gmail.com
- X: @jesrudeb247
Flag in the final report that the client should confirm which emails and
numbers are current.

# TECH STACK & ARCHITECTURE
- Next.js latest stable, App Router, TypeScript strict, Tailwind CSS
  (configure theme tokens the way the installed Tailwind version
  recommends).
- Animation: the `motion` package for scroll-reveal, parallax,
  transitions, carousel. Server components by default; "use client"
  only for interactive pieces.
- Icons: lucide-react. Fonts: next/font (display serif + humanist sans).
- Images: next/image via a shared <SmartImage> wrapper.
- No heavy UI kit. Components in src/components/{ui,layout,sections,
  carousel}. Page content lives in typed data files under src/content/,
  never hard-coded in JSX.
- Forms: client-side validation (zod + react-hook-form acceptable),
  submission via route handler stub /api/contact structured to plug in
  an email provider later, plus WhatsApp hand-off.
- SEO: metadata API per page, Open Graph, sitemap.ts, robots.ts,
  Organization JSON-LD, custom not-found.tsx and loading states.

# DESIGN DIRECTION: "ONE BRAND, ON WHITE"
- Mood: clean, confident, corporate-Nigerian. White space does the work;
  sky blue carries structure, red punctuates, gold is a hairline. It must
  read as one company across every service line, not a template with
  per-page skins.
- One palette, no per-page accents. Every page shares the same tokens.
  Personality comes from photography, layout and copy, never from hue.
  - Ground: pure white (#ffffff), soft grey (#f6f9fb / #eef3f7) and a
    very light sky tint (#eff9fe / #d9f1fd).
  - Sky structure, sampled from the logo letter fill (#01BAFC): sky-50
    through sky-900. sky-500 is the logo blue and is used only for
    fills, shapes, icons, dividers and large graphics. Text, links and
    small UI use sky-700 (5.26:1 on white); buttons are sky-700 with
    white text.
  - Red accent, from the orbit ring (#FC0000 lit to #970000 shadow):
    primary CTA emphasis, badges, status and "new" marks, short
    underlines, active states, hover accents. Controlled, never dominant.
    red-600/700 are the text-safe steps on white.
  - Gold, sparing: thin rules, small ornaments, star/rating details,
    badge borders, card hairlines. Never a large fill. gold-600 is the
    text-safe step on white.
  - Ink: cool, blue-tinted near-black (#061826) for body and headings;
    mid grey (#556b78) for secondary text.
  - Dark bands are rare feature bands only, deep ink/navy from the sky
    scale, never green. The logo never sits on one.
- Logo: the supplied artwork, always on pure white. It carries a fine
  white glow, so any tint behind it reads as a pale box. Header, footer,
  mobile menu, styleguide, 404 and splash all give it white. The
  Christmas edition replaces it from 20 November to 14 January (Lagos
  time) via `seasonalLogos` in `src/config/site.ts`.
- Typography: expressive display serif for headlines, clean sans for
  body, large confident scale, generous whitespace.
- Texture: very low grain on white, soft cool gradients, curved SVG
  section dividers in sky tints and white, low-opacity sky/gold
  geometric pattern accents. Tasteful, never clip-art.
- Motion (apply emilkowalski skill): purposeful, fast-feeling,
  spring/ease-out curves, 150–300ms micro-interactions, 500–800ms
  reveals, staggered lists, transform/opacity only. Animated sky nav
  underline with a red active detail, magnetic-feel primary buttons,
  card hover lifts, image parallax, smooth anchor scrolling, polished
  route transitions. Respect prefers-reduced-motion everywhere.
- Accessibility: WCAG AA, semantic landmarks, visible focus,
  keyboard-operable everything, alt text on every image, skip link.
  Logo sky on white fails as text (2.23:1); sky-700 is the minimum for
  type. White on sky-500 also fails; that pairing is graphics only.
- Responsive: mobile-first, 360px to 1920px+. The header is solid white
  from the first pixel; the page starts below it.

# HERO CAROUSEL SPEC (every page; built ONCE as <HeroCarousel>)
- Full-width, ~85–100svh, 4–6 slides per page; props: slides[] + page
  theme.
- Auto-advances every 6s with smooth sliding transition (directional
  slide + subtle Ken-Burns zoom on active image).
- Prev/Next buttons, clickable dot indicators, thin progress bar for
  time-to-next-slide, pause/play control.
- Pauses on hover/focus and when the tab is hidden; resumes after.
  Touch swipe (drag) and arrow-key support. Preload first slide.
- Each slide: headline, one-line subheading, CTA button over a
  legibility gradient; text animates in with stagger on slide change.
- Accessible: role="region" aria-roledescription="carousel", live
  region announcements, slides labelled "n of N", auto-play disabled
  under prefers-reduced-motion.
- Typed Slide model: { id, image, alt, headline, sub, cta }.

# IMAGE STRATEGY (placeholders update automatically)
- All images referenced by filename from typed manifests in
  src/content/images.ts, pointing to /public/images/<page>/<name>.jpg.
- <SmartImage> wraps next/image: if the file is missing or fails, render
  a styled placeholder (gradient in the page accent, subtle pattern,
  centered label with intended subject, e.g. "HERO · Obudu cable car ·
  1920×1080").
- When a real file is later dropped in with the same filename, the site
  shows it with zero code changes.
- First try to source license-friendly images (Unsplash/Pexels/Wikimedia
  Commons); save to /public/images and record attribution in
  /public/images/CREDITS.md. If sourcing fails, do NOT block: ship the
  placeholders.
- Maintain /public/images/README.md listing every expected filename,
  dimensions, aspect ratio and subject to shoot or source.

# PHASE GATE (applies to every phase)
After each phase: run the app, verify in a real browser (browser-use),
fix issues, run lint + type-check, do a code-review pass, run the
web-design-guidelines audit where indicated, and report briefly what was
done and any open items.
