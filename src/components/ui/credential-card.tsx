import * as React from "react"

import { cn } from "@/lib/utils"

type CredentialCardProps = {
  institution: string
  credential: string
  date: string
  honors?: string
  societies?: string[]
  className?: string
}

function CredentialCard({
  institution,
  credential,
  date,
  honors,
  societies,
  className,
}: CredentialCardProps) {
  return (
    <article
      data-slot="credential-card"
      className={cn(
        "bg-vellum text-ink border-l-8 border-parchment py-6 px-8 rounded-[2px] shadow-[0_2px_8px_rgba(122,79,20,0.08)]",
        className
      )}
    >
      <header className="flex justify-between items-baseline gap-4">
        <h3 className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink">
          {institution}
        </h3>
        <span className="font-serif italic text-gold-shadow text-caption shrink-0">
          {date}
        </span>
      </header>

      <p className="font-serif text-body text-ink mt-2">{credential}</p>

      {honors && (
        <p className="font-serif italic text-gold-shadow text-caption mt-1">
          {honors}
        </p>
      )}

      {societies && societies.length > 0 && (
        <ul className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-3 pt-3 border-t border-gold">
          {societies.map((society, i) => (
            <React.Fragment key={society}>
              <li className="font-mono uppercase tracking-[0.18em] text-[11px] text-gold-shadow">
                {society}
              </li>
              {i < societies.length - 1 && (
                <span
                  aria-hidden="true"
                  className="text-gold-shadow text-[11px]"
                >
                  ◆
                </span>
              )}
            </React.Fragment>
          ))}
        </ul>
      )}
    </article>
  )
}

export default CredentialCard
export { CredentialCard }
export type { CredentialCardProps }
