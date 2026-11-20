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
 * Dark masthead instead of a hero: the listing must lead with its own facts.
 * The header is solid white above it, so the panel starts below the bar.
 */
export function PropertyMasthead({ property }: { property: Property }) {
  return (
    <section className="relative isolate overflow-hidden bg-field pb-16 pt-14 text-white sm:pb-20 sm:pt-20">
      <GeometricPattern
        variant="lattice"
        className="absolute inset-0 -z-10 text-sky-500 opacity-[0.08]"
      />

      <Container>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <nav aria-label={copy.breadcrumbLabel}>
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-micro uppercase text-sky-100/65">
              <li>
                <Link
                  href="/"
                  className="transition-colors duration-200 hover:text-white"
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
                  className="transition-colors duration-200 hover:text-white"
                >
                  {copy.breadcrumbParent}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={12} strokeWidth={2} />
              </li>
              <li aria-current="page" className="text-white">
                {property.title}
              </li>
            </ol>
          </nav>

          <Link
            href="/real-estate#properties"
            className="inline-flex items-center gap-1.5 text-micro uppercase text-sky-100/70 transition-colors duration-200 hover:text-white"
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
                : "bg-red-600 text-white",
            )}
          >
            {propertyStatusLabels[property.status]}
          </span>
          <span className="rounded-xs border border-white/30 px-2 py-1 text-micro font-semibold uppercase text-sky-100">
            {propertyTypeLabels[property.type]}
          </span>
          {property.isPlaceholder ? (
            <span className="rounded-xs border border-accent-bright/50 bg-accent-bright/10 px-2 py-1 text-micro font-semibold uppercase text-accent-bright">
              {copy.sampleBadge}
            </span>
          ) : null}
        </div>

        <h1 className="mt-5 max-w-[22ch] font-display text-display-2 text-white">
          {property.title}
        </h1>

        <p className="mt-4 flex items-start gap-2 text-lead text-sky-100/80">
          <MapPin
            aria-hidden="true"
            size={18}
            strokeWidth={1.6}
            className="mt-1 shrink-0"
          />
          <span>{propertyLocationLabel(property)}</span>
        </p>

        <p className="mt-8 border-t border-white/15 pt-6 font-display text-display-3 leading-none tracking-[-0.03em]">
          {formatPropertyPrice(property.price)}
        </p>
      </Container>
    </section>
  );
}
