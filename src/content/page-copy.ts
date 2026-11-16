import type { AccentKey } from "@/config/site";
import { site } from "@/config/site";
import type { HeroPageKey } from "@/content/slides";

export type PageMeta = {
  /** Page name, used for the carousel region label and the stub notice. */
  label: string;
  /** Small overline above the hero headline. */
  eyebrow: string;
  /** Page accent, applied through <AccentScope>. */
  accent: AccentKey;
};

/**
 * Page-level framing. The headline and supporting line now live in the hero
 * slides (`src/content/slides.ts`); everything here is stable per page.
 */
export const pageMeta: Record<HeroPageKey, PageMeta> = {
  home: {
    label: "JCNL",
    eyebrow: `Established ${site.established}, Lagos, Nigeria`,
    accent: "tours",
  },
  about: {
    label: "About",
    eyebrow: "About",
    accent: "brand",
  },
  tours: {
    label: "Visa & Tours",
    eyebrow: "Visa & Tours",
    accent: "tours",
  },
  business: {
    label: "Business Services",
    eyebrow: "Business Services",
    accent: "business",
  },
  freight: {
    label: "Cargo & Freight",
    eyebrow: "Cargo & Freight",
    accent: "freight",
  },
  farms: {
    label: "Integrated Farms",
    eyebrow: "Integrated Farms",
    accent: "farms",
  },
  engineering: {
    label: "Engineering",
    eyebrow: "Engineering",
    accent: "engineering",
  },
  contact: {
    label: "Contact",
    eyebrow: "Contact",
    accent: "brand",
  },
};

/** Service lines featured on the home page, in navigation order. */
export const homeServices = [
  { label: "Visa & Tours", href: "/visa-and-tours", blurb: "Travel logistics and tours." },
  { label: "Business Services", href: "/business-services", blurb: "Designs, operational training and facility service management." },
  { label: "Cargo & Freight", href: "/cargo-and-freight", blurb: "Cargo and freight enquiries." },
  { label: "Integrated Farms", href: "/integrated-farms", blurb: "The JCNL farms business line." },
  { label: "Engineering", href: "/engineering", blurb: "Civil engineering works and construction." },
] as const;
