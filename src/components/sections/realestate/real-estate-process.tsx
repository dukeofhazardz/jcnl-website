import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { realEstatePage } from "@/content/real-estate";

const copy = realEstatePage.process;

/** Four steps, kept generic. No guarantee, no legal advice. */
export function RealEstateProcess() {
  return (
    <Section
      tone="ink"
      topDivider="wave"
      spacing="md"
      pattern
      labelledBy="real-estate-process"
    >
      <Container>
        <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="light">{copy.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id="real-estate-process"
                className="mt-5 max-w-[14ch] text-white"
              >
                {copy.heading}
              </Heading>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <p className="max-w-[38ch] text-small text-sky-100/70 lg:text-right">
                {copy.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <ol className="mt-12 grid gap-px overflow-hidden rounded-md border border-white/15 bg-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {copy.steps.map((step, index) => (
            <li key={step.title} className="bg-ink-950">
              <Reveal delay={index * 0.07} className="h-full">
                <div className="flex h-full flex-col p-6">
                  <span className="font-display text-[0.95rem] tabular-nums text-accent-bright">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-8 font-display text-title text-white">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-small text-sky-100/70">
                    {step.body}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal delay={0.12}>
          <p className="mt-8 max-w-[62ch] border-l-2 border-accent-bright pl-4 text-small text-sky-100/75">
            {copy.note}
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
