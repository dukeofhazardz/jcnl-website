/**
 * Engineering page content.
 *
 * The only facts used here are the ones the client has supplied: JCNL
 * undertakes civil engineering works, construction, facility service
 * management, and design and operational training, for clients in the Energy,
 * Transport and Construction sectors. Everything a buyer would normally expect
 * beyond that (project names, dates, values, certifications, equipment,
 * headcount, references) is marked CLIENT_TO_PROVIDE and listed in
 * CLIENT_TODO.md. Nothing is invented.
 */

/** The literal marker shown wherever the client still has to supply a fact. */
export const CLIENT_TO_PROVIDE = "[CLIENT TO PROVIDE]";

export type EngineeringCapabilityIcon =
  | "civil"
  | "construction"
  | "facility"
  | "training";

export type EngineeringCapability = {
  id: EngineeringCapabilityIcon;
  label: string;
  /** One line on what the discipline covers. No claims about past work. */
  body: string;
};

export const engineeringCapabilities = {
  eyebrow: "Capabilities",
  heading: "Four lines of work.",
  intro:
    "JCNL undertakes civil engineering works, construction, facility service management, and design and operational training. All four sit under one company.",
  /** Sits under every card, where a scope list would normally go. */
  cardNote: "Scope and package",
  items: [
    {
      id: "civil",
      label: "Civil Engineering Works",
      body: "Ground, drainage and structures.",
    },
    {
      id: "construction",
      label: "Construction",
      body: "Building work, from setting out to handover.",
    },
    {
      id: "facility",
      label: "Facility Service Management",
      body: "The upkeep of buildings in use, after handover.",
    },
    {
      id: "training",
      label: "Design & Operational Training",
      body: "Training for design teams, and for the teams who run a site.",
    },
  ] satisfies readonly EngineeringCapability[],
} as const;

export type EngineeringSectorIcon = "energy" | "transport" | "construction";

export const engineeringSectors = {
  eyebrow: "Sectors",
  heading: "Energy, Transport, Construction.",
  intro: "JCNL serves private and public clients in three sectors.",
  items: [
    { id: "energy", label: "Energy" },
    { id: "transport", label: "Transport" },
    { id: "construction", label: "Construction" },
  ] satisfies readonly { id: EngineeringSectorIcon; label: string }[],
  /** One placeholder for the whole list, rather than three repeated ones. */
  todoNote: "Sector references and completed works",
} as const;

export const engineeringApproach = {
  eyebrow: "Delivery approach",
  heading: "Consult, design, build, maintain.",
  intro: "Four stages, in this order. Each project decides the detail.",
  items: [
    {
      title: "Consult",
      body: "The brief, the site, and what the client needs from both.",
    },
    {
      title: "Design",
      body: "Drawings and scope for the works.",
    },
    {
      title: "Build",
      body: "Construction to the agreed drawing.",
    },
    {
      title: "Maintain",
      body: "Facility service management once the building is in use.",
    },
  ],
} as const;

export const engineeringPortfolio = {
  eyebrow: "Project records",
  heading: "This is where the projects go.",
  intro:
    "No completed works have been supplied yet. Each card below holds one project record: photograph, name, sector, year and scope.",
  cardNote: "Name, sector, year, scope",
} as const;

export const engineeringCta = {
  eyebrow: "Next step",
  heading: "Tell us about the works.",
  body: "Send the site, the scope and the dates. The team will say what JCNL can take on.",
  whatsappLabel: "Discuss on WhatsApp",
  whatsappMessage: "Hello JCNL, I would like to discuss an engineering project.",
} as const;
