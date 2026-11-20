/**
 * Business Services page.
 *
 * The page states only what the client supplied: four business service lines,
 * seven sectors, the funding support and its project types, eight trade finance
 * instruments, and two enquiry paths. No rate, return, timeline, client or
 * credential is added. The instrument section carries the client's exact
 * due-diligence note, and both CTA paths carry their subject to /contact.
 */
import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { BusinessCta } from "@/components/sections/business/business-cta";
import { BusinessFunding } from "@/components/sections/business/business-funding";
import { BusinessInstruments } from "@/components/sections/business/business-instruments";
import { BusinessIntro } from "@/components/sections/business/business-intro";
import { BusinessSectors } from "@/components/sections/business/business-sectors";
import { pageMeta } from "@/content/page-copy";
import { heroSlides } from "@/content/slides";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Business Services",
  description:
    "Business service design, operational training, hospitality and facility service management, plus funding support for high-yield projects and trade finance instruments.",
  path: "/business-services",
});

export default function BusinessServicesPage() {
  const meta = pageMeta.business;

  return (
    <>
      <HeroCarousel
        slides={heroSlides.business}
        eyebrow={meta.eyebrow}
        label={meta.label}
      />

      <BusinessIntro />
      <BusinessSectors />
      <BusinessFunding />
      <BusinessInstruments />
      <BusinessCta />
    </>
  );
}
