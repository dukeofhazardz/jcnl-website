import { Info } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { businessInstruments } from "@/content/business-services";

const headingId = "business-instruments-heading";

const columns = [
  businessInstruments.items.slice(0, 4),
  businessInstruments.items.slice(4),
];

/**
 * The instruments, as a ruled index. Each row gives the document and its family
 * only; no term, rate or eligibility is stated here. The due-diligence note sits
 * directly under the list, in the client's exact wording.
 */
export function BusinessInstruments() {
  return (
    <Section
      id="instruments"
      tone="ivory"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{businessInstruments.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[20ch]"
              >
                {businessInstruments.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.06}>
              <p className="max-w-[38ch] text-small text-ink-700 lg:ml-auto">
                {businessInstruments.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:mt-16 lg:gap-x-16">
          {columns.map((column, columnIndex) => (
            <ol
              key={columnIndex}
              start={columnIndex === 0 ? 1 : columns[0].length + 1}
              className="border-b border-ink-900/20"
            >
              {column.map((item, index) => {
                const number =
                  columnIndex === 0 ? index + 1 : columns[0].length + index + 1;

                return (
                  <li key={item.id} className="border-t border-ink-900/20">
                    <Reveal delay={Math.min(index * 0.05, 0.2)}>
                      <div className="grid grid-cols-[2rem_1fr] items-baseline gap-x-3 py-4">
                        <span
                          aria-hidden="true"
                          className="font-display text-small tabular-nums leading-none text-accent-text"
                        >
                          {String(number).padStart(2, "0")}
                        </span>
                        <div>
                          <h3 className="font-display text-title leading-tight">
                            {item.label}
                          </h3>
                          <p className="mt-1 text-micro font-semibold uppercase text-ink-500">
                            {item.kind}
                          </p>
                        </div>
                      </div>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          ))}
        </div>

        <Reveal delay={0.08}>
          <div
            data-note=""
            className="mt-10 flex max-w-[62ch] items-start gap-3 border border-accent/30 bg-accent-soft/60 p-5"
          >
            <Info
              aria-hidden="true"
              size={17}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-accent-text"
            />
            <p className="text-small text-ink-900">
              {businessInstruments.note}
            </p>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
