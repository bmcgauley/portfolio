import { cn } from "@/lib/utils";

/**
 * Gold diamond ornamental glyph (◆). Brand spec: Part V.
 * Use as a divider, section break, or punctuation in titles and metadata.
 */
export function Ornament({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass =
    size === "sm" ? "text-xs" : size === "lg" ? "text-lg" : "text-sm";
  return (
    <span
      className={cn("text-gold leading-none", sizeClass, className)}
      aria-hidden="true"
    >
      ◆
    </span>
  );
}
