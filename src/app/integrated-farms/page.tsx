import type { Metadata } from "next";

import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { AccentScope } from "@/components/sections/accent-scope";
import { FarmEnquiry } from "@/components/sections/farms/farm-enquiry";
import { FarmFacilities } from "@/components/sections/farms/farm-facilities";
import { FarmLocation } from "@/components/sections/farms/farm-location";
import { FarmStory } from "@/components/sections/farms/farm-story";
import { FarmValues } from "@/components/sections/farms/farm-values";
import { pageMeta } from "@/content/page-copy";
import { heroSlides } from "@/content/slides";

export const metadata: Metadata = {
  title: "Integrated Farms",
  description:
    "The Integrated Fish and Livestock Farm at Idiagbon Village, Iju-Ota, Ogun State: sixteen facilities built to add animal protein to local supply.",
  alternates: { canonical: "/integrated-farms" },
};

export default function IntegratedFarmsPage() {
  const meta = pageMeta.farms;

  return (
    <AccentScope accent={meta.accent}>
      <HeroCarousel
        slides={heroSlides.farms}
        eyebrow={meta.eyebrow}
        label={meta.label}
        accent={meta.accent}
      />

      <FarmStory />
      <FarmFacilities />
      <FarmValues />
      <FarmLocation />
      <FarmEnquiry />
    </AccentScope>
  );
}
