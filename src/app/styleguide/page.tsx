import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AccentScope } from "@/components/sections/accent-scope";
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
import { accentKeys } from "@/content/styleguide-tokens";
import type { AccentKey } from "@/config/site";

export const metadata: Metadata = {
  title: "Styleguide",
  robots: { index: false, follow: false },
};

type Swatch = { name: string; value: string };

const palette: { group: string; swatches: Swatch[] }[] = [
  {
    group: "Ground",
    swatches: [
      { name: "ivory-50", value: "#fbf7ee" },
      { name: "ivory-100", value: "#f6efe1" },
      { name: "ivory-200", value: "#ede3d1" },
      { name: "sand-300", value: "#dfd2bc" },
      { name: "sand-400", value: "#c9b79c" },
    ],
  },
  {
    group: "Ink",
    swatches: [
      { name: "ink-900", value: "#15130f" },
      { name: "ink-800", value: "#221e18" },
      { name: "ink-700", value: "#3a342b" },
      { name: "ink-500", value: "#6b6154" },
    ],
  },
  {
    group: "Jungle & teal",
    swatches: [
      { name: "jungle-950", value: "#0a241c" },
      { name: "jungle-900", value: "#0e2e23" },
      { name: "jungle-800", value: "#12402f" },
      { name: "jungle-700", value: "#17503b" },
      { name: "teal-900", value: "#0b3b3b" },
    ],
  },
  {
    group: "Laterite & saffron",
    swatches: [
      { name: "terracotta-600", value: "#b0562f" },
      { name: "terracotta-500", value: "#c0663a" },
      { name: "clay-500", value: "#a85b3c" },
      { name: "saffron-500", value: "#d9a03c" },
      { name: "saffron-400", value: "#e7b455" },
      { name: "saffron-300", value: "#f2c878" },
      { name: "gold-400", value: "#c9a227" },
    ],
  },
  {
    group: "Farms, freight, engineering",
    swatches: [
      { name: "leaf-600", value: "#4e7a3a" },
      { name: "leaf-700", value: "#3f6630" },
      { name: "navy-900", value: "#102e4a" },
      { name: "navy-800", value: "#163c5c" },
      { name: "sky-400", value: "#7fb2c6" },
      { name: "sky-300", value: "#a9cddb" },
      { name: "slate-900", value: "#1b2027" },
      { name: "slate-700", value: "#3a4450" },
      { name: "amber-500", value: "#e0a21b" },
    ],
  },
  {
    group: "Action",
    swatches: [
      { name: "cta-600", value: "#0e7a44" },
      { name: "cta-500", value: "#128c4a" },
    ],
  },
];

