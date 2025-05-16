"use client";

import Hero from "@/components/Hero";
import FeaturedProjects from "@/components/FeaturedProjects";
import RecentAchievements from "@/components/RecentAchievements";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FiArrowRight } from "react-icons/fi";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <FeaturedProjects />
      <RecentAchievements />

      {/* Photography Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900/50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Photography</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Capturing moments and exploring visual storytelling through photography.
            </p>
          </motion.div>
          
          <motion.div 
            className="relative h-80 rounded-xl overflow-hidden shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 z-10"></div>
            <Image
              src="/images/photography/landscapes/1.webp"
              alt="Photography Preview"
              className="absolute w-full h-full object-cover"
              width={1200}
              height={600}
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-20">
              <Button variant="secondary" size="lg" asChild>
                <Link href="/photography">
                  Explore Collections
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills & Experience */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Experience</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I combine technical expertise with creative problem-solving to build impactful digital solutions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white dark:bg-gray-800/50 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="mb-4 inline-flex p-3 bg-primary/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary h-6 w-6">
                  <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
                  <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Professional Experience</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Web development, data analytics, and educational technology experience, including work with the California Cybersecurity Task Force.
              </p>
              <Button variant="outline" asChild className="group">
                <Link href="/about#experience" className="flex items-center gap-2">
                  View Experience 
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              className="bg-white dark:bg-gray-800/50 p-8 rounded-xl shadow-md border border-gray-100 dark:border-gray-800"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="mb-4 inline-flex p-3 bg-secondary/10 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-secondary h-6 w-6">
                  <path d="m7 11 2-2-2-2"></path>
                  <path d="M11 13h4"></path>
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Skills & Technologies</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                From front-end frameworks to statistical analysis, explore my technical skillset and the technologies I work with.
              </p>
              <Button variant="outline" asChild className="group">
                <Link href="/about#skills" className="flex items-center gap-2">
                  View Skills
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
