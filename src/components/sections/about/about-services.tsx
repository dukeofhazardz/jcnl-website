import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { aboutPage } from "@/content/about";
import { homeServices } from "@/content/page-copy";

const headingId = "about-services-heading";

/** The five service lines, each linked to the page that carries the detail. */
export function AboutServices() {
  const { services } = aboutPage;

  return (
    <Section
      tone="sand"
      topDivider="dune"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-6">
              <Eyebrow>{services.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[18ch]"
              >
                {services.heading}
              </Heading>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:justify-self-end">
              <p className="max-w-[42ch] text-lead text-ink-700">
                {services.intro}
              </p>
            </div>
          </div>
        </Reveal>

        <ol className="mt-12 border-t border-ink-900/15">
          {homeServices.map((service, index) => (
            <li key={service.href} className="border-b border-ink-900/15">
              <Reveal delay={index * 0.05}>
                <Link
                  href={service.href}
                  className="group grid grid-cols-[2.5rem_1fr_auto] items-start gap-x-4 gap-y-2 py-6 transition-colors duration-200 hover:text-accent-text sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-6 sm:py-7"
                >
                  <span className="font-display text-[0.95rem] tabular-nums text-ink-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <span className="block font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.2rem)] leading-none tracking-[-0.028em]">
                      {service.label}
                    </span>
                    <span className="mt-2 block max-w-[52ch] text-small text-ink-500">
                      {service.blurb}
                    </span>
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    size={20}
                    strokeWidth={1.5}
                    className="mt-1 justify-self-end text-ink-500 transition-transform duration-300 ease-strong motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                  />
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
