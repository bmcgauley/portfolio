import Link from "next/link";
import { notFound } from "next/navigation";
import { getEssayBySlug, loadEssays } from "@/data/writing";
import { SectionDivider } from "@/components/ui/section-divider";
import { PullQuote } from "@/components/writing/PullQuote";

type Segment =
  | { type: "paragraph"; text: string }
  | { type: "pullquote"; text: string };

function parseBody(body: string): Segment[] {
  const segments: Segment[] = [];
  const pattern = /---PULLQUOTE:\s*([\s\S]*?)---/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(body)) !== null) {
    const before = body.slice(lastIndex, match.index).trim();
    if (before) {
      for (const para of before.split(/\n\n+/)) {
        const trimmed = para.trim();
        if (trimmed) segments.push({ type: "paragraph", text: trimmed });
      }
    }
    segments.push({ type: "pullquote", text: match[1].trim() });
    lastIndex = pattern.lastIndex;
  }

  const tail = body.slice(lastIndex).trim();
  if (tail) {
    for (const para of tail.split(/\n\n+/)) {
      const trimmed = para.trim();
      if (trimmed) segments.push({ type: "paragraph", text: trimmed });
    }
  }

  return segments;
}

function formatDate(iso: string): string {
  const d = new Date(iso + "T00:00:00");
  const month = d
    .toLocaleString("en-US", { month: "long", timeZone: "UTC" })
    .toUpperCase();
  const day = d.getUTCDate();
  const year = d.getUTCFullYear();
  return `${day} ${month} ${year}`;
}

export async function generateStaticParams() {
  const essays = await loadEssays();
  return essays.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);
  if (!essay) return { title: "Writing" };
  return {
    title: essay.title,
    description: essay.excerpt,
  };
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const essay = await getEssayBySlug(slug);
  if (!essay) notFound();

  const segments = parseBody(essay.body);

  return (
    <main className="bg-bone min-h-screen">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <header>
          <div className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow">
            {formatDate(essay.date)} &middot; {essay.readingTime.toUpperCase()}
          </div>
          <h1 className="text-display-2 font-display font-bold uppercase tracking-[0.04em] text-ink mt-2">
            {essay.title}
          </h1>
          <p className="font-serif italic text-body-lg text-ink-soft mt-2">
            {essay.subtitle}
          </p>
        </header>

        <SectionDivider />

        <div>
          {segments.map((seg, i) =>
            seg.type === "paragraph" ? (
              <p
                key={i}
                className="font-serif text-body-lg text-ink leading-[1.7] my-6"
              >
                {seg.text}
              </p>
            ) : (
              <PullQuote key={i}>{seg.text}</PullQuote>
            ),
          )}
        </div>

        <SectionDivider />

        <footer>
          <Link
            href="/writing"
            className="font-display uppercase tracking-[0.18em] text-sm text-crimson-deep hover:text-crimson transition-colors"
          >
            &larr; Back to Writing
          </Link>
        </footer>
      </article>
    </main>
  );
}
