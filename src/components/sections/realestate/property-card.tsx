import Link from "next/link";
import {
  ArrowUpRight,
  Bath,
  BedDouble,
  MapPin,
  MessageCircle,
  Ruler,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SmartImage } from "@/components/ui/smart-image";
import { realEstatePage } from "@/content/real-estate";
import {
  formatPropertyPrice,
  propertyLocationLabel,
  propertyStatusLabels,
  propertyTypeLabels,
  propertyWhatsappHref,
  type Property,
} from "@/content/properties";
import { cn } from "@/lib/cn";

const copy = realEstatePage.listings;

/**
 * One listing card. The whole card is the link to the detail page; the WhatsApp
 * button sits above that link so the card has exactly two actions.
 */
export function PropertyCard({ property }: { property: Property }) {
  const image = property.images[0];
  const available = property.status === "available";

  return (
    <Card
      as="article"
      tone="raised"
      interactive
      className="group h-full border border-line"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-jungle-950">
        <SmartImage
          src={image?.src}
          alt={image?.alt ?? property.title}
          subject={image?.alt ?? property.title}
          role="PROPERTY"
          width={1600}
          height={1067}
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 92vw"
          fill
          variant="background"
          imageClassName="transition-transform duration-500 ease-strong motion-safe:group-hover:scale-[1.04]"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start gap-2 p-3">
          <span
            className={cn(
              "rounded-xs px-2 py-1 text-micro font-semibold uppercase",
              available
                ? "bg-accent text-accent-ink"
                : "bg-saffron-500 text-ink-900",
            )}
          >
            {propertyStatusLabels[property.status]}
          </span>
        </div>

        {property.isPlaceholder ? (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-end bg-linear-to-t from-jungle-950/60 to-transparent p-3">
            <span className="rounded-xs border border-accent-text/30 bg-ivory-50/95 px-2 py-1 text-micro font-semibold uppercase text-accent-text">
              {realEstatePage.detail.sampleBadge}
            </span>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-micro font-semibold uppercase text-accent-text">
          {propertyTypeLabels[property.type]}
        </p>

        <h3 className="mt-2 font-display text-title leading-tight tracking-[-0.018em] text-ink-900">
          {property.title}
        </h3>

        <p className="mt-2 flex items-start gap-1.5 text-small text-ink-500">
          <MapPin
            aria-hidden="true"
            size={15}
            strokeWidth={1.6}
            className="mt-0.5 shrink-0"
          />
          <span>{propertyLocationLabel(property)}</span>
        </p>

        <p
          className={cn(
            "mt-4 font-display text-[1.4rem] leading-none tracking-[-0.02em]",
            property.price === null ? "text-ink-700" : "text-ink-900",
          )}
        >
          {formatPropertyPrice(property.price)}
        </p>

        {property.sizeSqm || property.bedrooms || property.bathrooms ? (
          <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-small text-ink-500">
            {property.sizeSqm ? (
              <li className="inline-flex items-center gap-1.5">
                <Ruler aria-hidden="true" size={14} strokeWidth={1.6} />
                <span>{property.sizeSqm.toLocaleString("en-NG")} m²</span>
              </li>
            ) : null}
            {property.bedrooms ? (
              <li className="inline-flex items-center gap-1.5">
                <BedDouble aria-hidden="true" size={14} strokeWidth={1.6} />
                <span>
                  {property.bedrooms}{" "}
                  {property.bedrooms === 1 ? "bed" : "beds"}
                </span>
              </li>
            ) : null}
            {property.bathrooms ? (
              <li className="inline-flex items-center gap-1.5">
                <Bath aria-hidden="true" size={14} strokeWidth={1.6} />
                <span>
                  {property.bathrooms}{" "}
                  {property.bathrooms === 1 ? "bath" : "baths"}
                </span>
              </li>
            ) : null}
          </ul>
        ) : null}

        <div className="pointer-events-none relative z-10 mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          <span className="inline-flex items-center gap-1.5 text-small font-semibold text-accent-text">
            {copy.viewDetails}
            <ArrowUpRight
              aria-hidden="true"
              size={15}
              strokeWidth={1.75}
              className="transition-transform duration-300 ease-strong motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
            />
          </span>

          <Button
            href={propertyWhatsappHref(property)}
            external
            variant="ghost"
            size="sm"
            className="pointer-events-auto border-ink-900/25 text-ink-900 hover:border-ink-900/60 hover:bg-ink-900/5"
            icon={
              <MessageCircle aria-hidden="true" size={15} strokeWidth={1.75} />
            }
            iconPosition="start"
          >
            {copy.enquire}
          </Button>
        </div>
      </div>

      {/* One link per card. `z-0` keeps it under the WhatsApp button. */}
      <Link
        href={`/real-estate/${property.slug}`}
        className="absolute inset-0 z-0 rounded-md focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-accent-text"
      >
        <span className="sr-only">
          {copy.viewDetails}: {property.title}
        </span>
      </Link>
    </Card>
  );
}
