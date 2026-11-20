"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { freightSteps } from "@/content/freight";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const headingId = "freight-route-heading";

/**
 * The route line. On desktop a deep ink band carries one horizontal path that
 * is drawn by scroll progress; the four stations sit on the line. On a phone
 * the same stations run down a vertical rail. Motion only touches pathLength,
 * which the browser paints, and reduced motion shows the full line.
 */
export function FreightRoute() {
  const listRef = useRef<HTMLDivElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 85%", "end 60%"],
  });
  const drawn = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="how-it-moves"
      tone="ink"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow tone="light">{freightSteps.eyebrow}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[22ch]"
              >
                {freightSteps.heading}
              </Heading>
            </Reveal>
          </div>
          <div className="lg:col-span-4">
            <Reveal delay={0.06}>
              <p className="max-w-[34ch] text-small text-white/75 lg:ml-auto">
                {freightSteps.intro}
              </p>
            </Reveal>
          </div>
        </div>

        <div ref={listRef} className="relative mt-14">
          <svg
            aria-hidden="true"
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-0 top-0 hidden h-3 w-3/4 text-sky-300 md:block"
          >
            {reduceMotion ? (
              <path
                d="M0 6 H1000"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
              />
            ) : (
              <motion.path
                d="M0 6 H1000"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                vectorEffect="non-scaling-stroke"
                style={{ pathLength: drawn }}
              />
            )}
          </svg>

          <ol className="grid gap-8 md:grid-cols-4 md:gap-0">
            {freightSteps.items.map((step, index) => (
              <li
                key={step.title}
                className="group relative pl-6 md:pl-0 md:pr-8"
              >
                {/* Phone rail: one segment per station, so the line reads as a
                    single run from step one to step four. */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1.5 -bottom-8 w-px bg-white/25 group-last:hidden md:hidden"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-[-5px] top-1.5 h-2.5 w-2.5 rounded-full bg-sky-300 md:relative md:left-auto md:top-auto md:mb-5 md:block md:h-3 md:w-3 md:ring-8 md:ring-ink-950"
                />
                <p className="text-micro font-semibold uppercase text-sky-300">
                  Step {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 font-display text-title leading-tight">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-[30ch] text-small text-white/75">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
