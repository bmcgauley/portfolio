/**
 * Publications data layer (public read-side).
 *
 * Reads from MongoDB. Two kinds: `book` (any book Brian writes,
 * regardless of imprint) and `academic` (papers, theses, capstone, etc.).
 * Sort: by `order` asc, then by date/year desc as tiebreaker.
 */

export type BookStatus =
  | "in-progress"
  | "coming-soon"
  | "pre-order"
  | "available";

export type Book = {
  kind: "book";
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  status: BookStatus;
  releaseDate: string;
  publisher?: string;
  externalUrl?: string;
  pdfUrl?: string;
  allowDownload?: boolean;
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
  allowDownload?: boolean;
  tags?: string[];
};

export type Publication = Book | AcademicPaper;

export type LoadedPublications = {
  books: Book[];
  academic: AcademicPaper[];
};

const EMPTY: LoadedPublications = { books: [], academic: [] };

export async function loadPublications(): Promise<LoadedPublications> {
  try {
    const { listPublications } = await import("@/lib/publications-db");
    const docs = await listPublications();
    if (docs.length === 0) return EMPTY;

    const books: Book[] = [];
    const academic: AcademicPaper[] = [];
    for (const doc of docs) {
      if (doc.kind === "book") {
        books.push({
          kind: "book",
          slug: doc.slug,
          title: doc.title,
          subtitle: doc.subtitle,
          description: doc.description,
          coverImage: doc.coverImage,
          status: doc.status,
          releaseDate: doc.releaseDate,
          publisher: doc.publisher,
          externalUrl: doc.externalUrl,
          pdfUrl: doc.pdfUrl,
          allowDownload: doc.allowDownload,
          tags: doc.tags,
        });
      } else {
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
          allowDownload: doc.allowDownload,
          tags: doc.tags,
        });
      }
    }
    return { books, academic };
  } catch {
    return EMPTY;
  }
}

export async function getPublicationBySlug(
  slug: string,
): Promise<Publication | undefined> {
  const { books, academic } = await loadPublications();
  return [...books, ...academic].find((p) => p.slug === slug);
}
