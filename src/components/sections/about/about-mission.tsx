import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow } from "@/components/ui/typography";
import { site } from "@/config/site";
import { aboutPage } from "@/content/about";

const headingId = "about-mission-heading";

/**
 * The mission in the client's exact wording, followed by the tagline. No
 * interpretation is added to either: the page sets the words and stops.
 */
export function AboutMission() {
  const { mission } = aboutPage;

  return (
    <Section
      id="about-mission"
      tone="ink"
      topDivider="blade"
      spacing="md"
      pattern
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow tone="light">{mission.eyebrow}</Eyebrow>
              <h2
                id={headingId}
                className="mt-5 max-w-[16ch] font-display text-title leading-tight text-white"
              >
                {mission.heading}
              </h2>
              <p className="mt-4 max-w-[34ch] text-small text-sky-100/70">
                {mission.intro}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.08}>
              <figure>
                <blockquote>
                  <p className="max-w-[30ch] font-display text-[clamp(1.9rem,1.1rem+3.4vw,3.9rem)] leading-[1.06] tracking-[-0.028em] text-white">
                    <span aria-hidden="true" className="text-sky-300">
                      &ldquo;
                    </span>
                    {mission.quote}
                    <span aria-hidden="true" className="text-sky-300">
                      &rdquo;
                    </span>
                  </p>
                </blockquote>
                <figcaption className="mt-7 text-micro uppercase text-sky-100/65">
                  {mission.caption}
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-white/20 pt-7">
            <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
              <p className="text-micro font-semibold uppercase text-sky-100/65">
                {mission.taglineLabel}
              </p>
              <p className="text-small text-sky-100/70">{mission.taglineNote}</p>
            </div>

            <ul className="mt-6 grid gap-0 sm:grid-cols-3 sm:gap-8">
              {site.taglineParts.map((part) => (
                <li
                  key={part}
                  className="border-t border-white/25 py-3 font-display text-[clamp(1.9rem,9vw,3rem)] uppercase leading-none tracking-[-0.02em] text-white sm:py-0 sm:pt-4 sm:text-[clamp(1.35rem,3vw,3rem)]"
                >
                  {part}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
