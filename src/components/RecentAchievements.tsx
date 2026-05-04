import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const achievements = [
  {
    title: "Phi Kappa Phi & Beta Gamma Sigma Induction",
    date: "May 2025",
    description:
      "Inducted into two prestigious honor societies recognizing academic excellence.",
  },
  {
    title: "Robotics Competition Initiative",
    date: "Spring 2025",
    description:
      "Helped distribute robotics competition starter sets to elementary schools in Fresno and Clovis through Fresno PAL and Success from Within.",
  },
  {
    title: "Educational Technology Leadership",
    date: "Spring 2025",
    description:
      "Led initiatives to enhance digital learning tools and analytics platforms for student success.",
  },
];

export default function RecentAchievements() {
  return (
    <section className="bg-bone py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-xs tracking-[0.18em] font-display text-crimson-deep uppercase mb-3">
            Milestones
          </div>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink">
            Recent Achievements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((a) => (
            <Card key={a.title} className="h-full">
              <CardHeader>
                <CardTitle>{a.title}</CardTitle>
                <CardDescription>{a.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow text-body">
                {a.description}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="secondary" size="lg" asChild>
            <Link href="/about">Learn More</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
