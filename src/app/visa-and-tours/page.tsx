import type { Metadata } from "next";

import { StubPage } from "@/components/sections/stub-page";
import { pageIntro } from "@/content/page-copy";

export const metadata: Metadata = {
  title: "Visa & Tours",
  description:
    "Travel logistics and tours from JCNL. Talk to the team in Lagos or Abuja about the travel you have in mind.",
  alternates: { canonical: "/visa-and-tours" },
};

export default function VisaAndToursPage() {
  return <StubPage intro={pageIntro["visa-and-tours"]} service="Visa & Tours" />;
}
