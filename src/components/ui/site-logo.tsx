import Image from "next/image";
import { Wordmark } from "@/components/ui/wordmark";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  logoUrl?: string | null;
  variant?: "primary" | "compact";
  /** Navbar logo height in pixels (md+). Defaults to 48. Compact variant only. */
  navHeight?: number;
  /** Hero logo max width in pixels. Defaults to 400. Primary variant only. */
  heroMaxWidth?: number;
  className?: string;
};

const DEFAULT_NAV_HEIGHT = 48;
const DEFAULT_HERO_MAX_WIDTH = 400;

/**
 * Site logo. If a custom logoUrl is configured (admin → settings),
 * renders that image; otherwise falls back to the Wordmark text treatment.
 *
 * - `primary`: hero scale (homepage). Capped by `heroMaxWidth` (px).
 * - `compact`: nav scale. Sized by `navHeight` (px) on md+.
 */
export function SiteLogo({
  logoUrl,
  variant = "compact",
  navHeight,
  heroMaxWidth,
  className,
}: SiteLogoProps) {
  if (logoUrl) {
    const isPrimary = variant === "primary";

    if (isPrimary) {
      const maxWidth = heroMaxWidth ?? DEFAULT_HERO_MAX_WIDTH;
      return (
        <span
          className={cn("relative inline-block w-full", className)}
          style={{ maxWidth: `${maxWidth}px` }}
          aria-label="Brian McGauley"
        >
          <Image
            src={logoUrl}
            alt="Brian McGauley"
            width={800}
            height={800}
            className="h-auto w-full object-contain"
            priority
          />
        </span>
      );
    }

    const height = navHeight ?? DEFAULT_NAV_HEIGHT;
    return (
      <span
        className={cn("relative inline-block w-auto", className)}
        style={{ height: `${height}px` }}
        aria-label="Brian McGauley"
      >
        <Image
          src={logoUrl}
          alt="Brian McGauley"
          width={400}
          height={height * 2}
          className="h-full w-auto object-contain"
        />
      </span>
    );
  }

  return <Wordmark variant={variant} className={className} />;
}
