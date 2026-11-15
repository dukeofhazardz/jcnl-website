import type { Metadata } from "next";
import { ArrowUpRight, Mail, MessageCircle, Phone } from "lucide-react";

import { AccentScope } from "@/components/sections/accent-scope";
import { PageIntro } from "@/components/sections/page-intro";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { pageIntro } from "@/content/page-copy";
import {
  contact,
  mailHref,
  mapsHref,
  offices,
  socials,
  whatsappHref,
} from "@/config/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Call, WhatsApp or email JCNL. Offices in Gwarinpa, Abuja and Lagos Island, Lagos. Cargo enquiries have their own email addresses.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const intro = pageIntro.contact;

  return (
    <AccentScope accent={intro.accent}>
      <PageIntro
        eyebrow={intro.eyebrow}
        title={intro.title}
        sub={intro.sub}
        actions={
          <Button
            href={whatsappHref()}
            external
            variant="primary"
            icon={<MessageCircle aria-hidden="true" size={17} strokeWidth={1.75} />}
            iconPosition="start"
          >
            WhatsApp us
          </Button>
        }
      />

      <Section tone="ivory" topDivider="arch" spacing="md" labelledBy="offices-heading">
        <Container>
          <Reveal>
            <Eyebrow>Offices</Eyebrow>
            <Heading as="h2" size="lg" id="offices-heading" className="mt-5">
              Abuja and Lagos
            </Heading>
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
                    className="mt-5 inline-flex items-center gap-1.5 text-small font-medium text-accent-text underline-offset-4 hover:underline"
                  >
                    Open in Maps
                    <ArrowUpRight aria-hidden="true" size={14} strokeWidth={1.75} />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="sand" spacing="md" topDivider="dune" labelledBy="channels-heading">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Channels</Eyebrow>
                <Heading as="h2" size="lg" id="channels-heading" className="mt-5">
                  Reach us directly
                </Heading>
                <p className="mt-5 max-w-[34ch] text-small text-ink-500">
                  Phone and WhatsApp are answered by the team. Cargo enquiries
                  have their own addresses.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={0.08}>
                <dl className="border-t border-ink-900/15">
                  <div className="grid gap-1 border-b border-ink-900/15 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="text-micro uppercase text-ink-500">Call</dt>
                    <dd>
                      <a
                        href={contact.phone.href}
                        className="inline-flex items-center gap-2.5 text-body text-ink-900 underline-offset-4 hover:text-accent-text hover:underline"
                      >
                        <Phone
                          aria-hidden="true"
                          size={16}
                          strokeWidth={1.6}
                          className="text-ink-500"
                        />
                        {contact.phone.display}
                      </a>
                    </dd>
                  </div>

                  <div className="grid gap-1 border-b border-ink-900/15 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="text-micro uppercase text-ink-500">
                      WhatsApp
                    </dt>
                    <dd>
                      <a
                        href={whatsappHref()}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-2.5 text-body text-ink-900 underline-offset-4 hover:text-accent-text hover:underline"
                      >
                        <MessageCircle
                          aria-hidden="true"
                          size={16}
                          strokeWidth={1.6}
                          className="text-ink-500"
                        />
                        {contact.whatsapp.display}
                        <span className="sr-only"> (opens in a new tab)</span>
                      </a>
                      <p className="mt-1.5 text-small text-ink-500">
                        Click-to-chat opens WhatsApp with a message ready to
                        send.
                      </p>
                    </dd>
                  </div>

                  <div className="grid gap-1 border-b border-ink-900/15 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="text-micro uppercase text-ink-500">Email</dt>
                    <dd>
                      <a
                        href={contact.email.href}
                        className="inline-flex items-center gap-2.5 break-words text-body text-ink-900 underline-offset-4 hover:text-accent-text hover:underline"
                      >
                        <Mail
                          aria-hidden="true"
                          size={16}
                          strokeWidth={1.6}
                          className="shrink-0 text-ink-500"
                        />
                        {contact.email.display}
                      </a>
                    </dd>
                  </div>

                  <div className="grid gap-1 border-b border-ink-900/15 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="text-micro uppercase text-ink-500">
                      Cargo enquiries
                    </dt>
                    <dd>
                      <ul className="space-y-1.5">
                        {contact.cargoEmails.map((email) => (
                          <li key={email}>
                            <a
                              href={mailHref(email)}
                              className="break-words text-body text-ink-900 underline-offset-4 hover:text-accent-text hover:underline"
                            >
                              {email}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>

                  <div className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                    <dt className="text-micro uppercase text-ink-500">Elsewhere</dt>
                    <dd>
                      <ul className="space-y-1.5">
                        {socials.map((social) => (
                          <li key={social.label}>
                            <a
                              href={social.href}
                              target="_blank"
                              rel="noreferrer noopener"
                              className="inline-flex items-center gap-1.5 text-body text-ink-900 underline-offset-4 hover:text-accent-text hover:underline"
                            >
                              {social.label} {social.handle}
                              <ArrowUpRight
                                aria-hidden="true"
                                size={14}
                                strokeWidth={1.75}
                              />
                              <span className="sr-only">
                                {" "}
                                (opens in a new tab)
                              </span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </AccentScope>
  );
}
