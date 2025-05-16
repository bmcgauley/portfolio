"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Project } from '@/lib/types';
import { cn } from '@/lib/utils';

interface ProjectFilterProps {
  projects: Project[];
  onFilter: (filteredProjects: Project[]) => void;
}

export default function ProjectFilter({ projects, onFilter }: ProjectFilterProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<string[]>([]);
  
  // Extract unique categories from projects
  useEffect(() => {
    const categoriesSet = new Set<string>();
    
    // Add 'all' category
    categoriesSet.add('all');
    
    // Extract unique categories from projects
    projects.forEach(project => {
      if (project.category) {
        categoriesSet.add(project.category);
      }
      
      // Also add technologies as categories if available
      if (project.technologies) {
        project.technologies.forEach(tech => categoriesSet.add(tech));
      }
    });
    
    setCategories(Array.from(categoriesSet));
  }, [projects]);
  
  // Filter projects when category changes
  useEffect(() => {
    if (selectedCategory === 'all') {
      onFilter(projects);
    } else {
      const filtered = projects.filter(project => 
        project.category === selectedCategory || 
        (project.technologies && project.technologies.includes(selectedCategory))
      );
      onFilter(filtered);
    }
  }, [selectedCategory, projects, onFilter]);

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Filter Projects</h2>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category)}
            className={cn(
              "capitalize transition-all",
              selectedCategory === category 
                ? "bg-primary text-white" 
                : "hover:border-primary/50"
            )}
          >
            {category === 'all' ? 'All Projects' : category}
          </Button>
        ))}
      </div>
    </div>
  );
}
