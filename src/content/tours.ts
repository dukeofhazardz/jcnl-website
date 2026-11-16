import type { ImageAsset } from "@/content/images";
import { heroImages } from "@/content/images";

/**
 * Visa & Tours page content.
 *
 * Every claim below comes from the client brief: the four product names, their
 * audiences, the tenured savings period, the discounts, the bank-to-bank cover,
 * the 76,000+ hotels, the visa types and the LESS 20.0 service list. Nothing
 * here is a client, a credential or a performance figure, because none have
 * been supplied.
 */

export type TourProductId =
  | "tour360"
  | "travelcredit"
  | "visaassist"
  | "less20";

export type TourProduct = {
  id: TourProductId;
  /** Exact product name. Do not shorten these. */
  name: string;
  /** Short label above the name. */
  kicker: string;
  summary: string;
  points: readonly string[];
  /** One client-supplied figure set large. Omit when there is no number. */
  figure?: { value: string; label: string };
  image?: ImageAsset;
  alt?: string;
};

export const tourProducts: readonly TourProduct[] = [
  {
    id: "tour360",
    name: "Tour360",
    kicker: "Tour plan",
    summary:
      "A tour plan for individuals, groups, corporates and high-net-worth individuals. You pay into a tenured savings deposit for at least six months before your tour dates, and the plan returns discounts on flights, hotels and visa assistance.",
    points: [
      "Religious, traditional and social groups",
      "Business survey tours",
      "Event and convention tours",
      "Guided sightseeing",
    ],
    figure: {
      value: "6 months",
      label: "Minimum savings period before your tour dates",
    },
    image: heroImages.tours.obudu,
    alt: "Mountain road and cable car at Obudu Mountain Resort",
  },
  {
    id: "travelcredit",
    name: "TRAVELCredit",
    kicker: "Travel credit",
    summary:
      "A savings-based facility that eases domestic and overseas business and private travel through a bank-to-bank cover. It is open to corporates, executives, high-net-worth individuals and people in strategic positions.",
    points: [
      "Bank-to-bank cover",
      "Free seat reservation",
      "Ticket issuance",
      "Hotel arrangement",
    ],
    figure: {
      value: "76,000+",
      label: "Hotels available for arrangement",
    },
  },
  {
    id: "visaassist",
    name: "VISA-Assist247",
    kicker: "Visa advisory",
    summary:
      "Accurate information and advisory at a very competitive fee. VISA-Assist247 confirms reservations and hotel bookings for long-stay, visiting and work visas, which saves you time and money.",
    points: [],
    image: heroImages.tours.visa,
    alt: "Passport, forms and a pen laid out on a desk",
  },
  {
    id: "less20",
    name: "LESS 20.0",
    kicker: "Other services",
    summary:
      "LESS 20.0 takes 20% off the discountable charges on the services below.",
    points: [],
    figure: {
      value: "20%",
      label: "Less on discountable charges",
    },
  },
] as const;

/**
 * VISA-Assist247's two lists, kept separate from the shared `points` so the
 * section never depends on array positions.
 */
export const visaAssistGroups = [
  {
    heading: "Visas we advise on",
    items: ["Long-stay visas", "Visiting visas", "Work visas"],
  },
  {
    heading: "Confirmed for you",
    items: ["Confirmed reservations", "Hotel bookings"],
  },
] as const;

/**
 * The LESS 20.0 service list, kept in the client's wording. `icon` is a key,
 * not a component, so this file stays plain data.
 */
export type Less20Icon =
  | "insurance"
  | "conference"
  | "leisure"
  | "delivery"
  | "emergency"
  | "aircraft"
  | "tickets"
  | "transfers"
  | "chauffeur"
  | "currency"
  | "reports"
  | "policy"
  | "crisis"
  | "club";

export type Less20Item = {
  label: string;
  icon: Less20Icon;
};

export const less20Items: readonly Less20Item[] = [
  {
    label: "Travel insurance: individual, multi-traveller, single or multiple trip, annual",
    icon: "insurance",
  },
  { label: "Conference and incentive group travel", icon: "conference" },
  { label: "Leisure travel booking", icon: "leisure" },
  { label: "Ticket and document delivery", icon: "delivery" },
  { label: "24-hour emergency service", icon: "emergency" },
  {
    label: "Executive aircraft and helicopter charters",
    icon: "aircraft",
  },
  { label: "Theatre, opera and special-event tickets", icon: "tickets" },
  { label: "Airport transfers", icon: "transfers" },
  { label: "Chauffeur-driven cars", icon: "chauffeur" },
  { label: "Foreign currency", icon: "currency" },
  { label: "Full-service management reports", icon: "reports" },
  { label: "Corporate travel policy development", icon: "policy" },
  { label: "Crisis management", icon: "crisis" },
  { label: "Online travel club", icon: "club" },
] as const;

/** Tour360, reduced to the four stages the brief supports. */
export const tourSteps = [
  {
    title: "Save",
    body: "Pay into the tenured savings deposit. It runs for at least six months before your tour dates.",
  },
  {
    title: "Plan",
    body: "Set the tour with us: business survey, religious, event or convention, or guided sightseeing.",
  },
  {
    title: "Discounts",
    body: "The plan applies its discounts to flights, hotels and visa assistance.",
  },
  {
    title: "Travel",
    body: "Fly on the dates you set, with the arrangements already in place.",
  },
] as const;

export type TourGalleryItem = {
  id: string;
  image: ImageAsset;
  caption: string;
  detail: string;
  alt: string;
};

export const tourGallery: readonly TourGalleryItem[] = [
  {
    id: "obudu",
    image: heroImages.tours.obudu,
    caption: "Obudu Mountain Resort",
    detail: "Cable car and mountain road, Cross River State",
    alt: "Cable car climbing the plateau at Obudu Mountain Resort",
  },
  {
    id: "campagne",
    image: heroImages.tours.campagne,
    caption: "La Campagne Tropicana",
    detail: "Beach huts under palms, Lagos",
    alt: "Thatched beach huts under palm trees at La Campagne Tropicana",
  },
  {
    id: "lagos",
    image: heroImages.tours.lagos,
    caption: "Lagos Island",
    detail: "Markets and colonial-era buildings, Lagos Island",
    alt: "Street scene on Lagos Island with colonial-era buildings",
  },
] as const;

/** In-page anchors for the product index. */
export const tourAnchors = tourProducts.map((product) => ({
  id: product.id,
  name: product.name,
  kicker: product.kicker,
}));
