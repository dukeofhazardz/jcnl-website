import { ArrowDownRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Parallax } from "@/components/ui/parallax";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { aboutPage } from "@/content/about";

const headingId = "about-story-heading";

/**
 * The company record, told only in the facts the brief supplies. The sidebar
 * repeats the same facts as a reference block, so the prose does not have to
 * turn into a list.
 */
export function AboutStory() {
  const { story } = aboutPage;

  return (
    <Section
      tone="ivory"
      topDivider="arch"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 lg:pr-8">
            <Reveal>
              <Eyebrow>{story.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[19ch]"
              >
                {story.heading}
              </Heading>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-7 max-w-[56ch] space-y-5 text-lead text-ink-700">
                {story.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <a
                href="#about-mission"
                className="mt-8 inline-flex items-center gap-2 text-small font-semibold text-ink-700 underline-offset-4 hover:text-accent-text hover:underline"
              >
                Read the mission
                <ArrowDownRight aria-hidden="true" size={16} strokeWidth={1.75} />
              </a>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.06}>
              <Parallax
                className="aspect-4/3 overflow-hidden rounded-md bg-jungle-950"
                distance={24}
              >
                <SmartImage
                  src={story.image.src}
                  alt={story.imageAlt}
                  subject={story.image.subject}
                  role="ABOUT"
                  width={story.image.width}
                  height={story.image.height}
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  fill
                />
              </Parallax>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-4 flex items-baseline justify-between gap-4 border-t border-ink-900/15 pt-4 text-small">
                <span className="text-ink-500">{story.imageCaption}</span>
                <span className="font-display text-accent-text">
                  {story.imageNote}
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.14}>
              <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink-900/15 pt-6">
                {story.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="text-micro font-semibold uppercase text-ink-500">
                      {fact.label}
                    </dt>
                    <dd className="mt-1.5 text-small text-ink-900">
                      {fact.value}
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
