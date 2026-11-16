"use client";

import { motion } from "motion/react";
import {
  BedDouble,
  Briefcase,
  Cctv,
  CloudRain,
  Droplets,
  Factory,
  House,
  Leaf,
  RadioTower,
  Recycle,
  Refrigerator,
  ShieldCheck,
  Sprout,
  Warehouse,
  Wheat,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  farmFacilities,
  type FarmFacilityIcon,
} from "@/content/farms";
import { revealTransition, revealViewport } from "@/lib/motion";

const headingId = "farm-facilities-heading";

const icons: Record<FarmFacilityIcon, LucideIcon> = {
  residence: House,
  staffHouse: BedDouble,
  offices: Briefcase,
  stores: Warehouse,
  processing: Factory,
  feed: Wheat,
  nursery: Sprout,
  greenhouse: Leaf,
  water: Droplets,
  digester: Recycle,
  coldRoom: Refrigerator,
  irrigation: CloudRain,
  power: Wrench,
  security: ShieldCheck,
  cameras: Cctv,
  tower: RadioTower,
};

/**
 * The sixteen facilities, in the client's order. The grid is the section: one
 * icon, one number, one label, with nothing added that the brief does not say.
 */
export function FarmFacilities() {
  return (
    <Section
      id="farm-facilities"
      tone="sand"
      topDivider="dune"
      spacing="md"
      labelledBy={headingId}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>On the site</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[22ch]"
              >
                Sixteen facilities, one site.
              </Heading>
              <p className="mt-6 max-w-[50ch] text-lead text-ink-700">
                The farm carries its own housing, processing, feed, water, power
                and security. The list below runs through all sixteen.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:justify-self-end">
            <Reveal delay={0.08}>
              <p className="font-display text-[clamp(4rem,3rem+5vw,7rem)] leading-[0.85] tracking-[-0.045em] text-accent-text lg:text-right">
                {farmFacilities.length}
              </p>
              <p className="mt-3 max-w-[20ch] text-small text-ink-500 lg:ml-auto lg:text-right">
                facilities on the farm
              </p>
            </Reveal>
          </div>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-7 sm:grid-cols-2 sm:gap-y-9 lg:mt-14 lg:grid-cols-4">
          {farmFacilities.map((facility, index) => {
            const Icon = icons[facility.icon];
            return (
              <motion.li
                key={facility.label}
                data-reveal=""
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={revealViewport}
                transition={{
                  ...revealTransition,
                  delay: Math.min(index * 0.04, 0.48),
                }}
                className="group border-t border-ink-900/15 pt-4 sm:pt-5"
              >
                <div className="grid grid-cols-[auto_1fr_auto] items-center gap-x-4 gap-y-3 sm:grid-cols-[1fr_auto] sm:items-start">
                  <span className="col-start-1 row-start-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-accent-text transition-colors duration-200 motion-safe:hover-fine:group-hover:bg-clay-500 motion-safe:hover-fine:group-hover:text-ivory-50 motion-reduce:transition-none sm:h-11 sm:w-11">
                    <Icon aria-hidden="true" size={20} strokeWidth={1.6} />
                  </span>
                  <span className="col-start-3 row-start-1 justify-self-end font-display text-small tabular-nums leading-none text-ink-500 sm:col-start-2 sm:row-start-1">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="col-start-2 row-start-1 min-w-0 text-small leading-snug text-ink-800 sm:col-span-2 sm:col-start-1 sm:row-start-2 sm:mt-2">
                    {facility.label}
                  </p>
                </div>
              </motion.li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
