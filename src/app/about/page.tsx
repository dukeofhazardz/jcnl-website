/**
 * About page.
 *
 * The company record in brief facts only: registered name, 2003, the Lagos and
 * Abuja offices, the sectors and the six service lines. No history, headcount,
 * client, award or credential is added. Copy lives in `src/content/about.ts`.
 */
import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { AboutMission } from "@/components/sections/about/about-mission";
import { AboutOffices } from "@/components/sections/about/about-offices";
import { AboutServices } from "@/components/sections/about/about-services";
import { AboutStory } from "@/components/sections/about/about-story";
import { AccentScope } from "@/components/sections/accent-scope";
import { EnquiryBand } from "@/components/sections/enquiry-band";
import { pageMeta } from "@/content/page-copy";
import { heroSlides } from "@/content/slides";
import { aboutPage } from "@/content/about";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "About",
  description:
    "JCNL is an indigenous Nigerian company established in 2003, working from Lagos and Abuja across six service lines for private and public sector clients.",
  path: "/about",
});

export default function AboutPage() {
  const meta = pageMeta.about;

  return (
    <AccentScope accent={meta.accent}>
      <HeroCarousel
        slides={heroSlides.about}
        eyebrow={meta.eyebrow}
        label={meta.label}
        accent={meta.accent}
      />

      <AboutStory />
      <AboutMission />
      <AboutServices />
      <AboutOffices />

      <EnquiryBand
        eyebrow={aboutPage.enquiry.eyebrow}
        heading={aboutPage.enquiry.heading}
        body={aboutPage.enquiry.body}
        whatsappLabel={aboutPage.enquiry.whatsappLabel}
        whatsappMessage={aboutPage.enquiry.whatsappMessage}
      />
    </AccentScope>
  );
}
