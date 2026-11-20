import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { Logo } from "@/components/ui/Logo";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { styleguideImages } from "@/content/images";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

type Swatch = { name: string; value: string };

const palette: { group: string; swatches: Swatch[] }[] = [
  {
    group: "Ground & tints",
    swatches: [
      { name: "white", value: "#ffffff" },
      { name: "sky-50", value: "#eff9fe" },
      { name: "sky-100", value: "#d9f1fd" },
      { name: "mist-50", value: "#f6f9fb" },
      { name: "mist-100", value: "#eef3f7" },
    ],
  },
  {
    group: "Sky (brand structure)",
    swatches: [
      { name: "sky-200", value: "#b6e5fb" },
      { name: "sky-300", value: "#7ad3f8" },
      { name: "sky-500 · logo", value: "#00bafc" },
      { name: "sky-700 · text", value: "#0072ab" },
      { name: "sky-900", value: "#0b3f5c" },
    ],
  },
  {
    group: "Red accent",
    swatches: [
      { name: "red-50", value: "#fdf1f1" },
      { name: "red-500", value: "#d71920" },
      { name: "red-600", value: "#b31217" },
      { name: "red-700", value: "#8f0d12" },
    ],
  },
  {
    group: "Gold, sparing",
    swatches: [
      { name: "gold-300", value: "#e8cf8a" },
      { name: "gold-400", value: "#d4af4a" },
      { name: "gold-600 · text", value: "#8a6a14" },
    ],
  },
  {
    group: "Ink",
    swatches: [
      { name: "ink-950", value: "#061826" },
      { name: "ink-900", value: "#0b1f2e" },
      { name: "ink-700", value: "#23404f" },
      { name: "ink-500", value: "#556b78" },
    ],
  },
];

const contrastPairs = [
  { pair: "ink-950 on white", value: "18.00:1", use: "Body and headings" },
  { pair: "ink-500 on white", value: "5.58:1", use: "Secondary text" },
  { pair: "sky-700 on white", value: "5.26:1", use: "Links and small UI" },
  { pair: "white on sky-700", value: "5.26:1", use: "Primary button" },
  { pair: "ink-950 on sky-500", value: "8.08:1", use: "Accent band copy" },
  { pair: "white on red-600", value: "6.09:1", use: "Secondary button" },
  { pair: "red-600 on white", value: "6.09:1", use: "Status text" },
  { pair: "gold-600 on white", value: "5.06:1", use: "Gold text" },
  { pair: "sky-500 on white", value: "2.23:1", use: "Graphics only, never text" },
];

const typeScale = [
  { token: "display-1", className: "text-display-1", sample: "Evolve" },
  { token: "display-2", className: "text-display-2", sample: "Logistics, farms, freight." },
  { token: "display-3", className: "text-display-3", sample: "Established 2003" },
  { token: "title", className: "text-title", sample: "Two offices, one company" },
  {
    token: "lead",
    className: "text-lead",
    sample: "A lead paragraph opens a section and sets the reading rhythm.",
  },
  {
    token: "body",
    className: "text-body",
    sample: "Body copy carries the detail. It is set at a comfortable measure.",
  },
  { token: "small", className: "text-small", sample: "Small copy for supporting notes." },
  {
    token: "micro",
    className: "text-micro font-semibold uppercase",
    sample: "Micro · eyebrow label",
  },
];

const motionTokens = [
  { name: "press", value: "120ms · cubic-bezier(0.23, 1, 0.32, 1)" },
  { name: "ui", value: "220ms · cubic-bezier(0.23, 1, 0.32, 1)" },
  { name: "reveal", value: "620ms · cubic-bezier(0.16, 1, 0.3, 1)" },
  { name: "hover lift", value: "300ms · transform + shadow" },
];

