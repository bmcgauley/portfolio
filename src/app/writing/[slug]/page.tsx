import Link from "next/link";
import { notFound } from "next/navigation";
import { getEssayBySlug, loadEssays } from "@/data/writing";
import { SectionDivider } from "@/components/ui/section-divider";
import { PullQuote } from "@/components/writing/PullQuote";
import { Markdown } from "@/components/ui/markdown";
import { PdfViewer } from "@/components/publications/PdfViewer";

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

  const { pdfUrl, allowDownload } = essay;
  const downloadAllowed = allowDownload !== false;

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
          {pdfUrl && downloadAllowed ? (
            <p className="font-mono uppercase tracking-[0.18em] text-mono-label mt-4">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-crimson-deep hover:underline underline-offset-4"
              >
                Available as PDF →
              </a>
            </p>
          ) : null}
        </header>

        <SectionDivider />

        <div>
          {segments.map((seg, i) =>
            seg.type === "paragraph" ? (
              <Markdown key={i} content={seg.text} variant="prose" />
            ) : (
              <PullQuote key={i}>{seg.text}</PullQuote>
            ),
          )}
        </div>

        {pdfUrl && !downloadAllowed ? (
          <>
            <SectionDivider />
            <PdfViewer
              src={pdfUrl}
              title={essay.title}
              allowDownload={false}
            />
          </>
        ) : null}

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
