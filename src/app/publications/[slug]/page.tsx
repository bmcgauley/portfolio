import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionDivider } from "@/components/ui/section-divider";
import { PdfViewer } from "@/components/publications/PdfViewer";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { getPublicationBySlug } from "@/data/publications";

type PageProps = {
  params: Promise<{ slug: string }>;
};

function BackLink() {
  return (
    <Link
      href="/publications"
      className="font-display uppercase tracking-[0.18em] text-sm text-crimson-deep hover:text-crimson"
    >
      ← Back to Publications
    </Link>
  );
}

export default async function PublicationDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const pub = await getPublicationBySlug(slug);

  if (!pub) {
    notFound();
  }

  if (pub.kind === "academic") {
    const coAuthors = pub.authors.filter((a) => a !== "Brian McGauley");
    const authorsLine =
      coAuthors.length > 0
        ? `Brian McGauley with ${coAuthors.join(", ")}`
        : "Brian McGauley";

    return (
      <main className="bg-bone min-h-screen">
        <article className="max-w-5xl mx-auto px-6 py-12">
          <header className="mb-10">
            <p className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow mb-4">
              {pub.course} · {pub.year}
            </p>
            <h1 className="text-display-2 font-display font-bold uppercase tracking-[0.04em] text-ink mb-4">
              {pub.title}
            </h1>
            <p className="font-serif italic text-body-lg text-ink-soft mb-6">
              {authorsLine}
            </p>
            <div className="max-w-2xl">
              <Markdown content={pub.abstract} variant="prose" />
            </div>
          </header>

          <SectionDivider />

          <PdfViewer
            src={pub.pdfPath}
            title={pub.title}
            allowDownload={pub.allowDownload}
          />

          <SectionDivider />

          <footer className="text-center">
            <BackLink />
          </footer>
        </article>
      </main>
    );
  }

  // pub.kind === "book"
  const ctaLabel = pub.externalUrl
    ? pub.publisher
      ? `Visit ${pub.publisher}`
      : "Visit Site"
    : null;

  return (
    <main className="bg-bone min-h-screen">
      <article className="max-w-4xl mx-auto px-6 py-12">
        <header className="mb-10 text-center">
          <p className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow mb-4">
            {pub.publisher ? `${pub.publisher} · ` : ""}
            {pub.releaseDate}
          </p>
          <h1 className="text-display-2 font-display font-bold uppercase tracking-[0.04em] text-ink mb-3">
            {pub.title}
          </h1>
          <p className="font-serif italic text-body-lg text-ink-soft">
            {pub.subtitle}
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          <div className="relative aspect-[2/3] w-[260px] mx-auto md:mx-0 flex-shrink-0 border border-gold-shadow rounded-[2px] overflow-hidden bg-parchment">
            <Image
              src={pub.coverImage}
              alt={`${pub.title} cover`}
              fill
              sizes="260px"
              className="object-cover"
              priority
            />
          </div>
          <div className="flex-1">
            <Markdown content={pub.description} variant="compact" />
            {ctaLabel ? (
              <div className="mt-6">
                <Button asChild>
                  <a
                    href={pub.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {ctaLabel}
                  </a>
                </Button>
              </div>
            ) : null}
          </div>
        </div>

        {pub.pdfUrl ? (
          <>
            <SectionDivider />
            <PdfViewer
              src={pub.pdfUrl}
              title={pub.title}
              allowDownload={pub.allowDownload}
            />
          </>
        ) : null}

        <SectionDivider />

        <footer className="text-center">
          <BackLink />
        </footer>
      </article>
    </main>
  );
}
