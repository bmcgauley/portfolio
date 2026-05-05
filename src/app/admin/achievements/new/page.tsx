import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createAchievementAction } from "../actions";

const INPUT_CLASS =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink placeholder:text-ink-muted focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

const LABEL_CLASS =
  "block font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-2";

const HELPER_CLASS = "font-serif italic text-caption text-ink-muted mt-2";

export default async function NewAchievementPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office · Achievements
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          New Achievement
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          Add a milestone to the home page.
        </p>
      </header>

      {error ? (
        <p className="mb-6 font-serif italic text-body text-crimson-deep">
          {error === "MISSING_FIELDS"
            ? "Title, date, and description are required."
            : `Error: ${error}`}
        </p>
      ) : null}

      <form action={createAchievementAction} className="space-y-6 max-w-2xl">
        <div>
          <label htmlFor="title" className={LABEL_CLASS}>
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
          <label htmlFor="date" className={LABEL_CLASS}>
            Date
          </label>
          <input
            id="date"
            name="date"
            type="text"
            required
            placeholder="e.g. Fall 2025, May 2026, Spring 2025"
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="description" className={LABEL_CLASS}>
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={3}
            required
            className={INPUT_CLASS}
          />
        </div>

        <div>
          <label htmlFor="citation" className={LABEL_CLASS}>
            Citation
          </label>
          <input
            id="citation"
            name="citation"
            type="text"
            className={INPUT_CLASS}
          />
          <p className={HELPER_CLASS}>
            Optional reference text, e.g. &ldquo;Featured in the Fresno
            Bee.&rdquo;
          </p>
        </div>

        <div>
          <label htmlFor="citationUrl" className={LABEL_CLASS}>
            Citation URL
          </label>
          <input
            id="citationUrl"
            name="citationUrl"
            type="text"
            className={INPUT_CLASS}
          />
          <p className={HELPER_CLASS}>Optional link for the citation.</p>
        </div>

        <div className="flex items-center gap-4 pt-2">
          <Button type="submit">Create Achievement</Button>
          <Link
            href="/admin/achievements"
            className="font-display uppercase tracking-[0.18em] text-xs text-ink-soft hover:text-crimson-deep"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
