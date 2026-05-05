import Link from "next/link";
import { Button } from "@/components/ui/button";
import { listPublications, type PublicationDoc } from "@/lib/publications-db";
import { SortableAdminList } from "@/components/admin/SortableAdminList";
import {
  deletePublicationAction,
  reorderPublicationsAction,
  togglePublicationFeaturedAction,
} from "./actions";

const KIND_LABEL: Record<PublicationDoc["kind"], string> = {
  book: "BOOK",
  academic: "PAPER",
};

function metaLine(pub: PublicationDoc): string {
  if (pub.kind === "book") {
    const parts = [pub.status, pub.releaseDate];
    if (pub.publisher) parts.push(pub.publisher);
    return parts.join(" · ");
  }
  return `${pub.course} · ${pub.year}`;
}

export default async function AdminPublicationsPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string; cap?: string }>;
}) {
  const pubs = await listPublications();
  const params = (await searchParams) ?? {};

  const sortableItems = pubs.map((pub) => {
    const id = pub._id.toString();
    return {
      id,
      node: (
        <div className="bg-vellum border-t-4 border-gold rounded-[2px] p-6 flex items-start justify-between gap-6">
          <div className="min-w-0">
            <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
              {KIND_LABEL[pub.kind]}
            </p>
            <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink truncate">
              {pub.title}
            </h2>
            <p className="font-serif italic text-body text-gold-shadow mt-1">
              {metaLine(pub)}
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <form action={togglePublicationFeaturedAction}>
              <input type="hidden" name="id" value={id} />
              <input
                type="hidden"
                name="next"
                value={pub.featured ? "false" : "true"}
              />
              <Button
                type="submit"
                variant={pub.featured ? "secondary" : "outline"}
                size="sm"
              >
                {pub.featured ? "Unfeature" : "Feature"}
              </Button>
            </form>
            <Button asChild variant="outline" size="sm">
              <Link href={`/admin/publications/${id}/edit`}>Edit</Link>
            </Button>
            <form action={deletePublicationAction}>
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
            Office · Publications
          </p>
          <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
            Publications
          </h1>
          <p className="font-serif italic text-body text-ink-soft mt-3">
            Manage books and academic papers. Drag the handle on the left to
            reorder.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/publications/new">+ New Publication</Link>
        </Button>
      </header>

      {params.error === "FEATURED_CAP" ? (
        <p className="bg-vellum border-l-4 border-crimson-deep rounded-[2px] px-4 py-3 font-serif italic text-body text-ink mb-8">
          You can feature at most {params.cap ?? 4} publications at a time.
          Unfeature one before adding another.
        </p>
      ) : null}

      {sortableItems.length === 0 ? (
        <p className="font-serif italic text-body text-gold-shadow">
          No publications yet. Create your first.
        </p>
      ) : (
        <SortableAdminList
          items={sortableItems}
          reorderAction={reorderPublicationsAction}
        />
      )}
    </div>
  );
}
