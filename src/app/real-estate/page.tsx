/**
 * Real Estate page.
 *
 * The listings come from `src/content/properties.ts`; the copy around them comes
 * from `src/content/real-estate.ts`. Six sample records ship with the page so the
 * grid, filters and detail route can be reviewed. Each one is visibly marked and
 * is excluded from structured data and the sitemap until it is replaced with a
 * real record.
 */
import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { EnquiryBand } from "@/components/sections/enquiry-band";
import { PropertyExplorer } from "@/components/sections/realestate/property-explorer";
import { RealEstateIntro } from "@/components/sections/realestate/real-estate-intro";
import { RealEstateProcess } from "@/components/sections/realestate/real-estate-process";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { pageMeta } from "@/content/page-copy";
import { realEstatePage } from "@/content/real-estate";
import {
  getListedProperties,
  getPublishedProperties,
} from "@/content/properties";
import { heroSlides } from "@/content/slides";
import { pageMetadata } from "@/lib/metadata";
import {
  jsonLdString,
  realEstateItemListJsonLd,
} from "@/lib/structured-data";

export const metadata = pageMetadata({
  title: "Real Estate",
  description:
    "Land, homes and commercial space for sale from JCNL. Filter listings by type, location and price, then enquire on WhatsApp or request a viewing.",
  path: "/real-estate",
});

export default function RealEstatePage() {
  const meta = pageMeta.realestate;
  const listed = getListedProperties();
  const itemList = realEstateItemListJsonLd(getPublishedProperties());

  return (
    <>
      <HeroCarousel
        slides={heroSlides.realestate}
        eyebrow={meta.eyebrow}
        label={meta.label}
      />

      <RealEstateIntro />

      <Section
        id="properties"
        tone="tint"
        topDivider="dune"
        spacing="md"
        labelledBy="properties-heading"
        className="scroll-mt-[calc(var(--header-h)+1rem)]"
      >
        <Container>
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-8">
              <div className="lg:col-span-7">
                <Eyebrow>{realEstatePage.listings.eyebrow}</Eyebrow>
                <Heading
                  as="h2"
                  size="lg"
                  id="properties-heading"
                  className="mt-5 max-w-[20ch]"
                >
                  {realEstatePage.listings.heading}
                </Heading>
              </div>

              <div className="lg:col-span-5">
                <p className="max-w-[38ch] text-small text-ink-700 lg:text-right">
                  {realEstatePage.listings.intro}
                </p>
              </div>
            </div>
          </Reveal>

          <PropertyExplorer properties={listed} />
        </Container>
      </Section>

      <RealEstateProcess />

      <EnquiryBand
        eyebrow={realEstatePage.cta.eyebrow}
        heading={realEstatePage.cta.heading}
        body={realEstatePage.cta.body}
        whatsappLabel={realEstatePage.cta.whatsappLabel}
        whatsappMessage={realEstatePage.cta.whatsappMessage}
        headingId="real-estate-cta"
      />

      {itemList ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdString(itemList) }}
        />
      ) : null}
    </>
  );
}
