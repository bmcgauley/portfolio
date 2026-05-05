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
import { loadPublications, type Publication } from "@/data/publications";

type CardData = {
  id: string;
  title: string;
  meta: string;
  description: string;
  url: string;
  external: boolean;
};

function toCardData(p: Publication): CardData {
  switch (p.kind) {
    case "book":
      return {
        id: p.slug,
        title: p.title,
        meta: p.publisher
          ? `${p.publisher} · ${p.releaseDate}`
          : p.releaseDate,
        description: p.subtitle,
        url: p.externalUrl ?? `/publications/${p.slug}`,
        external: Boolean(p.externalUrl),
      };
    case "academic":
      return {
        id: p.slug,
        title: p.title,
        meta: `${p.course} · ${p.year}`,
        description: p.abstract,
        url: `/publications/${p.slug}`,
        external: false,
      };
  }
}

export default async function FeaturedPublications() {
  const { books, academic } = await loadPublications();
  const all: Publication[] = [...books, ...academic];
  const flagged = all.filter((p) => p.featured);
  const pool = flagged.length > 0 ? flagged : all;

  // Cap at 4 to match the homepage grid (and the admin cap).
  const featured = pool.slice(0, 4);
  if (featured.length === 0) return null;

  const cards = featured.map(toCardData);

  return (
    <section className="bg-bone py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.18em] font-display text-crimson-deep uppercase mb-3">
            Recent Publications
          </div>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink">
            Selected Writing
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cards.map((c) => (
            <Card key={c.id} className="h-full">
              <CardHeader>
                <CardTitle>{c.title}</CardTitle>
                <CardDescription>{c.meta}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow font-serif italic text-body line-clamp-4">
                <Markdown content={c.description} variant="tight" />
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="px-0">
                  {c.external ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read More →
                    </a>
                  ) : (
                    <Link href={c.url}>Read More →</Link>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/publications">View All Publications</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
