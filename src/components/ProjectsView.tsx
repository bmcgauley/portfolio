"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "@/lib/types";
import ProjectCard from "@/components/ProjectCard";
import ProjectFilter from "@/components/ProjectFilter";

export default function ProjectsView({ projects }: { projects: Project[] }) {
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  return (
    <>
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
    </>
  );
}
