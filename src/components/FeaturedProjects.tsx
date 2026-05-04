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

const featuredProjects = [
  {
    id: "aj-for-city-council",
    title: "AJ for City Council",
    meta: "2025",
    description:
      "Campaign website with policy positions and donation flow.",
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
    description:
      "Internal analytics dashboard for fashion retail operations.",
    url: "/projects/fsh-dash",
  },
];

export default function FeaturedProjects() {
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
          {featuredProjects.map((project) => (
            <Card key={project.id} className="h-full">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.meta}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow text-body">
                {project.description}
              </CardContent>
              <CardFooter>
                <Button variant="link" asChild className="px-0">
                  <Link href={project.url}>View Project →</Link>
                </Button>
              </CardFooter>
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
