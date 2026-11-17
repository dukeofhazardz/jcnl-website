/**
 * Real Estate page copy and filter configuration.
 *
 * The listings themselves live in `src/content/properties.ts`. This file holds
 * the sentences around them, so a copy change never touches a component.
 */

import type { Property } from "@/content/properties";

export type PriceBandValue = "under-50m" | "50m-150m" | "over-150m";

export const priceBands: readonly {
  value: PriceBandValue;
  label: string;
  min: number;
  max: number | null;
}[] = [
  {
    value: "under-50m",
    label: "Under ₦50m",
    min: 0,
    max: 50_000_000,
  },
  {
    value: "50m-150m",
    label: "₦50m – ₦150m",
    min: 50_000_000,
    max: 150_000_000,
  },
  {
    value: "over-150m",
    label: "₦150m and above",
    min: 150_000_000,
    max: null,
  },
];

/**
 * A listing priced "on request" stays visible in every range: hiding it would
 * hide the very listings whose price the buyer has to ask about.
 */
export function matchesPriceBand(
  property: Property,
  band: PriceBandValue | "any",
): boolean {
  if (band === "any") return true;
  if (property.price === null) return true;

  const entry = priceBands.find((option) => option.value === band);
  if (!entry) return true;

  return (
    property.price >= entry.min &&
    (entry.max === null || property.price < entry.max)
  );
}

export type PropertySort = "newest" | "price-asc" | "price-desc";

export const sortOptions: readonly { value: PropertySort; label: string }[] = [
  { value: "newest", label: "Newest first" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
];

export const realEstatePage = {
  intro: {
    eyebrow: "Property for sale",
    heading: "Property, presented plainly.",
    body: "JCNL lists land, homes and commercial space for sale. Each record carries the facts the team can confirm: type, place, size and price. Where a detail is still outstanding, the listing says so.",
    support:
      "Availability, pricing and title documents are checked with the team before any commitment. Ask for the document that matters to you.",
    facts: [
      { label: "Established", value: "2003" },
      { label: "Offices", value: "Lagos and Abuja" },
      { label: "Enquiries", value: "WhatsApp, phone or the contact form" },
    ],
    browse: "Browse listings",
    whatsappLabel: "WhatsApp the team",
    whatsappMessage: "Hello JCNL, I would like to ask about a property.",
    noteTitle: "Sample listings",
    note:
      "The records below are samples for layout review. They carry no address, price, size or title document until the client supplies one.",
  },

  listings: {
    eyebrow: "For sale",
    heading: "Properties currently for sale",
    intro:
      "Filter by type, place or price. Newest first, unless you choose another order.",
    filters: {
      legend: "Filter listings",
      type: "Type",
      allTypes: "All types",
      location: "Location",
      allLocations: "All locations",
      price: "Price",
      anyPrice: "Any price",
      sort: "Sort",
      reset: "Reset",
      priceNote: "Listings priced on request stay visible in every range.",
      count: (visible: number, total: number) =>
        `Showing ${visible} of ${total}`,
    },
    emptyFiltered: {
      heading: "Nothing matches those filters.",
      body: "Reset the filters, or tell us what you are looking for and the team will check what is available.",
    },
    emptyAll: {
      heading: "No properties are listed right now.",
      body: "Tell us what you are looking for and the team will check what is available.",
    },
    emptyCta: "Tell us what you need",
    emptyMessage:
      "Hello JCNL, I am looking for a property. I would like to tell you what I need.",
    emptyReset: "Reset filters",
    viewDetails: "View details",
    enquire: "Enquire",
  },

  process: {
    eyebrow: "How it works",
    heading: "How buying works.",
    intro:
      "Four steps, in order. Nothing is agreed until the documents have been seen.",
    steps: [
      {
        title: "Enquire",
        body: "Send the listing, the area or the kind of property you want. WhatsApp, phone or the contact form.",
      },
      {
        title: "View",
        body: "The team arranges a viewing for the properties that fit. How viewings are handled is confirmed when you enquire.",
      },
      {
        title: "Verify documents",
        body: "Ask for the title document and any survey or approval that applies. You see what the seller has supplied, and nothing more.",
      },
      {
        title: "Complete",
        body: "Price, payment and handover are agreed in writing between you and the seller. Availability is confirmed first.",
      },
    ],
    note: "Availability, pricing and documentation are confirmed with our team before any commitment.",
  },

  cta: {
    eyebrow: "Still looking",
    heading: "Can't find what you need?",
    body: "Send the type of property, the area and your budget. The team will check what is available and come back to you.",
    whatsappLabel: "Tell us what you need",
    whatsappMessage:
      "Hello JCNL, I am looking for a property. I would like to tell you what I need.",
  },

  detail: {
    breadcrumbHome: "Home",
    breadcrumbParent: "Real Estate",
    breadcrumbLabel: "Breadcrumb",
    backLabel: "All properties",
    galleryLabel: "Property photographs",
    galleryOpen: "Open photograph",
    galleryPrevious: "Previous photograph",
    galleryNext: "Next photograph",
    lightboxClose: "Close",
    lightboxPosition: (visible: number, total: number) =>
      `Photograph ${visible} of ${total}`,
    aboutHeading: "About this listing",
    featuresHeading: "Features",
    featuresEmpty: "The feature list for this listing has not been supplied.",
    titleDocumentLabel: "Title document",
    titleDocumentEmpty: "Not supplied.",
    specs: {
      type: "Type",
      status: "Status",
      location: "Location",
      size: "Size",
      bedrooms: "Bedrooms",
      bathrooms: "Bathrooms",
    },
    enquiry: {
      eyebrow: "Enquire",
      whatsapp: "Enquire on WhatsApp",
      viewing: "Request a viewing",
      call: "Call",
      priceNote: "The price for this listing has not been published.",
      note: "Availability, pricing and documentation are confirmed with our team before any commitment.",
      sampleTitle: "Sample listing",
      sampleBody:
        "This record is a sample for layout review. The address, size, price and title document are supplied by the client.",
    },
    sampleBadge: "Sample listing",
    previous: "Previous listing",
    next: "Next listing",
    listingNavLabel: "More listings",
    similarEyebrow: "More listings",
    similarHeading: "Similar properties",
  },
} as const;
