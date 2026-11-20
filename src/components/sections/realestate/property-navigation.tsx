import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { realEstatePage } from "@/content/real-estate";
import type { Property } from "@/content/properties";

const copy = realEstatePage.detail;

/** Previous and next within the listed records, in the same order as the grid. */
export function PropertyNavigation({
  previous,
  next,
}: {
  previous?: Property;
  next?: Property;
}) {
  if (!previous && !next) return null;

  return (
    <nav aria-label={copy.listingNavLabel} className="bg-white">
      <Container>
        <div className="grid gap-px overflow-hidden border-t border-ink-900/12 sm:grid-cols-2 sm:gap-0">
          {previous ? (
            <Link
              href={`/real-estate/${previous.slug}`}
              className="group flex flex-col gap-2 border-b border-ink-900/12 py-7 transition-colors duration-200 hover:text-accent-text sm:border-b-0 sm:border-r sm:pr-8"
            >
              <span className="inline-flex items-center gap-1.5 text-micro uppercase text-ink-500">
                <ArrowLeft
                  aria-hidden="true"
                  size={13}
                  strokeWidth={1.75}
                  className="transition-transform duration-200 ease-strong motion-safe:group-hover:-translate-x-0.5"
                />
                {copy.previous}
              </span>
              <span className="font-display text-title text-ink-900 group-hover:text-accent-text">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span aria-hidden="true" className="hidden sm:block" />
          )}

          {next ? (
            <Link
              href={`/real-estate/${next.slug}`}
              className="group flex flex-col gap-2 py-7 transition-colors duration-200 hover:text-accent-text sm:items-end sm:pl-8 sm:text-right"
            >
              <span className="inline-flex items-center gap-1.5 text-micro uppercase text-ink-500">
                {copy.next}
                <ArrowRight
                  aria-hidden="true"
                  size={13}
                  strokeWidth={1.75}
                  className="transition-transform duration-200 ease-strong motion-safe:group-hover:translate-x-0.5"
                />
              </span>
              <span className="font-display text-title text-ink-900 group-hover:text-accent-text">
                {next.title}
              </span>
            </Link>
          ) : null}
        </div>
      </Container>
    </nav>
  );
}
