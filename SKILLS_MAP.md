# SKILLS MAP — JCNL Website

Mapping of the brief's skill requirements to **already-installed** skills.
Nothing was installed or reinstalled. All skills below exist on disk:

- `C:\Users\USER\.config\opencode\skills\<skill-id>\SKILL.md` (primary)

Read each `SKILL.md` before the phase that needs it. Priority when skills
disagree: **brand facts > accessibility > performance > skill style advice.**

---

## 1. Required by the brief

| Brief requirement | Installed skill ID(s) | Source repo | Used for |
|---|---|---|---|
| emilkowalski/skill — animation craft, applied to ALL motion | `emil-design-eng` (primary doctrine), `animate` (build), `review-animations` + `improve-animations` (critique/audit), `animation-performance` (frame budget), `apple-design` (springs, gesture feel, materials) | emilkowalski/skill | Every easing curve, spring, duration, hover/press state, carousel motion, reveal, parallax, route transition. 150–300ms micro-interactions, 500–800ms reveals, transform/opacity only. |
| pbakaus/impeccable | `impeccable` | pbakaus/impeccable | Visual direction, hierarchy, typography, colour, UX copy, responsive behaviour, DESIGN.md / token capture, "exotic" art direction. |
| leonxlnx/taste-skill | `design-taste-frontend` (v2, primary), `high-end-visual-design` (premium polish), `redesign-existing-projects` (legacy site lift) | leonxlnx/taste-skill | Anti-generic art direction, section blueprints, composition variance, look-and-fix loop on screenshots. |
| nextlevelbuilder/ui-ux-pro-max-skill | `ui-ux-pro-max` (primary), `design-system` (token tiers), `ui-styling` (component/Tailwind styling) | nextlevelbuilder/ui-ux-pro-max-skill | Palette + font-pairing selection, UX guidelines, token architecture (primitive → semantic → component), per-page accent variables. |
| anthropics frontend-design | `frontend-design` | anthropics/claude-code | Distinctive visual point of view; resisting templated defaults on hero/section layouts. |
| vercel-labs web-design-guidelines | `web-design-guidelines` | vercel-labs/agent-skills | Compliance audit at the **end of every phase**. |
| vercel-labs vercel-react-best-practices | `vercel-react-best-practices` | vercel-labs/agent-skills | Server components by default, `"use client"` only for interactive, `next/image`, `next/font`, bundle size, data flow. |
| addyosmani/agent-skills — workflow, quality gates, testing, performance, a11y | `spec-driven-development`, `planning-and-task-breakdown`, `incremental-implementation`, `frontend-ui-engineering`, `test-driven-development`, `code-review-and-quality`, `performance-optimization`, `security-and-hardening`, `shipping-and-launch`, `debugging-and-error-recovery` | addyosmani/agent-skills | Phase planning, thin verifiable slices, WCAG AA + semantics, perf budgets, dependency/security hygiene, pre-ship checks. |
| mattpocock code-review | `code-review` | mattpocock/skills | Two-axis review (standards + spec) at the **end of every phase**. |
| browser-use — screenshots at 375/768/1280/1920, carousel testing | `browser-use` (primary), plus the in-app `browser` skill for this harness's browser tools | browser-use/browser-use | Real-browser verification, responsive screenshots, carousel/swipe/autoplay/keyboard testing, console + network checks. |
| stop-slop + coreyhaines31 marketingskills — all copy | `stop-slop`, `copywriting`, `copy-editing`, `cro` | hardikpandya/stop-slop, coreyhaines31/marketingskills | Headlines, CTAs, meta descriptions, page copy. Strip filler/clichés/AI tells while keeping every brand fact exact. |
| mcp-builder | `mcp-builder` — **installed but ignored** | anthropics/skills | Not used. Brief says so explicitly. |

| Image strategy (SmartImage placeholders, licensed sourcing) | `image` (guidance only) | coreyhaines31/marketingskills | File naming, formats, sizing, attribution discipline for `/public/images`. The placeholder/manifest system is code, not a skill. |

---

## 2. Load order per phase

1. `spec-driven-development` / `planning-and-task-breakdown` — scope the phase.
2. Design: `impeccable` → `design-taste-frontend` → `ui-ux-pro-max` →
   `frontend-design` (first three set direction, the fourth breaks ties on
   distinctiveness).
3. Tokens/components: `design-system` → `ui-styling`.
4. Motion: `emil-design-eng` → `animate` (audit later with `review-animations`).
5. Build: `vercel-react-best-practices`, `frontend-ui-engineering`,
   `incremental-implementation`.
6. Copy: `copywriting` → `copy-editing` → `stop-slop`.
7. Verify: `browser-use` (+ `browser`) at 375 / 768 / 1280 / 1920.
8. Gate: `web-design-guidelines`, `performance-optimization`,
   `security-and-hardening`, then `code-review`.

---

## 3. Guardrails carried from the brief

- Never invent credentials, awards, clients, statistics or projects.
- Copy must match the brand facts exactly (name, descriptor, tagline,
  mission quote, offices, channels, social handle).
- Nav labels are service names only — no "JCNL" or "Jesrudeb" in nav links.
- Single source of truth for contact data: `src/config/site.ts`.
- WCAG AA, semantic landmarks, visible focus, alt text on every image, skip link.
- `prefers-reduced-motion` respected everywhere, including carousel autoplay.
- Art direction: warm, lush, cinematic — never clip-art.

## 4. Phase gate (from brief §PHASE GATE)

Every phase ends with: run the app → verify in a real browser at 375 / 768 /
1280 / 1920 → fix → lint + type-check → `code-review` → `web-design-guidelines`
audit where indicated → short report of what was done and what is open.
