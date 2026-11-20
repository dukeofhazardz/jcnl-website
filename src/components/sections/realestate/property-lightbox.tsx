"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, type KeyboardEvent as ReactKeyboardEvent } from "react";
import { createPortal } from "react-dom";

import { SmartImage } from "@/components/ui/smart-image";
import { realEstatePage } from "@/content/real-estate";
import type { PropertyImage } from "@/content/properties";
import { EASE_OUT_STRONG } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

const copy = realEstatePage.detail;

const FOCUSABLE =
  'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Listing gallery dialog. Loaded on demand by <PropertyGallery>, so the overlay
 * markup and key handling never reach the first page load.
 */
export default function PropertyLightbox({
  items,
  index,
  title,
  onNavigate,
  onClose,
}: {
  items: readonly PropertyImage[];
  index: number;
  title: string;
  onNavigate: (next: number) => void;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = usePrefersReducedMotion();
  const item = items[index];

  useEffect(() => {
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  const step = (delta: number) => {
    onNavigate((index + delta + items.length) % items.length);
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
      return;
    }
    if (event.key !== "Tab") return;

    const panel = panelRef.current;
    if (!panel) return;
    const focusable = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
      (element) => element.offsetParent !== null,
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  if (!item) return null;

  return createPortal(
    <motion.div
      className="fixed inset-0 z-[130] flex items-center justify-center overscroll-contain bg-ink-950/95 p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduceMotion ? 0.15 : 0.24, ease: EASE_OUT_STRONG }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${title} · ${copy.galleryLabel}`}
        onKeyDown={handleKeyDown}
        className="relative flex w-full max-w-5xl flex-col"
      >
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, ease: EASE_OUT_STRONG }}
        >
          <div className="relative aspect-16/10 w-full overflow-hidden rounded-md bg-ink-900">
            <SmartImage
              src={item.src}
              alt={item.alt}
              subject={item.alt}
              role="PROPERTY"
              width={1600}
              height={1067}
              sizes="(min-width: 1024px) 72vw, 92vw"
              fill
              priority
            />
          </div>

          <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
            <p className="font-display text-title text-white">{item.alt}</p>
            <p className="text-micro uppercase text-sky-100/65">
              {index + 1} / {items.length}
            </p>
          </div>
        </motion.div>

        <div className="mt-5 flex items-center justify-between gap-3">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label={copy.galleryPrevious}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/30 text-white transition-colors duration-200 hover:border-white/70 hover:bg-white/10"
            >
              <ChevronLeft aria-hidden="true" size={20} strokeWidth={1.75} />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label={copy.galleryNext}
              className="flex h-11 w-11 items-center justify-center rounded-sm border border-white/30 text-white transition-colors duration-200 hover:border-white/70 hover:bg-white/10"
            >
              <ChevronRight aria-hidden="true" size={20} strokeWidth={1.75} />
            </button>
          </div>

          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center gap-2 rounded-sm border border-white/30 px-4 text-small font-semibold text-white transition-colors duration-200 hover:border-white/70 hover:bg-white/10"
          >
            <X aria-hidden="true" size={18} strokeWidth={1.75} />
            {copy.lightboxClose}
          </button>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {copy.lightboxPosition(index + 1, items.length)}: {item.alt}
        </p>
      </div>
    </motion.div>,
    document.body,
  );
}
