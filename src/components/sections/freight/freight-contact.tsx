import { ArrowUpRight, MessageCircle } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  contact,
  mailHref,
  whatsappHref,
} from "@/config/site";
import { freightContact } from "@/content/freight";

const headingId = "freight-contact-heading";

/** The cargo desk, with the number the brief names for freight and both emails. */
export function FreightContact() {
  return (
    <Section tone="ivory" spacing="sm" labelledBy={headingId}>
      <Container>
        <div className="grid gap-10 border-t border-ink-900/15 pt-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <Reveal>
              <Eyebrow>{freightContact.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="md"
                id={headingId}
                className="mt-4 max-w-[16ch]"
              >
                {freightContact.heading}
              </Heading>
              <p className="mt-4 max-w-[38ch] text-small text-ink-700">
                {freightContact.body}
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-8">
            <Reveal delay={0.06}>
              <dl>
                <div className="grid gap-2 border-b border-ink-900/15 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-micro font-semibold uppercase text-ink-500">
                    Call or WhatsApp
                  </dt>
                  <dd>
                    <a
                      href={contact.whatsapp.href}
                      className="block w-fit font-display text-title leading-none underline-offset-4 hover:text-accent-text hover:underline"
                    >
                      {contact.whatsapp.display}
                    </a>
                    <a
                      href={whatsappHref(
                        "Hello JCNL, I would like to ask about cargo and freight.",
                      )}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mt-2.5 inline-flex items-center gap-1.5 text-small font-semibold text-accent-text underline-offset-4 hover:underline"
                    >
                      <MessageCircle
                        aria-hidden="true"
                        size={15}
                        strokeWidth={1.75}
                      />
                      Open WhatsApp
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>

                <div className="grid gap-2 border-b border-ink-900/15 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
                  <dt className="text-micro font-semibold uppercase text-ink-500">
                    Cargo email
                  </dt>
                  <dd className="flex flex-col gap-2">
                    {contact.cargoEmails.map((address) => (
                      <a
                        key={address}
                        href={mailHref(address)}
                        className="inline-flex w-fit max-w-full items-center gap-1.5 break-all text-small font-semibold text-ink-800 underline-offset-4 hover:text-accent-text hover:underline"
                      >
                        {address}
                        <ArrowUpRight
                          aria-hidden="true"
                          size={14}
                          strokeWidth={1.75}
                          className="shrink-0"
                        />
                      </a>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
