import type { ReactNode } from "react";
import { Ornament } from "@/components/ui/ornament";

type Props = { children: ReactNode };

export function PullQuote({ children }: Props) {
  return (
    <figure className="my-12 px-8 md:px-16">
      <div className="flex justify-center my-3">
        <Ornament size="sm" />
      </div>
      <blockquote className="text-center font-serif italic text-[1.5rem] leading-snug text-gold-shadow">
        {children}
      </blockquote>
      <div className="flex justify-center my-3">
        <Ornament size="sm" />
      </div>
    </figure>
  );
}
