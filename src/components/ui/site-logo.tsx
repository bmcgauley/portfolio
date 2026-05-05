import Image from "next/image";
import { Wordmark } from "@/components/ui/wordmark";
import { cn } from "@/lib/utils";

type SiteLogoProps = {
  logoUrl?: string | null;
  variant?: "primary" | "compact";
  className?: string;
};

/**
 * Site logo. If a custom logoUrl is configured (admin → settings),
 * renders that image; otherwise falls back to the Wordmark text treatment.
 *
 * - `primary`: hero scale (homepage). Image is constrained by max height.
 * - `compact`: nav scale. Image fits the navbar height.
 */
export function SiteLogo({
  logoUrl,
  variant = "compact",
  className,
}: SiteLogoProps) {
  if (logoUrl) {
    const isPrimary = variant === "primary";
    return (
      <span
        className={cn(
          "relative inline-block",
          isPrimary
            ? "h-[clamp(8rem,18vw,16rem)] w-auto"
            : "h-10 md:h-12 w-auto",
          className,
        )}
        aria-label="Brian McGauley"
      >
        <Image
          src={logoUrl}
          alt="Brian McGauley"
          width={isPrimary ? 800 : 200}
          height={isPrimary ? 800 : 200}
          className="h-full w-auto object-contain"
          priority={isPrimary}
        />
      </span>
    );
  }

  return <Wordmark variant={variant} className={className} />;
}
