import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { farmValues } from "@/content/farms";

const headingId = "farm-values-heading";

/**
 * The clay band. Three words, set large, with no invented elaboration: the
 * brief names employment, empowerment and nutrition and stops there.
 */
export function FarmValues() {
  return (
    <Section
      tone="clay"
      topDivider="blade"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow tone="ivory">What it is for</Eyebrow>
              <h2 id={headingId} className="sr-only">
                Employment, empowerment and nutrition
              </h2>
              <p className="mt-5 max-w-[26ch] text-lead text-ivory-100">
                The farm was built around three outcomes.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <ul>
              {farmValues.map((value, index) => (
                <li
                  key={value}
                  className="border-t border-ivory-50/30 first:border-t-0"
                >
                  <Reveal delay={index * 0.06}>
                    <div className="flex items-baseline gap-5 py-5 sm:gap-8 sm:py-6">
                      <span className="font-display text-small tabular-nums text-ivory-50">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-display text-[clamp(1.85rem,1.2rem+2.6vw,3rem)] leading-[1.05] tracking-[-0.025em]">
                        {value}
                      </h3>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </Section>
  );
}
