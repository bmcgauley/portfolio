import { loadProjects } from "@/lib/data";
import ProjectsView from "@/components/ProjectsView";

export const metadata = {
  title: "Projects",
  description:
    "Consulting work, academic projects, and volunteer engagements.",
};

export default async function ProjectsPage() {
  const projects = await loadProjects();

  return (
    <div className="min-h-screen bg-bone">
      <header className="bg-bone py-16 px-6 text-center">
        <h1 className="text-display-2 font-display font-bold uppercase tracking-[0.04em] text-ink">
          Projects
        </h1>
        <p className="mt-4 font-serif italic text-body-lg text-ink-soft max-w-2xl mx-auto">
          Consulting work, academic projects, and volunteer engagements.
        </p>
      </header>

      <ProjectsView projects={projects} />
    </div>
  );
}
