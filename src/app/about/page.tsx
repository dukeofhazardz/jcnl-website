import type { Metadata } from "next";

import { StubPage } from "@/components/sections/stub-page";
import { pageIntro } from "@/content/page-copy";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "About",
  description: `${site.name} (${site.shortName}) is an indigenous Nigerian company, established ${site.established}, serving private and public sector clients from offices in Lagos and Abuja.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <StubPage intro={pageIntro.about} service="About" />;
}
