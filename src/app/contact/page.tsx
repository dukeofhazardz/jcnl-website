/**
 * Contact page.
 *
 * Four hero slides, two office cards, four direct channels, the message form,
 * a WhatsApp band and the closing tagline. Every fact comes from
 * `src/config/site.ts`; every line of copy lives in `src/content/contact.ts`.
 * The form keeps `useSearchParams` inside Suspense so the route stays static.
 */
import type { Metadata } from "next";
import {
  ArrowUpRight,
  AtSign,
  Mail,
  MessageCircle,
  Phone,
  type LucideIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { AccentScope } from "@/components/sections/accent-scope";
import { ContactForm } from "@/components/sections/contact/contact-form";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { contactPage } from "@/content/contact";
import { pageMeta } from "@/content/page-copy";
import { heroSlides } from "@/content/slides";
import {
  contact,
  mailHref,
  mapsHref,
  offices,
  socials,
  taglineDisplay,
  whatsappHref,
} from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, WhatsApp or email JCNL. Visit the offices in Gwarinpa, Abuja and Lagos Island, Lagos. Send a message about Visa & Tours, Business Services, Cargo & Freight, Integrated Farms or Engineering.",
  alternates: { canonical: "/contact" },
};

function Channel({
  icon: Icon,
  label,
  note,
  children,
}: {
  icon: LucideIcon;
  label: string;
  note: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-ink-900/20 pt-5">
      <p className="flex items-center gap-2 text-micro font-semibold uppercase text-ink-500">
        <Icon aria-hidden="true" size={14} strokeWidth={1.75} />
        {label}
      </p>
      <div className="mt-3 text-body text-ink-900">{children}</div>
      <p className="mt-2 text-small text-ink-500">{note}</p>
    </div>
  );
}

