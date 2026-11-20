import {
  Banknote,
  CarFront,
  ClipboardList,
  FileText,
  Globe,
  Luggage,
  Plane,
  Send,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Ticket,
  Umbrella,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import {
  less20Items,
  tourProducts,
  type Less20Icon,
} from "@/content/tours";

const product = tourProducts[3];

const icons: Record<Less20Icon, LucideIcon> = {
  insurance: ShieldCheck,
  conference: Users,
  leisure: Umbrella,
  delivery: Send,
  emergency: Siren,
  aircraft: Plane,
  tickets: Ticket,
  transfers: Luggage,
  chauffeur: CarFront,
  currency: Banknote,
  reports: FileText,
  policy: ClipboardList,
  crisis: ShieldAlert,
  club: Globe,
};

/**
 * LESS 20.0. The brief calls for an icon grid, so the grid is the section: one
 * label per service, the discount stated once and nowhere repeated.
 */
export function Less20Section() {
  return (
    <Section
      id={product.id}
      tone="tint"
      topDivider="wave"
      spacing="md"
      labelledBy={`${product.id}-heading`}
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-8">
            <Reveal>
              <Eyebrow>{product.kicker}</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={`${product.id}-heading`}
                className="mt-5 max-w-[26ch]"
              >
                LESS 20.0: 20% less on other services.
              </Heading>
              <p className="mt-6 max-w-[48ch] text-lead text-ink-700">
                {product.summary}
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-4 lg:justify-self-end">
            <Reveal delay={0.08}>
              <p className="font-display text-[clamp(4rem,3rem+5vw,7rem)] leading-[0.85] tracking-[-0.045em] text-accent-text lg:text-right">
                {product.figure?.value}
              </p>
              <p className="mt-3 max-w-[20ch] text-small text-ink-500 lg:ml-auto lg:text-right">
                {product.figure?.label}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <ul className="mt-12 grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {less20Items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li
                  key={item.label}
                  className="flex items-start gap-4 border-t border-ink-900/15 py-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-accent-soft text-accent-text">
                    <Icon aria-hidden="true" size={19} strokeWidth={1.75} />
                  </span>
                  <span className="pt-1.5 text-small text-ink-700">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}