const typeScale = [
  { token: "display-1", className: "text-display-1", sample: "Evolve" },
  { token: "display-2", className: "text-display-2", sample: "Logistics, farms, freight." },
  { token: "display-3", className: "text-display-3", sample: "Established 2003" },
  { token: "title", className: "text-title", sample: "Two offices, one company" },
  { token: "lead", className: "text-lead", sample: "A lead paragraph opens a section and sets the reading rhythm." },
  { token: "body", className: "text-body", sample: "Body copy carries the detail. It is set at a comfortable measure." },
  { token: "small", className: "text-small", sample: "Small copy for supporting notes and captions." },
  { token: "micro", className: "text-micro font-semibold uppercase", sample: "Micro · eyebrow label" },
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
              className="block h-16 rounded-sm border border-ink-900/10"
              style={{ backgroundColor: swatch.value }}
            />
            <span className="mt-2 block text-[0.75rem] font-medium text-ink-900">
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
    <div className="pb-section">
      {/* Dark band so the transparent header stays legible, same as every page. */}
      <section className="relative isolate overflow-hidden bg-field pb-12 pt-[calc(var(--header-h)+3.5rem)] text-ivory-50">
        <GeometricPattern
          variant="lattice"
          className="absolute inset-0 -z-10 text-[var(--accent-soft)] opacity-[0.07]"
        />
        <Container>
          <Eyebrow tone="light">Development only</Eyebrow>
          <Heading as="h1" size="lg" className="mt-5 text-ivory-50">
            Styleguide
          </Heading>
          <p className="mt-5 max-w-[54ch] text-lead text-ivory-100/75">
            Tokens, type, motion and components used across the JCNL site. This
            route is excluded from search and returns 404 in production.
          </p>
        </Container>
      </section>

      <Section tone="ivory" spacing="sm" className="border-b border-ink-900/10">
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

      <Section tone="ivory" spacing="sm">
        <Container>
          <Eyebrow>Accents</Eyebrow>
          <Heading as="h2" size="md" className="mt-4">
            Per-page accent variables
          </Heading>
          <p className="mt-4 max-w-[60ch] text-small text-ink-500">
            Set <code className="font-mono text-[0.85em]">data-accent</code> on a
            page wrapper. Semantic utilities resolve from the runtime variables.
          </p>

          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {accentKeys.map((key: AccentKey) => (
              <AccentScope key={key} accent={key}>
                <div className="overflow-hidden rounded-md border border-ink-900/10">
                  <div className="flex h-24 items-end justify-between bg-accent p-4">
                    <span className="text-micro font-semibold uppercase text-[var(--accent-ink)]">
                      {key}
                    </span>
                    <span className="text-micro text-[var(--accent-ink)] opacity-70">
                      accent
                    </span>
                  </div>
                  <div className="space-y-2 bg-[var(--surface-raised)] p-4">
                    <p className="text-small font-medium text-accent-text">
                      Accent text on surface
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="h-6 flex-1 rounded-xs bg-[var(--field)]" />
                      <span className="h-6 flex-1 rounded-xs bg-accent-soft" />
                    </div>
                    <p className="text-[0.6875rem] uppercase tracking-[0.09em] text-ink-500">
                      field · accent-soft
                    </p>
                  </div>
                </div>
              </AccentScope>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand" spacing="sm" topDivider="arch">
        <Container>
          <Eyebrow>Typography</Eyebrow>
          <Heading as="h2" size="md" className="mt-4">
            Type scale
          </Heading>
          <div className="mt-9 divide-y divide-ink-900/10 border-y border-ink-900/10">
            {typeScale.map((item) => (
              <div
                key={item.token}
                className="grid gap-3 py-6 md:grid-cols-[8rem_1fr] md:gap-8"
              >
                <span className="text-micro uppercase text-ink-500">
                  {item.token}
                </span>
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

      <Section tone="ivory" spacing="sm">
        <Container>
          <Eyebrow>Components</Eyebrow>
          <Heading as="h2" size="md" className="mt-4">
            Buttons
          </Heading>

          <div className="mt-8 grid gap-8 rounded-md border border-ink-900/10 p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="dark">Dark</Button>
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
            <div className="flex min-h-40 items-center justify-center rounded-md bg-jungle-950 p-8">
              <Logo variant="cream" size="md" />
            </div>
            <div className="flex min-h-40 items-center justify-center rounded-md border border-ink-900/10 bg-ivory-50 p-8">
              <Logo variant="black" size="md" />
            </div>
          </div>
          <p className="mt-4 max-w-[62ch] text-small text-ink-500">
            One artwork, two colourways. Cream belongs on dark or photographic
            grounds; black on ivory. The header cross-fades between them without
            changing the image source or the layout.
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
              <p className="mt-2 text-small text-ink-500">
                Slightly brighter ground.
              </p>
            </Card>
            <Card tone="sand" className="p-6">
              <p className="text-micro uppercase text-ink-500">Sand</p>
              <p className="mt-3 font-display text-title">Static card</p>
              <p className="mt-2 text-small text-ink-500">No hover state.</p>
            </Card>
            <Card tone="ink" className="p-6">
              <p className="text-micro uppercase text-ivory-100/65">Jungle</p>
              <p className="mt-3 font-display text-title text-ivory-50">
                Dark card
              </p>
              <p className="mt-2 text-small text-ivory-100/70">
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

      <Section tone="jungle" spacing="sm" topDivider="wave">
        <Container>
          <Eyebrow tone="light">Motion</Eyebrow>
          <Heading as="h2" size="md" className="mt-4 text-ivory-50">
            Timing
          </Heading>
          <dl className="mt-8 grid gap-4 sm:grid-cols-2">
            {motionTokens.map((token) => (
              <div
                key={token.name}
                className="flex items-baseline justify-between gap-4 border-b border-ivory-50/15 pb-3"
              >
                <dt className="text-small text-ivory-100/70">{token.name}</dt>
                <dd className="font-mono text-[0.75rem] text-saffron-300">
                  {token.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <Eyebrow tone="light">Reveal</Eyebrow>
            <Reveal className="mt-4 max-w-[46ch]">
              <p className="text-body text-ivory-100/80">
                This block animates in once on scroll: 22px rise, 620ms, soft
                ease-out. It renders statically under reduced motion.
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section tone="ivory" spacing="sm">
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

      <Section tone="sand" spacing="sm" topDivider="arch">
        <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="font-display text-title text-ink-900">arch</p>
          <p className="max-w-[46ch] text-small text-ink-700">
            A single wide arc. Used where a light band meets the page.
          </p>
        </Container>
      </Section>

      <Section tone="ivory" spacing="sm" topDivider="dune">
        <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="font-display text-title text-ink-900">dune</p>
          <p className="max-w-[46ch] text-small text-ink-700">
            A shallow asymmetric crest. Used between two light bands.
          </p>
        </Container>
      </Section>

      <Section tone="sand" spacing="sm" topDivider="blade">
        <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="font-display text-title text-ink-900">blade</p>
          <p className="max-w-[46ch] text-small text-ink-700">
            A long diagonal cut. The sharpest of the four.
          </p>
        </Container>
      </Section>

      <Section tone="ivory" spacing="sm" topDivider="wave">
        <Container className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="font-display text-title text-ink-900">wave</p>
          <p className="max-w-[46ch] text-small text-ink-700">
            A soft double curve. Used before dark, patterned fields.
          </p>
        </Container>
      </Section>
    </div>
  );
}
