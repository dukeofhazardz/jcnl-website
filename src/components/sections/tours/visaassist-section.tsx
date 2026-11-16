import { Check, MessageCircle, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { whatsappHref } from "@/config/site";
import { tourProducts, visaAssistGroups } from "@/content/tours";

const product = tourProducts[2];

/** VISA-Assist247: the visa types, what is confirmed, and the scam warning. */
export function VisaAssistSection() {
  return (
    <Section
      id={product.id}
      tone="ivory"
      spacing="md"
      labelledBy={`${product.id}-heading`}
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{product.kicker}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={`${product.id}-heading`}
                className="mt-5 max-w-[24ch]"
              >
                VISA-Assist247: the visa file, checked first.
              </Heading>
              <p className="mt-6 max-w-[52ch] text-lead text-ink-700">
                {product.summary}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-8 sm:grid-cols-2">
              {visaAssistGroups.map((group, groupIndex) => (
                <Reveal key={group.heading} delay={0.06 + groupIndex * 0.04}>
                  <h3 className="text-micro font-semibold uppercase text-ink-500">
                    {group.heading}
                  </h3>
                  <ul className="mt-4 space-y-3">
                    {group.items.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check
                          aria-hidden="true"
                          size={17}
                          strokeWidth={2}
                          className="mt-1 shrink-0 text-accent-text"
                        />
                        <span className="text-small text-ink-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.14}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  href={whatsappHref(
                    "Hello JCNL, I would like visa advice from VISA-Assist247.",
                  )}
                  external
                  icon={
                    <MessageCircle
                      aria-hidden="true"
                      size={17}
                      strokeWidth={1.75}
                    />
                  }
                  iconPosition="start"
                >
                  Ask VISA-Assist247
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.08}>
              <div className="aspect-4/3 overflow-hidden rounded-md bg-jungle-950 lg:aspect-4/5">
                <SmartImage
                  src={product.image?.src}
                  alt={product.alt ?? ""}
                  subject={product.image?.subject}
                  role="TOURS"
                  width={product.image?.width}
                  height={product.image?.height}
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  fill
                />
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-6 rounded-md bg-accent-soft p-6 text-ink-900">
                <ShieldCheck
                  aria-hidden="true"
                  size={26}
                  strokeWidth={1.5}
                  className="text-accent-text"
                />
                <p className="mt-4 font-display text-title">
                  Protects you from fraudsters and scammers.
                </p>
                <p className="mt-3 text-small text-ink-700">
                  The advisory is priced at a very competitive fee.
                  Reservations and hotel bookings are confirmed as part of the
                  service.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
