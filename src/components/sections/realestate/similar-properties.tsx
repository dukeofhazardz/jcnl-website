import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { PropertyCard } from "@/components/sections/realestate/property-card";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { realEstatePage } from "@/content/real-estate";
import type { Property } from "@/content/properties";

const copy = realEstatePage.detail;

export function SimilarProperties({
  properties,
}: {
  properties: readonly Property[];
}) {
  if (properties.length === 0) return null;

  return (
    <Section
      tone="sand"
      topDivider="dune"
      spacing="md"
      labelledBy="similar-properties"
    >
      <Container>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{copy.similarEyebrow}</Eyebrow>
            <Heading
              as="h2"
              size="lg"
              id="similar-properties"
              className="mt-5"
            >
              {copy.similarHeading}
            </Heading>
          </div>

          <Link
            href="/real-estate#properties"
            className="group inline-flex items-center gap-1.5 text-small font-semibold text-accent-text underline-offset-4 hover:underline"
          >
            {copy.backLabel}
            <ArrowUpRight
              aria-hidden="true"
              size={15}
              strokeWidth={1.75}
              className="transition-transform duration-300 ease-strong motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        <ul className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {properties.map((property, index) => (
            <li key={property.id} className="h-full">
              <Reveal delay={index * 0.06} className="h-full">
                <PropertyCard property={property} />
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
