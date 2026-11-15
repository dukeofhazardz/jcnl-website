import type { AccentKey } from "@/config/site";

export type PageIntroCopy = {
  eyebrow: string;
  title: string;
  sub: string;
  accent: AccentKey;
};

/**
 * Phase 1 page headings. All statements are taken from the brief; anything
 * that still needs confirming is left out rather than invented.
 */
export const pageIntro: Record<string, PageIntroCopy> = {
  home: {
    eyebrow: "Established 2003, Lagos, Nigeria",
    title: "Evolve – Innovate – Relax",
    sub: "A logistics and business services company, serving private and public sector clients from offices in Lagos and Abuja.",
    accent: "tours",
  },
  about: {
    eyebrow: "About",
    title: "Indigenous Nigerian. Established 2003.",
    sub: "JCNL serves private and public sector clients across energy, transport, construction, TMC and related business services.",
    accent: "brand",
  },
  "visa-and-tours": {
    eyebrow: "Visa & Tours",
    title: "Travel logistics and tours.",
    sub: "One of the JCNL business lines. Talk to the team about the travel you have in mind.",
    accent: "tours",
  },
  "business-services": {
    eyebrow: "Business Services",
    title: "Designs, training and facilities.",
    sub: "Operational training, facility service management, hospitality and related business services for private and public sector clients.",
    accent: "business",
  },
  "cargo-and-freight": {
    eyebrow: "Cargo & Freight",
    title: "Cargo and freight.",
    sub: "Send cargo enquiries to the dedicated addresses, or call the office and speak to the team.",
    accent: "freight",
  },
  "integrated-farms": {
    eyebrow: "Integrated Farms",
    title: "Integrated farms.",
    sub: "A JCNL business line. Contact the team for current information.",
    accent: "farms",
  },
  engineering: {
    eyebrow: "Engineering",
    title: "Civil engineering works.",
    sub: "Civil engineering works and construction, delivered as part of the JCNL service range.",
    accent: "engineering",
  },
  contact: {
    eyebrow: "Contact",
    title: "Two offices. Three ways to reach us.",
    sub: "Call, WhatsApp or email. Cargo enquiries have their own addresses.",
    accent: "brand",
  },
} as const;

/** Service lines featured on the home page, in navigation order. */
export const homeServices = [
  { label: "Visa & Tours", href: "/visa-and-tours", blurb: "Travel logistics and tours." },
  { label: "Business Services", href: "/business-services", blurb: "Designs, operational training and facility service management." },
  { label: "Cargo & Freight", href: "/cargo-and-freight", blurb: "Cargo and freight enquiries." },
  { label: "Integrated Farms", href: "/integrated-farms", blurb: "The JCNL farms business line." },
  { label: "Engineering", href: "/engineering", blurb: "Civil engineering works and construction." },
] as const;
