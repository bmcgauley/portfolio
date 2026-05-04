import Link from "next/link";
import { auth } from "@/auth";
import { getDb } from "@/lib/mongodb";
import { Ornament } from "@/components/ui/ornament";

async function getCounts() {
  try {
    const db = await getDb();
    const [publications, essays, achievements, projects] = await Promise.all([
      db.collection("publications").countDocuments(),
      db.collection("essays").countDocuments(),
      db.collection("achievements").countDocuments(),
      db.collection("projects").countDocuments(),
    ]);
    return { publications, essays, achievements, projects };
  } catch {
    return { publications: 0, essays: 0, achievements: 0, projects: 0 };
  }
}

const STATS: {
  label: string;
  key: "publications" | "essays" | "achievements" | "projects";
  href: string;
}[] = [
  { label: "Publications", key: "publications", href: "/admin/publications" },
  { label: "Essays", key: "essays", href: "/admin/writing" },
  { label: "Achievements", key: "achievements", href: "/admin/achievements" },
  { label: "Projects", key: "projects", href: "/admin/projects" },
];

export default async function AdminDashboardPage() {
  const session = await auth();
  const counts = await getCounts();
  const greetingName = (session?.user?.name ?? "").split(" ")[0] || "Brian";

  return (
    <div>
      <header className="mb-12">
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Office · Overview
        </p>
        <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
          Dashboard
        </h1>
        <p className="font-serif italic text-body text-ink-soft mt-3">
          A snapshot of the site — content counts and quick actions.
        </p>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {STATS.map((stat) => (
          <Link
            key={stat.key}
            href={stat.href}
            className="block bg-vellum border-t-4 border-gold rounded-[2px] p-6 hover:shadow-[0_4px_16px_rgba(122,79,20,0.12)] transition-shadow"
          >
            <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-crimson-deep mb-3">
              {stat.label}
            </p>
            <p className="font-display font-bold text-h1 text-ink">
              {counts[stat.key]}
            </p>
          </Link>
        ))}
      </section>

      <section className="bg-vellum border-l-8 border-parchment rounded-[2px] p-8">
        <div className="flex items-center gap-2 mb-3">
          <Ornament />
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow">
            Welcome, {greetingName}
          </p>
        </div>
        <p className="font-serif text-body text-ink leading-relaxed">
          The CMS is wired. Pick a section from the sidebar to manage content.
          Publications and Writing are next on the build list — Achievements
          and Projects after that.
        </p>
      </section>
    </div>
  );
}
