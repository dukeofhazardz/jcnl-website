import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { freightPlatform } from "@/content/freight";

const headingId = "freight-platform-heading";

/** The platform, stated in the client's terms, with its three traits beside it. */
export function FreightIntro() {
  return (
    <Section
      tone="white"
      topDivider="arch"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="lg:col-span-7 lg:pr-6">
            <Reveal>
              <Eyebrow>{freightPlatform.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[20ch]"
              >
                {freightPlatform.heading}
              </Heading>
              <div className="mt-7 max-w-[56ch] space-y-5 text-lead text-ink-700">
                {freightPlatform.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <dl className="border-t border-ink-900/15">
                {freightPlatform.traits.map((trait) => (
                  <div
                    key={trait.label}
                    className="border-b border-ink-900/15 py-5"
                  >
                    <dt className="text-micro font-semibold uppercase text-accent-text">
                      {trait.label}
                    </dt>
                    <dd className="mt-2 text-small text-ink-700">
                      {trait.body}
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
