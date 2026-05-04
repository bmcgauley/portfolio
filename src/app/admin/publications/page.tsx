import Link from "next/link";
import { Button } from "@/components/ui/button";
import { listPublications, type PublicationDoc } from "@/lib/publications-db";
import { deletePublicationAction } from "./actions";

const KIND_LABEL: Record<PublicationDoc["kind"], string> = {
  "drawn-from": "BOOK",
  academic: "PAPER",
  independent: "NOTE",
};

function metaLine(pub: PublicationDoc): string {
  if (pub.kind === "drawn-from") {
    return `${pub.status} · ${pub.releaseDate}`;
  }
  if (pub.kind === "academic") {
    return `${pub.course} · ${pub.year}`;
  }
  return pub.date;
}

export default async function AdminPublicationsPage() {
  const pubs = await listPublications();

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
            Manage books, papers, and notes.
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/publications/new">+ New Publication</Link>
        </Button>
      </header>

      {pubs.length === 0 ? (
        <p className="font-serif italic text-body text-gold-shadow">
          No publications yet. Create your first.
        </p>
      ) : (
        <ul className="divide-y divide-gold/40 border-t border-b border-gold/40">
          {pubs.map((pub) => {
            const id = pub._id.toString();
            return (
              <li
                key={id}
                className="flex items-start justify-between gap-6 py-6"
              >
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
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
