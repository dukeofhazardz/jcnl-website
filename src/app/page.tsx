import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";

import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { AccentScope } from "@/components/sections/accent-scope";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { homeServices, pageMeta } from "@/content/page-copy";
import { heroSlides } from "@/content/slides";
import { contact, site, taglineDisplay, whatsappHref } from "@/config/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  description: site.description,
  path: "/",
});

const sectors = ["Energy", "Transport", "Construction", "TMC"] as const;

export default function HomePage() {
  const meta = pageMeta.home;

  return (
    <AccentScope accent={meta.accent}>
      <HeroCarousel
        slides={heroSlides.home}
        eyebrow={meta.eyebrow}
        label={meta.label}
        accent={meta.accent}
      />

      <Section tone="ivory" topDivider="arch" spacing="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Our mission</Eyebrow>
                <p className="mt-5 max-w-[34ch] text-small text-ink-500">
                  JESRUDEB@CONNECT NIGERIA LIMITED is an indigenous Nigerian
                  company, established in {site.established}, with its head
                  office in Lagos.
                </p>
                <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2 border-t border-ink-900/10 pt-5 text-micro uppercase text-ink-500">
                  {sectors.map((sector) => (
                    <li key={sector}>{sector}</li>
                  ))}
                </ul>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={0.08}>
                <figure>
                  <blockquote>
                    <p className="font-display text-[clamp(1.75rem,1.1rem+3.4vw,3.25rem)] leading-[1.14] tracking-[-0.026em] text-ink-900">
                      “{site.mission}”
                    </p>
                  </blockquote>
                  <figcaption className="mt-7 text-micro uppercase text-ink-500">
                    JCNL mission statement
                  </figcaption>
                </figure>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        id="services"
        tone="sand"
        spacing="md"
        topDivider="dune"
        labelledBy="services-heading"
      >
        <Container>
          <Reveal>
            <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <div>
                <Eyebrow>What we do</Eyebrow>
                <Heading as="h2" size="lg" id="services-heading" className="mt-5">
                  Service lines
                </Heading>
              </div>
              <p className="max-w-[34ch] text-small text-ink-500 md:text-right">
                Five service lines, one company, two offices. Each has its own
                page on this site.
              </p>
            </div>
          </Reveal>

          <ol className="mt-12 border-t border-ink-900/15">
            {homeServices.map((service, index) => (
              <li key={service.href} className="border-b border-ink-900/15">
                <Reveal delay={index * 0.05}>
                  <Link
                    href={service.href}
                    className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-x-4 gap-y-2 py-6 transition-colors duration-200 hover:text-accent-text sm:grid-cols-[3.5rem_1fr_auto] sm:items-center sm:gap-x-6 sm:py-7 lg:grid-cols-[3.5rem_1fr_minmax(0,22rem)_auto]"
                  >
                    <span className="font-display text-[0.95rem] tabular-nums text-ink-500">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-[clamp(1.5rem,1.1rem+1.7vw,2.25rem)] leading-none tracking-[-0.028em]">
                      {service.label}
                    </span>
                    <span className="col-span-2 text-small text-ink-500 lg:col-span-1 lg:col-start-3 lg:justify-self-end lg:text-right">
                      {service.blurb}
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      size={20}
                      strokeWidth={1.5}
                      className="justify-self-end text-ink-500 transition-transform duration-300 ease-strong motion-safe:group-hover:translate-x-1 motion-safe:group-hover:-translate-y-1"
                    />
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="jungle" spacing="md" topDivider="blade" pattern>
        <Container>
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow tone="light">Talk to us</Eyebrow>
                <p className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,1.2rem+4.4vw,4.5rem)] leading-[0.98] tracking-[-0.034em] text-ivory-50">
                  {taglineDisplay}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <div className="border-t border-ivory-50/15 pt-6">
                  <p className="max-w-[38ch] text-small text-ivory-100/70">
                    Call, message or email. Cargo enquiries have their own
                    addresses.
                  </p>
                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Button
                      href={whatsappHref()}
                      external
                      variant="primary"
                      icon={
                        <MessageCircle
                          aria-hidden="true"
                          size={17}
                          strokeWidth={1.75}
                        />
                      }
                      iconPosition="start"
                    >
                      WhatsApp us
                    </Button>
                    <Button href="/contact" variant="ghost" className="text-ivory-50">
                      Contact details
                    </Button>
                  </div>
                  <dl className="mt-8 grid gap-3 text-small text-ivory-100/70 sm:grid-cols-2 lg:grid-cols-1">
                    <div>
                      <dt className="text-micro uppercase text-ivory-100/65">Call</dt>
                      <dd className="mt-1">
                        <a
                          href={contact.phone.href}
                          className="underline-offset-4 hover:text-saffron-300 hover:underline"
                        >
                          {contact.phone.display}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-micro uppercase text-ivory-100/65">Email</dt>
                      <dd className="mt-1">
                        <a
                          href={contact.email.href}
                          className="break-all underline-offset-4 hover:text-saffron-300 hover:underline"
                        >
                          {contact.email.display}
                        </a>
                      </dd>
                    </div>
                  </dl>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </AccentScope>
  );
}
