import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";

type Achievement = {
  title: string;
  date: string;
  description: string;
  citation?: string;
  citationUrl?: string;
};

// Hardcoded fallback. Used only if DB is empty or unreachable.
// Becomes dead code after Phase F migration.
const fallbackAchievements: Achievement[] = [
  {
    title: "Re-Entry Student Award",
    date: "May 2026",
    description:
      "Recognized by CSU Fresno for academic achievement among returning students.",
    citation: "Newspaper article reference to come.",
  },
  {
    title: "Lewis & Virginia Eaton Business Scholarship",
    date: "Fall 2025",
    description:
      "Awarded $2,000 for the 2025–2026 academic year by the Craig School of Business at CSU Fresno.",
  },
  {
    title: "Phi Kappa Phi & Beta Gamma Sigma Induction",
    date: "May 2025",
    description:
      "Inducted into two honor societies recognizing academic standing in the top tier of the program.",
  },
  {
    title: "Robotics Competition Initiative",
    date: "Spring 2025",
    description:
      "Helped distribute robotics competition starter sets to elementary schools in Fresno and Clovis through Fresno PAL and Success from Within.",
  },
];

async function loadAchievements(): Promise<Achievement[]> {
  try {
    const { listAchievements } = await import("@/lib/achievements-db");
    const docs = await listAchievements();
    if (docs.length > 0) {
      const featured = docs.filter((d) => d.featured);
      const pool = featured.length > 0 ? featured : docs;
      return pool.slice(0, 4).map((d) => ({
        title: d.title,
        date: d.date,
        description: d.description,
        citation: d.citation,
        citationUrl: d.citationUrl,
      }));
    }
  } catch {
    // DB unreachable — fall through
  }
  return fallbackAchievements;
}

export default async function RecentAchievements() {
  const achievements = await loadAchievements();

  if (achievements.length === 0) return null;

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {achievements.map((a) => (
            <Card key={a.title} className="h-full">
              <CardHeader>
                <CardTitle>{a.title}</CardTitle>
                <CardDescription>{a.date}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow text-body">
                <Markdown content={a.description} variant="tight" />
                {a.citation ? (
                  <p className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow mt-3">
                    {a.citationUrl ? (
                      <a
                        href={a.citationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-crimson-deep underline-offset-4 hover:underline"
                      >
                        {a.citation}
                      </a>
                    ) : (
                      a.citation
                    )}
                  </p>
                ) : null}
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
