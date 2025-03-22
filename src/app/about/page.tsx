import Image from "next/image";
import Link from "next/link";
import { 
  experiences, 
  skills
} from "@/lib/data";

export default function AboutPage() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        
        {/* Bio Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/3">
              <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
                <Image
                  src="/images/profile-placeholder.jpg"
                  alt="Brian McGauley"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4">Bio</h2>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                I'm Brian McGauley, a Full Stack Developer with extensive experience in web development. I specialize in creating modern, responsive websites and applications, implementing custom solutions, and ensuring cross-browser compatibility.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Currently, I work as a Web Developer at Fresno State Housing while also maintaining my freelance web development practice. My work involves developing and maintaining websites, creating digital signage solutions, and building custom WordPress plugins to enhance operations.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                I have a strong foundation in both frontend and backend technologies, with expertise in React, Next.js, Node.js, PHP, and various database systems. I'm passionate about delivering high-quality web solutions that meet client needs and exceed expectations.
              </p>
            </div>
          </div>
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Professional Experience */}
        <section id="experience" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
          {experiences.map((experience) => (
            <div key={experience.id} className="mb-8 last:mb-0">
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold">{experience.position}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {experience.startDate} – {experience.endDate || 'Present'}
                </p>
              </div>
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-2">{experience.company}</p>
              <p className="text-gray-700 dark:text-gray-300 mb-3">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
} 