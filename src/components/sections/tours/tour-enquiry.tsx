import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { contact, whatsappHref } from "@/config/site";

/** Closing band. Two real actions, both one tap away. */
export function TourEnquiry() {
  return (
    <Section tone="accent" spacing="md">
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone="ink">Start the trip</Eyebrow>
              <Heading as="h2" size="lg" className="mt-5 max-w-[18ch]">
                Tell us where you are going.
              </Heading>
              <p className="mt-6 max-w-[46ch] text-lead text-ink-800">
                Call the travel desk or send a WhatsApp message with your dates.
                If you already know the product you want, say so: Tour360,
                TRAVELCredit, VISA-Assist247 or LESS 20.0.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href={whatsappHref(
                    "Hello JCNL, I would like to plan a trip. Product:",
                  )}
                  external
                  variant="dark"
                  size="lg"
                  icon={
                    <MessageCircle
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.75}
                    />
                  }
                  iconPosition="start"
                >
                  WhatsApp the travel desk
                </Button>
                <Button
                  href={contact.phone.href}
                  variant="ghost"
                  size="lg"
                  className="border-ink-900/45 text-ink-900 hover:border-ink-900/70 hover:bg-ink-900/5"
                  icon={<Phone aria-hidden="true" size={17} strokeWidth={1.75} />}
                  iconPosition="start"
                >
                  {contact.phone.display}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <dl className="border-t border-ink-900/30 pt-6 text-small">
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="text-micro uppercase text-ink-800">
                    WhatsApp / Call
                  </dt>
                  <dd>
                    <a
                      href={whatsappHref()}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="font-semibold underline-offset-4 hover:underline"
                    >
                      {contact.whatsapp.display}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-1 border-t border-ink-900/20 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="text-micro uppercase text-ink-800">Call</dt>
                  <dd>
                    <a
                      href={contact.phone.href}
                      className="font-semibold underline-offset-4 hover:underline"
                    >
                      {contact.phone.display}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-1 border-t border-ink-900/20 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="text-micro uppercase text-ink-800">Email</dt>
                  <dd>
                    <a
                      href={contact.email.href}
                      className="break-all font-semibold underline-offset-4 hover:underline"
                    >
                      {contact.email.display}
                    </a>
                  </dd>
                </div>
                <div className="flex flex-col gap-1 border-t border-ink-900/20 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className="text-micro uppercase text-ink-800">Details</dt>
                  <dd>
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 font-semibold underline-offset-4 hover:underline"
                    >
                      <Mail aria-hidden="true" size={15} strokeWidth={1.75} />
                      Contact page
                    </Link>
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
