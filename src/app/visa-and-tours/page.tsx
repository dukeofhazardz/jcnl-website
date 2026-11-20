import { ArrowDownRight } from "lucide-react";

import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { Less20Section } from "@/components/sections/tours/less20-section";
import { Tour360Section } from "@/components/sections/tours/tour360-section";
import { TourEnquiry } from "@/components/sections/tours/tour-enquiry";
import { TourGallery } from "@/components/sections/tours/tour-gallery";
import { TourTimelineSection } from "@/components/sections/tours/tour-timeline";
import { TravelCreditSection } from "@/components/sections/tours/travelcredit-section";
import { VisaAssistSection } from "@/components/sections/tours/visaassist-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { pageMeta } from "@/content/page-copy";
import { heroSlides } from "@/content/slides";
import { tourAnchors } from "@/content/tours";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Visa & Tours",
  description:
    "Tour360 tours, TRAVELCredit, VISA-Assist247 visa advisory and LESS 20.0 discounts, arranged by JCNL from Lagos and Abuja.",
  path: "/visa-and-tours",
});

export default function VisaAndToursPage() {
  const meta = pageMeta.tours;

  return (
    <>
      <HeroCarousel
        slides={heroSlides.tours}
        eyebrow={meta.eyebrow}
        label={meta.label}
      />

      <Section tone="white" topDivider="arch" spacing="md">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Visa &amp; Tours</Eyebrow>
                <Heading as="h2" size="lg" className="mt-5 max-w-[20ch]">
                  Four travel products, one desk.
                </Heading>
                <p className="mt-6 max-w-[50ch] text-lead text-ink-700">
                  JCNL arranges tours, visa advisory, travel credit and discounts
                  on the services around a trip. The four products below cover
                  different parts of it, and all of them are arranged from Lagos
                  and Abuja.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={0.08}>
                <nav aria-label="Travel products">
                  <ol className="border-t border-ink-900/15">
                    {tourAnchors.map((anchor, index) => (
                      <li key={anchor.id} className="border-b border-ink-900/15">
                        <a
                          href={`#${anchor.id}`}
                          className="group grid grid-cols-[2rem_1fr_auto] items-baseline gap-4 py-4 transition-colors duration-200 hover:text-accent-text"
                        >
                          <span className="font-display text-small tabular-nums text-ink-500">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span>
                            <span className="block font-display text-title leading-tight">
                              {anchor.name}
                            </span>
                            <span className="mt-0.5 block text-small text-ink-500">
                              {anchor.kicker}
                            </span>
                          </span>
                          <ArrowDownRight
                            aria-hidden="true"
                            size={18}
                            strokeWidth={1.5}
                            className="justify-self-end text-ink-500 transition-transform duration-300 ease-strong motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:translate-y-0.5"
                          />
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <Tour360Section />
      <TravelCreditSection />
      <VisaAssistSection />
      <Less20Section />
      <TourTimelineSection />
      <TourGallery />
      <TourEnquiry />
    </>
  );
}
