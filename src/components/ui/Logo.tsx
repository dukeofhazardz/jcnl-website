import Image from "next/image";
import Link from "next/link";

import { site, type LogoVariant } from "@/config/site";
import { cn } from "@/lib/cn";

type LogoSize = "sm" | "md" | "lg";

type LogoProps = {
  /** Cream for dark or photographic grounds, black for light grounds. */
  variant?: LogoVariant;
  /** Height preset. Width follows the artwork's 2.51:1 ratio. */
  size?: LogoSize;
  className?: string;
  /** Preload the header logo. Never set this outside the header. */
  priority?: boolean;
  /**
   * Stack both colourways and cross-fade on opacity. Used by the header, where
   * the ground changes as the page scrolls.
   */
  crossfade?: boolean;
  /** Close the mobile menu when the logo is followed. */
  onClick?: () => void;
};

/**
 * Height only: the intrinsic width/height on <Image> keeps the box at the
 * artwork's 1989:791 ratio, so nothing shifts while the file loads.
 *
 * `md` is the header preset: 40px at mobile, 44px at small tablets and 52px on
 * desktop, inside a 72px / 88px header. The mobile menu uses it too, so the
 * logo matches the 44px close button beside it. `lg` is the footer. `sm` is the
 * compact option for tight lockups that have not needed it yet.
 */
const heightClass: Record<LogoSize, string> = {
  sm: "h-9",
  md: "h-10 sm:h-11 lg:h-[3.25rem]",
  lg: "h-12 sm:h-14",
};

const ALT = site.logo.alt;

/**
 * The brand logo as a link home. The supplied artwork is a wide wordmark, so
 * alt text carries the full registered name for anyone who cannot see it.
 */
export function Logo({
  variant = "black",
  size = "md",
  className,
  priority = false,
  crossfade = false,
  onClick,
}: LogoProps) {
  /**
   * In cross-fade mode both images keep a fixed src. Only opacity changes, so
   * the browser never swaps artwork mid-transition. Otherwise one image is
   * enough and the other colourway is never downloaded.
   */
  const layers = crossfade
    ? [
        {
          asset: site.logo.cream,
          visible: variant === "cream",
          alt: ALT,
          overlay: false,
        },
        {
          asset: site.logo.black,
          visible: variant === "black",
          alt: "",
          overlay: true,
        },
      ]
    : [
        {
          asset: site.logo[variant],
          visible: true,
          alt: ALT,
          overlay: false,
        },
      ];

  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} (${site.shortName}) — home`}
      className={cn(
        "inline-flex shrink-0 items-center rounded-xs transition-transform duration-200 ease-strong",
        "hover-fine:scale-[1.02] active:scale-[0.98] active:duration-100",
        "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current",
        "motion-reduce:transition-none motion-reduce:hover:scale-100 motion-reduce:active:scale-100",
        className,
      )}
    >
      <span className="relative inline-flex shrink-0">
        {layers.map(({ asset, visible, alt, overlay }, index) => (
          <Image
            key={asset.src}
            src={asset.src}
            alt={alt}
            aria-hidden={alt ? undefined : true}
            width={asset.width}
            height={asset.height}
            sizes="(max-width: 640px) 140px, 180px"
            preload={priority && index === 0}
            className={cn(
              "w-auto",
              heightClass[size],
              overlay ? "absolute inset-y-0 left-0 h-full" : "relative",
              // Opacity only, and kept under reduced motion too: an instant
              // colour flip mid-scroll reads as a flash rather than motion.
              crossfade && "transition-opacity duration-[250ms] ease-strong",
              crossfade && (visible ? "opacity-100" : "opacity-0"),
            )}
          />
        ))}
      </span>
    </Link>
  );
}
