import { contact, offices, site, whatsappHref } from "@/config/site";
import {
  businessIntents,
  intentHref,
  type BusinessIntentId,
} from "@/content/business-services";
import { heroImages } from "@/content/images";

/**
 * Hero carousel copy.
 *
 * Draft copy for phase 2: every claim here is either in the brief or a plain
 * statement of what the service line does. Nothing is a credential, a client,
 * a statistic or a named project, because none of those have been supplied.
 * Refine the wording per page; do not add facts.
 */

export type SlideCta = {
  label: string;
  href: string;
  /** Opens in a new tab. Set for WhatsApp and other off-site links. */
  external?: boolean;
};

export type Slide = {
  /** Stable key, used for React keys and analytics later. */
  id: string;
  /** File under /public. */
  image: string;
  /** Alt text. Required. */
  alt: string;
  headline: string;
  /** One line. No paragraph. */
  sub: string;
  cta: SlideCta;
};

export type HeroPageKey =
  | "home"
  | "about"
  | "tours"
  | "business"
  | "freight"
  | "farms"
  | "engineering"
  | "contact";

const talkToUs: SlideCta = { label: "Talk to us", href: "/contact" };

const discussProject: SlideCta = {
  label: "Discuss a project",
  href: "/contact",
};

const requestQuote: SlideCta = { label: "Request a quote", href: "#quote" };

const planATrip: SlideCta = { label: "Plan this trip", href: "/contact" };

/** A hero CTA that carries one of the Business Services enquiry subjects. */
function businessCtaFor(id: BusinessIntentId): SlideCta {
  const intent = businessIntents.find((entry) => entry.id === id);
  return intent
    ? { label: intent.label, href: intentHref(intent) }
    : talkToUs;
}

const whatsappUs: SlideCta = {
  label: "WhatsApp us",
  href: whatsappHref("Hello JCNL, I would like to ask about a trip."),
  external: true,
};

/** Street address as one line, straight from the single source of truth. */
function officeLine(city: string): string {
  const office = offices.find((entry) => entry.city === city);
  if (!office) return "";
  return `${office.lines[0]}, ${office.lines[1]}.`;
}

