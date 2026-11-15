import type { Metadata } from "next";

import { StubPage } from "@/components/sections/stub-page";
import { pageIntro } from "@/content/page-copy";

export const metadata: Metadata = {
  title: "Business Services",
  description:
    "Designs, operational trainings, hospitality and facility service management for private and public sector clients.",
  alternates: { canonical: "/business-services" },
};

export default function BusinessServicesPage() {
  return (
    <StubPage intro={pageIntro["business-services"]} service="Business Services" />
  );
}
