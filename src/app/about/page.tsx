import Image from "next/image";
import Link from "next/link";
import { 
  experiences, 
  education, 
  businesses,
  nonprofits,
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
                I'm Brian McGauley, a passionate full-stack web developer with expertise in creating modern, responsive websites and applications. I have a strong foundation in front-end technologies like React and TypeScript, as well as back-end experience with Node.js and various databases.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                My approach to development combines technical precision with creative problem-solving. I believe in building applications that are not only functionally robust but also provide an excellent user experience through clean design and intuitive interfaces.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                When I'm not coding, I enjoy exploring new technologies, contributing to open-source projects, and continuously expanding my knowledge through online courses and technical documentation.
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
        
        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-6 last:mb-0">
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold">{edu.degree} in {edu.field}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {edu.startDate} – {edu.endDate || 'Present'}
                </p>
              </div>
              <p className="text-lg text-gray-800 dark:text-gray-200">{edu.institution}</p>
            </div>
          ))}
        </section>
        
        {/* Business Ventures */}
        <section id="businesses" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Business Ventures</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {businesses.map((business) => (
              <div key={business.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={business.imageUrl}
                    alt={business.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{business.name}</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{business.description}</p>
                  {business.websiteUrl && (
                    <Link
                      href={business.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      Visit Website
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Nonprofit Work */}
        <section id="nonprofits">
          <h2 className="text-2xl font-bold mb-6">Nonprofit Work</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {nonprofits.map((nonprofit) => (
              <div key={nonprofit.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={nonprofit.imageUrl}
                    alt={nonprofit.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-xl font-bold">{nonprofit.name}</h3>
                    {nonprofit.role && (
                      <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-xs">
                        {nonprofit.role}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{nonprofit.description}</p>
                  {nonprofit.websiteUrl && (
                    <Link
                      href={nonprofit.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                    >
                      Visit Website
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
} 