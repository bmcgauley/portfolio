"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BlobFileInput } from "@/components/admin/BlobFileInput";
import { createPublicationAction } from "../actions";

type Kind = "book" | "academic";

const INPUT_CLASS =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

const LABEL_CLASS =
  "block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2";

const CAPTION_CLASS = "mt-2 font-serif italic text-caption text-ink-muted";

export default function NewPublicationPage() {
  const [kind, setKind] = useState<Kind>("book");

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office · Publications
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          New Publication
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          Add a book or academic paper.
        </p>
      </header>

      <form
        action={createPublicationAction}
        encType="multipart/form-data"
        className="bg-vellum border border-gold-shadow rounded-[2px] p-8 space-y-6 max-w-3xl"
      >
        <div>
          <label className={LABEL_CLASS} htmlFor="kind">
            Kind
          </label>
          <select
            id="kind"
            name="kind"
            value={kind}
            onChange={(e) => setKind(e.target.value as Kind)}
            className={INPUT_CLASS}
          >
            <option value="book">Book</option>
            <option value="academic">Academic Paper</option>
          </select>
        </div>

        {kind === "book" && (
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
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="slug">
                Slug (optional)
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>Auto-derived from title.</p>
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
                required
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
                className={INPUT_CLASS}
                defaultValue="in-progress"
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
                defaultChecked
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
                defaultValue={0}
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>
                Lower numbers appear first. Leave blank for default sort.
              </p>
            </div>
          </>
        )}

        {kind === "academic" && (
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
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="slug">
                Slug (optional)
              </label>
              <input
                id="slug"
                name="slug"
                type="text"
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>Auto-derived from title.</p>
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
                required
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
                className={INPUT_CLASS}
                defaultValue="academic"
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
                defaultChecked
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
                defaultValue={0}
                className={INPUT_CLASS}
              />
              <p className={CAPTION_CLASS}>
                Lower numbers appear first. Leave blank for default sort.
              </p>
            </div>
          </>
        )}

        <div className="flex items-center gap-4 pt-4">
          <Button type="submit">Create Publication</Button>
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
