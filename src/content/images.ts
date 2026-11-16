/**
 * Typed image manifest.
 *
 * Every image on the site is referenced by path from here and points at
 * /public/images/<page>/<name>.jpg. Drop a real file in at the same path and
 * <SmartImage> shows it with no code change. If the file is missing, the
 * branded placeholder renders instead, labelled with the shot it wants.
 *
 * See public/images/README.md for the full shot list and
 * public/images/CREDITS.md for attribution of licensed images.
 */

export type ImageAsset = {
  /** Path under /public. */
  src: string;
  /** Intended subject, used by the placeholder label and the shot list. */
  subject: string;
  /** Intended pixel size, used by the placeholder label and the shot list. */
  width: number;
  height: number;
};

const hero = (
  page: string,
  file: string,
  subject: string,
  width = 1920,
  height = 1080,
): ImageAsset => ({
  src: `/images/${page}/${file}.jpg`,
  subject,
  width,
  height,
});

/** Hero carousel imagery, grouped by route. */
export const heroImages = {
  home: {
    obudu: hero("home", "obudu-mountain-resort", "Obudu cable car, Cross River State"),
    yankari: hero("home", "yankari-game-reserve", "Yankari Game Reserve, Bauchi State"),
    campagne: hero("home", "la-campagne-tropicana", "La Campagne Tropicana beach huts"),
    lagos: hero("home", "lagos-city-tour", "Lagos Island waterfront"),
    beach: hero("home", "tropical-beach-aerial", "Atlantic beach from the air"),
    safari: hero("home", "safari-wildlife", "Safari wildlife at first light"),
  },
  about: {
    travel: hero("about", "business-travel", "Business travel, airport departures"),
    hotel: hero("about", "hotel-reception", "Hotel reception at dusk"),
    meet: hero("about", "airport-meet-and-greet", "Airport meet and greet"),
    group: hero("about", "tour-group", "Tour group in a city market"),
  },
  tours: {
    obudu: hero("visa-and-tours", "obudu-mountain-resort", "Obudu Mountain Resort"),
    campagne: hero("visa-and-tours", "la-campagne-tropicana", "La Campagne Tropicana"),
    lagos: hero("visa-and-tours", "lagos-city-tour", "Lagos city tour"),
    yankari: hero("visa-and-tours", "yankari-game-reserve", "Yankari Game Reserve"),
    visa: hero("visa-and-tours", "visa-desk", "Visa desk, documents on a table"),
    lounge: hero("visa-and-tours", "airport-lounge", "Airport lounge seating"),
  },
  business: {
    boardroom: hero("business-services", "boardroom", "Boardroom, glass and daylight"),
    skyline: hero("business-services", "city-skyline", "Lagos business district skyline"),
    handshake: hero("business-services", "handshake", "Handshake at a contract signing"),
    charts: hero("business-services", "finance-charts", "Finance charts and a laptop"),
    hospitality: hero("business-services", "hospitality", "Hotel lobby, staff at the desk"),
  },
  freight: {
    aircraft: hero("cargo-and-freight", "cargo-aircraft", "Cargo aircraft being loaded"),
    ship: hero("cargo-and-freight", "container-ship", "Container ship at sea"),
    cranes: hero("cargo-and-freight", "port-cranes", "Port cranes over containers"),
    warehouse: hero("cargo-and-freight", "warehouse", "Warehouse racking and pallets"),
    parcel: hero("cargo-and-freight", "parcel-handover", "Parcel handover, signed for"),
  },
  farms: {
    ponds: hero("integrated-farms", "fish-ponds", "Fish ponds under netting"),
    livestock: hero("integrated-farms", "livestock", "Cattle in a shaded pen"),
    greenhouse: hero("integrated-farms", "greenhouse", "Greenhouse beds in rows"),
    solar: hero("integrated-farms", "solar-farm", "Solar array beside a farm building"),
    aerial: hero("integrated-farms", "farm-aerial", "Farm layout from the air"),
  },
  engineering: {
    site: hero("engineering", "construction-site", "Construction site at work"),
    civil: hero("engineering", "civil-works", "Civil works, drainage and road"),
    facility: hero("engineering", "facility-management", "Facility maintenance on site"),
    power: hero("engineering", "power-infrastructure", "Power distribution infrastructure"),
    retrofit: hero("engineering", "building-retrofit", "Building retrofit in progress"),
  },
  contact: {
    lagos: hero("contact", "lagos-island", "Lagos Island, Simpson Street"),
    abuja: hero("contact", "abuja-skyline", "Abuja skyline"),
    desk: hero("contact", "service-desk", "Customer service desk"),
    phone: hero("contact", "phones-whatsapp", "Phone and WhatsApp on a desk"),
  },
} as const satisfies Record<string, Record<string, ImageAsset>>;

/** Every hero asset, flattened, for lookups and the shot list. */
export const heroImageList: readonly ImageAsset[] = Object.values(
  heroImages,
).flatMap((group) => Object.values(group));

/**
 * Engineering portfolio slots. Six empty records, one photograph each. These
 * are not projects: the client has not supplied any, so the page marks every
 * card CLIENT TO PROVIDE. Dropping a real photograph in at the same path is
 * all that is needed to light the first half of a card up.
 */
export const engineeringProjectImages: readonly ImageAsset[] = Array.from(
  { length: 6 },
  (_, index) => ({
    src: `/images/engineering/projects/project-${String(index + 1).padStart(2, "0")}.jpg`,
    subject: "Project photograph",
    width: 1600,
    height: 1200,
  }),
);

const heroImageBySrc = new Map(heroImageList.map((asset) => [asset.src, asset]));

/** Resolve a slide image path to its manifest entry. */
export function heroImage(src: string): ImageAsset | undefined {
  return heroImageBySrc.get(src);
}

/** Brand assets outside the per-page hero groups. */
export const siteImages = {
  logo: {
    src: "/images/logo.png",
    alt: "JCNL logo",
    subject: "Logo",
    width: 320,
    height: 320,
  },
  socialCard: {
    src: "/images/og/default.jpg",
    alt: "JCNL — a logistics and business services company",
    subject: "Social share card · wordmark on jungle green",
    width: 1200,
    height: 630,
  },
} as const satisfies Record<string, ImageAsset & { alt: string }>;

/** Demonstration asset for the /styleguide route. Deliberately missing. */
export const styleguideImages = {
  sample: {
    src: "/images/styleguide/sample.jpg",
    alt: "Placeholder sample used to demonstrate the fallback",
    subject: "Obudu cable car",
    width: 1920,
    height: 1080,
  },
} as const satisfies Record<string, ImageAsset & { alt: string }>;
