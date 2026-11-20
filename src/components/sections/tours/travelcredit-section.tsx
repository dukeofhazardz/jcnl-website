import { Check, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { whatsappHref } from "@/config/site";
import { tourProducts } from "@/content/tours";

const product = tourProducts[1];

/**
 * TRAVELCredit leads with the one figure the brief supplies and keeps the
 * argument in a single column, so it cannot be mistaken for the Tour360 split.
 */
export function TravelCreditSection() {
  return (
    <Section
      id={product.id}
      tone="ink"
      topDivider="blade"
      spacing="md"
      pattern
      labelledBy={`${product.id}-heading`}
    >
      <Container>
        <Reveal>
          <Eyebrow tone="light">{product.kicker}</Eyebrow>
          <Heading
            as="h2"
            size="lg"
            id={`${product.id}-heading`}
            className="mt-5 max-w-[24ch] text-white"
          >
            TRAVELCredit: travel covered bank to bank.
          </Heading>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <Reveal delay={0.06}>
              <p className="font-display text-[clamp(3.5rem,2rem+6vw,7rem)] leading-[0.9] tracking-[-0.04em] text-sky-300">
                {product.figure?.value}
              </p>
              <p className="mt-4 max-w-[24ch] text-small text-sky-100/75">
                {product.figure?.label}
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-8 max-w-[40ch] border-t border-white/20 pt-6 text-small text-sky-100/75">
                Free seat reservation, ticket issuance and hotel arrangement
                come with the facility.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={0.08}>
              <p className="max-w-[48ch] text-lead text-sky-100/85">
                {product.summary}
              </p>
            </Reveal>

            <Reveal delay={0.12}>
              <ul className="mt-10 grid gap-x-8 gap-y-5 sm:grid-cols-2">
                {product.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-3 border-t border-white/20 pt-4"
                  >
                    <Check
                      aria-hidden="true"
                      size={17}
                      strokeWidth={2}
                      className="shrink-0 text-sky-300"
                    />
                    <span className="text-small text-white">{point}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10">
                <Button
                  href={whatsappHref(
                    "Hello JCNL, I would like to ask about TRAVELCredit.",
                  )}
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
                  Ask about TRAVELCredit
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
