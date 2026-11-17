"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  type FocusEvent as ReactFocusEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { motion, type Variants } from "motion/react";
import { ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Pause, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SmartImage } from "@/components/ui/smart-image";
import { Eyebrow } from "@/components/ui/typography";
import type { AccentKey } from "@/config/site";
import { heroImage } from "@/content/images";
import type { Slide } from "@/content/slides";
import { cn } from "@/lib/cn";
import { EASE_OUT_STRONG } from "@/lib/motion";
import { useDocumentHidden } from "@/lib/use-document-hidden";
import { usePrefersReducedMotion } from "@/lib/use-prefers-reduced-motion";

/** Keep in step with the 6s `hero-progress` animation in globals.css. */
const ROTATE_MS = 6000;

/** Pixels of horizontal travel before a pointer gesture counts as a swipe. */
const SWIPE_THRESHOLD = 48;

type PlayIntent = "play" | "pause" | null;

type HeroCarouselProps = {
  slides: readonly Slide[];
  /** Small overline above the headline: the page name or a brand line. */
  eyebrow: string;
  /** Accessible name for the region, e.g. "Visa & Tours". */
  label: string;
  /** Page accent. Applied locally so the hero is themed even outside a page scope. */
  accent: AccentKey;
  className?: string;
};

/**
 * Full-bleed hero carousel.
 *
 * Autoplay runs on a 6s clock that pauses on hover, focus and a hidden tab, and
 * is off entirely under reduced motion. The progress bar is a CSS animation
 * with the same clock; both are paused and resumed together, so the bar never
 * drifts from the timer. Only transform and opacity are animated.
 */
