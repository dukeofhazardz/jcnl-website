"use client";

import Image from "next/image";
import { useState } from "react";

import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { cn } from "@/lib/cn";

type SmartImageProps = {
  /** Path under /public. Omit to force the placeholder. */
  src?: string | null;  /** Required. Every image on the site carries alt text. */
  alt: string;
  /** Intended subject, shown on the placeholder. */
  subject?: string;
  /** Shot role, e.g. "HERO". Shown on the placeholder with the subject. */
  role?: string;
  /** Intended pixel size, shown on the placeholder and in the shot list. */
  width?: number;
  height?: number;
  /** Width / height. Defaults to width / height, then 16 / 9. */
  ratio?: number;
  /** Let the parent size the frame; skips the aspect-ratio box. */
  fill?: boolean;
  /** Maps to next/image sizes. */
  sizes?: string;
  priority?: boolean;
  /** Wrapper classes. The wrapper owns the aspect ratio and overflow. */
  className?: string;
  /** Classes applied to the rendered image. */
  imageClassName?: string;
  /** Optional caption rendered over the image. */
  caption?: string;
  /**
   * `background` keeps the placeholder quiet: no huge subject label, just a
   * small shot-list note in the top corner. Used behind the hero copy.
   */
  variant?: "default" | "background";
};

/**
 * next/image plus a branded placeholder. If the file is missing or fails to
 * load, the placeholder renders in the brand sky. Dropping a real file in
 * at the same path is all that is needed to replace it.
 */
export function SmartImage({
  src,
  alt,
  subject,
  role,
  width,
  height,
  ratio,
  fill = false,
  sizes = "100vw",
  priority = false,
  className,
  imageClassName,
  caption,
  variant = "default",
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const aspectRatio =
    ratio ?? (width && height ? width / height : 16 / 9);
  const showPlaceholder = !src || failed;
  /**
   * The branded field is visible before the file loads, not only after it
   * fails: a missing or slow image should never leave a bare gradient on
   * screen. When the real file paints, the field is removed.
   *
   * Priority images are the exception: they are the LCP candidate, so waiting
   * for hydration and an opacity transition before showing them costs ~0.7s.
   * They paint as soon as the browser has the bytes, and the field only comes
   * back if the file is missing or fails.
   */
  const showField = showPlaceholder || (!loaded && !priority);

  const dimensions = width && height ? `${width}×${height}` : undefined;
  // One line, as in the shot list: role · subject · dimensions.
  const label = [role, subject, dimensions].filter(Boolean).join(" · ");

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden bg-sky-50",
        // `fill` means "the parent owns the frame". The next/image inside is
        // absolutely positioned, so the wrapper needs its own height: `h-full`
        // takes it from the parent, which must have one (an aspect box or a
        // sized frame). It stays `relative`, never `absolute`, so it cannot
        // escape a parent that forgot to be a containing block.
        fill && "h-full",
        className,
      )}
      style={{
        ...(fill ? {} : { aspectRatio }),
        // Present before a file loads, so a slow or missing image still shows
        // the branded field rather than a blank box. Light on white, with a
        // sky tint at the foot.
        backgroundImage:
          "linear-gradient(155deg, #ffffff 0%, var(--color-sky-50) 58%, var(--color-sky-100) 100%)",
      }}
    >
      {src && !failed ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          // `priority` only adds the preload; without this the preload has no
          // fetchpriority hint and the LCP image waits behind other requests.
          fetchPriority={priority ? "high" : undefined}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "object-cover transition-opacity duration-300",
            loaded || priority ? "opacity-100" : "opacity-0",
            imageClassName,
          )}
        />
      ) : null}

      {showField ? (
        <div
          className="absolute inset-0"
          role={showPlaceholder ? "img" : undefined}
          aria-label={
            showPlaceholder
              ? subject
                ? `Placeholder for: ${subject}${dimensions ? `, ${dimensions}` : ""}`
                : alt
              : undefined
          }
          aria-hidden={showPlaceholder ? undefined : true}
        >
          <GeometricPattern
            variant="lattice"
            className="absolute inset-0 text-sky-500 opacity-[0.14]"
          />

          {variant === "background" ? (
            <div className="absolute right-[9%] top-[15%] flex max-w-[24ch] items-start justify-end gap-2 text-right text-[0.6875rem] font-medium uppercase leading-[1.5] tracking-[0.12em] text-ink-700">
              <span
                aria-hidden="true"
                className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
              />
              <span className="min-w-0 break-words">{label || "Image placeholder"}</span>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between p-5 sm:p-6">
              {/* Framing marks: a shot-list cue, not decoration. */}
              <span
                aria-hidden="true"
                className="absolute left-4 top-4 h-6 w-6 border-l border-t border-sky-700/30"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-sky-700/30"
              />

              <div className="relative flex items-center gap-2 text-micro font-medium uppercase text-ink-700">
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500"
                />
                <span className="min-w-0 break-words">{label || "Image placeholder"}</span>
              </div>

              <div className="relative max-w-[26ch]">
                <p className="font-display text-[clamp(1.125rem,2.4vw,1.825rem)] leading-[1.08] tracking-[-0.02em] text-ink-950">
                  {subject ?? alt}
                </p>
              </div>
            </div>
          )}
        </div>
      ) : null}

      {caption ? (
        <p className="scrim-photo absolute inset-x-0 bottom-0 p-4 text-small text-white">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
