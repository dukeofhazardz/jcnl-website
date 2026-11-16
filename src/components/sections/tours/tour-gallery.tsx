"use client";

import dynamic from "next/dynamic";
import { Maximize2 } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { useCallback, useRef, useState } from "react";

import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Section } from "@/components/ui/section";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow, Heading } from "@/components/ui/typography";
import { tourGallery } from "@/content/tours";
import { cn } from "@/lib/cn";

/** Split out of the page bundle: only fetched when a thumbnail is opened. */
const TourLightbox = dynamic(() => import("./tour-lightbox"), { ssr: false });

const spans = [
  "lg:col-span-7",
  "lg:col-span-5",
  "lg:col-span-12",
] as const;

/**
 * The two top frames share a height on desktop: 7/5 of a seven-column frame
 * equals 5/5 (square) of a five-column one. The third runs the full width.
 */
const frames = [
  "aspect-4/3 lg:aspect-7/5",
  "aspect-4/3 lg:aspect-square",
  "aspect-16/10 sm:aspect-21/9",
] as const;

export function TourGallery() {
  const [active, setActive] = useState<number | null>(null);
  const opener = useRef<number | null>(null);

  const preload = useCallback(() => {
    (
      TourLightbox as unknown as { preload?: () => void }
    ).preload?.();
  }, []);

  const open = useCallback((index: number) => {
    opener.current = index;
    setActive(index);
  }, []);

  const close = useCallback(() => {
    setActive(null);
    const index = opener.current;
    opener.current = null;
    if (index === null) return;
    // Return focus to the thumbnail that opened the dialog.
    document
      .querySelectorAll<HTMLButtonElement>("[data-gallery-trigger]")
      [index]?.focus();
  }, []);

  return (
    <Section
      id="tour-gallery"
      tone="sand"
      topDivider="dune"
      spacing="md"
      labelledBy="tour-gallery-heading"
    >
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <Eyebrow>Tour gallery</Eyebrow>
              <Heading
                as="h2"
                size="lg"
                id="tour-gallery-heading"
                className="mt-5 max-w-[20ch]"
              >
                Three places to start.
              </Heading>
            </div>
            <p className="max-w-[34ch] text-small text-ink-500 md:text-right">
              Open any frame for the larger image. The rest of the itinerary is
              built around the tour you choose.
            </p>
          </div>
        </Reveal>

        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-12 lg:gap-5">
          {tourGallery.map((item, index) => (
            <li key={item.id} className={cn(spans[index])}>
              <Reveal delay={index * 0.07}>
                <button
                  type="button"
                  data-gallery-trigger=""
                  onPointerEnter={preload}
                  onFocus={preload}
                  onClick={() => open(index)}
                  aria-label={`Open larger image: ${item.caption}`}
                  className="group relative block w-full overflow-hidden rounded-md bg-jungle-950 text-left"
                >
                  <div
                    className={cn(
                      "relative w-full transition-transform duration-500 ease-strong motion-safe:hover-fine:group-hover:scale-[1.03]",
                      frames[index],
                    )}
                  >
                    <SmartImage
                      src={item.image.src}
                      alt={item.alt}
                      subject={item.image.subject}
                      role="TOUR"
                      width={item.image.width}
                      height={item.image.height}
                      sizes={
                        index === 2
                          ? "(min-width: 1024px) 82vw, 100vw"
                          : "(min-width: 1024px) 46vw, 100vw"
                      }
                      fill
                      // The caption owns the bottom-left corner, so the
                      // placeholder label moves to the compact top-right slot
                      // instead of colliding with it.
                      variant="background"
                    />
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-ink-900/85 via-ink-900/30 to-transparent"
                  />
                  <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
                    <span>
                      <span className="block font-display text-title text-ivory-50">
                        {item.caption}
                      </span>
                      <span className="mt-1 block text-small text-ivory-100/75">
                        {item.detail}
                      </span>
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ivory-50/40 bg-ink-900/30 text-ivory-50 transition-colors duration-200 group-hover:border-ivory-50 group-hover:bg-ink-900/55">
                      <Maximize2
                        aria-hidden="true"
                        size={15}
                        strokeWidth={1.75}
                      />
                    </span>
                  </span>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>

      <AnimatePresence>
        {active !== null ? (
          <TourLightbox
            items={tourGallery}
            index={active}
            onNavigate={setActive}
            onClose={close}
          />
        ) : null}
      </AnimatePresence>
    </Section>
  );
}
