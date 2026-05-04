import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionDivider } from "@/components/ui/section-divider";
import RefreshAllPreviewsButton from "@/components/RefreshAllPreviewsButton";
import { listProjects } from "@/lib/projects-db";
import { deleteProjectAction } from "./actions";

export default async function AdminProjectsPage() {
  const projects = await listProjects();

  return (
    <div>
      <header className="mb-12 flex items-start justify-between gap-6">
        <div>
          <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
            Office · Projects
          </p>
          <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
            Projects
          </h1>
          <p className="font-serif italic text-body text-ink-soft mt-3">
            Manage consulting work, academic projects, and case studies.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Button asChild>
            <Link href="/admin/projects/new">+ New Project</Link>
          </Button>
        </div>
      </header>

      {projects.length === 0 ? (
        <p className="font-serif italic text-body text-gold-shadow">
          No projects yet.
        </p>
      ) : (
        <ul className="space-y-4">
          {projects.map((project) => {
            const id = project._id.toString();
            return (
              <li
                key={id}
                className="bg-vellum border-t-4 border-gold rounded-[2px] p-6"
              >
                <div className="flex items-start justify-between gap-6 flex-wrap">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink">
                      {project.title}
                    </h2>
                    {project.category ? (
                      <span className="font-mono uppercase tracking-[0.22em] text-[11px] text-gold-shadow">
                        {project.category}
                      </span>
                    ) : null}
                    {project.featured ? (
                      <span className="bg-gold text-ink font-mono uppercase tracking-[0.18em] text-[11px] px-2 py-1 rounded-[2px]">
                        FEATURED
                      </span>
                    ) : null}
                  </div>
                </div>

                <p className="font-serif text-body text-ink mt-3 line-clamp-2">
                  {project.description}
                </p>

                {project.tags.length > 0 ? (
                  <p className="mt-3 font-mono uppercase tracking-[0.18em] text-[11px] text-gold-shadow">
                    {project.tags.map((tag, i) => (
                      <span key={tag}>
                        {i > 0 ? (
                          <span className="mx-2 text-gold-shadow">◆</span>
                        ) : null}
                        {tag}
                      </span>
                    ))}
                  </p>
                ) : null}

                <div className="mt-4 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-4 flex-wrap">
                    {project.demoUrl ? (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-serif italic text-body text-crimson-deep hover:underline underline-offset-4"
                      >
                        Demo
                      </a>
                    ) : null}
                    {project.githubUrl ? (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-serif italic text-body text-crimson-deep hover:underline underline-offset-4"
                      >
                        GitHub
                      </a>
                    ) : null}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/projects/${id}/edit`}>Edit</Link>
                    </Button>
                    <form action={deleteProjectAction}>
                      <input type="hidden" name="id" value={id} />
                      <Button type="submit" variant="destructive" size="sm">
                        Delete
                      </Button>
                    </form>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <SectionDivider />

      <section>
        <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3">
          Tools
        </p>
        <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h2 text-ink">
          Site Preview Refresh
        </h2>
        <p className="font-serif italic text-body text-ink-soft mt-3 mb-6">
          Captures fresh screenshots of project demo sites and writes them back
          to the preview store.
        </p>
        <RefreshAllPreviewsButton />
      </section>
    </div>
  );
}
