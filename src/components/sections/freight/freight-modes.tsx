import { Plane, Ship, type LucideIcon } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { freightModes, type FreightModeId } from "@/content/freight";
import { cn } from "@/lib/cn";

const headingId = "freight-modes-heading";

const icons: Record<FreightModeId, LucideIcon> = {
  air: Plane,
  sea: Ship,
};

/** Air against sea. One light panel, one navy panel, both on sand. */
export function FreightModes() {
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
              <Eyebrow>{freightModes.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[22ch]"
              >
                {freightModes.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.06}>
              <p className="max-w-[36ch] text-small text-ink-500 lg:ml-auto">
                {freightModes.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {freightModes.items.map((mode, index) => {
            const Icon = icons[mode.id];
            const dark = mode.id === "sea";

            return (
              <Reveal key={mode.id} delay={0.06 + index * 0.06}>
                <article
                  className={cn(
                    "flex h-full flex-col rounded-md border p-7 sm:p-9",
                    dark
                      ? "border-navy-900 bg-navy-900 text-ivory-50"
                      : "border-ink-900/15 bg-ivory-50 text-ink-900",
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-sm",
                        dark
                          ? "bg-ivory-50/10 text-sky-300"
                          : "bg-accent-soft text-accent-text",
                      )}
                    >
                      <Icon aria-hidden="true" size={24} strokeWidth={1.6} />
                    </span>
                    <span
                      className={cn(
                        "font-display text-small tabular-nums",
                        dark ? "text-sky-300" : "text-ink-500",
                      )}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-title leading-tight">
                    {mode.label}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 max-w-[38ch] text-small",
                      dark ? "text-ivory-100" : "text-ink-700",
                    )}
                  >
                    {mode.body}
                  </p>

                  <div
                    className={cn(
                      "mt-auto flex items-center gap-2 border-t pt-5 text-micro font-semibold uppercase",
                      dark
                        ? "border-ivory-50/25 text-sky-300"
                        : "border-ink-900/15 text-accent-text",
                    )}
                  >
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        dark ? "bg-sky-300" : "bg-accent",
                      )}
                    />
                    {mode.tags[0]}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
