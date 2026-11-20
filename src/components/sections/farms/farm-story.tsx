import { ArrowDownRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Parallax } from "@/components/ui/parallax";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { farm } from "@/content/farms";

const headingId = "farm-story-heading";

/**
 * The story, in the client's own geography and purpose. The photograph is the
 * only image on the page above the location card, so it carries the frame.
 */
export function FarmStory() {
  return (
    <Section
      tone="white"
      topDivider="arch"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 lg:pr-6">
            <Reveal>
              <Eyebrow>The farm</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[18ch]"
              >
                Fish and livestock at Idiagbon.
              </Heading>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 max-w-[56ch] space-y-5 text-lead text-ink-700">
                <p>
                  The Integrated Fish and Livestock Farm is at Idiagbon Village,
                  Iju-Ota, in{" "}
                  <span className="whitespace-nowrap">Ado-Odo/Ota</span> Local
                  Government Area, Ogun State.
                </p>
                <p>
                  It was built to add to the animal protein supply for{" "}
                  <span className="whitespace-nowrap">Ado-Odo/Ota</span> and
                  neighbouring states, through integrated farming employment,
                  empowerment and better community nutrition.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href="#farm-facilities"
                className="mt-8 inline-flex items-center gap-2 text-small font-semibold text-ink-700 underline-offset-4 hover:text-accent-text hover:underline"
              >
                What is on the site
                <ArrowDownRight aria-hidden="true" size={16} strokeWidth={1.75} />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.06}>
              <Parallax
                className="aspect-4/3 overflow-hidden rounded-md bg-ink-950"
                distance={24}
              >
                <SmartImage
                  src={farm.image.src}
                  alt={farm.alt}
                  subject={farm.image.subject}
                  role="FARM"
                  width={farm.image.width}
                  height={farm.image.height}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  fill
                />
              </Parallax>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink-900/15 pt-4 text-small">
                <span className="text-ink-500">Idiagbon Village, Iju-Ota</span>
                <span className="font-display text-accent-text">
                  Ogun State
                </span>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
