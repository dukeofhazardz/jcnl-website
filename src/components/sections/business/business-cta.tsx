import { ArrowUpRight, MessageCircle } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { contact, whatsappHref } from "@/config/site";
import {
  businessCta,
  businessIntents,
  intentHref,
} from "@/content/business-services";
import { cn } from "@/lib/cn";

const headingId = "business-cta-heading";

/**
 * The two enquiry paths. The label is the link text and nothing else, so the
 * accessible name is exactly the label the client supplied. The card around it
 * is stretched with `after:absolute`, which keeps one link per card and a large
 * pointer target without repeating the text.
 */
export function BusinessCta() {
  return (
    <Section
      id="start"
      tone="sand"
      topDivider="wave"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="max-w-[52ch]">
          <Reveal>
            <Eyebrow>{businessCta.eyebrow}</Eyebrow>
            <Heading as="h2" size="lg" id={headingId} className="mt-5">
              {businessCta.heading}
            </Heading>
            <p className="mt-6 text-lead text-ink-700">{businessCta.body}</p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 sm:gap-5">
          {businessIntents.map((intent, index) => (
            <Reveal key={intent.id} delay={index * 0.07} className="h-full">
              <article
                className={cn(
                  "group relative flex h-full flex-col overflow-hidden rounded-md p-6 transition-colors duration-200 motion-reduce:transition-none sm:p-8",
                  index === 0
                    ? "bg-accent text-accent-ink hover-fine:bg-accent-strong"
                    : "border border-ink-900/15 bg-ivory-50 text-ink-900 hover-fine:bg-ivory-100",
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "block h-px w-12",
                    index === 0
                      ? "bg-[var(--accent-bright)]"
                      : "bg-accent",
                  )}
                />

                <p
                  className={cn(
                    "mt-5 text-micro font-semibold uppercase",
                    index === 0 ? "text-ivory-100" : "text-ink-500",
                  )}
                >
                  {businessCta.pathLabels[index] ?? "Path"}
                </p>

                <h3 className="mt-3 max-w-[24ch] font-display text-title leading-tight">
                  <Link
                    href={intentHref(intent)}
                    className="after:absolute after:inset-0 after:content-['']"
                  >
                    {intent.label}
                  </Link>
                </h3>

                <p
                  className={cn(
                    "mt-4 max-w-[38ch] text-small",
                    index === 0 ? "text-ivory-100" : "text-ink-700",
                  )}
                >
                  {intent.body}
                </p>

                <span
                  aria-hidden="true"
                  className="mt-auto flex items-center gap-2 pt-8 text-small font-semibold"
                >
                  {businessCta.linkLabel}
                  <ArrowUpRight
                    size={16}
                    strokeWidth={1.75}
                    className="transition-transform duration-200 ease-strong motion-safe:hover-fine:group-hover:translate-x-0.5 motion-safe:hover-fine:group-hover:-translate-y-0.5 motion-reduce:transition-none"
                  />
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 border-t border-ink-900/15 pt-5 text-small text-ink-700">
            <span>{businessCta.talkFirst.lead}</span>
            <a
              href={contact.phone.href}
              className="font-semibold underline-offset-4 hover-fine:underline"
            >
              {businessCta.talkFirst.call} {contact.phone.display}
            </a>
            <span aria-hidden="true" className="text-ink-500">
              {businessCta.talkFirst.or}
            </span>
            <a
              href={whatsappHref(businessCta.whatsappMessage)}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover-fine:underline"
            >
              <MessageCircle aria-hidden="true" size={15} strokeWidth={1.75} />
              {businessCta.talkFirst.whatsapp}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
