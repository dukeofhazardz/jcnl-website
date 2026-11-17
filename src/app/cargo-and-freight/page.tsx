import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { AccentScope } from "@/components/sections/accent-scope";
import { FreightContact } from "@/components/sections/freight/freight-contact";
import { FreightIntro } from "@/components/sections/freight/freight-intro";
import { FreightModes } from "@/components/sections/freight/freight-modes";
import { FreightQuote } from "@/components/sections/freight/freight-quote";
import { FreightRoute } from "@/components/sections/freight/freight-route";
import { pageMeta } from "@/content/page-copy";
import { heroSlides } from "@/content/slides";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Cargo & Freight",
  description:
    "JCNL's Dry and Wet Cargo Freight and Forwarding platform: air, sea and water delivery through partner collaborations, with orders placed on request.",
  path: "/cargo-and-freight",
});

export default function CargoAndFreightPage() {
  const meta = pageMeta.freight;

  return (
    <AccentScope accent={meta.accent}>
      <HeroCarousel
        slides={heroSlides.freight}
        eyebrow={meta.eyebrow}
        label={meta.label}
        accent={meta.accent}
      />

      <FreightIntro />
      <FreightModes />
      <FreightRoute />
      <FreightContact />
      <FreightQuote />
    </AccentScope>
  );
}
