import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { engineeringApproach } from "@/content/engineering";

const headingId = "engineering-approach-heading";

/**
 * The four stages on the slate band. The number carries the colour: amber on
 * slate is 7.3:1, where the page's accent-text amber would disappear. The bands
 * are hairlines rather than cards, so the strip stays one line of argument.
 */
export function EngineeringApproach() {
  return (
    <Section
      id="approach"
      tone="slate"
      topDivider="blade"
      spacing="md"
      pattern
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow tone="ivory" className="text-[var(--accent)]">
                {engineeringApproach.eyebrow}
              </Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[20ch]"
              >
                {engineeringApproach.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.06}>
              <p className="max-w-[34ch] text-small text-ivory-100 lg:ml-auto">
                {engineeringApproach.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-0">
          {engineeringApproach.items.map((step, index) => (
            <li
              key={step.title}
              className="border-t border-ivory-50/25 pt-5 lg:px-6 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-l-ivory-50/15"
            >
              <Reveal delay={Math.min(index * 0.06, 0.24)}>
                <span
                  aria-hidden="true"
                  className="block font-display text-[clamp(2.25rem,1.7rem+2vw,3.25rem)] leading-none tracking-[-0.04em] text-[var(--accent)]"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-title leading-tight">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[30ch] text-small text-ivory-100">
                  {step.body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
