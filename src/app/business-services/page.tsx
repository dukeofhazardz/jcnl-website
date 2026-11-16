/**
 * Business Services page.
 *
 * The page states only what the client supplied: four business service lines,
 * seven sectors, the funding support and its project types, eight trade finance
 * instruments, and two enquiry paths. No rate, return, timeline, client or
 * credential is added. The instrument section carries the client's exact
 * due-diligence note, and both CTA paths carry their subject to /contact.
 */
import type { Metadata } from "next";

import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { AccentScope } from "@/components/sections/accent-scope";
import { BusinessCta } from "@/components/sections/business/business-cta";
import { BusinessFunding } from "@/components/sections/business/business-funding";
import { BusinessInstruments } from "@/components/sections/business/business-instruments";
import { BusinessIntro } from "@/components/sections/business/business-intro";
import { BusinessSectors } from "@/components/sections/business/business-sectors";
import { pageMeta } from "@/content/page-copy";
import { heroSlides } from "@/content/slides";

export const metadata: Metadata = {
  title: "Business Services",
  description:
    "Business service design, operational training, hospitality and facility service management, plus funding support for high-yield projects and trade finance instruments.",
  alternates: { canonical: "/business-services" },
};

export default function BusinessServicesPage() {
  const meta = pageMeta.business;

  return (
    <AccentScope accent={meta.accent}>
      <HeroCarousel
        slides={heroSlides.business}
        eyebrow={meta.eyebrow}
        label={meta.label}
        accent={meta.accent}
      />

      <BusinessIntro />
      <BusinessSectors />
      <BusinessFunding />
      <BusinessInstruments />
      <BusinessCta />
    </AccentScope>
  );
}
