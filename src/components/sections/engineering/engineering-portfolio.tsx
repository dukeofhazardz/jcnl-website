import { ClientTodo } from "@/components/ui/client-todo";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  CLIENT_TO_PROVIDE,
  engineeringPortfolio,
} from "@/content/engineering";
import { engineeringProjectImages } from "@/content/images";

const headingId = "engineering-portfolio-heading";

/**
 * Six empty project records. The frame, the crop and the card are built; the
 * photograph, name, sector, year and scope are the client's to supply. Nothing
 * here implies a completed project.
 */
export function EngineeringPortfolio() {
  return (
    <Section
      id="projects"
      tone="ivory"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{engineeringPortfolio.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[22ch]"
              >
                {engineeringPortfolio.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.06}>
              <p className="max-w-[38ch] text-small text-ink-500 lg:ml-auto">
                {engineeringPortfolio.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {engineeringProjectImages.map((image, index) => {
            const number = String(index + 1).padStart(2, "0");

            return (
              <li key={image.src}>
                <Reveal delay={Math.min(index * 0.05, 0.25)}>
                  <article className="group flex h-full flex-col overflow-hidden rounded-md border border-ink-900/15 bg-ivory-50">
                    <div className="relative aspect-4/3 overflow-hidden">
                      <SmartImage
                        src={image.src}
                        alt="Project photograph"
                        subject={image.subject}
                        role="PROJECT"
                        width={image.width}
                        height={image.height}
                        sizes="(min-width: 1024px) 30vw, (min-width: 640px) 46vw, 92vw"
                        fill
                        className="transition-transform duration-300 ease-strong motion-safe:hover-fine:group-hover:scale-[1.015]"
                      />
                    </div>

                    <div className="flex flex-1 flex-col border-t border-ink-900/15 p-5">
                      <h3 className="mt-3 font-display text-title leading-tight">
                        <span className="mb-2 block font-sans text-micro font-semibold uppercase text-ink-500">
                          Project {number}
                        </span>{" "}
                        {CLIENT_TO_PROVIDE}
                      </h3>
                      <p className="mt-auto pt-4 text-small text-ink-500">
                        {engineeringPortfolio.cardNote}
                      </p>
                    </div>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>

        <Reveal delay={0.08}>
          <div className="mt-8 border-t border-ink-900/15 pt-5">
            <ClientTodo>Photographs and project details</ClientTodo>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
