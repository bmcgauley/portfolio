import { cn } from "@/lib/utils";
import { Ornament } from "./ornament";

/**
 * Centered triplet of gold diamonds with generous vertical white space.
 * Used to separate major sections within long pages. Part IX spec.
 */
export function SectionDivider({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 py-12 md:py-16",
        className,
      )}
      role="separator"
    >
      <Ornament />
      <Ornament />
      <Ornament />
    </div>
  );
}
