"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiExternalLink, FiGithub } from "react-icons/fi";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data";

// Get featured projects from the data file
const featuredProjects = projects
  .filter(project => project.featured)
  .slice(0, 3)
  .map(project => ({
    id: project.id,
    title: project.title,
    description: project.description,
    image: project.imageUrl || '/images/profile/torch_high+res.fw.webp',
    tags: project.tags,
    url: `/projects/${project.id}`,
    demoUrl: project.demoUrl,
    githubUrl: project.githubUrl
  }));

export default function FeaturedProjects() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-tl from-white via-royalBlue-50/30 to-amberGold-50/30 dark:from-gray-950 dark:via-royalBlue-900/30 dark:to-amberGold-900/30"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Recent work and initiatives I&apos;ve been involved with
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 bg-white/80 dark:bg-gray-950/80 backdrop-blur-sm border-secondary/20 hover:border-secondary/40">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-royalBlue-400 to-secondary opacity-30"></div>
                  {project.image ? (
                    <Image 
                      src={project.image} 
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-secondary/30 to-primary/30"></div>
                  )}
                </div>
                
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                
                <CardContent className="flex-grow">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="bg-secondary/5 hover:bg-secondary/10 text-secondary-foreground border-secondary/40 transition-colors">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                  <Button asChild variant="outline" size="sm" className="w-full border-secondary/40 hover:bg-secondary/5">
                    <Link href={project.url}>
                      View Details <FiArrowRight className="ml-2" />
                    </Link>
                  </Button>
                  
                  <div className="flex gap-2 w-full">
                    {project.demoUrl && (
                      <Button asChild variant="ghost" size="sm" className="flex-1 hover:bg-secondary/5">
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                          <FiExternalLink className="mr-1" /> Demo
                        </a>
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button asChild variant="ghost" size="sm" className="flex-1 hover:bg-secondary/5">
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                          <FiGithub className="mr-1" /> Code
                        </a>
                      </Button>
                    )}
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg" className="border-secondary/40 hover:bg-secondary/5">
            <Link href="/projects">
              View All Projects <FiArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
