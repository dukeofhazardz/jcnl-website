/**
 * Property detail.
 *
 * Every route comes from `src/content/properties.ts` through
 * `generateStaticParams`, so an unknown slug is a 404 rather than an empty page.
 * Placeholder records render in full — that is the point of shipping them — but
 * they are marked, kept out of the sitemap and set to `noindex`.
 */
import { existsSync } from "node:fs";
import path from "node:path";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PropertyDetail } from "@/components/sections/realestate/property-detail";
import { PropertyMasthead } from "@/components/sections/realestate/property-masthead";
import { PropertyNavigation } from "@/components/sections/realestate/property-navigation";
import { SimilarProperties } from "@/components/sections/realestate/similar-properties";
import {
  getAdjacentProperties,
  getPropertyBySlug,
  getSimilarProperties,
  properties,
} from "@/content/properties";
import { realEstatePage } from "@/content/real-estate";
import { pageMetadata } from "@/lib/metadata";
import {
  breadcrumbJsonLd,
  jsonLdString,
  realEstateListingJsonLd,
} from "@/lib/structured-data";

type PageParams = { slug: string };

export function generateStaticParams(): PageParams[] {
  return properties.map((property) => ({ slug: property.slug }));
}

/** Only a file that is actually committed can be used as the social card. */
function existingImage(src: string | undefined): string | null {
  if (!src) return null;
  const file = path.join(process.cwd(), "public", src.replace(/^\/+/, ""));
  return existsSync(file) ? src : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) {
    return { title: "Property not found", robots: { index: false } };
  }

  const image = existingImage(property.images[0]?.src);
  const alt = property.images[0]?.alt ?? property.title;

  return pageMetadata({
    title: property.title,
    description: property.summary,
    path: `/real-estate/${property.slug}`,
    noindex: property.isPlaceholder,
    image: image
      ? { src: image, alt, width: 1600, height: 1067 }
      : undefined,
  });
}

export default async function PropertyPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const property = getPropertyBySlug(slug);

  if (!property) notFound();

  const { previous, next } = getAdjacentProperties(property.slug);
  const similar = getSimilarProperties(property);
  const listing = realEstateListingJsonLd(
    property,
    existingImage(property.images[0]?.src) ?? undefined,
  );
  const breadcrumb = breadcrumbJsonLd([
    { name: realEstatePage.detail.breadcrumbHome, path: "/" },
    { name: realEstatePage.detail.breadcrumbParent, path: "/real-estate" },
    {
      name: property.title,
      path: `/real-estate/${property.slug}`,
    },
  ]);

  return (
    <>
      <PropertyMasthead property={property} />
      <PropertyDetail property={property} />
      <PropertyNavigation previous={previous} next={next} />
      <SimilarProperties properties={similar} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdString(breadcrumb) }}
      />
      {listing ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(listing) }}
        />
      ) : null}
    </>
  );
}
