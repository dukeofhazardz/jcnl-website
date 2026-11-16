import { ArrowRight, Check, MessageCircle, Phone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Parallax } from "@/components/ui/parallax";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { contact, whatsappHref } from "@/config/site";
import { tourProducts } from "@/content/tours";

const product = tourProducts[0];

/** Tour360: image left, argument right, the six-month figure set large. */
export function Tour360Section() {
  return (
    <Section
      id={product.id}
      tone="sand"
      topDivider="dune"
      spacing="md"
      labelledBy={`${product.id}-heading`}
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <div className="order-2 lg:col-span-5 lg:order-2">
            <Reveal>
              <Parallax className="aspect-4/5 overflow-hidden rounded-md bg-jungle-950">
                <SmartImage
                  src={product.image?.src}
                  alt={product.alt ?? ""}
                  subject={product.image?.subject}
                  role="TOURS"
                  width={product.image?.width}
                  height={product.image?.height}
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  fill
                />
              </Parallax>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="mt-6 flex flex-col gap-2 border-t border-ink-900/15 pt-5 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="whitespace-nowrap font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.25rem)] leading-none tracking-[-0.03em] text-accent-text">
                  {product.figure?.value}
                </span>
                <span className="max-w-[22ch] text-small text-ink-500">
                  {product.figure?.label}
                </span>
              </div>
            </Reveal>
          </div>

          <div className="order-1 lg:col-span-7 lg:order-1 lg:pr-6">
            <Reveal>
              <Eyebrow>{product.kicker}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={`${product.id}-heading`}
                className="mt-5 max-w-[22ch]"
              >
                Tour360: save first, travel later.
              </Heading>
              <p className="mt-6 max-w-[52ch] text-lead text-ink-700">
                {product.summary}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <ul className="mt-9 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                {product.points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check
                      aria-hidden="true"
                      size={17}
                      strokeWidth={2}
                      className="mt-1 shrink-0 text-accent-text"
                    />
                    <span className="text-small text-ink-700">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.12}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Button
                  href={whatsappHref(
                    "Hello JCNL, I would like to plan a Tour360 trip.",
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
                  WhatsApp the travel desk
                </Button>
                <Button
                  href={contact.phone.href}
                  variant="ghost"
                  icon={<Phone aria-hidden="true" size={16} strokeWidth={1.75} />}
                  iconPosition="start"
                >
                  {contact.phone.display}
                </Button>
              </div>
              <a
                href="#how-tour360-works"
                className="mt-7 inline-flex items-center gap-2 text-small font-semibold text-ink-700 underline-offset-4 hover:text-accent-text hover:underline"
              >
                How Tour360 works
                <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
