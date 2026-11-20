"use client";

import dynamic from "next/dynamic";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState, type PointerEvent } from "react";

import { SmartImage } from "@/components/ui/smart-image";
import { realEstatePage } from "@/content/real-estate";
import type { PropertyImage } from "@/content/properties";
import { cn } from "@/lib/cn";
import { EASE_OUT_STRONG } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/** Split out of the route bundle: only fetched when a frame is opened. */
const PropertyLightbox = dynamic(() => import("./property-lightbox"), {
  ssr: false,
});

const copy = realEstatePage.detail;

/**
 * Warm the lightbox chunk on first hover or focus. The dialog itself stays out
 * of the route bundle; this only resolves the same module the dynamic import
 * already points at, so the click opens the overlay without a network wait.
 */
let lightboxLoad: Promise<unknown> | undefined;

function preloadLightbox(): void {
  lightboxLoad ??= import("./property-lightbox");
}

/** Horizontal travel, in pixels, before a drag counts as a swipe. */
const SWIPE_THRESHOLD = 48;

/**
 * One large frame, a thumbnail row and an on-demand lightbox. Swiping works on
 * the frame itself; the arrows are for pointer and keyboard visitors who would
 * rather not drag. Focus returns to the frame that opened the dialog.
 */
export function PropertyGallery({
  images,
  title,
}: {
  images: readonly PropertyImage[];
  title: string;
}) {
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const reduceMotion = usePrefersReducedMotion();
  const frameRef = useRef<HTMLButtonElement>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);

  const count = images.length;
  const current = images[index];

  const step = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setIndex((value) => (value + delta + count) % count);
    },
    [count],
  );

  const open = useCallback(() => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    preloadLightbox();
    setLightbox(true);
  }, []);

  const close = useCallback(() => {
    setLightbox(false);
    frameRef.current?.focus({ preventScroll: true });
  }, []);

  const onPointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    start.current = { x: event.clientX, y: event.clientY };
    swiped.current = false;
  };

  const onPointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    const origin = start.current;
    start.current = null;
    if (!origin || count < 2) return;

    const dx = event.clientX - origin.x;
    const dy = event.clientY - origin.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy)) return;

    // A swipe must not also open the dialog: suppress the click that follows.
    swiped.current = true;
    step(dx < 0 ? 1 : -1);
  };

  const fade = reduceMotion ? 0.15 : 0.35;

  return (
    <div>
      <div className="relative aspect-4/3 overflow-hidden rounded-md bg-ink-950 sm:aspect-16/10">
        <button
          ref={frameRef}
          type="button"
          onClick={open}
          onPointerDown={onPointerDown}
          onPointerUp={onPointerUp}
          onPointerCancel={() => {
            start.current = null;
          }}
          onPointerEnter={preloadLightbox}
          onFocus={preloadLightbox}
          className="group absolute inset-0 block cursor-zoom-in touch-pan-y overflow-hidden rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text"
        >
          <span className="sr-only">
            {copy.galleryOpen} {index + 1}: {current?.alt ?? title}
          </span>

          <AnimatePresence initial={false}>
            <motion.div
              key={index}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: fade, ease: EASE_OUT_STRONG }}
            >
              <SmartImage
                src={current?.src}
                alt={current?.alt ?? title}
                subject={current?.alt ?? title}
                role="PROPERTY"
                width={1600}
                height={1067}
                sizes="(min-width: 1024px) 58vw, 94vw"
                fill
                priority={index === 0}
                imageClassName="transition-transform duration-500 ease-strong motion-safe:group-hover:scale-[1.015]"
              />
            </motion.div>
          </AnimatePresence>
        </button>

        {count > 1 ? (
          <>
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={copy.galleryPrevious}
              className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-white/30 bg-ink-950/45 text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/70 hover:bg-ink-950/70"
            >
              <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={copy.galleryNext}
              className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-sm border border-white/30 bg-ink-950/45 text-white backdrop-blur-sm transition-colors duration-200 hover:border-white/70 hover:bg-ink-950/70"
            >
              <ChevronRight aria-hidden="true" size={20} strokeWidth={1.75} />
            </button>
          </>
        ) : null}

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 bg-linear-to-t from-ink-950/70 to-transparent p-3">
          <span className="text-micro tabular-nums text-white">
            {count > 0 ? index + 1 : 0} / {count}
          </span>
          <span className="inline-flex items-center gap-1.5 text-micro uppercase text-white/85">
            <Maximize2 aria-hidden="true" size={13} strokeWidth={1.75} />
            {copy.galleryOpen}
          </span>
        </div>
      </div>

      {count > 1 ? (
        <ul className="mt-3 grid grid-cols-3 gap-3 sm:grid-cols-4">
          {images.map((image, position) => {
            const active = position === index;

            return (
              <li key={image.src}>
                <button
                  type="button"
                  onClick={() => setIndex(position)}
                  aria-label={`${copy.galleryOpen} ${position + 1}: ${image.alt}`}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "group relative block aspect-4/3 w-full overflow-hidden rounded-sm bg-ink-950 transition-[box-shadow,transform] duration-200 ease-strong",
                    active
                      ? "ring-2 ring-accent-text ring-offset-2 ring-offset-white"
                      : "opacity-75 hover:opacity-100",
                  )}
                >
                  <SmartImage
                    src={image.src}
                    alt={image.alt}
                    subject={image.alt}
                    role="PROPERTY"
                    width={1600}
                    height={1067}
                    sizes="(min-width: 1024px) 14vw, 30vw"
                    fill
                    variant="background"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}

      {lightbox && current ? (
        <PropertyLightbox
          items={images}
          index={index}
          title={title}
          onNavigate={setIndex}
          onClose={close}
        />
      ) : null}
    </div>
  );
}
