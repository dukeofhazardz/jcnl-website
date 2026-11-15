import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { site } from "@/config/site";
import { cn } from "@/lib/cn";

/**
 * Dark opening band that sits under the fixed header. Built once so every
 * page starts from the same rhythm; the hero carousel will replace it in the
 * next phase.
 */
export function PageIntro({
  eyebrow,
  title,
  sub,
  actions,
  size = "default",
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  actions?: ReactNode;
  size?: "default" | "home";
}) {
  return (
    <section className="relative isolate flex min-h-[62svh] flex-col justify-end overflow-hidden bg-field pb-12 pt-[calc(var(--header-h)+4rem)] text-ivory-50 sm:min-h-[68svh] sm:pb-16 sm:pt-[calc(var(--header-h)+6rem)]">
      <GeometricPattern
        variant="lattice"
        className="absolute inset-0 -z-10 text-[var(--accent-soft)] opacity-[0.07]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-48 bg-linear-to-t from-ink-900/35 to-transparent"
      />

      <Container className="relative">
        <Eyebrow tone="light">{eyebrow}</Eyebrow>

        <Heading
          as="h1"
          size={size === "home" ? "display" : "xl"}
          className={cn(
            "mt-6 text-ivory-50",
            size === "home" ? "max-w-[15ch]" : "max-w-[17ch]",
          )}
        >
          {title}
        </Heading>

        {sub ? (
          <p className="mt-7 max-w-[47ch] text-lead text-ivory-100/75">
            {sub}
          </p>
        ) : null}

        {actions ? (
          <div className="mt-9 flex flex-wrap items-center gap-3">{actions}</div>
        ) : null}

        <div className="mt-14 flex flex-wrap items-center justify-between gap-x-10 gap-y-3 border-t border-ivory-50/15 pt-5 text-micro uppercase text-ivory-100/65 sm:mt-16">
          <p>Established {site.established}</p>
          <p>Lagos &amp; Abuja, Nigeria</p>
          <p className="hidden sm:block">{site.descriptor}</p>
        </div>
      </Container>
    </section>
  );
}
