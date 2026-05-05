import Link from "next/link";
import { Button } from "@/components/ui/button";
import { listEssays } from "@/lib/essays-db";
import { deleteEssayAction, toggleEssayFeaturedAction } from "./actions";

function formatDate(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .toUpperCase();
}

export default async function AdminWritingPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; cap?: string }>;
}) {
  const essays = await listEssays({ includeDrafts: true });
  const params = (await searchParams) ?? {};

  return (
    <div>
      <header className="mb-12 flex items-start justify-between gap-6">
        <div>
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
            Office · Writing
          </p>
          <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
            Writing
          </h1>
          <p className="font-serif italic text-body text-ink-soft mt-3">
            Manage essays and notes.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/writing/new">+ New Essay</Link>
        </Button>
      </header>

      {params.error === "FEATURED_CAP" ? (
        <p className="bg-vellum border-l-4 border-crimson-deep rounded-[2px] px-4 py-3 font-serif italic text-body text-ink mb-8">
          You can feature at most {params.cap ?? 4} essays at a time. Unfeature
          one before adding another.
        </p>
      ) : null}

      {essays.length === 0 ? (
        <p className="font-serif italic text-body text-gold-shadow">
          No essays yet. Write your first.
        </p>
      ) : (
        <ul className="space-y-0">
          {essays.map((essay) => {
            const id = essay._id.toString();
            return (
              <li
                key={id}
                className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 border-b border-gold-shadow/30 pb-8 pt-8 first:pt-0 last:border-b-0"
              >
                <div>
                  <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink">
                    {essay.title}
                  </h2>
                  {essay.subtitle ? (
                    <p className="font-serif italic text-body text-ink-soft mt-1">
                      {essay.subtitle}
                    </p>
                  ) : null}
                  {essay.excerpt ? (
                    <p className="font-serif text-body text-ink mt-3 line-clamp-2">
                      {essay.excerpt}
                    </p>
                  ) : null}
                  {essay.tags && essay.tags.length > 0 ? (
                    <p className="mt-3 font-mono uppercase tracking-[0.18em] text-[10px] text-gold-shadow">
                      {essay.tags.map((t, i) => (
                        <span key={t}>
                          {i > 0 ? (
                            <span className="mx-2 text-gold-shadow">◆</span>
                          ) : null}
                          {t}
                        </span>
                      ))}
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-col items-start md:items-end gap-3">
                  <div className="flex items-center gap-2">
                    {essay.published ? (
                      <span className="bg-vellum text-crimson-deep border border-gold font-mono uppercase tracking-[0.18em] text-[11px] px-2 py-1 rounded-[2px]">
                        PUBLISHED
                      </span>
                    ) : (
                      <span className="bg-parchment text-gold-shadow font-mono uppercase tracking-[0.18em] text-[11px] px-2 py-1 rounded-[2px]">
                        DRAFT
                      </span>
                    )}
                    {essay.featured ? (
                      <span className="bg-gold text-ink font-mono uppercase tracking-[0.18em] text-[11px] px-2 py-1 rounded-[2px]">
                        FEATURED
                      </span>
                    ) : null}
                  </div>
                  <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-ink-muted">
                    {formatDate(essay.date)}
                    {essay.readingTime ? ` · ${essay.readingTime}` : ""}
                  </p>
                  <div className="flex items-center gap-3">
                    <form action={toggleEssayFeaturedAction}>
                      <input type="hidden" name="id" value={id} />
                      <input
                        type="hidden"
                        name="next"
                        value={essay.featured ? "false" : "true"}
                      />
                      <Button
                        type="submit"
                        variant={essay.featured ? "secondary" : "outline"}
                        size="sm"
                      >
                        {essay.featured ? "Unfeature" : "Feature"}
                      </Button>
                    </form>
                    <Link
                      href={`/admin/writing/${id}/edit`}
                      className="font-display uppercase tracking-[0.05em] text-xs text-crimson-deep hover:underline"
                    >
                      Edit
                    </Link>
                    <form action={deleteEssayAction}>
                      <input type="hidden" name="id" value={id} />
                      <Button
                        type="submit"
                        variant="destructive"
                        size="sm"
                      >
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
