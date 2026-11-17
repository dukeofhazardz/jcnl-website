import Link from "next/link";
import { ArrowLeft, ChevronRight, MapPin } from "lucide-react";

import { Container } from "@/components/ui/container";
import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { realEstatePage } from "@/content/real-estate";
import {
  formatPropertyPrice,
  propertyLocationLabel,
  propertyStatusLabels,
  propertyTypeLabels,
  type Property,
} from "@/content/properties";
import { cn } from "@/lib/cn";

const copy = realEstatePage.detail;

/**
 * Dark masthead instead of a hero: the listing must lead with its own facts, and
 * the transparent header stays legible over the deep jungle ground.
 */
export function PropertyMasthead({ property }: { property: Property }) {
  return (
    <section className="relative isolate overflow-hidden bg-field pb-16 pt-[calc(var(--header-h)+2.5rem)] text-ivory-50 sm:pb-20 sm:pt-[calc(var(--header-h)+3.5rem)]">
      <GeometricPattern
        variant="lattice"
        className="absolute inset-0 -z-10 text-[var(--accent-soft)] opacity-[0.07]"
      />

      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label={copy.breadcrumbLabel}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-micro uppercase text-ivory-100/65">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-200 hover:text-ivory-50"
                >
                  {copy.breadcrumbHome}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={12} strokeWidth={2} />
              </li>
              <li>
                <Link
                  href="/real-estate"
                  className="transition-colors duration-200 hover:text-ivory-50"
                >
                  {copy.breadcrumbParent}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={12} strokeWidth={2} />
              </li>
              <li aria-current="page" className="text-ivory-50">
                {property.title}
              </li>
            </ol>
          </nav>

          <Link
            href="/real-estate#properties"
            className="inline-flex items-center gap-1.5 text-micro uppercase text-ivory-100/70 transition-colors duration-200 hover:text-ivory-50"
          >
            <ArrowLeft aria-hidden="true" size={13} strokeWidth={1.75} />
            {copy.backLabel}
          </Link>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-2">
          <span
            className={cn(
              "rounded-xs px-2 py-1 text-micro font-semibold uppercase",
              property.status === "available"
                ? "bg-accent text-accent-ink"
                : "bg-saffron-500 text-ink-900",
            )}
          >
            {propertyStatusLabels[property.status]}
          </span>
          <span className="rounded-xs border border-ivory-50/30 px-2 py-1 text-micro font-semibold uppercase text-ivory-100">
            {propertyTypeLabels[property.type]}
          </span>
          {property.isPlaceholder ? (
            <span className="rounded-xs border border-accent-bright/50 bg-accent-bright/10 px-2 py-1 text-micro font-semibold uppercase text-accent-bright">
              {copy.sampleBadge}
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 max-w-[22ch] font-display text-display-2 text-ivory-50">
          {property.title}
        </h1>

        <p className="mt-4 flex items-start gap-2 text-lead text-ivory-100/80">
          <MapPin
            aria-hidden="true"
            size={18}
            strokeWidth={1.6}
            className="mt-1 shrink-0"
          />
          <span>{propertyLocationLabel(property)}</span>
        </p>

        <p className="mt-8 border-t border-ivory-50/15 pt-6 font-display text-display-3 leading-none tracking-[-0.03em]">
          {formatPropertyPrice(property.price)}
        </p>
      </Container>
    </section>
  );
}
