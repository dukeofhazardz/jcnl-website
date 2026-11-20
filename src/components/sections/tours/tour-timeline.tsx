"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { tourSteps } from "@/content/tours";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/**
 * The Tour360 sequence. The connector is a scroll-linked scaleY, which is a
 * transform and stays on the compositor. Under reduced motion the line is
 * simply drawn and the steps appear without travel.
 */
export function TourTimelineSection() {
  const listRef = useRef<HTMLOListElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 80%", "end 70%"],
  });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="how-tour360-works"
      tone="white"
      topDivider="arch"
      spacing="md"
      labelledBy="tour360-steps-heading"
    >
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+2.5rem)]">
              <Eyebrow>Tour360, step by step</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id="tour360-steps-heading"
                className="mt-5 max-w-[16ch]"
              >
                How Tour360 works.
              </Heading>
              <p className="mt-6 max-w-[34ch] text-small text-ink-500">
                Four stages, from the first deposit to the flight. The savings
                period runs for at least six months, so the plan starts early.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            {/* The rail lives outside the list: an <ol> may only contain <li>. */}
            <div className="relative">
              <span
                aria-hidden="true"
                className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-ink-900/15"
              />
              <motion.span
                aria-hidden="true"
                className="absolute bottom-2 left-[0.6875rem] top-2 w-px origin-top bg-accent-strong"
                style={reduceMotion ? undefined : { scaleY }}
              />
              <ol ref={listRef}>
                {tourSteps.map((step, index) => (
                  <motion.li
                    key={step.title}
                    data-reveal=""
                    className="relative pb-12 pl-12 last:pb-0"
                    initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{
                      duration: 0.5,
                      delay: reduceMotion ? 0 : index * 0.06,
                      ease: [0.23, 1, 0.32, 1],
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute left-0 top-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-accent-strong bg-white"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-accent-strong" />
                    </span>
                    <h3 className="font-display text-title">{step.title}</h3>
                    <p className="mt-2 max-w-[48ch] text-small text-ink-700">
                      {step.body}
                    </p>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
