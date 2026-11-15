import { AccentScope } from "@/components/sections/accent-scope";
import { PageIntro } from "@/components/sections/page-intro";
import { StubNotice } from "@/components/sections/stub-notice";
import type { PageIntroCopy } from "@/content/page-copy";

/** Shared shell for the phase-1 stub routes. */
export function StubPage({
  intro,
  service,
}: {
  intro: PageIntroCopy;
  service: string;
}) {
  return (
    <AccentScope accent={intro.accent}>
      <PageIntro eyebrow={intro.eyebrow} title={intro.title} sub={intro.sub} />
      <StubNotice service={service} />
    </AccentScope>
  );
}
