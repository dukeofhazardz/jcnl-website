/**
 * Business Services page content.
 *
 * Every statement here comes from the client brief: the four business service
 * lines, the seven sectors served, the funding support described in the brief,
 * the eight trade finance instruments, and the two enquiry paths. No rate,
 * return, timeline, client or credential is added. The funding copy deliberately
 * stops at the criteria the client named; it does not promise an outcome.
 */

/** Shown next to the instruments, in the client's exact wording. */
export const dueDiligenceNote =
  "Terms and eligibility are subject to due diligence.";

export type BusinessServiceIcon =
  | "design"
  | "training"
  | "hospitality"
  | "facility";

export type BusinessService = {
  id: BusinessServiceIcon;
  label: string;
  /** One line. What the service line covers, nothing about past work. */
  body: string;
};

export const businessIntro = {
  eyebrow: "Business services",
  heading: "Services that evolve, so the work settles.",
  lead: "JCNL designs business services, trains the teams who run them, and manages the operation afterwards. The aim is a service that keeps improving while the client gets on with the work.",
  indexLabel: "Four service lines",
  items: [
    {
      id: "design",
      label: "Designs",
      body: "The service, the workflow and the handovers, set out before launch.",
    },
    {
      id: "training",
      label: "Operational training",
      body: "Training for the teams who run the service day to day.",
    },
    {
      id: "hospitality",
      label: "Hospitality",
      body: "Hospitality run by JCNL as a managed service line.",
    },
    {
      id: "facility",
      label: "Facility service management",
      body: "Buildings and facilities run under one contract.",
    },
  ] satisfies readonly BusinessService[],
} as const;

export type BusinessSectorIcon =
  | "manufacturing"
  | "oil"
  | "telecoms"
  | "construction"
  | "hospitality"
  | "financial"
  | "power";

export const businessSectors = {
  eyebrow: "Sectors served",
  heading: "Seven sectors.",
  intro: "JCNL serves private and public clients across these seven sectors.",
  items: [
    { id: "manufacturing", label: "Manufacturing" },
    { id: "oil", label: "Oil & Gas" },
    { id: "telecoms", label: "Telecommunications" },
    { id: "construction", label: "Construction" },
    { id: "hospitality", label: "Hospitality" },
    { id: "financial", label: "Financial" },
    { id: "power", label: "Power & Energy" },
  ] satisfies readonly { id: BusinessSectorIcon; label: string }[],
} as const;

export type BusinessProjectId =
  | "real-estate"
  | "transit"
  | "farming"
  | "building"
  | "housing"
  | "schools"
  | "parks";

export const businessFunding = {
  eyebrow: "Funding support",
  heading: "Capital for well-structured projects.",
  intro:
    "JCNL connects businesses with ready financial investors. The focus is well-structured high-yield projects (HYP) that meet due-diligence and contractual quality criteria.",
  listLabel: "Project types in scope",
  items: [
    { id: "real-estate", label: "Real estate" },
    { id: "transit", label: "Transit projects" },
    { id: "farming", label: "Urban mechanized and integrated farming" },
    { id: "building", label: "Building and retrofit" },
    { id: "housing", label: "Affordable housing" },
    { id: "schools", label: "Schools" },
    { id: "parks", label: "Parks and gardens" },
  ] satisfies readonly { id: BusinessProjectId; label: string }[],
  closing:
    "Meeting the criteria is the starting point. Each project is then assessed on its own terms.",
} as const;

export type BusinessInstrumentId =
  | "bg-sblc"
  | "usance"
  | "performance"
  | "proof"
  | "pre-advice"
  | "comfort"
  | "rwa"
  | "rating";

export type BusinessInstrument = {
  id: BusinessInstrumentId;
  label: string;
  /** The document's family. A categorisation, not a promise about terms. */
  kind: string;
};

export const businessInstruments = {
  eyebrow: "Instruments",
  heading: "Trade finance, in the documents providers use.",
  intro:
    "Single-digit-interest liquid funding and trade financing documents for investors and clients, aligned to providers' frameworks and international business practice.",
  items: [
    { id: "bg-sblc", label: "BG / SBLC", kind: "Bank guarantee" },
    { id: "usance", label: "Usance LC", kind: "Letter of credit" },
    {
      id: "performance",
      label: "Performance Guarantees",
      kind: "Performance security",
    },
    { id: "proof", label: "Proof of Funds", kind: "Funds confirmation" },
    {
      id: "pre-advice",
      label: "Pre-advice messages",
      kind: "Bank message",
    },
    { id: "comfort", label: "Comfort Letters", kind: "Assurance letter" },
    { id: "rwa", label: "RWA", kind: "Provider documentation" },
    {
      id: "rating",
      label: "Credit Rating Services",
      kind: "Credit assessment",
    },
  ] satisfies readonly BusinessInstrument[],
  /** Sits after the list. Keep the exact wording of dueDiligenceNote. */
  note: dueDiligenceNote,
} as const;

export type BusinessIntentId = "investment-collaboration" | "trade-finance";

export type BusinessIntent = {
  id: BusinessIntentId;
  /** The exact label used on the page and in the contact subject. */
  label: string;
  /** Query value carried to /contact. */
  value: string;
  /** One line shown on the closing card for this path. */
  body: string;
  whatsappMessage: string;
};

export const businessIntents: readonly BusinessIntent[] = [
  {
    id: "investment-collaboration",
    label: "Investment collaboration",
    value: "investment-collaboration",
    body: "For a business with a well-structured project that meets the funding criteria.",
    whatsappMessage:
      "Hello JCNL, I would like to discuss investment collaboration.",
  },
  {
    id: "trade-finance",
    label: "Trade finance instruments from AAA+ rated banks",
    value: "trade-finance",
    body: "For clients and investors working with BG/SBLC, Usance LC, performance guarantees and related documents.",
    whatsappMessage:
      "Hello JCNL, I would like to discuss trade finance instruments.",
  },
] as const;

/** Resolve a `?service=` value to one of the page's two enquiry paths. */
export function findBusinessIntent(value: string | null): BusinessIntent | null {
  if (!value) return null;
  const match = businessIntents.find((intent) => intent.value === value);
  return match ?? null;
}

/** Build the contact URL for an intent, landing on the channels block. */
export function intentHref(intent: BusinessIntent): string {
  return `/contact?service=${intent.value}#channels`;
}

/** Closing band. Its cards are the intents themselves, in order. */
export const businessCta = {
  eyebrow: "Next step",
  heading: "Choose the path that fits.",
  body: "Both paths open the contact page with the subject already set. Calls, WhatsApp and email are on the same page.",
  pathLabels: ["Path one", "Path two"],
  linkLabel: "Start an enquiry",
  talkFirst: {
    lead: "Prefer to talk first?",
    or: "or",
    call: "Call",
    whatsapp: "message on WhatsApp",
  },
  whatsappMessage: "Hello JCNL, I would like to ask about business services.",
} as const;

/** Copy for the enquiry panel on /contact. Shown only for a matching intent. */
export const serviceIntentCopy = {
  eyebrow: "Enquiry subject",
  body: "The subject travels with the message. Start with WhatsApp or email, or use any channel below.",
  whatsapp: "Start on WhatsApp",
  email: "Email with this subject",
} as const;
