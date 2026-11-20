import { site } from "@/config/site";
import type { HeroPageKey } from "@/content/slides";

export type PageMeta = {
  /** Page name, used for the carousel region label and the stub notice. */
  label: string;
  /** Small overline above the hero headline. */
  eyebrow: string;
};

/**
 * Page-level framing. The headline and supporting line now live in the hero
 * slides (`src/content/slides.ts`); everything here is stable per page.
 */
export const pageMeta: Record<HeroPageKey, PageMeta> = {
  home: {
    label: "JCNL",
    eyebrow: `Established ${site.established}, Lagos, Nigeria`,
  },
  about: {
    label: "About",
    eyebrow: "The company",
  },
  tours: {
    label: "Visa & Tours",
    eyebrow: "Visa & Tours",
  },
  business: {
    label: "Business Services",
    eyebrow: "Business Services",
  },
  freight: {
    label: "Cargo & Freight",
    eyebrow: "Cargo & Freight",
  },
  farms: {
    label: "Integrated Farms",
    eyebrow: "Integrated Farms",
  },
  engineering: {
    label: "Engineering",
    eyebrow: "Engineering",
  },
  realestate: {
    label: "Real Estate",
    eyebrow: "Real Estate",
  },
  contact: {
    label: "Contact",
    eyebrow: "Contact",
  },
};

/** Service lines featured on the home page, in navigation order. */
export const homeServices = [
  { label: "Visa & Tours", href: "/visa-and-tours", blurb: "Travel logistics and tours." },
  { label: "Business Services", href: "/business-services", blurb: "Designs, operational training and facility service management." },
  { label: "Cargo & Freight", href: "/cargo-and-freight", blurb: "Cargo and freight enquiries." },
  { label: "Integrated Farms", href: "/integrated-farms", blurb: "The JCNL farms business line." },
  { label: "Engineering", href: "/engineering", blurb: "Civil engineering works and construction." },
  { label: "Real Estate", href: "/real-estate", blurb: "Land, homes and commercial space for sale." },
] as const;
