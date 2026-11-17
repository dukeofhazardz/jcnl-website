import { ArrowUpRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { mapsHref, offices } from "@/config/site";
import { aboutPage } from "@/content/about";

const headingId = "about-offices-heading";

/** Lagos first, because the copy names it as the head office. */
const orderedOffices = [...offices].sort((a, b) =>
  a.city === "Lagos" ? -1 : b.city === "Lagos" ? 1 : 0,
);

/** Both offices, with the same address lines and Maps links used on /contact. */
export function AboutOffices() {
  const { offices: copy } = aboutPage;

  return (
    <Section
      tone="ivory"
      topDivider="arch"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[16ch]"
              >
                {copy.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
            <Reveal delay={0.06}>
              <p className="max-w-[42ch] text-lead text-ink-700">{copy.intro}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
          {orderedOffices.map((office, index) => (
            <Reveal key={office.city} delay={index * 0.08}>
              <div className="border-t border-ink-900/20 pt-6">
                <h3 className="font-display text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] leading-none tracking-[-0.03em]">
                  {office.city}
                </h3>
                <address className="mt-4 not-italic text-body leading-relaxed text-ink-700">
                  {office.lines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={mapsHref(office.query)}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mt-5 inline-flex items-center gap-1.5 text-small font-medium text-accent-text underline-offset-4 hover-fine:underline"
                >
                  {copy.mapsLabel}
                  <ArrowUpRight
                    aria-hidden="true"
                    size={14}
                    strokeWidth={1.75}
                  />
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.12}>
          <div className="mt-10">
            <Button href="/contact" variant="ghost">
              {copy.contactLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
