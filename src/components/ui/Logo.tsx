import Image from "next/image";
import Link from "next/link";

import { seasonalLogos, site } from "@/config/site";
import { cn } from "@/lib/cn";

type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  /** Height preset. Width follows the artwork's 2.52:1 ratio. */
  size?: LogoSize;
  className?: string;
  /** Load the main mark eagerly. Set only in the header. */
  priority?: boolean;
  /** Close the mobile menu when the logo is followed. */
  onClick?: () => void;
};

/**
 * Height only: the intrinsic width/height on <Image> keeps the box at the
 * artwork's ratio, so nothing shifts while a file loads. `md` is the header
 * preset: 44px at mobile, 56px on desktop, inside a 72px / 92px header. `lg`
 * is the footer.
 */
const heightClass: Record<LogoSize, string> = {
  sm: "h-9",
  md: "h-11 sm:h-12 lg:h-14",
  lg: "h-12 sm:h-14 lg:h-16",
};

const christmas = seasonalLogos[0];

/**
 * The brand logo as a link home.
 *
 * Both seasonal variants are rendered and CSS shows exactly one, selected by
 * `data-seasonal-logo` on <html>. The class is written by a blocking inline
 * script in the root layout before the body paints, so a hard reload never
 * shows the wrong mark and hydration never swaps an src. The two files are
 * within 0.15% of the same aspect ratio, so the box never moves.
 *
 * The logo is only ever placed on white. It carries a fine white glow, which
 * would read as a pale box on any tinted surface.
 */
export function Logo({ size = "md", className, priority = false, onClick }: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} (${site.shortName}) — home`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-xs transition-[transform,opacity] duration-200 ease-strong",
        "hover-fine:scale-[1.015] active:scale-[0.99] active:duration-100",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-700",
        "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
        className,
      )}
    >
      <span className="relative grid shrink-0">
        <Image
          src={site.logo.main.src}
          alt={site.logo.alt}
          width={site.logo.main.width}
          height={site.logo.main.height}
          sizes="(max-width: 639px) 120px, (max-width: 1023px) 130px, 150px"
          loading="eager"
          fetchPriority={priority ? "high" : undefined}
          className={cn(
            "logo-seasonal__main col-start-1 row-start-1 h-auto w-auto max-w-none",
            heightClass[size],
          )}
        />
        <Image
          src={christmas.src}
          alt={`${site.logo.alt}, ${christmas.altSuffix}`}
          width={christmas.width}
          height={christmas.height}
          sizes="(max-width: 639px) 120px, (max-width: 1023px) 130px, 150px"
          loading="eager"
          // No `fetchPriority` here, deliberately: any explicit value makes
          // Next emit a <head> preload, and preloading both variants would put
          // the seasonal file in front of the hero on every page load. The
          // header markup is early in the document, so the active file is still
          // fetched immediately.
          className={cn(
            "logo-seasonal__christmas col-start-1 row-start-1 h-auto w-auto max-w-none",
            heightClass[size],
          )}
        />
      </span>
    </Link>
  );
}