function SwatchGrid({ group, swatches }: { group: string; swatches: Swatch[] }) {
  return (
    <div>
      <h3 className="text-micro font-semibold uppercase text-ink-500">{group}</h3>
      <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {swatches.map((swatch) => (
          <li key={swatch.name}>
            <span
              className="block h-16 rounded-sm border border-ink-950/10"
              style={{ backgroundColor: swatch.value }}
            />
            <span className="mt-2 block text-[0.75rem] font-medium text-ink-950">
              {swatch.name}
            </span>
            <span className="block text-[0.6875rem] uppercase tracking-[0.09em] text-ink-500">
              {swatch.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function StyleguidePage() {
  // Design tool, not a public page.
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <div className="bg-white pb-section">
      <section className="relative isolate overflow-hidden border-b border-line bg-white py-16">
        <GeometricPattern
          variant="lattice"
          className="absolute inset-0 -z-10 text-sky-500 opacity-[0.07]"
        />
        <Container>
          <Logo size="md" />
          <Eyebrow className="mt-8">Development only</Eyebrow>
          <Heading as="h1" size="lg" className="mt-5 text-ink-950">
            Styleguide
          </Heading>
          <p className="mt-5 max-w-[54ch] text-lead text-ink-700">
            Tokens, type, motion and components used across the JCNL site. One
            palette: white surfaces, sky-blue structure, red accents, sparing
            gold. This route is excluded from search and returns 404 in
            production.
          </p>
        </Container>
      </section>

      <Section tone="white" spacing="sm" className="border-b border-line">
        <Container>
          <Eyebrow>Colour</Eyebrow>
          <Heading as="h2" size="md" className="mt-4">
            Palette tokens
          </Heading>
          <div className="mt-10 space-y-10">
            {palette.map((group) => (
              <SwatchGrid key={group.group} {...group} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="sm">
        <Container>
          <Eyebrow>Contrast</Eyebrow>
          <Heading as="h2" size="md" className="mt-4">
            Checked pairings
          </Heading>
          <p className="mt-4 max-w-[62ch] text-small text-ink-500">
            WCAG AA needs 4.5:1 for body text and 3:1 for large text and UI.
            Logo sky on white is a graphic colour only; text uses the deeper
            steps.
          </p>
          <dl className="mt-8 divide-y divide-line border-y border-line">
            {contrastPairs.map((row) => (
              <div
                key={row.pair}
                className="grid grid-cols-[1fr_auto] gap-x-6 gap-y-1 py-3 text-small sm:grid-cols-[1.4fr_0.6fr_1fr]"
              >
                <dt className="font-medium text-ink-950">{row.pair}</dt>
                <dd className="tabular-nums text-sky-700">{row.value}</dd>
                <dd className="col-span-2 text-ink-500 sm:col-span-1">{row.use}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </Section>

      <Section tone="tint" spacing="sm" topDivider="arch">
        <Container>
          <Eyebrow>Typography</Eyebrow>
          <Heading as="h2" size="md" className="mt-4">
            Type scale
          </Heading>
          <div className="mt-9 divide-y divide-ink-950/10 border-y border-ink-950/10">
            {typeScale.map((item) => (
              <div
                key={item.token}
                className="grid gap-3 py-6 md:grid-cols-[8rem_1fr] md:gap-8"
              >
                <span className="text-micro uppercase text-ink-500">{item.token}</span>
                <p
                  className={
                    item.token.startsWith("display")
                      ? `${item.className} font-display tracking-[-0.03em]`
                      : item.className
                  }
                >
                  {item.sample}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="sm">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <Heading as="h2" size="md" className="mt-4">
            Buttons
          </Heading>

          <div className="mt-8 grid gap-8 rounded-md border border-line p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ink">Ink</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <p className="text-small text-ink-500">
              Magnetic pull on pointer devices only, 5px maximum. Press scale is
              CSS so it never waits on React. Disabled under reduced motion.
            </p>
          </div>

          <Heading as="h2" size="md" className="mt-14">
            Logo
          </Heading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="flex min-h-40 items-center justify-center rounded-md border border-line bg-white p-8">
              <Logo size="md" />
            </div>
            <div className="flex min-h-40 items-center justify-center rounded-md border border-line bg-white p-8">
              <Logo size="lg" />
            </div>
          </div>
          <p className="mt-4 max-w-[62ch] text-small text-ink-500">
            One artwork, always on white. A seasonal Christmas file replaces it
            from 20 November to 14 January in Lagos time, selected before first
            paint by a small inline script.
          </p>

          <Heading as="h2" size="md" className="mt-14">
            Cards
          </Heading>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Card tone="surface" interactive className="p-6">
              <p className="text-micro uppercase text-ink-500">Surface</p>
              <p className="mt-3 font-display text-title">Service card</p>
              <p className="mt-2 text-small text-ink-500">
                Hover lifts 4px on pointer devices.
              </p>
            </Card>
            <Card tone="raised" interactive className="p-6">
              <p className="text-micro uppercase text-ink-500">Raised</p>
              <p className="mt-3 font-display text-title">Service card</p>
              <p className="mt-2 text-small text-ink-500">White on white.</p>
            </Card>
            <Card tone="tint" className="p-6">
              <p className="text-micro uppercase text-ink-500">Tint</p>
              <p className="mt-3 font-display text-title">Static card</p>
              <p className="mt-2 text-small text-ink-500">No hover state.</p>
            </Card>
            <Card tone="ink" className="p-6">
              <p className="text-micro uppercase text-white/65">Ink</p>
              <p className="mt-3 font-display text-title text-white">Dark card</p>
              <p className="mt-2 text-small text-white/70">
                Used inside light sections.
              </p>
            </Card>
          </div>

          <Heading as="h2" size="md" className="mt-14">
            Image placeholder
          </Heading>
          <div className="mt-8 grid gap-5 lg:grid-cols-2">
            <SmartImage
              src={null}
              alt={styleguideImages.sample.alt}
              subject={styleguideImages.sample.subject}
              role="HERO"
              width={styleguideImages.sample.width}
              height={styleguideImages.sample.height}
              className="rounded-md"
            />
            <SmartImage
              src={null}
              alt="Placeholder at a portrait ratio"
              subject="SERVICE · Facility service management"
              role="CARD"
              width={800}
              height={1000}
              className="rounded-md"
            />
          </div>
          <p className="mt-4 max-w-[62ch] text-small text-ink-500">
            Drop a file at the manifest path and the placeholder is replaced
            with no code change. A missing or failed file falls back the same
            way at runtime.
          </p>
        </Container>
      </Section>

      <Section tone="ink" spacing="sm" topDivider="wave">
        <Container>
          <Eyebrow tone="light">Motion</Eyebrow>
          <Heading as="h2" size="md" className="mt-4 text-white">
            Timing
          </Heading>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {motionTokens.map((token) => (
              <div
                key={token.name}
                className="flex items-baseline justify-between gap-4 border-b border-white/15 pb-3"
              >
                <dt className="text-small text-white/70">{token.name}</dt>
                <dd className="font-mono text-[0.75rem] text-sky-300">{token.value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <Eyebrow tone="light">Reveal</Eyebrow>
            <Reveal className="mt-4 max-w-[46ch]">
              <p className="text-body text-white/80">
                This block animates in once on scroll: 22px rise, 620ms, soft
                ease-out. It renders statically under reduced motion.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="white" spacing="sm">
        <Container>
          <Eyebrow>Dividers</Eyebrow>
          <Heading as="h2" size="md" className="mt-4">
            Curved top edges
          </Heading>
          <p className="mt-4 max-w-[60ch] text-small text-ink-500">
            Four shapes, drawn in the incoming section&rsquo;s own colour. One
            per boundary is enough; a page with a divider on every section reads
            as a template.
          </p>
        </Container>
      </Section>

      <Section tone="tint" spacing="sm" topDivider="arch">
        <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="font-display text-title text-ink-950">arch</p>
          <p className="max-w-[46ch] text-small text-ink-700">
            A single wide arc. Used where a light band meets the page.
          </p>
        </Container>
      </Section>

      <Section tone="white" spacing="sm" topDivider="dune">
        <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="font-display text-title text-ink-950">dune</p>
          <p className="max-w-[46ch] text-small text-ink-700">
            A shallow asymmetric crest. Used between two light bands.
          </p>
        </Container>
      </Section>

      <Section tone="mist" spacing="sm" topDivider="blade">
        <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="font-display text-title text-ink-950">blade</p>
          <p className="max-w-[46ch] text-small text-ink-700">
            A long diagonal cut. The sharpest of the four.
          </p>
        </Container>
      </Section>

      <Section tone="white" spacing="sm" topDivider="wave">
        <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="font-display text-title text-ink-950">wave</p>
          <p className="max-w-[46ch] text-small text-ink-700">
            A soft double curve. Used before dark, patterned fields.
          </p>
        </Container>
      </Section>
    </div>
  );
}
