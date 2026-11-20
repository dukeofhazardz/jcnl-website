import {
  Building,
  DraftingCompass,
  GraduationCap,
  Hotel,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  businessIntro,
  type BusinessServiceIcon,
} from "@/content/business-services";

const headingId = "business-intro-heading";

const icons: Record<BusinessServiceIcon, LucideIcon> = {
  design: DraftingCompass,
  training: GraduationCap,
  hospitality: Hotel,
  facility: Building,
};

/**
 * The page's thesis and its four service lines. The list is an index, not a set
 * of cards: number, name and one line, on hairlines.
 */
export function BusinessIntro() {
  return (
    <Section
      id="services"
      tone="white"
      topDivider="arch"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal>
              <Eyebrow>{businessIntro.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[16ch]"
              >
                {businessIntro.heading}
              </Heading>
              <p className="mt-6 max-w-[42ch] text-lead text-ink-700">
                {businessIntro.lead}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.06}>
              <p className="text-micro font-semibold uppercase text-ink-500">
                {businessIntro.indexLabel}
              </p>
            </Reveal>

            <ul className="mt-5 border-b border-ink-900/20">
              {businessIntro.items.map((item, index) => {
                const Icon = icons[item.id];

                return (
                  <li key={item.id} className="border-t border-ink-900/20">
                    <Reveal delay={Math.min(0.06 + index * 0.05, 0.26)}>
                      <div className="grid grid-cols-[2rem_1fr] items-start gap-x-4 gap-y-2 py-5 sm:grid-cols-[2rem_2.5rem_1fr] sm:items-center sm:gap-x-5 sm:py-6">
                        <span className="font-display text-small tabular-nums leading-none text-accent-text">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="hidden h-9 w-9 items-center justify-center rounded-sm bg-accent-soft text-accent-text sm:flex">
                          <Icon
                            aria-hidden="true"
                            size={17}
                            strokeWidth={1.6}
                          />
                        </span>
                        <div>
                          <h3 className="font-display text-title leading-tight">
                            {item.label}
                          </h3>
                          <p className="mt-1.5 max-w-[44ch] text-small text-ink-700">
                            {item.body}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
