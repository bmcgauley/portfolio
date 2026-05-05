import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChipMultiSelect } from "@/components/admin/ChipMultiSelect";
import { listTaxonomy } from "@/lib/taxonomy-db";
import { createExperienceAction } from "../../actions";

const LABEL = "block font-mono uppercase tracking-[0.22em] text-[10px] text-crimson-deep mb-2";
const INPUT =
  "w-full bg-vellum border border-gold-shadow rounded-[2px] px-4 py-3 font-serif text-body text-ink focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30";

export default async function NewExperiencePage() {
  const taxonomy = await listTaxonomy();
  const skillLibrary = Array.from(
    new Set(
      taxonomy
        .filter((t) => t.kind === "skill" || t.kind === "technology")
        .map((t) => t.name),
    ),
  );

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office &middot; About &middot; Experiences
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          New Experience
        </h1>
      </header>

      <form action={createExperienceAction} className="space-y-6 max-w-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="position" className={LABEL}>Position</label>
            <input id="position" name="position" type="text" required className={INPUT} />
          </div>
          <div>
            <label htmlFor="company" className={LABEL}>Company</label>
            <input id="company" name="company" type="text" required className={INPUT} />
          </div>
          <div>
            <label htmlFor="startDate" className={LABEL}>Start date</label>
            <input id="startDate" name="startDate" type="text" required placeholder="January 2025" className={INPUT} />
          </div>
          <div>
            <label htmlFor="endDate" className={LABEL}>End date (leave blank for present)</label>
            <input id="endDate" name="endDate" type="text" className={INPUT} />
          </div>
        </div>
        <div>
          <label htmlFor="description" className={LABEL}>Description (markdown supported)</label>
          <textarea id="description" name="description" required className={`${INPUT} min-h-[160px]`} />
        </div>
        <div>
          <label htmlFor="skills" className={LABEL}>Skills</label>
          <ChipMultiSelect
            id="skills"
            name="skills"
            library={skillLibrary}
            addPlaceholder="Add skill…"
          />
          <p className="font-serif italic text-caption text-ink-muted mt-2">
            Pulls from your skill / technology library. New names auto-save.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button type="submit">Create Experience</Button>
          <Link href="/admin/about#experiences" className="font-display uppercase tracking-[0.18em] text-xs text-ink-soft hover:text-crimson-deep">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
