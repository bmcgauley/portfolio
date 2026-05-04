"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import { Project } from "@/lib/types";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";

export default function ProjectsPage() {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

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

      <ProjectFilter projects={projects} onFilter={setFilteredProjects} />

      <AnimatePresence mode="wait">
        <motion.div
          key={filteredProjects.length}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6 py-12 max-w-7xl mx-auto"
        >
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-12 text-center">
              <p className="font-serif italic text-body text-ink-muted">
                No projects match the selected filter.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
