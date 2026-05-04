/**
 * Publications data layer.
 *
 * Content is loaded at request time from JSON manifests in
 * `public/publications/{category}/index.json`. Drop a PDF into the
 * folder, add an entry to that folder's `index.json`, and the page
 * picks it up. No code changes required.
 *
 * Categories (mapped to brand doc Part VIII sections):
 *   public/publications/drawn-from/index.json     →  "Books" section
 *   public/publications/academic/index.json       →  "Papers & Theses" (solo)
 *   public/publications/group-projects/index.json →  "Papers & Theses" (collaborative)
 *   public/publications/external/index.json       →  "Papers & Theses" (industry/newsletter)
 *   public/publications/independent/index.json    →  "Notes & Essays"
 *
 * Manifest entry schemas — see the Type definitions below for each kind.
 * The loader stamps `kind`, `category`, `collaborative`, and `pdfPath`
 * automatically so manifests stay terse.
 */

import { promises as fs } from "fs";
import path from "path";

export type DrawnFromTitle = {
  kind: "drawn-from";
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  status: "available" | "pre-order" | "coming-soon";
  releaseDate: string;
  externalUrl?: string;
  tags?: string[];
};

export type AcademicPaper = {
  kind: "academic";
  slug: string;
  title: string;
  course: string;
  venue?: string;
  year: number;
  abstract: string;
  pdfPath: string;
  authors: string[];
  collaborative: boolean;
  category: "academic" | "group-projects" | "external";
  tags?: string[];
};

export type IndependentNote = {
  kind: "independent";
  slug: string;
  title: string;
  date: string;
  length: string;
  url: string;
  description?: string;
};

export type Publication = DrawnFromTitle | AcademicPaper | IndependentNote;

type DrawnFromManifestEntry = Omit<DrawnFromTitle, "kind">;
type AcademicManifestEntry = Omit<
  AcademicPaper,
  "kind" | "pdfPath" | "category" | "collaborative"
> & { pdfFile: string };
type IndependentManifestEntry = Omit<IndependentNote, "kind">;

const PUBLICATIONS_ROOT = path.join(process.cwd(), "public", "publications");

async function readManifest<T>(category: string): Promise<T[]> {
  try {
    const raw = await fs.readFile(
      path.join(PUBLICATIONS_ROOT, category, "index.json"),
      "utf-8",
    );
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

const stampAcademic =
  (cat: AcademicPaper["category"]) =>
  ({ pdfFile, ...rest }: AcademicManifestEntry): AcademicPaper => ({
    ...rest,
    kind: "academic",
    category: cat,
    collaborative: rest.authors.length > 1,
    pdfPath: `/publications/${cat}/${pdfFile}`,
  });

export type LoadedPublications = {
  drawnFrom: DrawnFromTitle[];
  academic: AcademicPaper[];
  independent: IndependentNote[];
};

async function loadFromManifests(): Promise<LoadedPublications> {
  const [drawnFromRaw, academicRaw, groupProjectsRaw, externalRaw, independentRaw] =
    await Promise.all([
      readManifest<DrawnFromManifestEntry>("drawn-from"),
      readManifest<AcademicManifestEntry>("academic"),
      readManifest<AcademicManifestEntry>("group-projects"),
      readManifest<AcademicManifestEntry>("external"),
      readManifest<IndependentManifestEntry>("independent"),
    ]);

  return {
    drawnFrom: drawnFromRaw.map((e) => ({ ...e, kind: "drawn-from" as const })),
    academic: [
      ...academicRaw.map(stampAcademic("academic")),
      ...groupProjectsRaw.map(stampAcademic("group-projects")),
      ...externalRaw.map(stampAcademic("external")),
    ],
    independent: independentRaw.map((e) => ({
      ...e,
      kind: "independent" as const,
    })),
  };
}

/**
 * DB-first loader. Queries MongoDB; falls back to public/publications/*.json
 * manifests if the DB is empty or unreachable. After the Phase F migration
 * seeds the DB, the manifest fallback path becomes dead code.
 */
export async function loadPublications(): Promise<LoadedPublications> {
  try {
    const { listPublications } = await import("@/lib/publications-db");
    const docs = await listPublications();
    if (docs.length > 0) {
      const drawnFrom: DrawnFromTitle[] = [];
      const academic: AcademicPaper[] = [];
      const independent: IndependentNote[] = [];
      for (const doc of docs) {
        if (doc.kind === "drawn-from") {
          drawnFrom.push({
            kind: "drawn-from",
            slug: doc.slug,
            title: doc.title,
            subtitle: doc.subtitle,
            description: doc.description,
            coverImage: doc.coverImage,
            status: doc.status,
            releaseDate: doc.releaseDate,
            externalUrl: doc.externalUrl,
            tags: doc.tags,
          });
        } else if (doc.kind === "academic") {
          academic.push({
            kind: "academic",
            slug: doc.slug,
            title: doc.title,
            course: doc.course,
            venue: doc.venue,
            year: doc.year,
            abstract: doc.abstract,
            pdfPath: doc.pdfPath,
            authors: doc.authors,
            collaborative: doc.authors.length > 1,
            category: doc.category,
            tags: doc.tags,
          });
        } else {
          independent.push({
            kind: "independent",
            slug: doc.slug,
            title: doc.title,
            date: doc.date,
            length: doc.length,
            url: doc.url,
            description: doc.description,
          });
        }
      }
      return { drawnFrom, academic, independent };
    }
  } catch {
    // DB unreachable — fall through to manifest fallback below
  }
  return loadFromManifests();
}

export async function getPublicationBySlug(
  slug: string,
): Promise<Publication | undefined> {
  const { drawnFrom, academic, independent } = await loadPublications();
  return [...drawnFrom, ...academic, ...independent].find(
    (p) => p.slug === slug,
  );
}
