import type { ImageAsset } from "@/content/images";
import { heroImages } from "@/content/images";

/**
 * Integrated Farms page content.
 *
 * Every claim below comes from the client brief: the farm's name, its place,
 * the purpose it serves, the sixteen facilities in the client's own order, and
 * the three values named in the same paragraph as the purpose. No yields,
 * headcounts, customers or certifications are stated, because none have been
 * supplied.
 */

export const farm = {
  name: "Integrated Fish and Livestock Farm",
  /** Short form, matching the navigation label. */
  shortName: "Integrated Farms",
  village: "Idiagbon Village",
  town: "Iju-Ota",
  lga: "Ado-Odo/Ota Local Government Area",
  state: "Ogun State",
  country: "Nigeria",
  addressLines: [
    "Idiagbon Village, Iju-Ota",
    "Ado-Odo/Ota Local Government Area",
    "Ogun State, Nigeria",
  ],
  /** Google Maps search query, built from the address above. */
  query: "Idiagbon Village, Iju-Ota, Ado-Odo/Ota, Ogun State, Nigeria",
  image: heroImages.farms.ponds as ImageAsset,
  alt: "Rows of fish ponds under netting on the farm",
} as const;

/**
 * One icon key per facility. Keys are data, not components, so this file stays
 * plain and the icon map lives with the section.
 */
export type FarmFacilityIcon =
  | "residence"
  | "staffHouse"
  | "offices"
  | "stores"
  | "processing"
  | "feed"
  | "nursery"
  | "greenhouse"
  | "water"
  | "digester"
  | "coldRoom"
  | "irrigation"
  | "power"
  | "security"
  | "cameras"
  | "tower";

export type FarmFacility = {
  label: string;
  icon: FarmFacilityIcon;
};

/** The client's list, in the client's order. */
export const farmFacilities: readonly FarmFacility[] = [
  { label: "Residence", icon: "residence" },
  { label: "Farmhouse for shift employees", icon: "staffHouse" },
  { label: "Offices", icon: "offices" },
  { label: "Store halls", icon: "stores" },
  { label: "Processing halls", icon: "processing" },
  { label: "Feed production center", icon: "feed" },
  { label: "Nursery", icon: "nursery" },
  { label: "Greenhouse", icon: "greenhouse" },
  { label: "Borehole system and water reservoir", icon: "water" },
  { label: "Bio-digesters", icon: "digester" },
  { label: "Cold room", icon: "coldRoom" },
  { label: "Automated water irrigation system", icon: "irrigation" },
  { label: "Power and maintenance office", icon: "power" },
  {
    label: "Security houses with a monitoring room on both ends of the farm",
    icon: "security",
  },
  { label: "Wide-coverage solar-powered cameras", icon: "cameras" },
  {
    label: "Scaffold tower with search lights for area surveillance",
    icon: "tower",
  },
] as const;

/**
 * The three values the brief names. They are shown as words only: the brief
 * gives the purpose sentence and these three terms, and nothing further.
 */
export const farmValues = ["Employment", "Empowerment", "Nutrition"] as const;
