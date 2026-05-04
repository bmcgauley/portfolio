// PDF files referenced via `pdfPath` are placeholders. The /publications/[slug]
// viewer will 404 on those iframe sources until real PDFs are dropped into
// /public/publications/{academic,group-projects,external}/.

export type DrawnFromTitle = {
  slug: string;
  kind: "drawn-from";
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
  slug: string;
  kind: "academic";
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
  slug: string;
  kind: "independent";
  title: string;
  date: string;
  length: string;
  url: string;
  description?: string;
};

export type Publication = DrawnFromTitle | AcademicPaper | IndependentNote;

export const publications: Publication[] = [
  {
    slug: "github-fundamentals-for-teams",
    kind: "drawn-from",
    title: "GitHub Fundamentals for Teams",
    subtitle: "A practical guide to collaborative version control",
    description:
      "Designed for technical leads onboarding teams to git and GitHub. Covers branching strategies, code review practices, and CI integration.",
    coverImage:
      "/images/publications/Front-cover_github_fundamentals_for_teams.png",
    status: "coming-soon",
    releaseDate: "Q4 2026",
    externalUrl: "https://drawnfrom.com",
    tags: ["technical", "version control"],
  },
  // COPY: placeholder, refine
  {
    slug: "capstone-strategic-it-modernization",
    kind: "academic",
    title: "Strategic IT Modernization at Mid-Market Manufacturers",
    course: "BA 499W — Senior Capstone",
    year: 2025,
    abstract:
      "Examines the cost and risk profile of IT modernization in mid-market manufacturing. Field interviews with three Central Valley manufacturers; framework for sequencing modernization work under operational constraints.",
    pdfPath: "/publications/academic/capstone-it-modernization.pdf",
    authors: ["Brian McGauley"],
    collaborative: false,
    category: "academic",
    tags: ["capstone", "strategy"],
  },
  // COPY: placeholder, refine
  {
    slug: "group-thesis-organizational-behavior",
    kind: "academic",
    title: "Organizational Behavior in Hybrid Work Settings",
    course: "MGT 365 — Organizational Behavior",
    year: 2025,
    abstract:
      "Group thesis examining team cohesion and managerial visibility in hybrid-work environments. Survey instrument administered across four organizations.",
    pdfPath: "/publications/group-projects/ob-hybrid-work.pdf",
    authors: ["Brian McGauley", "Co-Author A", "Co-Author B"],
    collaborative: true,
    category: "group-projects",
    tags: ["group thesis", "organizational behavior"],
  },
  // COPY: placeholder, refine
  {
    slug: "external-pmi-newsletter-piece",
    kind: "academic",
    title: "Notes from the PMI-CCVC Spring Meeting",
    course: "PMI-CCVC Newsletter",
    year: 2025,
    abstract:
      "Summary article written for the Project Management Institute Central California Valley Chapter newsletter, covering takeaways from the spring quarterly meeting.",
    pdfPath: "/publications/external/pmi-spring-2025.pdf",
    authors: ["Brian McGauley"],
    collaborative: false,
    category: "external",
    tags: ["industry", "PMI"],
  },
  {
    slug: "on-credentialing",
    kind: "independent",
    title: "On Credentialing",
    date: "2026-04-20",
    length: "1,400 words",
    url: "/writing/on-credentialing",
    description: "What a credential earns and what it doesn't.",
  },
  {
    slug: "notes-on-mba",
    kind: "independent",
    title: "Notes on the MBA",
    date: "2026-02-14",
    length: "900 words",
    url: "/writing/notes-on-mba",
  },
];

export function getPublicationBySlug(slug: string): Publication | undefined {
  return publications.find((p) => p.slug === slug);
}
