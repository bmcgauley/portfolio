"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import { Button } from "@/components/ui/button";

export default function Hero() {  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
      {/* Subtle dot pattern background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-royalBlue-50/30 to-amberGold-50/30 dark:from-gray-950 dark:via-royalBlue-900/30 dark:to-amberGold-900/30"></div>
      
      <div className="max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 bg-white/50 dark:bg-gray-950/50 p-8 rounded-2xl border border-secondary/20 shadow-lg backdrop-blur-sm">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Hi, I&apos;m <span className="text-[#0a1929] dark:text-white">Brian <span className="text-secondary">McGauley</span></span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >              Web Developer, Music Producer, and Computer Information Systems professional with a passion for
              educational technology, data analytics, and electronic music production. Member of Phi Kappa Phi and Beta Gamma Sigma honor societies.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Button asChild size="lg" className="gap-2 bg-[#0a1929] hover:bg-[#122b47] text-white">
                <Link href="/projects">
                  View Projects <FiArrowRight />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-secondary text-[#0a1929] hover:bg-secondary/10 dark:text-white dark:hover:bg-secondary/20">
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
              <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-royalBlue-400 to-secondary opacity-20 blur-xl"></div>
              <div className="relative rounded-full overflow-hidden border-4 border-secondary/40 shadow-xl">
                <div className="border-4 border-white/80 dark:border-gray-800/80 rounded-full overflow-hidden shadow-xl">
                  <Image 
                    src="/images/profile/DSC07056-2.webp"
                    alt="Brian McGauley"
                    width={400}
                    height={400}
                    className="w-full h-auto"
                    priority
                  />
                </div>
              </div>
                <div className="absolute -bottom-6 -right-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 shadow-xl border border-secondary/40 hover:border-secondary/80 transition-colors duration-300">
                <Image 
                  src="/images/profile/torch_high+res.fw.webp"
                  alt="Torch Logo"
                  width={60}
                  height={60}
                  className="w-12 h-12"
                />
              </div>              {/* PKP Logo */}
              <div className="absolute -bottom-6 right-16 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 shadow-xl border border-secondary/40 hover:border-secondary/80 transition-colors duration-300">
                <Image 
                  src="/images/profile/logos/pkp-logo.png"
                  alt="Phi Kappa Phi Logo"
                  width={60}
                  height={60}
                  className="w-12 h-12"
                />
              </div>
              
              {/* BGS Logo */}
              <div className="absolute -bottom-6 right-[9.5rem] bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full p-2 shadow-xl border border-secondary/40 hover:border-secondary/80 transition-colors duration-300">
                <Image 
                  src="/images/profile/logos/bgs-logo.png"
                  alt="Beta Gamma Sigma Logo"
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
