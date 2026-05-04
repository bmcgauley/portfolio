"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { createPublicationAction } from "../actions";

type Kind = "drawn-from" | "academic" | "independent";

const INPUT_CLASS =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

const LABEL_CLASS =
  "block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2";

export default function NewPublicationPage() {
  const [kind, setKind] = useState<Kind>("drawn-from");

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
          Add a book, paper, or note.
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
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label className={LABEL_CLASS} htmlFor="slug">
            Slug (optional — auto-derived from title)
          </label>
          <input id="slug" name="slug" type="text" className={INPUT_CLASS} />
        </div>

        {kind === "drawn-from" && (
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
                className={INPUT_CLASS}
              />
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="coverImage">
                Cover Image
              </label>
              <input
                id="coverImage"
                name="coverImage"
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                required
                className={INPUT_CLASS}
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
                defaultValue="available"
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
                placeholder="e.g. 2026-05-03 or May 2026"
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
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="tags">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                className={INPUT_CLASS}
              />
            </div>
          </>
        )}

        {kind === "academic" && (
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
            </div>
            <div>
              <label className={LABEL_CLASS} htmlFor="pdf">
                PDF
              </label>
              <input
                id="pdf"
                name="pdf"
                type="file"
                accept=".pdf"
                required
                className={INPUT_CLASS}
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
            <div>
              <label className={LABEL_CLASS} htmlFor="tags">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                className={INPUT_CLASS}
              />
            </div>
          </>
        )}

        {kind === "independent" && (
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
                placeholder="1,200 words"
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
                placeholder="/writing/some-slug or https://..."
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
                className={INPUT_CLASS}
              />
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
