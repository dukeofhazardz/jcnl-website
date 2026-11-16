import { Mail, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { contact, whatsappHref } from "@/config/site";

type BandTextTone = "ink" | "ivory";

/**
 * Two text tones, because the band sits on the page accent: saffron carries
 * ink, leaf carries ivory. Both pairings are checked against WCAG AA. The
 * contact block is identical in every tone, so the numbers cannot drift
 * between pages.
 */
const tones = {
  ink: {
    eyebrow: "ink",
    body: "text-ink-800",
    rule: "border-ink-900/30",
    rowRule: "border-ink-900/20",
    label: "text-ink-800",
    button: "dark",
    ghost:
      "border-ink-900/45 text-ink-900 hover:border-ink-900/70 hover:bg-ink-900/5",
  },
  ivory: {
    eyebrow: "ivory",
    body: "text-ivory-100",
    rule: "border-ivory-50/30",
    rowRule: "border-ivory-50/20",
    label: "text-ivory-100",
    button: "primary",
    ghost:
      "border-ivory-50/45 text-ivory-50 hover:border-ivory-50/80 hover:bg-ivory-50/10",
  },
} as const;

/**
 * Closing band for a service page. Two real actions on the left, the contact
 * details on the right, and nothing that looks like a form.
 */
export function EnquiryBand({
  eyebrow,
  heading,
  body,
  whatsappLabel,
  whatsappMessage,
  textTone = "ink",
  headingId,
}: {
  eyebrow: string;
  heading: string;
  body: string;
  whatsappLabel: string;
  whatsappMessage: string;
  textTone?: BandTextTone;
  headingId?: string;
}) {
  const tone = tones[textTone];

  return (
    <Section tone="accent" spacing="md" labelledBy={headingId}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow tone={tone.eyebrow}>{eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[18ch]"
              >
                {heading}
              </Heading>
              <p className={`mt-6 max-w-[46ch] text-lead ${tone.body}`}>
                {body}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href={whatsappHref(whatsappMessage)}
                  external
                  variant={tone.button}
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
                  {whatsappLabel}
                </Button>
                <Button
                  href={contact.phone.href}
                  variant="ghost"
                  size="lg"
                  className={tone.ghost}
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
              <dl className={`border-t pt-6 text-small ${tone.rule}`}>
                <div className="flex flex-col gap-1 py-3 sm:flex-row sm:items-baseline sm:justify-between">
                  <dt className={`text-micro uppercase ${tone.label}`}>
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
                <div
                  className={`flex flex-col gap-1 border-t py-3 sm:flex-row sm:items-baseline sm:justify-between ${tone.rowRule}`}
                >
                  <dt className={`text-micro uppercase ${tone.label}`}>Call</dt>
                  <dd>
                    <a
                      href={contact.phone.href}
                      className="font-semibold underline-offset-4 hover:underline"
                    >
                      {contact.phone.display}
                    </a>
                  </dd>
                </div>
                <div
                  className={`flex flex-col gap-1 border-t py-3 sm:flex-row sm:items-baseline sm:justify-between ${tone.rowRule}`}
                >
                  <dt className={`text-micro uppercase ${tone.label}`}>Email</dt>
                  <dd>
                    <a
                      href={contact.email.href}
                      className="break-all font-semibold underline-offset-4 hover:underline"
                    >
                      {contact.email.display}
                    </a>
                  </dd>
                </div>
                <div
                  className={`flex flex-col gap-1 border-t py-3 sm:flex-row sm:items-baseline sm:justify-between ${tone.rowRule}`}
                >
                  <dt className={`text-micro uppercase ${tone.label}`}>Details</dt>
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
