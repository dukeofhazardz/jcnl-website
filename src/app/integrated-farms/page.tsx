import type { Metadata } from "next";

import { StubPage } from "@/components/sections/stub-page";

export const metadata: Metadata = {
  title: "Integrated Farms",
  description:
    "Integrated Farms is a JCNL business line. Contact the team for current information.",
  alternates: { canonical: "/integrated-farms" },
};

export default function IntegratedFarmsPage() {
  return <StubPage page="farms" />;
}