export const heroSlides: Record<HeroPageKey, readonly Slide[]> = {
  home: [
    {
      id: "home-obudu",
      image: heroImages.home.obudu.src,
      alt: "Cable car climbing towards the Obudu plateau in Cross River State",
      headline: "The highlands, without the rush.",
      sub: "Obudu's cable car, the plateau road and a hotel above the cloud line.",
      cta: planATrip,
    },
    {
      id: "home-yankari",
      image: heroImages.home.yankari.src,
      alt: "Elephant standing at a waterhole in Yankari Game Reserve",
      headline: "Yankari, before the heat.",
      sub: "Warm springs and guided game drives in Bauchi State.",
      cta: planATrip,
    },
    {
      id: "home-campagne",
      image: heroImages.home.campagne.src,
      alt: "Palm thatch beach huts facing calm water at La Campagne Tropicana",
      headline: "A beach that keeps its shade.",
      sub: "Palm thatch and calm water on the Lekki coast.",
      cta: planATrip,
    },
    {
      id: "home-lagos",
      image: heroImages.home.lagos.src,
      alt: "Lagos Island waterfront seen across the lagoon",
      headline: "Lagos, from the water.",
      sub: "Ferries, markets and the old quarter, with a guide who lives here.",
      cta: planATrip,
    },
    {
      id: "home-coast",
      image: heroImages.home.beach.src,
      alt: "Aerial view of the Atlantic shoreline and palm trees",
      headline: "The coast, from above.",
      sub: "Nigeria's Atlantic shoreline, seen the way the light finds it.",
      cta: whatsappUs,
    },
    {
      id: "home-safari",
      image: heroImages.home.safari.src,
      alt: "Game drive at first light on open savannah",
      headline: "First light on the reserve.",
      sub: "The hour when the air is cool and the animals are moving.",
      cta: talkToUs,
    },
  ],

  about: [
    {
      id: "about-travel",
      image: heroImages.about.travel.src,
      alt: "Traveller with a carry-on bag reading the departures board",
      headline: "A company that travels for work.",
      sub: `Established ${site.established}, JCNL moves people and freight between Lagos, Abuja and the places business takes them.`,
      cta: talkToUs,
    },
    {
      id: "about-meet",
      image: heroImages.about.meet.src,
      alt: "Driver holding a name board in an airport arrivals hall",
      headline: "A name at arrivals.",
      sub: "Airport transfers, arranged as part of the travel logistics.",
      cta: talkToUs,
    },
    {
      id: "about-hotel",
      image: heroImages.about.hotel.src,
      alt: "Hotel reception desk lit warmly at dusk",
      headline: "A room that is already booked.",
      sub: "Hospitality booked and confirmed before you land.",
      cta: talkToUs,
    },
    {
      id: "about-group",
      image: heroImages.about.group.src,
      alt: "Small guided group walking through a busy city market",
      headline: "Groups, on one schedule.",
      sub: "Delegations and tour groups, travelling together.",
      cta: talkToUs,
    },
  ],

  tours: [
    {
      id: "tours-obudu",
      image: heroImages.tours.obudu.src,
      alt: "Mountain road and cable car at Obudu Mountain Resort",
      headline: "Obudu, at the top of the plateau.",
      sub: "Cable car, mountain air and a hotel that sits above the cloud line.",
      cta: planATrip,
    },
    {
      id: "tours-campagne",
      image: heroImages.tours.campagne.src,
      alt: "Beach huts under palms at La Campagne Tropicana",
      headline: "La Campagne Tropicana.",
      sub: "Thatch, palm shade and the Atlantic at the end of the path.",
      cta: planATrip,
    },
    {
      id: "tours-lagos",
      image: heroImages.tours.lagos.src,
      alt: "Street scene on Lagos Island with colonial-era buildings",
      headline: "Lagos Island on foot.",
      sub: "Markets, churches and the old quarter, walked with a guide.",
      cta: planATrip,
    },
    {
      id: "tours-yankari",
      image: heroImages.tours.yankari.src,
      alt: "Savannah and warm springs at Yankari Game Reserve",
      headline: "Yankari Game Reserve.",
      sub: "Warm springs and game drives in Bauchi State.",
      cta: planATrip,
    },
    {
      id: "tours-visa",
      image: heroImages.tours.visa.src,
      alt: "Passport, forms and a pen laid out on a desk",
      headline: "The visa desk first.",
      sub: "Travel logistics that start before the flight, not at the airport.",
      cta: planATrip,
    },
    {
      id: "tours-lounge",
      image: heroImages.tours.lounge.src,
      alt: "Quiet airport lounge seating beside a window",
      headline: "Time to spare at the airport.",
      sub: "The part of the journey that happens before departure.",
      cta: whatsappUs,
    },
  ],

  business: [
    {
      id: "business-boardroom",
      image: heroImages.business.boardroom.src,
      alt: "Boardroom table with daylight through floor-to-ceiling glass",
      headline: "Business services, built to hold.",
      sub: "Designs, operational training, hospitality and facility service management.",
      cta: talkToUs,
    },
    {
      id: "business-skyline",
      image: heroImages.business.skyline.src,
      alt: "Office towers in the Lagos business district",
      headline: "Seven sectors, one company.",
      sub: "From manufacturing and oil and gas to finance and power.",
      cta: talkToUs,
    },
    {
      id: "business-handshake",
      image: heroImages.business.handshake.src,
      alt: "Two people shaking hands over a signed contract",
      headline: "Funding for structured projects.",
      sub: "Investor introductions for projects that meet due diligence and contractual quality criteria.",
      cta: businessCtaFor("investment-collaboration"),
    },
    {
      id: "business-charts",
      image: heroImages.business.charts.src,
      alt: "Printed finance charts beside an open laptop",
      headline: "Trade finance, in the documents providers use.",
      sub: "BG/SBLC, Usance LC, performance guarantees and related instruments.",
      cta: { label: "See the instruments", href: "#instruments" },
    },
    {
      id: "business-power",
      image: heroImages.business.power.src,
      alt: "Solar array and power infrastructure beside a commercial building",
      headline: "Power, property, transit.",
      sub: "High-yield projects across real estate, transit, farming, housing, schools and parks.",
      cta: talkToUs,
    },
  ],

  freight: [
    {
      id: "freight-aircraft",
      image: heroImages.freight.aircraft.src,
      alt: "Cargo aircraft on the apron with pallets being loaded",
      headline: "By air, to the address you name.",
      sub: "Delivery by air, through partner collaborations.",
      cta: requestQuote,
    },
    {
      id: "freight-ship",
      image: heroImages.freight.ship.src,
      alt: "Container ship under way with a full deck of containers",
      headline: "By sea and by water.",
      sub: "The same partner collaborations, moving dry and wet cargo.",
      cta: requestQuote,
    },
    {
      id: "freight-cranes",
      image: heroImages.freight.cranes.src,
      alt: "Ship-to-shore cranes lifting containers at a port",
      headline: "Dry and wet cargo, one platform.",
      sub: "Newly inaugurated by JCNL for freight and forwarding.",
      cta: requestQuote,
    },
    {
      id: "freight-warehouse",
      image: heroImages.freight.warehouse.src,
      alt: "Warehouse racking with stacked pallets and a forklift",
      headline: "Business at your leisure.",
      sub: "A self-sustaining platform that runs at the customer's pace.",
      cta: requestQuote,
    },
    {
      id: "freight-parcel",
      image: heroImages.freight.parcel.src,
      alt: "Courier handing a parcel over for a signature",
      headline: "Ordered on request, then delivered.",
      sub: "Parcel and cargo management to the destination you specify.",
      cta: requestQuote,
    },
  ],

  farms: [
    {
      id: "farms-ponds",
      image: heroImages.farms.ponds.src,
      alt: "Rows of fish ponds covered with netting",
      headline: "Water, put to work.",
      sub: "Fish ponds, integrated with the rest of the farm.",
      cta: talkToUs,
    },
    {
      id: "farms-livestock",
      image: heroImages.farms.livestock.src,
      alt: "Cattle standing in a shaded, fenced pen",
      headline: "Livestock, kept to a standard.",
      sub: "Housing and feed, as one part of the farm's own cycle.",
      cta: talkToUs,
    },
    {
      id: "farms-greenhouse",
      image: heroImages.farms.greenhouse.src,
      alt: "Rows of raised beds inside a greenhouse",
      headline: "Under glass and shade.",
      sub: "Beds that extend the growing season past the rains.",
      cta: talkToUs,
    },
    {
      id: "farms-solar",
      image: heroImages.farms.solar.src,
      alt: "Solar array beside a farm building",
      headline: "Power on the farm.",
      sub: "The farm's own supply, for pumps and cold storage.",
      cta: talkToUs,
    },
    {
      id: "farms-aerial",
      image: heroImages.farms.aerial.src,
      alt: "Aerial view of ponds, pens and crop beds on one farm",
      headline: "The whole farm, from above.",
      sub: "Ponds, pens and beds laid out as one operation.",
      cta: talkToUs,
    },
  ],

  engineering: [
    {
      id: "engineering-site",
      image: heroImages.engineering.site.src,
      alt: "Construction site with scaffolding and workers in hi-vis",
      headline: "Civil engineering works.",
      sub: "One of the four disciplines JCNL undertakes.",
      cta: discussProject,
    },
    {
      id: "engineering-civil",
      image: heroImages.engineering.civil.src,
      alt: "Civil works in progress, with drainage and a road base",
      headline: "Construction.",
      sub: "Building work, from setting out to handover.",
      cta: discussProject,
    },
    {
      id: "engineering-facility",
      image: heroImages.engineering.facility.src,
      alt: "Maintenance engineer working on building services",
      headline: "Facility service management.",
      sub: "The upkeep of buildings in use, after handover.",
      cta: discussProject,
    },
    {
      id: "engineering-power",
      image: heroImages.engineering.power.src,
      alt: "Power distribution equipment and switchgear on site",
      headline: "Energy, Transport, Construction.",
      sub: "The three sectors JCNL serves with this work.",
      cta: discussProject,
    },
    {
      id: "engineering-retrofit",
      image: heroImages.engineering.retrofit.src,
      alt: "Building facade being renovated with scaffolding in place",
      headline: "Four disciplines, one company.",
      sub: "Civil works, construction, facility service management and training.",
      cta: discussProject,
    },
  ],

  contact: [
    {
      id: "contact-offices",
      image: heroImages.contact.lagos.src,
      alt: "Street in Lagos Island near the JCNL office",
      headline: "Two offices. One team.",
      sub: "Abuja and Lagos, with one set of contact details for both.",
      cta: whatsappUs,
    },
    {
      id: "contact-abuja",
      image: heroImages.contact.abuja.src,
      alt: "Abuja skyline with the city's hills behind it",
      headline: "Abuja, Gwarinpa.",
      sub: officeLine("Abuja"),
      cta: talkToUs,
    },
    {
      id: "contact-lagos",
      image: heroImages.contact.desk.src,
      alt: "Customer service desk with a member of staff",
      headline: "Lagos Island.",
      sub: officeLine("Lagos"),
      cta: talkToUs,
    },
    {
      id: "contact-whatsapp",
      image: heroImages.contact.phone.src,
      alt: "Phone on a desk showing a WhatsApp conversation",
      headline: "WhatsApp, if that is easier.",
      sub: `${contact.whatsapp.display}. Click to chat, and we reply from the same number.`,
      cta: whatsappUs,
    },
  ],
} as const;
