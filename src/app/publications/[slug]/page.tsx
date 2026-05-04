import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SectionDivider } from "@/components/ui/section-divider";
import { PdfViewer } from "@/components/publications/PdfViewer";
import { Button } from "@/components/ui/button";
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
  const pub = getPublicationBySlug(slug);

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
            <p className="font-serif text-body-lg text-ink leading-[1.7] max-w-2xl">
              {pub.abstract}
            </p>
          </header>

          <SectionDivider />

          <PdfViewer src={pub.pdfPath} title={pub.title} />

          <SectionDivider />

          <footer className="text-center">
            <BackLink />
          </footer>
        </article>
      </main>
    );
  }

  if (pub.kind === "drawn-from") {
    return (
      <main className="bg-bone min-h-screen">
        <article className="max-w-4xl mx-auto px-6 py-12">
          <header className="mb-10 text-center">
            <p className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow mb-4">
              Drawn From Publishing · {pub.releaseDate}
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
              <p className="font-serif text-body text-ink leading-relaxed mb-6">
                {pub.description}
              </p>
              {pub.externalUrl ? (
                <Button asChild>
                  <a
                    href={pub.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Drawn From
                  </a>
                </Button>
              ) : null}
            </div>
          </div>

          <SectionDivider />

          <footer className="text-center">
            <BackLink />
          </footer>
        </article>
      </main>
    );
  }

  // independent
  const isExternal = /^https?:\/\//.test(pub.url);
  return (
    <main className="bg-bone min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-12 text-center">
        <header className="mb-10">
          <p className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow mb-4">
            Independent · {pub.length}
          </p>
          <h1 className="text-display-2 font-display font-bold uppercase tracking-[0.04em] text-ink mb-3">
            {pub.title}
          </h1>
          {pub.description ? (
            <p className="font-serif italic text-body-lg text-ink-soft">
              {pub.description}
            </p>
          ) : null}
        </header>

        <p className="font-serif text-body text-ink mb-6">
          Read at:{" "}
          <Link
            href={pub.url}
            {...(isExternal
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className="text-crimson-deep underline-offset-4 hover:underline"
          >
            {pub.url}
          </Link>
        </p>

        <SectionDivider />

        <footer>
          <BackLink />
        </footer>
      </article>
    </main>
  );
}
