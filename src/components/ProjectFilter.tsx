"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Project } from "@/lib/types";

export type BrandCategory = "All" | "Consulting" | "Academic" | "Volunteer" | "Personal";

const BRAND_CATEGORIES: BrandCategory[] = [
  "All",
  "Consulting",
  "Academic",
  "Volunteer",
  "Personal",
];

// Map raw project data to brand categories.
function categorize(project: Project): Exclude<BrandCategory, "All"> {
  const raw = (project.category ?? "").toLowerCase();
  if (raw.includes("professional") || raw.includes("consult")) return "Consulting";
  if (raw.includes("school") || raw.includes("academ")) return "Academic";
  if (raw.includes("community") || raw.includes("volunteer")) return "Volunteer";

  const haystack = [
    project.title,
    project.description,
    ...(project.tags ?? []),
  ]
    .join(" ")
    .toLowerCase();

  if (
    haystack.includes("campaign") ||
    haystack.includes("city council") ||
    haystack.includes("nonprofit") ||
    haystack.includes("chamber")
  ) {
    return "Volunteer";
  }
  if (
    haystack.includes("fresno state") ||
    haystack.includes("collegian") ||
    haystack.includes("teaching") ||
    haystack.includes("housing")
  ) {
    return "Academic";
  }
  if (
    haystack.includes("client") ||
    haystack.includes("wordpress") ||
    haystack.includes("dashboard") ||
    haystack.includes("seo")
  ) {
    return "Consulting";
  }
  return "Personal";
}

interface ProjectFilterProps {
  projects: Project[];
  onFilter: (filteredProjects: Project[]) => void;
}

export default function ProjectFilter({ projects, onFilter }: ProjectFilterProps) {
  const [selected, setSelected] = useState<BrandCategory>("All");

  const tagged = useMemo(
    () => projects.map((p) => ({ project: p, brandCategory: categorize(p) })),
    [projects]
  );

  useEffect(() => {
    const filtered =
      selected === "All"
        ? projects
        : tagged.filter((t) => t.brandCategory === selected).map((t) => t.project);
    onFilter(filtered);
  }, [selected, projects, tagged, onFilter]);

  return (
    <div className="border-b border-gold/60">
      <div className="flex flex-wrap gap-3 justify-center py-6">
        {BRAND_CATEGORIES.map((category) => {
          const isActive = selected === category;
          return (
            <Button
              key={category}
              variant={isActive ? "default" : "outline"}
              size="sm"
              onClick={() => setSelected(category)}
            >
              {category}
            </Button>
          );
        })}
      </div>
    </div>
  );
}

export { categorize };
