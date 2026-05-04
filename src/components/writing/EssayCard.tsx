import Link from "next/link";
import type { Essay } from "@/data/writing";

type Props = {
  essay: Essay;
  isLast?: boolean;
};

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  const month = d
    .toLocaleString("en-US", { month: "long", timeZone: "UTC" })
    .toUpperCase();
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export function EssayCard({ essay, isLast = false }: Props) {
  return (
    <article
      className={
        isLast
          ? ""
          : "border-b border-gold-shadow/30 pb-12"
      }
    >
      <div className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow">
        {formatDate(essay.date)} &middot; {essay.readingTime.toUpperCase()}
      </div>
      <h2 className="mt-2">
        <Link
          href={`/writing/${essay.slug}`}
          className="text-h2 font-display font-bold uppercase tracking-[0.04em] text-ink hover:text-crimson-deep transition-colors"
        >
          {essay.title}
        </Link>
      </h2>
      <p className="font-serif italic text-body text-ink-soft mt-1">
        {essay.subtitle}
      </p>
      <p className="font-serif text-body text-ink mt-3">{essay.excerpt}</p>
      {essay.tags && essay.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 font-mono uppercase tracking-[0.18em] text-[11px] text-gold-shadow">
          {essay.tags.map((tag, i) => (
            <span key={tag} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">&#9670;</span>}
              <span>{tag}</span>
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
