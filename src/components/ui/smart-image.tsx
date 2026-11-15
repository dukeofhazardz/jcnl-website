"use client";

import Image from "next/image";
import { useState } from "react";

import { GeometricPattern } from "@/components/ui/geometric-pattern";
import { cn } from "@/lib/cn";

type SmartImageProps = {
  /** Path under /public. Omit to force the placeholder. */
  src?: string | null;
  /** Required. Every image on the site carries alt text. */
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
  /** Maps to next/image sizes. */
  sizes?: string;
  priority?: boolean;
  /** Wrapper classes. The wrapper owns the aspect ratio and overflow. */
  className?: string;
  /** Classes applied to the rendered image. */
  imageClassName?: string;
  /** Optional caption rendered over the image. */
  caption?: string;
};

/**
 * next/image plus a branded placeholder. If the file is missing or fails to
 * load, the placeholder renders in the page accent. Dropping a real file in
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
  sizes = "100vw",
  priority = false,
  className,
  imageClassName,
  caption,
}: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  const aspectRatio =
    ratio ?? (width && height ? width / height : 16 / 9);
  const showPlaceholder = !src || failed;

  const label = [role, subject].filter(Boolean).join(" · ");
  const dimensions = width && height ? `${width}×${height}` : undefined;

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden bg-jungle-950",
        className,
      )}
      style={{ aspectRatio }}
    >
      {showPlaceholder ? (
        <div
          className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6"
          role="img"
          aria-label={
            subject
              ? `Placeholder for: ${subject}${dimensions ? `, ${dimensions}` : ""}`
              : alt
          }
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(155deg, color-mix(in oklab, var(--field) 88%, var(--color-ivory-50)) 0%, var(--field) 62%, color-mix(in oklab, var(--field) 82%, var(--color-ink-900)) 100%)",
            }}
          />
          <GeometricPattern
            variant="lattice"
            className="absolute inset-0 text-[var(--accent-soft)] opacity-[0.14]"
          />

          {/* Framing marks: a shot-list cue, not decoration. */}
          <span
            aria-hidden="true"
            className="absolute left-4 top-4 h-6 w-6 border-l border-t border-ivory-50/35"
          />
          <span
            aria-hidden="true"
            className="absolute bottom-4 right-4 h-6 w-6 border-b border-r border-ivory-50/35"
          />

          <div className="relative flex items-center gap-2 text-micro font-medium uppercase text-ivory-50/80">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"
            />
            {label || "Image placeholder"}
          </div>

          <div className="relative max-w-[26ch]">
            <p className="font-display text-[clamp(1.125rem,2.4vw,1.825rem)] leading-[1.08] tracking-[-0.02em] text-ivory-50">
              {subject ?? alt}
            </p>
            {dimensions ? (
              <p className="mt-2 text-micro uppercase text-ivory-50/75">
                {dimensions}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          onError={() => setFailed(true)}
          className={cn("object-cover", imageClassName)}
        />
      )}

      {caption ? (
        <p className="scrim-photo absolute inset-x-0 bottom-0 p-4 text-small text-ivory-50">
          {caption}
        </p>
      ) : null}
    </div>
  );
}
