import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { businessFunding } from "@/content/business-services";

const headingId = "business-funding-heading";

/** Four items on the left, three on the right, each column ruled as its own list. */
const columns = [
  businessFunding.items.slice(0, 4),
  businessFunding.items.slice(4),
];

/**
 * The investor-facing band, on the deep ink ground. Sky-300 carries the
 * numerals and the list label; body copy is white at 80%.
 */
export function BusinessFunding() {
  return (
    <Section
      id="funding"
      tone="ink"
      topDivider="blade"
      spacing="md"
      pattern
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow tone="light" className="text-sky-300">
                {businessFunding.eyebrow}
              </Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[18ch]"
              >
                {businessFunding.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.06}>
              <p className="max-w-[38ch] text-small text-white/80 lg:ml-auto">
                {businessFunding.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <div className="mt-12 lg:mt-16">
          <Reveal>
            <p className="text-micro font-semibold uppercase text-sky-300">
              {businessFunding.listLabel}
            </p>
          </Reveal>

          <div className="mt-5 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:gap-x-16">
            {columns.map((column, columnIndex) => (
              <ol
                key={columnIndex}
                start={columnIndex === 0 ? 1 : columns[0].length + 1}
                className="border-b border-white/20"
              >
                {column.map((item, index) => {
                  const number = columnIndex === 0 ? index + 1 : columns[0].length + index + 1;

                  return (
                    <li key={item.id} className="border-t border-white/20">
                      <Reveal delay={Math.min(index * 0.05, 0.2)}>
                        <div className="flex items-baseline gap-4 py-4">
                          <span
                            aria-hidden="true"
                            className="w-6 shrink-0 font-display text-small tabular-nums leading-none text-sky-300"
                          >
                            {String(number).padStart(2, "0")}
                          </span>
                          <span className="font-display text-title leading-tight">
                            {item.label}
                          </span>
                        </div>
                      </Reveal>
                    </li>
                  );
                })}
              </ol>
            ))}
          </div>

          <Reveal delay={0.08}>
            <p className="mt-8 max-w-[52ch] border-l-2 border-sky-300 pl-4 text-small text-white/80">
              {businessFunding.closing}
            </p>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
