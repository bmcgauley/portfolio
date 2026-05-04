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

const publications = [
  {
    id: "github-fundamentals",
    title: "GitHub Fundamentals for Teams",
    meta: "Drawn From Publishing · 2025",
    description:
      "A practical guide to collaborative version control.",
    url: "/publications/github-fundamentals",
  },
  {
    id: "csu-capstone",
    title: "CSU Fresno B.S. Capstone",
    meta: "CSU Fresno · B.S. Capstone · 2025",
    description:
      "Placeholder description; revise in copy punch list.",
    url: "/publications/csu-capstone",
  },
];

export default function FeaturedPublications() {
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
          {publications.map((pub) => (
            <Card key={pub.id} className="h-full">
              <CardHeader>
                <CardTitle>{pub.title}</CardTitle>
                <CardDescription>{pub.meta}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow font-serif italic text-body">
                {pub.description}
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="px-0">
                  <Link href={pub.url}>Read More →</Link>
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
