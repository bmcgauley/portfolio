import Image from "next/image";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/ui/section-divider";
import {
  loadPublications,
  type AcademicPaper,
  type DrawnFromTitle,
  type IndependentNote,
} from "@/data/publications";

const statusBadgeClass: Record<DrawnFromTitle["status"], string> = {
  "coming-soon": "bg-parchment text-gold-shadow",
  available: "bg-vellum text-crimson-deep border border-gold",
  "pre-order": "bg-crimson-deep text-vellum",
};

const statusLabel: Record<DrawnFromTitle["status"], string> = {
  "coming-soon": "Coming Soon",
  available: "Available",
  "pre-order": "Pre-Order",
};

function SectionHeader({
  eyebrow,
  heading,
  intro,
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
}) {
  return (
    <header className="max-w-3xl mx-auto text-center mb-12 px-6">
      <p className="font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-3">
        {eyebrow}
      </p>
      <h2 className="text-h1 font-display font-bold uppercase tracking-[0.04em] text-ink">
        {heading}
      </h2>
      {intro ? (
        <p className="font-serif italic text-ink-soft text-body mt-3">
          {intro}
        </p>
      ) : null}
    </header>
  );
}

function DrawnFromCard({ title }: { title: DrawnFromTitle }) {
  return (
    <Card className="flex flex-col md:flex-row gap-8 md:gap-10">
      <div className="flex-shrink-0 mx-auto md:mx-0">
        <div className="relative aspect-[2/3] w-[240px] max-w-[240px] border border-gold-shadow bg-parchment overflow-hidden rounded-[2px]">
          <Image
            src={title.coverImage}
            alt={`${title.title} cover`}
            fill
            sizes="240px"
            className="object-cover"
            priority
          />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <CardHeader className="p-0 mb-4">
          <CardTitle className="text-h2">{title.title}</CardTitle>
          <CardDescription className="font-serif italic text-body text-gold-shadow">
            {title.subtitle}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0 font-serif text-body text-ink leading-relaxed flex-1">
          {title.description}
        </CardContent>
        <CardFooter className="p-0 mt-6 flex-wrap gap-4 justify-between">
          <span
            className={`inline-flex items-center px-3 py-1 rounded-[2px] font-mono uppercase tracking-[0.18em] text-[11px] ${statusBadgeClass[title.status]}`}
          >
            {statusLabel[title.status]} · {title.releaseDate}
          </span>
          {title.externalUrl ? (
            <Button asChild>
              <a
                href={title.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Drawn From
              </a>
            </Button>
          ) : null}
        </CardFooter>
      </div>
    </Card>
  );
}

function AcademicPaperCard({ paper }: { paper: AcademicPaper }) {
  const coAuthors = paper.authors.filter((a) => a !== "Brian McGauley");
  return (
    <Card className="flex flex-col">
      <div className="flex justify-end">
        <span className="font-mono uppercase tracking-[0.18em] text-[11px] text-gold-shadow">
          {paper.collaborative ? "Collaborative" : "Solo"}
        </span>
      </div>
      <CardHeader className="p-0">
        <CardTitle className="text-h3">{paper.title}</CardTitle>
        <CardDescription className="font-serif italic text-gold-shadow text-caption">
          {paper.course} · {paper.year}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-0 font-serif text-body text-ink leading-relaxed line-clamp-4">
        {paper.abstract}
      </CardContent>
      {paper.collaborative && coAuthors.length > 0 ? (
        <p className="font-serif italic text-ink-muted text-caption">
          with {coAuthors.join(", ")}
        </p>
      ) : null}
      <CardFooter className="p-0 mt-auto">
        <Button variant="link" asChild>
          <Link href={`/publications/${paper.slug}`}>Read →</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function IndependentRow({ note }: { note: IndependentNote }) {
  const isExternal = /^https?:\/\//.test(note.url);
  const formattedDate = new Date(note.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  return (
    <div className="flex flex-wrap justify-between items-baseline gap-3 py-3 border-b border-gold-shadow/30 last:border-b-0">
      <Link
        href={note.url}
        {...(isExternal
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="font-display uppercase tracking-[0.04em] text-h3 text-ink hover:text-crimson-deep transition-colors"
      >
        {note.title}
      </Link>
      <span className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow">
        {formattedDate} · {note.length}
      </span>
    </div>
  );
}

export default async function PublicationsPage() {
  const { drawnFrom, academic, independent } = await loadPublications();
  const hasAnything =
    drawnFrom.length + academic.length + independent.length > 0;

  return (
    <main className="bg-bone min-h-screen">
      <header className="bg-bone py-16 px-6 text-center">
        <h1 className="text-display-2 font-display font-bold uppercase tracking-[0.06em] text-ink">
          Publications
        </h1>
        <p className="font-serif italic text-body-lg text-ink-soft mt-4 max-w-2xl mx-auto">
          Books, academic papers, and independent writing.
        </p>
      </header>

      <SectionDivider />

      {!hasAnything ? (
        <section className="max-w-2xl mx-auto px-6 pb-24 text-center">
          <p className="font-serif italic text-body-lg text-ink-soft">
            Publications are being curated. Check back shortly.
          </p>
        </section>
      ) : null}

      {drawnFrom.length > 0 ? (
        <>
          <section className="px-6">
            <SectionHeader eyebrow="Drawn From Publishing" heading="Books" />
            <div className="max-w-5xl mx-auto space-y-8">
              {drawnFrom.map((title) => (
                <DrawnFromCard key={title.slug} title={title} />
              ))}
            </div>
          </section>
          {academic.length + independent.length > 0 ? <SectionDivider /> : null}
        </>
      ) : null}

      {academic.length > 0 ? (
        <>
          <section className="px-6">
            <SectionHeader
              eyebrow="Academic"
              heading="Papers & Theses"
              intro="Solo and collaborative work from coursework and capstone projects. Group theses are noted with co-author credit."
            />
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
              {academic.map((paper) => (
                <AcademicPaperCard key={paper.slug} paper={paper} />
              ))}
            </div>
          </section>
          {independent.length > 0 ? <SectionDivider /> : null}
        </>
      ) : null}

      {independent.length > 0 ? (
        <section className="px-6 pb-24">
          <SectionHeader
            eyebrow="Independent"
            heading="Notes & Essays"
            intro="Shorter writing posted on the personal site."
          />
          <div className="max-w-3xl mx-auto space-y-4">
            {independent.map((note) => (
              <IndependentRow key={note.slug} note={note} />
            ))}
          </div>
        </section>
      ) : null}

      {hasAnything ? <div className="pb-24" /> : null}
    </main>
  );
}
