import Link from "next/link";
import { Button } from "@/components/ui/button";
import { listAchievements } from "@/lib/achievements-db";
import { SortableAdminList } from "@/components/admin/SortableAdminList";
import {
  deleteAchievementAction,
  reorderAchievementsAction,
  toggleAchievementFeaturedAction,
} from "./actions";

export default async function AdminAchievementsPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; cap?: string }>;
}) {
  const achievements = await listAchievements();
  const params = (await searchParams) ?? {};

  const sortableItems = achievements.map((a) => {
    const id = a._id.toString();
    return {
      id,
      node: (
        <div className="bg-vellum border-t-4 border-gold rounded-[2px] p-6 flex items-start justify-between gap-6">
          <div className="flex-1 min-w-0">
            <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink">
              {a.title}
            </h2>
            <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mt-2">
              {a.date}
            </p>
            <p className="font-serif text-body text-ink-soft mt-3 line-clamp-2">
              {a.description}
            </p>
            {a.citation ? (
              <p className="font-serif italic text-caption text-ink-muted mt-2">
                {a.citationUrl ? (
                  <a
                    href={a.citationUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-crimson-deep hover:underline"
                  >
                    {a.citation}
                  </a>
                ) : (
                  a.citation
                )}
              </p>
            ) : null}
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <form action={toggleAchievementFeaturedAction}>
              <input type="hidden" name="id" value={id} />
              <input
                type="hidden"
                name="next"
                value={a.featured ? "false" : "true"}
              />
              <Button
                type="submit"
                variant={a.featured ? "secondary" : "outline"}
                size="sm"
              >
                {a.featured ? "Unfeature" : "Feature"}
              </Button>
            </form>
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/achievements/${id}/edit`}>Edit</Link>
            </Button>
            <form action={deleteAchievementAction}>
              <input type="hidden" name="id" value={id} />
              <Button type="submit" variant="destructive" size="sm">
                Delete
              </Button>
            </form>
          </div>
        </div>
      ),
    };
  });

  return (
    <div>
      <header className="mb-12 flex items-start justify-between gap-6">
        <div>
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
            Office · Achievements
          </p>
          <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
            Achievements
          </h1>
          <p className="font-serif italic text-body text-ink-soft mt-3">
            Manage milestones surfaced on the home page. Drag the handle on the
            left to reorder.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/achievements/new">+ New Achievement</Link>
        </Button>
      </header>

      {params.error === "FEATURED_CAP" ? (
        <p className="bg-vellum border-l-4 border-crimson-deep rounded-[2px] px-4 py-3 font-serif italic text-body text-ink mb-8">
          You can feature at most {params.cap ?? 4} achievements at a time.
          Unfeature one before adding another.
        </p>
      ) : null}

      {sortableItems.length === 0 ? (
        <p className="font-serif italic text-body text-gold-shadow">
          No achievements yet.
        </p>
      ) : (
        <SortableAdminList
          items={sortableItems}
          reorderAction={reorderAchievementsAction}
        />
      )}
    </div>
  );
}
