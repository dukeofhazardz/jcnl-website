import {
  Building,
  DraftingCompass,
  GraduationCap,
  HardHat,
  type LucideIcon,
} from "lucide-react";

import { ClientTodo } from "@/components/ui/client-todo";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  engineeringCapabilities,
  type EngineeringCapabilityIcon,
} from "@/content/engineering";

const headingId = "engineering-capabilities-heading";

const icons: Record<EngineeringCapabilityIcon, LucideIcon> = {
  civil: DraftingCompass,
  construction: HardHat,
  facility: Building,
  training: GraduationCap,
};

/**
 * The four service lines. Each card states the discipline and marks the detail
 * the client still has to supply. No project counts, no sectors per card.
 */
export function EngineeringCapabilities() {
  return (
    <Section
      tone="white"
      topDivider="arch"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{engineeringCapabilities.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[20ch]"
              >
                {engineeringCapabilities.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.06}>
              <p className="max-w-[40ch] text-small text-ink-700 lg:ml-auto">
                {engineeringCapabilities.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-md border border-ink-900/15 bg-ink-900/15 sm:grid-cols-2 lg:mt-16">
          {engineeringCapabilities.items.map((item, index) => {
            const Icon = icons[item.id];

            return (
              <li key={item.id} className="bg-white">
                <Reveal
                  delay={Math.min(index * 0.05, 0.2)}
                  className="h-full"
                >
                  <div className="flex h-full flex-col p-6 sm:p-8">
                    <div className="flex items-start justify-between gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-sm bg-accent-soft text-accent-text">
                        <Icon aria-hidden="true" size={21} strokeWidth={1.6} />
                      </span>
                      <span className="font-display text-small tabular-nums leading-none text-ink-500">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <h3 className="mt-6 max-w-[22ch] font-display text-title leading-tight">
                      {item.label}
                    </h3>
                    <p className="mt-3 max-w-[36ch] text-small text-ink-700">
                      {item.body}
                    </p>

                    <div className="mt-auto pt-8">
                      <ClientTodo>{engineeringCapabilities.cardNote}</ClientTodo>
                    </div>
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
