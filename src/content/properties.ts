/**
 * Property listings.
 *
 * This file is the whole data layer. A listing is added, edited or removed
 * here, and its photographs are dropped into /public/images/real-estate/ using
 * the same slug: <slug>-1.jpg, <slug>-2.jpg, and so on. Nothing in the page
 * components needs to change.
 *
 * Every record below is a SAMPLE. The client has not supplied a property yet,
 * so no address, price, size, developer, estate or title document is invented.
 * `isPlaceholder` keeps the sample ribbon on the card and the detail page, and
 * keeps the record out of structured data and the sitemap. Replace a record
 * with real data and set `isPlaceholder: false` to publish it.
 */

import { site, whatsappHref } from "@/config/site";

export type PropertyStatus = "available" | "under-offer" | "sold";

export type PropertyType =
  | "land"
  | "residential"
  | "commercial"
  | "estate"
  | "other";

export type PropertyImage = {
  /** Path under /public. */
  src: string;
  /** Required. Describes the intended photograph, not the record. */
  alt: string;
};

export type Property = {
  id: string;
  slug: string;
  title: string;
  status: PropertyStatus;
  type: PropertyType;
  location: { area: string; city: string; state: string };
  /** Null renders "Price on request". */
  price: number | null;
  currency: "NGN";
  sizeSqm?: number;
  bedrooms?: number;
  bathrooms?: number;
  summary: string;
  description: string;
  features: string[];
  /** Only when supplied, e.g. "C of O". */
  titleDocument?: string;
  images: PropertyImage[];
  featured?: boolean;
  /** ISO date. Used for the "Newest first" sort. */
  listedAt: string;
  /** True while the record is a sample for layout review. */
  isPlaceholder: boolean;
};

/** The marker the rest of the site uses for a fact the client still owes. */
export const CLIENT_TO_PROVIDE = "[CLIENT TO PROVIDE]";

export const propertyTypeLabels: Record<PropertyType, string> = {
  land: "Land",
  residential: "Residential",
  commercial: "Commercial",
  estate: "Estate",
  other: "Other",
};

export const propertyStatusLabels: Record<PropertyStatus, string> = {
  available: "Available",
  "under-offer": "Under offer",
  sold: "Sold",
};

const placeholderLocation = {
  area: CLIENT_TO_PROVIDE,
  city: CLIENT_TO_PROVIDE,
  state: CLIENT_TO_PROVIDE,
} as const;

/**
 * Three frames per listing: <slug>-1.jpg, <slug>-2.jpg, <slug>-3.jpg.
 * `views` explains what the client should photograph for each slot.
 */
function sampleImages(
  slug: string,
  title: string,
  views: readonly string[],
): PropertyImage[] {
  return views.map((view, index) => ({
    src: `/images/real-estate/${slug}-${index + 1}.jpg`,
    alt: `${title}, ${view}`,
  }));
}

const sampleSummary =
  "A sample record for layout review. The address, size, price and title document are still to be supplied.";

function sampleDescription(title: string): string {
  return `This is a placeholder listing for a ${title.toLowerCase()}. It shows how a real property will be presented once JCNL supplies the address, photographs, size, price and title document.\n\nNothing in this record describes a property that is currently for sale.`;
}

export const properties: readonly Property[] = [
  {
    id: "property-01",
    slug: "residential-property",
    title: "Residential property",
    status: "available",
    type: "residential",
    location: { ...placeholderLocation },
    price: null,
    currency: "NGN",
    summary: sampleSummary,
    description: sampleDescription("Residential property"),
    features: [],
    images: sampleImages("residential-property", "Residential property", [
      "exterior view",
      "living space",
      "street view",
    ]),
    listedAt: "2026-11-17",
    isPlaceholder: true,
  },
  {
    id: "property-02",
    slug: "commercial-plot",
    title: "Commercial plot",
    status: "available",
    type: "commercial",
    location: { ...placeholderLocation },
    price: null,
    currency: "NGN",
    summary: sampleSummary,
    description: sampleDescription("Commercial plot"),
    features: [],
    images: sampleImages("commercial-plot", "Commercial plot", [
      "plot from the road",
      "boundary and frontage",
      "surrounding buildings",
    ]),
    listedAt: "2026-11-16",
    isPlaceholder: true,
  },
  {
    id: "property-03",
    slug: "estate-land",
    title: "Estate land",
    status: "available",
    type: "estate",
    location: { ...placeholderLocation },
    price: null,
    currency: "NGN",
    summary: sampleSummary,
    description: sampleDescription("Estate land"),
    features: [],
    images: sampleImages("estate-land", "Estate land", [
      "land from above",
      "access road",
      "surrounding development",
    ]),
    listedAt: "2026-11-15",
    isPlaceholder: true,
  },
  {
    id: "property-04",
    slug: "terrace-house",
    title: "Terrace house",
    status: "under-offer",
    type: "residential",
    location: { ...placeholderLocation },
    price: null,
    currency: "NGN",
    summary: sampleSummary,
    description: sampleDescription("Terrace house"),
    features: [],
    images: sampleImages("terrace-house", "Terrace house", [
      "front elevation",
      "living space",
      "street view",
    ]),
    listedAt: "2026-11-14",
    isPlaceholder: true,
  },
  {
    id: "property-05",
    slug: "mixed-use-building",
    title: "Mixed-use building",
    status: "available",
    type: "commercial",
    location: { ...placeholderLocation },
    price: null,
    currency: "NGN",
    summary: sampleSummary,
    description: sampleDescription("Mixed-use building"),
    features: [],
    images: sampleImages("mixed-use-building", "Mixed-use building", [
      "front elevation",
      "ground floor",
      "street view",
    ]),
    listedAt: "2026-11-13",
    isPlaceholder: true,
  },
  {
    id: "property-06",
    slug: "residential-land",
    title: "Residential land",
    status: "available",
    type: "land",
    location: { ...placeholderLocation },
    price: null,
    currency: "NGN",
    summary: sampleSummary,
    description: sampleDescription("Residential land"),
    features: [],
    images: sampleImages("residential-land", "Residential land", [
      "land from above",
      "access road",
      "surroundings",
    ]),
    listedAt: "2026-11-12",
    isPlaceholder: true,
  },
];

