"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/lib/data";
// Import all images from assets
import profileImage from "@/assets/images/profile/DSC07056-2.jpg";
// Use torch image for photography preview
import photographyPreview from "@/assets/images/profile/torch_high+res.fw.png";

export default function Home() {
  // Get only featured projects for homepage
  const featuredProjects = projects.filter(project => project.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-100 dark:from-black dark:to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
              <motion.h1 
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                Hi, I&apos;m <span className="text-blue-600 dark:text-blue-400">Brian McGauley</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                I&apos;m a full-stack web developer specializing in creating modern, responsive websites 
                and applications. I combine technical expertise with creative design to build digital 
                experiences that make an impact.
              </motion.p>
              <motion.div 
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Link 
                  href="/projects"
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium flex items-center gap-2 transition-colors"
                >
                  View Projects <FiArrowRight />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 rounded-md font-medium transition-colors"
                >
                  Contact Me
                </Link>
              </motion.div>
            </div>
            <motion.div 
              className="md:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-full h-[500px] relative rounded-2xl overflow-hidden shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={profileImage.src}
                  alt="Brian McGauley"
                  className="w-full h-full object-cover object-center"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Some of my most recent and notable web development projects.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link 
              href="/projects"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
            >
              View all projects <FiArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Photography Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Photography</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Capturing moments and exploring visual storytelling through photography.
            </p>
          </div>
          
          <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photographyPreview.src}
              alt="Photography Preview"
              className="absolute w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <Link 
                href="/photography"
                className="px-6 py-3 bg-white text-black font-medium rounded-md hover:bg-gray-100 transition-colors"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Business & Nonprofit Teaser */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold mb-4">My Work</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I&apos;m passionate about creating digital solutions that solve real problems and make a positive impact.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Professional Experience</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Learn about my professional experience and technical skills in web development.
              </p>
              <Link 
                href="/about#experience"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                View Experience <FiArrowRight size={16} />
              </Link>
            </div>
            
            <div className="md:w-1/2 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-bold mb-4">Skills & Technologies</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Explore my technical skills and the technologies I work with to build great digital products.
              </p>
              <Link 
                href="/about#skills"
                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium hover:underline"
              >
                View Skills <FiArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
