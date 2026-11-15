import { Mail, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { contact, whatsappHref } from "@/config/site";

/**
 * Honest "in preparation" block for pages whose real content lands in a later
 * phase. It never invents service detail: it states the page is being built and
 * routes the visitor to a human.
 */
export function StubNotice({ service }: { service: string }) {
  return (
    <Section tone="sand" spacing="md" topDivider="arch">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Eyebrow>Page in preparation</Eyebrow>
            <Heading as="h2" size="lg" className="mt-6 max-w-[22ch]">
              The {service} page is being built.
            </Heading>
            <p className="mt-6 max-w-[52ch] text-body text-ink-700">
              This part of the site is still being rebuilt. The work, the team
              and the contact details are unchanged, so call, message or email
              and you will reach us directly.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                href={whatsappHref(`Hello JCNL, I would like to ask about ${service}.`)}
                external
                variant="primary"
                icon={<MessageCircle aria-hidden="true" size={17} strokeWidth={1.75} />}
                iconPosition="start"
              >
                WhatsApp us
              </Button>
              <Button href="/contact" variant="ghost" size="md">
                Contact details
              </Button>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-ink-900/15 pt-6 lg:mt-2">
              <h3 className="text-micro font-semibold uppercase text-ink-500">
                Direct lines
              </h3>
              <ul className="mt-5 divide-y divide-ink-900/10">
                <li>
                  <a
                    href={contact.phone.href}
                    className="flex items-center gap-3 py-4 text-small text-ink-800 transition-colors duration-200 hover:text-accent-text"
                  >
                    <Phone
                      aria-hidden="true"
                      size={16}
                      strokeWidth={1.6}
                      className="shrink-0 text-ink-500"
                    />
                    <span className="flex-1">{contact.phone.display}</span>
                    <span className="text-micro uppercase text-ink-500">Call</span>
                  </a>
                </li>
                <li>
                  <a
                    href={whatsappHref()}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex items-center gap-3 py-4 text-small text-ink-800 transition-colors duration-200 hover:text-accent-text"
                  >
                    <MessageCircle
                      aria-hidden="true"
                      size={16}
                      strokeWidth={1.6}
                      className="shrink-0 text-ink-500"
                    />
                    <span className="flex-1">{contact.whatsapp.display}</span>
                    <span className="text-micro uppercase text-ink-500">
                      WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href={contact.email.href}
                    className="flex items-center gap-3 py-4 text-small text-ink-800 transition-colors duration-200 hover:text-accent-text"
                  >
                    <Mail
                      aria-hidden="true"
                      size={16}
                      strokeWidth={1.6}
                      className="shrink-0 text-ink-500"
                    />
                    <span className="flex-1 break-all">{contact.email.display}</span>
                    <span className="text-micro uppercase text-ink-500">Email</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
