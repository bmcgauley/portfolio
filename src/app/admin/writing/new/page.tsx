import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BlobFileInput } from "@/components/admin/BlobFileInput";
import { createEssayAction } from "../actions";

const inputClass =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

const labelClass =
  "block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2";

const captionClass = "mt-2 font-serif italic text-caption text-ink-muted";

interface PageProps {
  searchParams: Promise<{ error?: string }>;
}

export default async function NewEssayPage({ searchParams }: PageProps) {
  const { error } = await searchParams;

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office · Writing
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          New Essay
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          Compose a new essay or note.
        </p>
      </header>

      {error === "MISSING_FIELDS" ? (
        <p className="mb-8 bg-parchment border border-crimson-deep rounded-[2px] px-4 py-3 font-mono uppercase tracking-[0.18em] text-[11px] text-crimson-deep">
          Title and Body are required.
        </p>
      ) : null}

      <form action={createEssayAction} className="space-y-8 max-w-3xl">
        <div>
          <label htmlFor="title" className={labelClass}>
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
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
            className={inputClass}
          />
          <p className={captionClass}>
            Markdown supported. Use <strong>**bold**</strong>,{" "}
            <em>*italic*</em>, blank lines for paragraphs, lists, headings (#
            ## ###), links [text](url), code, etc. Insert pull quotes with{" "}
            <code className="font-mono not-italic text-ink-soft">
              ---PULLQUOTE: your quote here---
            </code>{" "}
            on its own line.
          </p>
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
            className={inputClass}
          />
          <p className={captionClass}>
            Markdown supported. Use <strong>**bold**</strong>,{" "}
            <em>*italic*</em>, blank lines for paragraphs, lists, headings (#
            ## ###), links [text](url), code, etc. Insert pull quotes with{" "}
            <code className="font-mono not-italic text-ink-soft">
              ---PULLQUOTE: your quote here---
            </code>{" "}
            on its own line.
          </p>
        </div>

        <div>
          <label className={labelClass} htmlFor="pdf">
            PDF (optional)
          </label>
          <BlobFileInput
            id="pdf"
            name="pdfUrl"
            pathPrefix="essays"
            accept="application/pdf"
          />
          <p className={captionClass}>
            Optional. Attach a PDF version of this essay (e.g. for distribution
            or longer-form pieces).
          </p>
        </div>

        <div>
          <label className="flex items-center gap-3 font-serif text-body text-ink cursor-pointer">
            <input
              type="checkbox"
              name="allowDownload"
              defaultChecked
              className="w-4 h-4 accent-crimson-deep"
            />
            <span>Allow visitors to download the PDF</span>
          </label>
          <p className={captionClass}>
            Uncheck to hide the download button on the public viewer
            (best-effort; PDFs in iframes can still be saved by determined
            users).
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
            className={inputClass}
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            id="published"
            name="published"
            type="checkbox"
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
          <Button type="submit">Create Essay</Button>
          <Link
            href="/admin/writing"
            className="font-display uppercase tracking-[0.05em] text-xs text-ink-soft hover:text-crimson-deep"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