export default function ContactPage() {
  const meta = pageMeta.contact;

  return (
    <AccentScope accent={meta.accent}>
      <HeroCarousel
        slides={heroSlides.contact}
        eyebrow={meta.eyebrow}
        label={meta.label}
        accent={meta.accent}
      />

      <Section
        tone="ivory"
        topDivider="arch"
        spacing="md"
        labelledBy="offices-heading"
      >
        <Container>
          <Reveal>
            <Eyebrow>{contactPage.offices.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" id="offices-heading" className="mt-5">
              {contactPage.offices.heading}
            </Heading>
            <p className="mt-5 max-w-[46ch] text-lead text-ink-700">
              {contactPage.offices.intro}
            </p>
          </Reveal>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:gap-12">
            {offices.map((office, index) => (
              <Reveal key={office.city} delay={index * 0.08}>
                <div className="border-t border-ink-900/20 pt-6">
                  <h3 className="font-display text-[clamp(1.75rem,1.4rem+1.5vw,2.5rem)] leading-none tracking-[-0.03em]">
                    {office.city}
                  </h3>
                  <address className="mt-4 not-italic text-body leading-relaxed text-ink-700">
                    {office.lines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </address>
                  <a
                    href={mapsHref(office.query)}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-5 inline-flex items-center gap-1.5 text-small font-medium text-accent-text underline-offset-4 hover-fine:underline"
                  >
                    {contactPage.offices.mapsLabel}
                    <ArrowUpRight
                      aria-hidden="true"
                      size={14}
                      strokeWidth={1.75}
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section
        id="channels"
        tone="sand"
        spacing="md"
        topDivider="dune"
        labelledBy="channels-heading"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>{contactPage.channels.eyebrow}</Eyebrow>
                <Heading
                  as="h2"
                  size="lg"
                  id="channels-heading"
                  className="mt-5"
                >
                  {contactPage.channels.heading}
                </Heading>
                <p className="mt-5 max-w-[34ch] text-small text-ink-500">
                  {contactPage.channels.intro}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={0.08}>
                <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                  <Channel
                    icon={Phone}
                    label={contactPage.channels.labels.call}
                    note={contactPage.channels.notes.call}
                  >
                    <a
                      href={contact.phone.href}
                      className="font-display text-title leading-none tracking-[-0.02em] underline-offset-4 hover-fine:text-accent-text hover-fine:underline"
                    >
                      {contact.phone.display}
                    </a>
                  </Channel>

                  <Channel
                    icon={MessageCircle}
                    label={contactPage.channels.labels.whatsapp}
                    note={contactPage.channels.notes.whatsapp}
                  >
                    <a
                      href={whatsappHref()}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-display text-title leading-none tracking-[-0.02em] underline-offset-4 hover-fine:text-accent-text hover-fine:underline"
                    >
                      {contact.whatsapp.display}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </Channel>

                  <Channel
                    icon={Mail}
                    label={contactPage.channels.labels.email}
                    note={contactPage.channels.notes.email}
                  >
                    <a
                      href={contact.email.href}
                      className="break-words text-body underline-offset-4 hover-fine:text-accent-text hover-fine:underline"
                    >
                      {contact.email.display}
                    </a>
                  </Channel>

                  {socials.map((social) => (
                    <Channel
                      key={social.href}
                      icon={AtSign}
                      label={social.label}
                      note={contactPage.channels.notes.social}
                    >
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="text-body underline-offset-4 hover-fine:text-accent-text hover-fine:underline"
                      >
                        {social.handle}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                    </Channel>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.14}>
                <div className="mt-10 border-t border-ink-900/20 pt-5">
                  <p className="text-micro font-semibold uppercase text-ink-500">
                    {contactPage.channels.labels.cargo}
                  </p>
                  <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
                    {contact.cargoEmails.map((email) => (
                      <li key={email}>
                        <a
                          href={mailHref(email)}
                          className="break-words text-body underline-offset-4 hover-fine:text-accent-text hover-fine:underline"
                        >
                          {email}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-small text-ink-500">
                    {contactPage.channels.notes.cargo}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <ContactForm />

      <Section
        tone="accent"
        topDivider="blade"
        spacing="md"
        labelledBy="whatsapp-heading"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow tone="ink">{contactPage.whatsapp.eyebrow}</Eyebrow>
                <Heading
                  as="h2"
                  size="xl"
                  id="whatsapp-heading"
                  className="mt-5 max-w-[14ch]"
                >
                  {contactPage.whatsapp.heading}
                </Heading>
                <p className="mt-5 max-w-[46ch] text-lead text-ink-900/80">
                  {contactPage.whatsapp.body}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <Button
                  href={whatsappHref()}
                  external
                  variant="dark"
                  size="lg"
                  fullWidth
                  icon={
                    <MessageCircle
                      aria-hidden="true"
                      size={20}
                      strokeWidth={1.75}
                    />
                  }
                  iconPosition="start"
                  className="text-body"
                >
                  {contactPage.whatsapp.button}
                </Button>
                <p className="mt-4 text-small text-ink-900/80">
                  {contactPage.whatsapp.note}
                </p>
                <p className="mt-5 border-t border-ink-900/20 pt-4 text-small text-ink-900/80">
                  {contactPage.whatsapp.callLead}{" "}
                  <a
                    href={contact.whatsapp.href}
                    className="font-semibold underline-offset-4 hover-fine:underline"
                  >
                    {contact.whatsapp.display}
                  </a>
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Section
        tone="jungle"
        spacing="md"
        topDivider="arch"
        pattern
        labelledBy="contact-tagline"
      >
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
            <div className="lg:col-span-8">
              <Reveal>
                <Eyebrow tone="light">{contactPage.tagline.eyebrow}</Eyebrow>
                <h2
                  id="contact-tagline"
                  className="mt-6 max-w-[18ch] font-display text-[clamp(2.25rem,1.2rem+4.4vw,4.5rem)] leading-[0.98] tracking-[-0.034em] text-ivory-50"
                >
                  {taglineDisplay}
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-4">
              <Reveal delay={0.08}>
                <p className="font-display text-title leading-tight text-ivory-50">
                  {contactPage.tagline.lead}
                </p>
                <p className="mt-3 max-w-[34ch] text-small text-ivory-100/70">
                  {contactPage.tagline.support}
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </AccentScope>
  );
}
