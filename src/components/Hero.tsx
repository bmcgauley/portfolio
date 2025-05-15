"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { themeColors } from "@/lib/theme";

export default function Hero() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I&apos;m <span className="text-primary dark:text-primary">Brian McGauley</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Web Developer and Computer Information Systems professional with a passion for 
              educational technology and data analytics. Currently serving on the California 
              Cybersecurity Task Force and member of Phi Kappa Phi and Beta Gamma Sigma honor societies.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button asChild size="lg" className="gap-2">
                <Link href="/projects">
                  View Projects <FiArrowRight />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">
                  Get in Touch
                </Link>
              </Button>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:w-2/5"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-primary to-secondary opacity-20 blur-xl"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                <Image 
                  src="/images/profile/DSC07056-2.webp"
                  alt="Brian McGauley"
                  width={400}
                  height={400}
                  className="w-full h-auto"
                  priority
                />
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg border-2 border-secondary">
                <Image 
                  src="/images/profile/torch_high+res.fw.webp"
                  alt="Torch Logo"
                  width={60}
                  height={60}
                  className="w-12 h-12"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
