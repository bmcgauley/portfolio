import { cn } from "@/lib/utils";

type WordmarkProps = {
  variant?: "primary" | "compact";
  className?: string;
  as?: "div" | "span" | "h1";
};

/**
 * BRIAN McGAULEY wordmark. Trajan Pro, all caps, ink + crimson-deep split.
 * Primary  → hero scale, +80 letter-spacing.
 * Compact  → nav / footer scale, +30 letter-spacing.
 * Brand spec: Part V (Wordmark & Identity).
 */
export function Wordmark({
  variant = "primary",
  className,
  as: Tag = "div",
}: WordmarkProps) {
  const isPrimary = variant === "primary";
  return (
    <Tag
      className={cn(
        "font-display font-bold uppercase leading-none",
        isPrimary
          ? "text-[clamp(2.25rem,7vw,4.5rem)] tracking-[0.08em]"
          : "text-lg tracking-[0.03em]",
        className,
      )}
      aria-label="Brian McGauley"
    >
      <span className="text-ink">Brian</span>
      {isPrimary ? <br aria-hidden="true" /> : <span aria-hidden="true">&nbsp;</span>}
      <span className="text-crimson-deep">McGauley</span>
    </Tag>
  );
}
