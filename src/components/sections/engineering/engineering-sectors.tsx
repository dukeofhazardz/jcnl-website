import { HardHat, Truck, Zap, type LucideIcon } from "lucide-react";

import { ClientTodo } from "@/components/ui/client-todo";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  engineeringSectors,
  type EngineeringSectorIcon,
} from "@/content/engineering";

const headingId = "engineering-sectors-heading";

const icons: Record<EngineeringSectorIcon, LucideIcon> = {
  energy: Zap,
  transport: Truck,
  construction: HardHat,
};

/**
 * The three sectors, set as type rather than as cards. The client has named the
 * sectors but not a single client or reference in them, so the list carries one
 * placeholder at the end instead of three invented ones.
 */
export function EngineeringSectors() {
  return (
    <Section
      tone="sand"
      topDivider="dune"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{engineeringSectors.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[18ch]"
              >
                {engineeringSectors.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.06}>
              <p className="max-w-[34ch] text-small text-ink-700 lg:ml-auto">
                {engineeringSectors.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 border-b border-ink-900/20 lg:mt-16">
          {engineeringSectors.items.map((sector, index) => {
            const Icon = icons[sector.id];

            return (
              <li key={sector.id} className="border-t border-ink-900/20">
                <Reveal delay={index * 0.06}>
                  <div className="flex items-center gap-5 py-6 sm:gap-8 sm:py-8">
                    <span className="w-8 shrink-0 font-display text-small tabular-nums leading-none text-ink-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="min-w-0 flex-1 font-display text-display-3 leading-[1.05]">
                      {sector.label}
                    </h3>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-ivory-50 text-accent-text">
                      <Icon aria-hidden="true" size={19} strokeWidth={1.6} />
                    </span>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <p className="mt-6 flex flex-wrap items-center gap-3 text-small text-ink-500">
            <ClientTodo>{engineeringSectors.todoNote}</ClientTodo>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
