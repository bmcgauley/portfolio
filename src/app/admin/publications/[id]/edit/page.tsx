import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { BlobFileInput } from "@/components/admin/BlobFileInput";
import { getPublicationById } from "@/lib/publications-db";
import { updatePublicationAction } from "../../actions";

const INPUT_CLASS =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

const LABEL_CLASS =
  "block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2";

export default async function EditPublicationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const pub = await getPublicationById(id);
  if (!pub) notFound();

  const action = updatePublicationAction.bind(null, pub._id.toString());

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
            <option value="drawn-from">Book (Drawn-From)</option>
            <option value="academic">Academic Paper</option>
            <option value="independent">Independent Note</option>
          </select>
        </div>

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
        </div>

        {pub.kind === "drawn-from" && (
          <>
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
              <label className={LABEL_CLASS} htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                required
                defaultValue={pub.description}
                className={INPUT_CLASS}
              />
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
                <option value="available">Available</option>
                <option value="pre-order">Pre-Order</option>
                <option value="coming-soon">Coming Soon</option>
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
                defaultValue={pub.releaseDate}
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
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="tags">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                defaultValue={pub.tags?.join(", ") ?? ""}
                className={INPUT_CLASS}
              />
            </div>
          </>
        )}

        {pub.kind === "academic" && (
          <>
            <div>
              <label className={LABEL_CLASS} htmlFor="course">
                Course
              </label>
              <input
                id="course"
                name="course"
                type="text"
                required
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
            <div>
              <label className={LABEL_CLASS} htmlFor="tags">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                defaultValue={pub.tags?.join(", ") ?? ""}
                className={INPUT_CLASS}
              />
            </div>
          </>
        )}

        {pub.kind === "independent" && (
          <>
            <div>
              <label className={LABEL_CLASS} htmlFor="date">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                required
                defaultValue={pub.date}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="length">
                Length
              </label>
              <input
                id="length"
                name="length"
                type="text"
                required
                defaultValue={pub.length}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="url">
                URL
              </label>
              <input
                id="url"
                name="url"
                type="text"
                required
                defaultValue={pub.url}
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="description">
                Description (optional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                defaultValue={pub.description ?? ""}
                className={INPUT_CLASS}
              />
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
    </div>
  );
}
