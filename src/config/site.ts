/**
 * Single source of truth for brand facts, navigation and contact details.
 * Every value here comes from the client brief. Do not add claims that are
 * not in the brief.
 */

export type LogoAsset = {
  src: string;
  /** Real intrinsic pixel size of the supplied artwork. */
  width: number;
  height: number;
};

/**
 * A date window that shows an alternate logo. Dates are local calendar dates
 * in `timeZone`, inclusive at both ends. Add a new entry each year; nothing
 * else needs to change.
 */
export type SeasonalLogo = {
  id: string;
  src: string;
  width: number;
  height: number;
  /** First day the logo shows, YYYY-MM-DD. */
  start: string;
  /** Last day the logo shows, YYYY-MM-DD, through 23:59. */
  end: string;
  /** IANA zone used for the calendar-day comparison. */
  timeZone: string;
  /** Appended to the alt text while the window is open. */
  altSuffix: string;
};

export type NavItem = {
  label: string;
  href: string;
  /** One line shown in the mobile menu. Service names only. */
  blurb: string;
};

export type Office = {
  city: string;
  /** Address lines, already in the client's wording. */
  lines: readonly string[];
  /** Used for the Google Maps query. */
  query: string;
};

export type EmailLink = {
  label: string;
  address: string;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://jesrudebconnect.org";

export const site = {
  name: "JESRUDEB@CONNECT NIGERIA LIMITED",
  shortName: "JCNL",
  /** JCNL is the acronym for the full registered name. */
  acronym: "JESRUDEB@CONNECT NIGERIA LIMITED",
  descriptor: "A LOGISTICS & BUSINESS SERVICES COMPANY",
  tagline: "EVOLVE – INNOVATE – RELAX",
  taglineParts: ["Evolve", "Innovate", "Relax"] as const,
  mission:
    "To PROVIDE our customers with World class and value added services that matches international standards globally.",
  established: 2003,
  country: "Nigeria",
  headquarters: "Lagos",
  /** Registration number printed inside the logo. Confirm with the client. */
  registration: "RC471840",
  url: siteUrl,
  description:
    "JESRUDEB@CONNECT NIGERIA LIMITED (JCNL) is an indigenous Nigerian logistics and business services company, established in 2003, serving private and public sector clients from offices in Lagos and Abuja.",
  /**
   * One logo, always on white. The file paths live here so the artwork can be
   * replaced without touching a component.
   *
   * `logo-christmas-transparent.png` is a derived copy: the supplied
   * `logo-christmas.png` was exported on a solid black field with no alpha,
   * which cannot sit on white. The original is untouched; replace the derived
   * file if the client supplies a clean transparent export.
   */
  logo: {
    main: {
      src: "/logos/logo.png",
      width: 1991,
      height: 789,
    },
    christmas: {
      src: "/logos/logo-christmas-transparent.png",
      width: 1994,
      height: 789,
    },
    alt: "Jesrudeb@Connect Nigeria Limited (JCNL), Logistics & Business Service Company",
  },
} as const;

/**
 * Seasonal artwork windows. Christmas runs from 20 November through 14
 * January inclusive, in Lagos time, then the main logo returns automatically.
 * The site is statically generated, so the active logo is resolved in the
 * browser before first paint (see `SeasonalLogoScript` in `app/layout.tsx`),
 * not at build time.
 */
export const seasonalLogos: readonly SeasonalLogo[] = [
  {
    id: "christmas",
    src: site.logo.christmas.src,
    width: site.logo.christmas.width,
    height: site.logo.christmas.height,
    start: "2026-11-20",
    end: "2027-01-14",
    timeZone: "Africa/Lagos",
    altSuffix: "Christmas edition",
  },
] as const;

export const nav: readonly NavItem[] = [
  {
    label: "Home",
    href: "/",
    blurb: "Logistics and business services, from Lagos and Abuja.",
  },
  {
    label: "About",
    href: "/about",
    blurb: "Indigenous Nigerian, established 2003.",
  },
  {
    label: "Visa & Tours",
    href: "/visa-and-tours",
    blurb: "Travel logistics and tours.",
  },
  {
    label: "Business Services",
    href: "/business-services",
    blurb: "Designs, training, hospitality and facilities.",
  },
  {
    label: "Cargo & Freight",
    href: "/cargo-and-freight",
    blurb: "Cargo and freight enquiries.",
  },
  {
    label: "Integrated Farms",
    href: "/integrated-farms",
    blurb: "The JCNL farms business line.",
  },
  {
    label: "Engineering",
    href: "/engineering",
    blurb: "Civil engineering works and construction.",
  },
  {
    label: "Real Estate",
    href: "/real-estate",
    blurb: "Land, homes and commercial space for sale.",
  },
  {
    label: "Contact",
    href: "/contact",
    blurb: "Two offices. Call, WhatsApp or email.",
  },
] as const;

export const offices: readonly Office[] = [
  {
    city: "Abuja",
    lines: [
      "Suite 14, War College Estate Plaza",
      "3rd Avenue, Gwarinpa",
      "Abuja, Nigeria",
    ],
    query: "War College Estate Plaza, 3rd Avenue, Gwarinpa, Abuja, Nigeria",
  },
  {
    city: "Lagos",
    lines: [
      "Block A4, Suite 16, Sura Shopping Complex",
      "Simpson Street, Lagos Island",
      "Lagos, Nigeria",
    ],
    query: "Sura Shopping Complex, Simpson Street, Lagos Island, Lagos, Nigeria",
  },
] as const;

export const contact = {
  phone: {
    label: "Call",
    display: "+234-803-469-0000",
    href: "tel:+2348034690000",
  },
  whatsapp: {
    label: "WhatsApp / Call",
    display: "+234-816-082-6809",
    number: "2348160826809",
    href: "tel:+2348160826809",
  },
  email: {
    label: "Email",
    display: "info.services@jesrudebconnect.org",
    href: "mailto:info.services@jesrudebconnect.org",
  },
  cargoEmails: ["info.jcnl@gmail.com", "jesrudeb.connect@gmail.com"] as readonly string[],
} as const;

export const socials = [
  {
    label: "X",
    handle: "@jesrudeb247",
    href: "https://x.com/jesrudeb247",
  },
] as const;

export const whatsappDefaultMessage =
  "Hello JCNL, I would like to make an enquiry.";

/** Click-to-chat link. Encodes the message for the wa.me hand-off. */
export function whatsappHref(message: string = whatsappDefaultMessage): string {
  return `https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(message)}`;
}

export function mailHref(address: string): string {
  return `mailto:${address}`;
}

export function mapsHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function currentYear(): number {
  return new Date().getFullYear();
}

/** The copyright range is fixed at the founding year. */
export const copyrightRange = `${site.established}–${currentYear()}`;

/**
 * The tagline with a non-breaking space before each dash: a line may break after
 * the dash, never before it.
 */
export const taglineDisplay = site.taglineParts.join("\u00A0— ");
