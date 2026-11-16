import {
  Factory,
  Flame,
  HardHat,
  Hotel,
  Landmark,
  RadioTower,
  Zap,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  businessSectors,
  type BusinessSectorIcon,
} from "@/content/business-services";

const headingId = "business-sectors-heading";

const icons: Record<BusinessSectorIcon, LucideIcon> = {
  manufacturing: Factory,
  oil: Flame,
  telecoms: RadioTower,
  construction: HardHat,
  hospitality: Hotel,
  financial: Landmark,
  power: Zap,
};

/**
 * The seven sectors as type, not as cards. The client named the sectors but no
 * client, project or reference inside them, so the page adds none.
 */
export function BusinessSectors() {
  return (
    <Section
      id="sectors"
      tone="sand"
      topDivider="dune"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{businessSectors.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[16ch]"
              >
                {businessSectors.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.06}>
              <p className="max-w-[34ch] text-small text-ink-700 lg:ml-auto">
                {businessSectors.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 border-b border-ink-900/20 lg:mt-16">
          {businessSectors.items.map((sector, index) => {
            const Icon = icons[sector.id];

            return (
              <li key={sector.id} className="border-t border-ink-900/20">
                <Reveal delay={Math.min(index * 0.05, 0.2)}>
                  <div className="flex items-center gap-4 py-5 sm:gap-6 sm:py-7">
                    <span className="w-7 shrink-0 font-display text-small tabular-nums leading-none text-accent-text">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="min-w-0 flex-1 font-display text-[clamp(1.5rem,1.15rem+1.9vw,2.75rem)] leading-[1.05] tracking-[-0.024em]">
                      {sector.label}
                    </h3>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm border border-ink-900/10 bg-ivory-50 text-accent-text">
                      <Icon aria-hidden="true" size={20} strokeWidth={1.5} />
                    </span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
