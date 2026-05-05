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
import { Markdown } from "@/components/ui/markdown";

type FeaturedItem = {
  id: string;
  title: string;
  meta: string;
  description: string;
  url: string;
  imageUrl?: string;
};

// Hardcoded fallback. Used only if DB is empty or unreachable.
// Becomes dead code after Phase F migration.
const fallbackFeatured: FeaturedItem[] = [
  {
    id: "aj-for-city-council",
    title: "AJ for City Council",
    meta: "2025",
    description: "Campaign website with policy positions and donation flow.",
    url: "/projects/aj-for-city-council",
  },
  {
    id: "kerman-chamber",
    title: "Kerman Chamber of Commerce",
    meta: "2025",
    description: "Member directory and event calendar.",
    url: "/projects/kerman-chamber",
  },
  {
    id: "fsh-dash",
    title: "FSH Dash",
    meta: "2024",
    description: "Internal analytics dashboard for fashion retail operations.",
    url: "/projects/fsh-dash",
  },
];

async function loadFeatured(): Promise<FeaturedItem[]> {
  try {
    const { listProjects } = await import("@/lib/projects-db");
    const docs = await listProjects();
    const featured = docs.filter((d) => d.featured);
    const pool = featured.length > 0 ? featured : docs;
    if (pool.length > 0) {
      return pool.slice(0, 3).map((p) => ({
        id: p.slug,
        title: p.title,
        meta: p.category ?? "",
        description: p.description,
        url: `/projects/${p.slug}`,
        imageUrl: p.imageUrl,
      }));
    }
  } catch {
    // DB unreachable — fall through
  }
  return fallbackFeatured;
}

export default async function FeaturedProjects() {
  const items = await loadFeatured();

  if (items.length === 0) return null;

  return (
    <section className="bg-bone py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.18em] font-display text-crimson-deep uppercase mb-3">
            Featured Work
          </div>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink">
            Selected Projects
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project) => (
            <Card key={project.id} className="h-full overflow-hidden p-0 gap-0">
              {project.imageUrl ? (
                <Link
                  href={project.url}
                  className="relative block aspect-[16/10] w-full border-b border-gold-shadow/40"
                >
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
              ) : null}
              <div className="flex flex-1 flex-col p-7 md:p-8 gap-5">
                <CardHeader className="p-0 gap-2">
                  <CardTitle>{project.title}</CardTitle>
                  {project.meta ? (
                    <CardDescription>{project.meta}</CardDescription>
                  ) : null}
                </CardHeader>
                <CardContent className="p-0 flex-grow text-body">
                  <Markdown content={project.description} variant="tight" />
                </CardContent>
                <CardFooter className="p-0">
                  <Button variant="link" asChild className="px-0">
                    <Link href={project.url}>View Project →</Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/projects">View All Projects</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
