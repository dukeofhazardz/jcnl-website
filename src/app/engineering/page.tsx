/**
 * Engineering page.
 *
 * VERIFIED FACTS ONLY. The copy on this page is built from one client
 * statement: JCNL undertakes civil engineering works, construction, facility
 * service management, and design and operational training, serving the Energy,
 * Transport and Construction sectors.
 *
 * Anything a buyer would normally expect beyond that (named projects,
 * certifications, registrations, portfolio photographs, headcount, equipment)
 * is a visibly marked "[CLIENT TO PROVIDE]" placeholder. Nothing on this page
 * is invented. Open CLIENT_TODO.md at the repo root for the full list of
 * outstanding items.
 */
import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { EngineeringApproach } from "@/components/sections/engineering/engineering-approach";
import { EngineeringCapabilities } from "@/components/sections/engineering/engineering-capabilities";
import { EngineeringCta } from "@/components/sections/engineering/engineering-cta";
import { EngineeringPortfolio } from "@/components/sections/engineering/engineering-portfolio";
import { EngineeringSectors } from "@/components/sections/engineering/engineering-sectors";
import { pageMeta } from "@/content/page-copy";
import { heroSlides } from "@/content/slides";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Engineering",
  description:
    "Civil engineering works, construction, facility service management and operational training for clients in Energy, Transport and Construction.",
  path: "/engineering",
});

export default function EngineeringPage() {
  const meta = pageMeta.engineering;

  return (
    <>
      <HeroCarousel
        slides={heroSlides.engineering}
        eyebrow={meta.eyebrow}
        label={meta.label}
      />

      <EngineeringCapabilities />
      <EngineeringSectors />
      <EngineeringApproach />
      <EngineeringPortfolio />
      <EngineeringCta />
    </>
  );
}