export function HeroCarousel({
  slides,
  eyebrow,
  label,
  accent,
  className,
}: HeroCarouselProps) {
  const count = slides.length;

  const [index, setIndex] = useState(0);
  const [intent, setIntent] = useState<PlayIntent>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [hasNavigated, setHasNavigated] = useState(false);

  const tabHidden = useDocumentHidden();
  const reduceMotion = usePrefersReducedMotion();

  const pointerStart = useRef<{ id: number; x: number; y: number } | null>(null);
  const swipedAt = useRef(0);
  const sectionRef = useRef<HTMLElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  const userPaused = intent === "pause";
  const transientPause = hovered || focused || tabHidden;

  /**
   * An explicit choice from the play/pause button wins over hover and focus;
   * otherwise the carousel pauses while the visitor is reading or tabbing.
   */
  const playing =
    !reduceMotion &&
    !tabHidden &&
    (intent === "play" ? true : intent === "pause" ? false : !transientPause);

  const slide = slides[index];

  /** Milliseconds already spent on the current slide, carried across pauses. */
  const elapsed = useRef(0);
  const startedAt = useRef<number | null>(null);

  const goTo = useCallback(
    (next: number) => {
      // Reset the clock before the index changes so the effect cleanup does not
      // add the outgoing slide's time to the incoming slide.
      startedAt.current = null;
      elapsed.current = 0;
      setHasNavigated(true);
      setIndex(((next % count) + count) % count);
    },
    [count],
  );

  const goNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const goPrev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Autoplay clock. The timeout carries the remaining time across a pause, and
  // the CSS progress animation is paused with it, so the two stay in step.
  useEffect(() => {
    if (!playing) return;

    startedAt.current = performance.now();
    const remaining = Math.max(300, ROTATE_MS - elapsed.current);
    const timer = window.setTimeout(() => {
      // Start the next slide with a full countdown. Clearing the clock here
      // keeps the effect cleanup from adding this slide's time to the next one.
      startedAt.current = null;
      elapsed.current = 0;
      setHasNavigated(true);
      setIndex((current) => (current + 1) % count);
    }, remaining);

    return () => {
      window.clearTimeout(timer);
      if (startedAt.current !== null) {
        elapsed.current += performance.now() - startedAt.current;
        startedAt.current = null;
      }
    };
  }, [playing, index, count]);

  const handlePointerDown = (event: ReactPointerEvent<HTMLElement>) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    const target = event.target as HTMLElement | null;
    if (target?.closest("a, button, input, select, textarea, [role='button']")) {
      return;
    }
    pointerStart.current = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
    };
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLElement>) => {
    const start = pointerStart.current;
    pointerStart.current = null;
    if (!start || start.id !== event.pointerId) return;

    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    if (Math.abs(dx) < SWIPE_THRESHOLD || Math.abs(dx) < Math.abs(dy) * 1.15) {
      return;
    }

    swipedAt.current = performance.now();
    if (dx < 0) goNext();
    else goPrev();
  };

  const handleClickCapture = (event: ReactMouseEvent<HTMLElement>) => {
    // A drag that ends on a link or button must not also activate it.
    if (performance.now() - swipedAt.current < 350) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  const handleKeyDown = (event: ReactKeyboardEvent<HTMLElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      goPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      goNext();
    }
  };

  const handleBlur = (event: ReactFocusEvent<HTMLElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
      setFocused(false);
      // Focus left the region on purpose, so nothing should be restored after
      // the next slide change.
      lastFocused.current = null;
    }
  };

  /**
   * A mouse click leaves focus on the button, and focus pauses autoplay, so a
   * single click on a dot would freeze the carousel for the rest of the visit.
   * Drop focus only for pointer clicks; keyboard activation keeps it, because a
   * keyboard visitor is operating the control.
   */
  const releasePointerFocus = (event: ReactMouseEvent<HTMLButtonElement>) => {
    if (event.detail > 0) event.currentTarget.blur();
  };

  /**
   * The copy block is keyed by slide, so a slide change destroys the focused
   * CTA and focus silently falls back to <body>. Move it to the new slide's
   * action instead, which also keeps the arrow keys working.
   */
  useEffect(() => {
    const last = lastFocused.current;
    if (!last || last.isConnected) return;
    lastFocused.current = null;
    const target = sectionRef.current?.querySelector<HTMLElement>(
      "[data-slide-cta] a, [data-slide-cta] button",
    );
    (target ?? sectionRef.current)?.focus({ preventScroll: true });
  }, [index]);

  if (!slide || count === 0) return null;

  const swapDuration = reduceMotion ? 0.2 : 0.72;
  const slideVariants: Variants = reduceMotion
    ? {
        center: { opacity: 1 },
        left: { opacity: 0 },
        right: { opacity: 0 },
      }
    : {
        center: { x: "0%", opacity: 1 },
        left: { x: "-6%", opacity: 0 },
        right: { x: "6%", opacity: 0 },
      };

  const textContainer: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.075,
        delayChildren: reduceMotion ? 0 : 0.06,
      },
    },
  };

  const textItem: Variants = {
    hidden: { opacity: 0, y: reduceMotion ? 0 : 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduceMotion ? 0.2 : 0.6, ease: EASE_OUT_STRONG },
    },
  };

  const counter = String(index + 1).padStart(2, "0");
  const total = String(count).padStart(2, "0");

  return (
    <section
      ref={sectionRef}
      tabIndex={-1}
      role="region"
      aria-roledescription="carousel"
      aria-label={`${label} highlights`}
      data-accent={accent}
      className={cn(
        "relative isolate flex min-h-[88svh] touch-pan-y flex-col overflow-hidden bg-field text-ivory-50 focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-accent-bright",
        className,
      )}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={() => {
        pointerStart.current = null;
      }}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") setHovered(true);
      }}
      onPointerLeave={(event) => {
        if (event.pointerType === "mouse") setHovered(false);
      }}
      onFocusCapture={(event) => {
        lastFocused.current = event.target as HTMLElement;
        setFocused(true);
      }}
      onBlurCapture={handleBlur}
      onKeyDown={handleKeyDown}
      onClickCapture={handleClickCapture}
      onDragStart={(event) => event.preventDefault()}
    >
      {/* Media layer. Every slide stays mounted so the next image is already
          decoded when the carousel reaches it. */}
      <div className="absolute inset-0">
        {slides.map((item, itemIndex) => {
          const asset = heroImage(item.image);
          const state =
            itemIndex === index ? "center" : itemIndex < index ? "left" : "right";

          return (
            <motion.div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${itemIndex + 1} of ${count}`}
              aria-hidden={itemIndex === index ? undefined : true}
              initial={false}
              animate={state}
              variants={slideVariants}
              transition={{ duration: swapDuration, ease: EASE_OUT_STRONG }}
              className={cn(
                "absolute inset-0 overflow-hidden",
                itemIndex === index ? "pointer-events-auto" : "pointer-events-none",
              )}
            >
              <div
                className="hero-zoom absolute inset-0"
                style={{ animationPlayState: playing ? "running" : "paused" }}
              >
                <SmartImage
                  src={item.image}
                  alt={item.alt}
                  subject={asset?.subject ?? item.alt}
                  role="HERO"
                  width={asset?.width ?? 1920}
                  height={asset?.height ?? 1080}
                  sizes="100vw"
                  priority={itemIndex === 0}
                  fill
                  variant="background"
                  className="absolute inset-0"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Legibility scrim. */}
      <div aria-hidden="true" className="scrim-hero pointer-events-none absolute inset-0" />

      <p className="sr-only" aria-live={playing ? "off" : "polite"} aria-atomic="true">
        Slide {index + 1} of {count}: {slide.headline}
      </p>

      <div className="relative z-10 mt-auto w-full">
        <Container className="pb-10 pt-[calc(var(--header-h)+3.5rem)] sm:pb-14 sm:pt-[calc(var(--header-h)+5rem)]">
          <div className="max-w-[56rem]">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>

            <motion.div
              key={slide.id}
              initial={hasNavigated ? "hidden" : false}
              animate="show"
              variants={textContainer}
            >
              {/*
                The sizer stacks every slide's headline in one grid cell, so the
                cell is always as tall as the longest headline at this width.
                Without it the copy block grows and shrinks as slides rotate,
                and everything below it shifts on a 6s clock. The text is
                invisible and hidden from assistive tech; the real heading is
                the only one in the accessibility tree.
              */}
              <div className="mt-5 grid">
                <div aria-hidden="true" className="invisible grid [grid-area:1/1]">
                  {slides.map((item) => (
                    <span
                      key={item.id}
                      className="max-w-[19ch] font-display text-display-2 [grid-area:1/1] [text-wrap:balance]"
                    >
                      {item.headline}
                    </span>
                  ))}
                </div>
                <motion.h1
                  variants={textItem}
                  className="max-w-[19ch] font-display text-display-2 text-ivory-50 [grid-area:1/1]"
                >
                  <span className="sr-only">{label}: </span>
                  {slide.headline}
                </motion.h1>
              </div>

              <div className="mt-5 grid">
                <div aria-hidden="true" className="invisible grid [grid-area:1/1]">
                  {slides.map((item) => (
                    <span
                      key={item.id}
                      className="max-w-[46ch] text-lead [grid-area:1/1] [text-wrap:pretty]"
                    >
                      {item.sub}
                    </span>
                  ))}
                </div>
                <motion.p
                  variants={textItem}
                  className="max-w-[46ch] text-lead text-ivory-100/85 [grid-area:1/1]"
                >
                  {slide.sub}
                </motion.p>
              </div>

              <motion.div
                variants={textItem}
                data-slide-cta=""
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <Button
                  href={slide.cta.href}
                  external={slide.cta.external}
                  variant="primary"
                  size="lg"
                  icon={
                    slide.cta.external ? (
                      <MessageCircle aria-hidden="true" size={18} strokeWidth={1.75} />
                    ) : (
                      <ArrowRight aria-hidden="true" size={18} strokeWidth={1.75} />
                    )
                  }
                  iconPosition={slide.cta.external ? "start" : "end"}
                >
                  {slide.cta.label}
                </Button>

                {slide.secondaryCta ? (
                  <Button
                    href={slide.secondaryCta.href}
                    external={slide.secondaryCta.external}
                    variant="ghost"
                    size="lg"
                    className="border-ivory-50/40 text-ivory-50 hover:border-ivory-50/75 hover:bg-ivory-50/10"
                    icon={
                      slide.secondaryCta.external ? (
                        <MessageCircle
                          aria-hidden="true"
                          size={18}
                          strokeWidth={1.75}
                        />
                      ) : (
                        <ArrowRight
                          aria-hidden="true"
                          size={18}
                          strokeWidth={1.75}
                        />
                      )
                    }
                    iconPosition="start"
                  >
                    {slide.secondaryCta.label}
                  </Button>
                ) : null}
              </motion.div>
            </motion.div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-ivory-50/25 pt-4 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center justify-between gap-5 sm:justify-start">
              <p className="text-micro tabular-nums text-ivory-100/75">
                {counter}
                <span className="text-ivory-100/50"> / {total}</span>
              </p>

              <div role="group" aria-label="Choose slide" className="flex items-center">
                {slides.map((item, itemIndex) => {
                  const current = itemIndex === index;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={(event) => {
                        goTo(itemIndex);
                        releasePointerFocus(event);
                      }}
                      aria-label={`Show slide ${itemIndex + 1}: ${item.headline}`}
                      aria-current={current ? "true" : undefined}
                      className="group/dot flex h-8 w-6 items-center justify-center focus-visible:outline-offset-2"
                    >
                      <span
                        aria-hidden="true"
                        className={cn(
                          "h-1.5 rounded-full transition-colors duration-200 ease-strong",
                          current
                            ? "w-5 bg-accent-bright"
                            : "w-1.5 bg-ivory-50/45 hover-fine:group-hover/dot:bg-ivory-50/85",
                        )}
                      />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={(event) => {
                  goPrev();
                  releasePointerFocus(event);
                }}
                aria-label="Previous slide"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory-50/30 text-ivory-50 transition-colors duration-200 hover-fine:border-ivory-50/70 hover-fine:bg-ivory-50/10"
              >
                <ChevronLeft aria-hidden="true" size={18} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={(event) => {
                  goNext();
                  releasePointerFocus(event);
                }}
                aria-label="Next slide"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory-50/30 text-ivory-50 transition-colors duration-200 hover-fine:border-ivory-50/70 hover-fine:bg-ivory-50/10"
              >
                <ChevronRight aria-hidden="true" size={18} strokeWidth={1.75} />
              </button>
              <button
                type="button"
                onClick={() => setIntent(userPaused ? "play" : "pause")}
                aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
                className="ml-1 inline-flex h-11 w-11 items-center justify-center rounded-full border border-ivory-50/30 text-ivory-50 transition-colors duration-200 hover-fine:border-ivory-50/70 hover-fine:bg-ivory-50/10 motion-reduce:hidden"
              >
                {userPaused ? (
                  <Play aria-hidden="true" size={16} strokeWidth={1.75} />
                ) : (
                  <Pause aria-hidden="true" size={16} strokeWidth={1.75} />
                )}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Time to the next slide. Decorative: the pause control carries the state. */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 z-20 h-[3px] overflow-hidden bg-ivory-50/20 motion-reduce:hidden"
      >
        <div
          key={index}
          className="hero-progress-fill h-full w-full bg-accent-bright"
          style={{ animationPlayState: playing ? "running" : "paused" }}
        />
      </div>
    </section>
  );
}

