import type { Metadata } from "next";

import { StubPage } from "@/components/sections/stub-page";
import { pageIntro } from "@/content/page-copy";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Civil engineering works and construction, delivered as part of the JCNL service range.",
  alternates: { canonical: "/engineering" },
};

export default function EngineeringPage() {
  return <StubPage intro={pageIntro.engineering} service="Engineering" />;
}
