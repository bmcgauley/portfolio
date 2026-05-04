import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/ui/section-divider";
import { getEssayById } from "@/lib/essays-db";
import { deleteEssayAction, updateEssayAction } from "../../actions";

const inputClass =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

const labelClass =
  "block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2";

interface PageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ error?: string }>;
}

export default async function EditEssayPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const { error } = await searchParams;
  const essay = await getEssayById(id);
  if (!essay) notFound();

  const essayId = essay._id.toString();
  const tagsValue = essay.tags?.join(", ") ?? "";

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office · Writing
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          Edit Essay
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          Revise an existing essay.
        </p>
      </header>

      {error === "MISSING_FIELDS" ? (
        <p className="mb-8 bg-parchment border border-crimson-deep rounded-[2px] px-4 py-3 font-mono uppercase tracking-[0.18em] text-[11px] text-crimson-deep">
          Title and Body are required.
        </p>
      ) : null}

      <form
        action={updateEssayAction.bind(null, essayId)}
        className="space-y-8 max-w-3xl"
      >
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            defaultValue={essay.title}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="subtitle" className={labelClass}>
            Subtitle
          </label>
          <input
            id="subtitle"
            name="subtitle"
            type="text"
            defaultValue={essay.subtitle}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="slug" className={labelClass}>
            Slug
          </label>
          <input
            id="slug"
            name="slug"
            type="text"
            placeholder="auto-generated from title if empty"
            defaultValue={essay.slug}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="date" className={labelClass}>
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={essay.date}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="readingTime" className={labelClass}>
            Reading Time
          </label>
          <input
            id="readingTime"
            name="readingTime"
            type="text"
            placeholder="e.g. 6 min"
            defaultValue={essay.readingTime}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="excerpt" className={labelClass}>
            Excerpt
          </label>
          <textarea
            id="excerpt"
            name="excerpt"
            rows={3}
            placeholder="1-2 sentence summary for the index"
            defaultValue={essay.excerpt}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="body" className={labelClass}>
            Body
          </label>
          <textarea
            id="body"
            name="body"
            rows={20}
            required
            defaultValue={essay.body}
            className={inputClass}
          />
          <p className="mt-2 font-serif italic text-caption text-ink-muted">
            Markdown-ish: use blank lines between paragraphs. Insert pull
            quotes with{" "}
            <code className="font-mono not-italic text-ink-soft">
              ---PULLQUOTE: your quote here---
            </code>{" "}
            on its own line.
          </p>
        </div>

        <div>
          <label htmlFor="tags" className={labelClass}>
            Tags
          </label>
          <input
            id="tags"
            name="tags"
            type="text"
            placeholder="essay, professional"
            defaultValue={tagsValue}
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={essay.published}
            className="h-4 w-4 accent-crimson-deep"
          />
          <label
            htmlFor="published"
            className="font-serif text-body text-ink"
          >
            Publish immediately (uncheck to save as draft)
          </label>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Button type="submit">Save Changes</Button>
          <Link
            href="/admin/writing"
            className="font-display uppercase tracking-[0.05em] text-xs text-ink-soft hover:text-crimson-deep"
          >
            Cancel
          </Link>
        </div>
      </form>

      <SectionDivider />

      <section className="max-w-3xl">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-crimson-deep mb-3">
          Danger Zone
        </p>
        <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink mb-3">
          Delete Essay
        </h2>
        <p className="font-serif italic text-body text-ink-soft mb-4">
          This permanently removes the essay.
        </p>
        <form action={deleteEssayAction}>
          <input type="hidden" name="id" value={essayId} />
          <Button type="submit" variant="destructive">
            Delete Essay
          </Button>
        </form>
      </section>
    </div>
  );
}
