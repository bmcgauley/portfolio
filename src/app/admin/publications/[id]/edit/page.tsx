import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/ui/section-divider";
import { BlobFileInput } from "@/components/admin/BlobFileInput";
import { getPublicationById } from "@/lib/publications-db";
import { deletePublicationAction, updatePublicationAction } from "../../actions";

const INPUT_CLASS =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

const LABEL_CLASS =
  "block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2";

const CAPTION_CLASS = "mt-2 font-serif italic text-caption text-ink-muted";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pub = await getPublicationById(id);
  if (!pub) notFound();

  if (pub.kind !== "book" && pub.kind !== "academic") {
    notFound();
  }

  const pubId = pub._id.toString();
  const action = updatePublicationAction.bind(null, pubId);

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office · Publications
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          Edit Publication
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          Update the metadata or replace the file.
        </p>
      </header>

      <form
        action={action}
        encType="multipart/form-data"
        className="bg-vellum border border-gold-shadow rounded-[2px] p-8 space-y-6 max-w-3xl"
      >
        <div>
          <label className={LABEL_CLASS} htmlFor="kind">
            Kind (locked)
          </label>
          <select
            id="kind"
            name="kind"
            defaultValue={pub.kind}
            disabled
            className={INPUT_CLASS}
          >
            <option value="book">Book</option>
            <option value="academic">Academic Paper</option>
          </select>
        </div>

        {pub.kind === "book" && (
          <>
            <div>
              <label className={LABEL_CLASS} htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                defaultValue={pub.title}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="subtitle">
                Subtitle
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                required
                defaultValue={pub.subtitle}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="slug">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                defaultValue={pub.slug}
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>Auto-derived from title if blank.</p>
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={6}
                required
                defaultValue={pub.description}
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>
                Markdown supported. Use **bold**, *italic*, blank lines for
                paragraphs, lists, etc.
              </p>
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="coverImage">
                Cover Image
              </label>
              <BlobFileInput
                id="coverImage"
                name="coverImageUrl"
                accept="image/jpeg,image/png,image/webp"
                pathPrefix="publications/covers"
                defaultUrl={pub.coverImage}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="status">
                Status
              </label>
              <select
                id="status"
                name="status"
                required
                defaultValue={pub.status}
                className={INPUT_CLASS}
              >
                <option value="in-progress">
                  In Progress (still being written)
                </option>
                <option value="coming-soon">
                  Coming Soon (written, not released)
                </option>
                <option value="pre-order">Pre-Order</option>
                <option value="available">Available</option>
              </select>
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="releaseDate">
                Release Date
              </label>
              <input
                id="releaseDate"
                name="releaseDate"
                type="text"
                required
                placeholder="e.g. May 2026 or Q4 2026"
                defaultValue={pub.releaseDate}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="publisher">
                Publisher (optional)
              </label>
              <input
                id="publisher"
                name="publisher"
                type="text"
                placeholder="e.g. Drawn From Publishing, Self-Published"
                defaultValue={pub.publisher ?? ""}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="externalUrl">
                External URL (optional)
              </label>
              <input
                id="externalUrl"
                name="externalUrl"
                type="text"
                defaultValue={pub.externalUrl ?? ""}
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>
                Retailer or external store link.
              </p>
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="pdf">
                PDF (optional)
              </label>
              <BlobFileInput
                id="pdf"
                name="pdfUrl"
                accept="application/pdf"
                pathPrefix="publications/books"
                defaultUrl={pub.pdfUrl}
              />
              <p className={CAPTION_CLASS}>
                Optional. Attach a PDF to host directly on this site.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <input
                id="allowDownload"
                name="allowDownload"
                type="checkbox"
                defaultChecked={pub.allowDownload ?? true}
                className="mt-1 h-4 w-4 accent-crimson-deep"
              />
              <div>
                <label
                  htmlFor="allowDownload"
                  className="font-serif text-body text-ink"
                >
                  Allow visitors to download the PDF
                </label>
                <p className={CAPTION_CLASS}>
                  Uncheck to hide the download button on the viewer
                  (best-effort; PDFs in iframes can still be saved).
                </p>
              </div>
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="tags">
                Tags (optional, comma-separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                defaultValue={pub.tags?.join(", ") ?? ""}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="order">
                Order (optional)
              </label>
              <input
                id="order"
                name="order"
                type="number"
                placeholder="0"
                defaultValue={pub.order ?? 0}
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>
                Lower numbers appear first. Leave blank for default sort.
              </p>
            </div>
          </>
        )}

        {pub.kind === "academic" && (
          <>
            <div>
              <label className={LABEL_CLASS} htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                defaultValue={pub.title}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="slug">
                Slug
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                defaultValue={pub.slug}
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>Auto-derived from title if blank.</p>
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="course">
                Course
              </label>
              <input
                id="course"
                name="course"
                type="text"
                required
                placeholder="e.g. MGT 471 — Strategic Management"
                defaultValue={pub.course}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="venue">
                Venue (optional)
              </label>
              <input
                id="venue"
                name="venue"
                type="text"
                defaultValue={pub.venue ?? ""}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="year">
                Year
              </label>
              <input
                id="year"
                name="year"
                type="number"
                required
                defaultValue={pub.year}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="abstract">
                Abstract
              </label>
              <textarea
                id="abstract"
                name="abstract"
                rows={6}
                required
                defaultValue={pub.abstract}
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>Markdown supported.</p>
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="pdf">
                PDF
              </label>
              <BlobFileInput
                id="pdf"
                name="pdfUrl"
                accept="application/pdf"
                pathPrefix="publications/academic"
                defaultUrl={pub.pdfPath}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="authors">
                Authors (comma-separated)
              </label>
              <input
                id="authors"
                name="authors"
                type="text"
                required
                placeholder="Brian McGauley, Jane Doe"
                defaultValue={pub.authors.join(", ")}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="category">
                Category
              </label>
              <select
                id="category"
                name="category"
                required
                defaultValue={pub.category}
                className={INPUT_CLASS}
              >
                <option value="academic">Academic</option>
                <option value="group-projects">Group Projects</option>
                <option value="external">External</option>
              </select>
            </div>
            <div className="flex items-start gap-3">
              <input
                id="allowDownload"
                name="allowDownload"
                type="checkbox"
                defaultChecked={pub.allowDownload ?? true}
                className="mt-1 h-4 w-4 accent-crimson-deep"
              />
              <div>
                <label
                  htmlFor="allowDownload"
                  className="font-serif text-body text-ink"
                >
                  Allow visitors to download the PDF
                </label>
                <p className={CAPTION_CLASS}>
                  Uncheck to hide the download button on the viewer
                  (best-effort; PDFs in iframes can still be saved).
                </p>
              </div>
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="tags">
                Tags (optional, comma-separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                defaultValue={pub.tags?.join(", ") ?? ""}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="order">
                Order (optional)
              </label>
              <input
                id="order"
                name="order"
                type="number"
                placeholder="0"
                defaultValue={pub.order ?? 0}
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>
                Lower numbers appear first. Leave blank for default sort.
              </p>
            </div>
          </>
        )}

        <div className="flex items-center gap-4 pt-4">
          <Button type="submit">Save Changes</Button>
          <Link
            href="/admin/publications"
            className="font-serif italic text-body text-crimson-deep hover:underline underline-offset-4"
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
          Delete Publication
        </h2>
        <p className="font-serif italic text-body text-ink-soft mb-4">
          This permanently removes the publication and any uploaded PDF/cover.
        </p>
        <form action={deletePublicationAction}>
          <input type="hidden" name="id" value={pubId} />
          <Button type="submit" variant="destructive">
            Delete Publication
          </Button>
        </form>
      </section>
    </div>
  );
}
