import { HeroCarousel } from "@/components/carousel/hero-carousel";
import { AccentScope } from "@/components/sections/accent-scope";
import { StubNotice } from "@/components/sections/stub-notice";
import { pageMeta } from "@/content/page-copy";
import { heroSlides, type HeroPageKey } from "@/content/slides";

/** Shared shell for the pages whose full content lands in a later phase. */
export function StubPage({ page }: { page: HeroPageKey }) {
  const meta = pageMeta[page];

  return (
    <AccentScope accent={meta.accent}>
      <HeroCarousel
        slides={heroSlides[page]}
        eyebrow={meta.eyebrow}
        label={meta.label}
        accent={meta.accent}
      />
      <StubNotice service={meta.label} />
    </AccentScope>
  );
}
