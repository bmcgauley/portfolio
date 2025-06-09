"use client";

import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const achievements = [
  {
    title: 'Phi Kappa Phi & Beta Gamma Sigma Induction',
    date: 'May 2025',
    description: 'Inducted into two prestigious honor societies recognizing academic excellence.',
  },
  {
    title: 'Robotics Competition Initiative',
    date: 'Spring 2025',
    description: 'Helped distribute robotics competition starter sets to elementary schools in Fresno and Clovis through Fresno PAL and Success from Within.',
  },
  {
    title: 'Educational Technology Leadership',
    date: 'Spring 2025',
    description: 'Led initiatives to enhance digital learning tools and analytics platforms for student success.',
  }
];

export default function RecentAchievements() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Achievements</h2>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Latest milestones and recognitions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, index) => (            <motion.div key={index} 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="text-sm font-medium text-secondary mb-1">{achievement.date}</div>
                  <CardTitle>{achievement.title}</CardTitle>
                </CardHeader>
                  <CardContent className="flex-grow">
                  <p className="text-foreground/70">{achievement.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/about">
              Learn More <FiArrowRight className="ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
