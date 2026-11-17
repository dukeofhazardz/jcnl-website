import { site } from "@/config/site";
import { heroImages } from "@/content/images";

/**
 * About page copy. Every statement is a restatement of a fact in the brief:
 * the registered name, 2003, the two offices, the sectors and the service
 * lines. No history, headcount, client or credential is added.
 */
export const aboutPage = {
  story: {
    eyebrow: "Who we are",
    heading: "An indigenous Nigerian company, established 2003.",
    paragraphs: [
      `${site.name}, known as ${site.shortName}, is an indigenous Nigerian company. It was established in ${site.established} and keeps its head office in Lagos.`,
      "From Lagos and Abuja, the company serves private and public sector clients in Energy, Transport, Construction and TMC, with related business services: designs, operational trainings, travel logistics, hospitality, facility service management, civil engineering works and construction.",
    ],
    facts: [
      { label: "Established", value: String(site.established) },
      { label: "Head office", value: "Lagos" },
      { label: "Offices", value: "Lagos and Abuja" },
      { label: "Sectors", value: "Energy, Transport, Construction, TMC" },
    ],
    image: heroImages.about.travel,
    imageAlt: "Business travel, airport departures",
    imageCaption: "Airport departures",
    imageNote: "Travel logistics",
  },
  mission: {
    eyebrow: "Mission",
    heading: "The mission statement.",
    intro: "The wording is the company's own.",
    quote: site.mission,
    caption: `${site.shortName} mission statement`,
    taglineLabel: "The company tagline",
    taglineNote: "Three words, in the company's order.",
  },
  services: {
    eyebrow: "What we do",
    heading: "Six service lines, one company.",
    intro:
      "Each service line has its own page. All of them are arranged from Lagos and Abuja.",
  },
  offices: {
    eyebrow: "Where we are",
    heading: "Two offices.",
    intro: "The head office is in Lagos. The second office is in Abuja.",
    mapsLabel: "Open in Maps",
    contactLabel: "Contact details",
  },
  enquiry: {
    eyebrow: "Talk to us",
    heading: "Start with a conversation.",
    body: "Call, send a WhatsApp message or email, and say which service line you need.",
    whatsappLabel: "WhatsApp JCNL",
    whatsappMessage: "Hello JCNL, I would like to ask about the company.",
  },
} as const;
