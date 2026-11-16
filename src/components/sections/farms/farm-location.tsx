import { ArrowUpRight, MapPin } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { mapsHref, offices } from "@/config/site";
import { farm } from "@/content/farms";

const headingId = "farm-location-heading";

/**
 * Where the farm is, with a map search rather than an embedded map: no API key,
 * no third-party script, and the address stays readable as text.
 */
export function FarmLocation() {
  return (
    <Section tone="ivory" spacing="md" labelledBy={headingId}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6 lg:pr-6">
            <Reveal>
              <Eyebrow>Where it is</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id={headingId}
                className="mt-5 max-w-[18ch]"
              >
                The farm is in Ogun State.
              </Heading>
              <p className="mt-6 max-w-[48ch] text-lead text-ink-700">
                Idiagbon Village, Iju-Ota, inside{" "}
                <span className="whitespace-nowrap">Ado-Odo/Ota</span> Local
                Government Area. Search the address to see the site on a map.
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="mt-9 border-t border-ink-900/15 pt-5">
                <p className="text-small text-ink-700">
                  JCNL works from offices in{" "}
                  {offices.map((office) => office.city).join(" and ")}.
                </p>
                <Link
                  href="/contact"
                  className="mt-3 inline-flex items-center gap-2 text-small font-semibold text-ink-700 underline-offset-4 hover:text-accent-text hover:underline"
                >
                  Office details
                  <ArrowUpRight
                    aria-hidden="true"
                    size={15}
                    strokeWidth={1.75}
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.06}>
              <div className="overflow-hidden rounded-md border border-ink-900/15 bg-ivory-50">
                <div className="relative h-40 bg-accent-soft/70 sm:h-48">
                  <GeometricPattern
                    variant="lattice"
                    className="absolute inset-0 text-clay-500 opacity-25"
                  />
                  <span className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-clay-500 text-ivory-50 ring-8 ring-clay-500/15">
                    <MapPin aria-hidden="true" size={22} strokeWidth={1.75} />
                  </span>
                </div>

                <div className="p-6 sm:p-8">
                  <p className="text-micro font-semibold uppercase text-ink-500">
                    Farm address
                  </p>
                  <address className="mt-4 not-italic">
                    <p className="font-display text-title leading-tight text-ink-900">
                      {farm.name}
                    </p>
                    {farm.addressLines.map((line) => (
                      <span key={line} className="mt-1 block text-small text-ink-700">
                        {line}
                      </span>
                    ))}
                  </address>

                  <div className="mt-6 border-t border-ink-900/15 pt-6">
                    <Button
                      href={mapsHref(farm.query)}
                      external
                      variant="dark"
                      icon={
                        <ArrowUpRight
                          aria-hidden="true"
                          size={17}
                          strokeWidth={1.75}
                        />
                      }
                    >
                      Search on Google Maps
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
