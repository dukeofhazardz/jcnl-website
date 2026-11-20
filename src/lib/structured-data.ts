import { contact, offices, site, socials } from "@/config/site";
import { CLIENT_TO_PROVIDE, propertyUrl, type Property } from "@/content/properties";

/**
 * Organization structured data. Only facts from the brief: name, founding year,
 * two offices, published channels. No ratings, awards or client claims.
 */
export function organizationJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${site.url}/#organization`,
    name: site.name,
    alternateName: site.shortName,
    url: site.url,
    logo: new URL(site.logo.main.src, site.url).toString(),
    slogan: site.tagline,
    foundingDate: String(site.established),
    description: site.description,
    telephone: contact.phone.display,
    email: contact.email.display,
    address: offices.map((office) => ({
      "@type": "PostalAddress",
      streetAddress: office.lines.slice(0, 2).join(", "),
      addressLocality: office.city,
      addressCountry: "NG",
    })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        name: "Main line",
        telephone: contact.phone.display,
        email: contact.email.display,
        areaServed: "NG",
        availableLanguage: ["en"],
      },
      {
        "@type": "ContactPoint",
        contactType: "customer service",
        name: "WhatsApp and calls",
        telephone: contact.whatsapp.display,
        areaServed: "NG",
        availableLanguage: ["en"],
      },
    ],
    sameAs: socials.map((social) => social.href),
  };
}

/** Serialise JSON-LD for a <script> tag without allowing a closing tag break. */
export function jsonLdString(data: Record<string, unknown>): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

/**
 * Listing structured data. Placeholder records never reach this helper: the
 * callers pass publishable properties only, so a sample is never announced to a
 * search engine as a real listing.
 */
export function realEstateItemListJsonLd(
  properties: readonly Property[],
): Record<string, unknown> | null {
  if (properties.length === 0) return null;

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Properties for sale",
    numberOfItems: properties.length,
    itemListElement: properties.map((property, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: property.title,
      url: propertyUrl(property.slug),
    })),
  };
}

const availabilityByStatus = {
  available: "https://schema.org/InStock",
  "under-offer": "https://schema.org/LimitedAvailability",
  sold: "https://schema.org/SoldOut",
} as const;

export function realEstateListingJsonLd(
  property: Property,
  imageUrl?: string,
): Record<string, unknown> | null {
  if (property.isPlaceholder) return null;

  const address = [
    property.location.area,
    property.location.city,
    property.location.state,
  ].filter((part) => part && part !== CLIENT_TO_PROVIDE);

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    name: property.title,
    description: property.summary,
    url: propertyUrl(property.slug),
    datePosted: property.listedAt,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(address.length > 0
      ? {
          address: {
            "@type": "PostalAddress",
            ...(property.location.area !== CLIENT_TO_PROVIDE
              ? { streetAddress: property.location.area }
              : {}),
            ...(property.location.city !== CLIENT_TO_PROVIDE
              ? { addressLocality: property.location.city }
              : {}),
            ...(property.location.state !== CLIENT_TO_PROVIDE
              ? { addressRegion: property.location.state }
              : {}),
            addressCountry: "NG",
          },
        }
      : {}),
    ...(property.price !== null
      ? {
          offers: {
            "@type": "Offer",
            price: property.price,
            priceCurrency: property.currency,
            availability: availabilityByStatus[property.status],
            url: propertyUrl(property.slug),
          },
        }
      : {}),
    ...(property.bedrooms ? { numberOfBedrooms: property.bedrooms } : {}),
    ...(property.bathrooms
      ? { numberOfBathroomsTotal: property.bathrooms }
      : {}),
    ...(property.sizeSqm
      ? {
          floorSize: {
            "@type": "QuantitativeValue",
            value: property.sizeSqm,
            unitCode: "MTK",
          },
        }
      : {}),
  };
}

export function breadcrumbJsonLd(
  items: readonly { name: string; path: string }[],
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: new URL(item.path, site.url).toString(),
    })),
  };
}