/** Sold records stay reachable by URL but are hidden from the grid. */
export function isListed(property: Property): boolean {
  return property.status !== "sold";
}

export function compareNewest(a: Property, b: Property): number {
  return (
    Date.parse(b.listedAt) - Date.parse(a.listedAt) ||
    a.title.localeCompare(b.title)
  );
}

/** Everything the grid may show, newest first. */
export function getListedProperties(): Property[] {
  return properties.filter(isListed).sort(compareNewest);
}

/** Real, publishable records only. Used by JSON-LD and the sitemap. */
export function getPublishedProperties(): Property[] {
  return getListedProperties().filter((property) => !property.isPlaceholder);
}

export function getPropertyBySlug(slug: string): Property | undefined {
  return properties.find((property) => property.slug === slug);
}

export function getAdjacentProperties(slug: string): {
  previous: Property | undefined;
  next: Property | undefined;
} {
  const listed = getListedProperties();
  const index = listed.findIndex((property) => property.slug === slug);
  if (index === -1) return { previous: undefined, next: undefined };

  return {
    previous: listed[index - 1],
    next: listed[index + 1],
  };
}

/** Same type first, then the newest of the rest. */
export function getSimilarProperties(
  property: Property,
  limit = 3,
): Property[] {
  return getListedProperties()
    .filter((entry) => entry.slug !== property.slug)
    .sort((a, b) => {
      const aMatch = a.type === property.type ? 0 : 1;
      const bMatch = b.type === property.type ? 0 : 1;
      return aMatch - bMatch || compareNewest(a, b);
    })
    .slice(0, limit);
}

const naira = new Intl.NumberFormat("en-NG", { maximumFractionDigits: 0 });

export const PRICE_ON_REQUEST = "Price on request";

/** ₦ with thousands separators, no decimals. */
export function formatNaira(value: number): string {
  return `₦${naira.format(value)}`;
}

export function formatPropertyPrice(price: number | null): string {
  return price === null ? PRICE_ON_REQUEST : formatNaira(price);
}

/**
 * "Area, City, State", without repeating a value. A record still waiting on its
 * location renders the marker once, not three times.
 */
export function propertyLocationLabel(property: Property): string {
  const parts = [
    property.location.area,
    property.location.city,
    property.location.state,
  ].filter((part) => part && part !== CLIENT_TO_PROVIDE);

  const unique = [...new Set(parts)];
  return unique.length > 0 ? unique.join(", ") : CLIENT_TO_PROVIDE;
}

export function propertyUrl(slug: string): string {
  return new URL(`/real-estate/${slug}`, site.url).toString();
}

export function propertyEnquiryMessage(property: Property): string {
  return `Hello, I would like to enquire about ${property.title} (${propertyUrl(property.slug)}).`;
}

export function propertyViewingMessage(property: Property): string {
  return `Hello, I would like to request a viewing of ${property.title} (${propertyUrl(property.slug)}).`;
}

export function propertyWhatsappHref(property: Property): string {
  return whatsappHref(propertyEnquiryMessage(property));
}

/** Carries the listing into the contact form's service and message fields. */
export function propertyContactHref(slug: string): string {
  return `/contact?service=real-estate&property=${encodeURIComponent(slug)}`;
}
