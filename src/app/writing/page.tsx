import { essays } from "@/data/writing";
import { EssayCard } from "@/components/writing/EssayCard";

export const metadata = {
  title: "Writing",
  description: "Essays and notes by Brian McGauley.",
};

export default function WritingIndexPage() {
  const sorted = [...essays].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <main className="bg-bone min-h-screen">
      <header className="bg-bone py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-display-2 font-display font-bold uppercase tracking-[0.04em] text-ink">
            Writing
          </h1>
          <p className="font-serif italic text-body-lg text-ink-soft mt-2">
            Essays and notes.
          </p>
        </div>
      </header>

      <section className="max-w-3xl mx-auto px-6 py-8 space-y-12">
        {sorted.map((essay, i) => (
          <EssayCard
            key={essay.slug}
            essay={essay}
            isLast={i === sorted.length - 1}
          />
        ))}
      </section>
    </main>
  );
}
