import { projects } from "@/lib/data";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Projects</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my web development projects showcasing various technologies and solutions.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
} 