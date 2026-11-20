import { ArrowDown, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ClientTodo } from "@/components/ui/client-todo";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { realEstatePage } from "@/content/real-estate";
import { whatsappHref } from "@/config/site";

const copy = realEstatePage.intro;

/** What JCNL offers, in plain terms, and what is still outstanding. */
export function RealEstateIntro() {
  return (
    <Section
      tone="white"
      topDivider="arch"
      spacing="md"
      labelledBy="real-estate-intro"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow>{copy.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id="real-estate-intro"
                className="mt-5 max-w-[16ch]"
              >
                {copy.heading}
              </Heading>
              <p className="mt-6 max-w-[48ch] text-lead text-ink-700">
                {copy.body}
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Button
                  href="#properties"
                  size="lg"
                  icon={
                    <ArrowDown aria-hidden="true" size={18} strokeWidth={1.75} />
                  }
                >
                  {copy.browse}
                </Button>
                <Button
                  href={whatsappHref(copy.whatsappMessage)}
                  external
                  variant="ghost"
                  size="lg"
                  className="border-ink-900/30 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/5"
                  icon={
                    <MessageCircle
                      aria-hidden="true"
                      size={18}
                      strokeWidth={1.75}
                    />
                  }
                  iconPosition="start"
                >
                  {copy.whatsappLabel}
                </Button>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-5">
            <Reveal delay={0.12}>
              <div className="border-t border-ink-900/15 pt-6">
                <p className="max-w-[42ch] text-small text-ink-700">
                  {copy.support}
                </p>

                <dl className="mt-8 grid gap-3 text-small">
                  {copy.facts.map((fact) => (
                    <div
                      key={fact.label}
                      className="flex items-baseline justify-between gap-4 border-b border-ink-900/10 pb-3"
                    >
                      <dt className="text-micro uppercase text-ink-500">
                        {fact.label}
                      </dt>
                      <dd className="text-right text-ink-900">{fact.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-8 rounded-md border border-accent-text/25 bg-accent-soft/60 p-4">
                <ClientTodo>{copy.noteTitle}</ClientTodo>
                <p className="mt-3 text-small text-ink-700">{copy.note}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
