import { Button } from "@/components/ui/button";
import {
  listTaxonomy,
  type TaxonomyDoc,
  type TaxonomyKind,
} from "@/lib/taxonomy-db";
import { addTaxonomyAction, deleteTaxonomyAction } from "./actions";

const SECTIONS: ReadonlyArray<{
  kind: TaxonomyKind;
  title: string;
  blurb: string;
  showCategory: boolean;
}> = [
  {
    kind: "skill",
    title: "Skills",
    blurb:
      "Things you do. Categories let you group on the about page (e.g. “Frontend Development”).",
    showCategory: true,
  },
  {
    kind: "technology",
    title: "Technologies",
    blurb:
      "Specific tools, platforms, frameworks. Selectable on project edit pages.",
    showCategory: false,
  },
  {
    kind: "hobby",
    title: "Hobbies",
    blurb: "Personal interests. Surfaces on the about page later.",
    showCategory: false,
  },
];

export default async function AdminLibraryPage() {
  const all = await listTaxonomy();
  const byKind = (kind: TaxonomyKind) => all.filter((d) => d.kind === kind);

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office &middot; Library
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          Skills, Tech &amp; Hobbies
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          Master list of names you can pull from when editing projects and
          achievements. New names entered ad-hoc on a project form are added
          here automatically.
        </p>
      </header>

      <div className="space-y-16">
        {SECTIONS.map((section) => (
          <Section
            key={section.kind}
            kind={section.kind}
            title={section.title}
            blurb={section.blurb}
            showCategory={section.showCategory}
            entries={byKind(section.kind)}
          />
        ))}
      </div>
    </div>
  );
}

function Section({
  kind,
  title,
  blurb,
  showCategory,
  entries,
}: {
  kind: TaxonomyKind;
  title: string;
  blurb: string;
  showCategory: boolean;
  entries: TaxonomyDoc[];
}) {
  return (
    <section id={kind}>
      <header className="mb-4">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-2">
          {kind}s
        </p>
        <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
          {title}
        </h2>
        <p className="font-serif italic text-caption text-ink-muted mt-2">
          {blurb}
        </p>
      </header>

      <form
        action={addTaxonomyAction}
        className="bg-vellum border-l-8 border-parchment rounded-[2px] px-6 py-5 mb-6 flex flex-wrap items-end gap-4"
      >
        <input type="hidden" name="kind" value={kind} />
        <div className="flex-1 min-w-[220px]">
          <label
            htmlFor={`name-${kind}`}
            className="block font-mono uppercase tracking-[0.22em] text-[10px] text-crimson-deep mb-2"
          >
            Name
          </label>
          <input
            id={`name-${kind}`}
            name="name"
            type="text"
            required
            placeholder="e.g. React"
            className="w-full bg-bone border border-gold-shadow rounded-[2px] px-3 py-2 font-serif text-body text-ink focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30"
          />
        </div>
        {showCategory ? (
          <div className="flex-1 min-w-[220px]">
            <label
              htmlFor={`category-${kind}`}
              className="block font-mono uppercase tracking-[0.22em] text-[10px] text-crimson-deep mb-2"
            >
              Category (optional)
            </label>
            <input
              id={`category-${kind}`}
              name="category"
              type="text"
              placeholder="e.g. Frontend Development"
              className="w-full bg-bone border border-gold-shadow rounded-[2px] px-3 py-2 font-serif text-body text-ink focus:border-crimson-deep focus:outline-none focus:ring-2 focus:ring-crimson-deep/30"
            />
          </div>
        ) : null}
        <Button type="submit" size="sm">
          Add
        </Button>
      </form>

      {entries.length === 0 ? (
        <p className="font-serif italic text-body text-gold-shadow">
          No {kind}s yet.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-2">
          {entries.map((entry) => {
            const id = entry._id.toString();
            return (
              <li
                key={id}
                className="inline-flex items-center gap-2 bg-vellum border border-gold-shadow rounded-full pl-4 pr-2 py-1.5"
              >
                <span className="font-serif text-body text-ink">
                  {entry.name}
                </span>
                {entry.category ? (
                  <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-gold-shadow">
                    {entry.category}
                  </span>
                ) : null}
                <form action={deleteTaxonomyAction}>
                  <input type="hidden" name="id" value={id} />
                  <input type="hidden" name="kind" value={kind} />
                  <button
                    type="submit"
                    aria-label={`Remove ${entry.name}`}
                    className="font-mono text-[14px] leading-none text-gold-shadow hover:text-crimson-deep transition-colors px-1.5"
                  >
                    &times;
                  </button>
                </form>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
