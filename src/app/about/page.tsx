import Image from "next/image";
import { 
  experiences, 
  education,
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
                I&apos;m Brian McGauley, a Web Developer currently pursuing a Bachelor&apos;s Degree in Business Administration with a focus on Computer Information Systems at California State University, Fresno. With a strong academic background and practical experience, I specialize in developing innovative web solutions and business process improvements.
              </p>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Currently working as a Web Developer at Fresno State Student Housing, I&apos;ve successfully led various initiatives including analytics automation, SEO optimization, and digital signage solutions. I also serve as a Teaching Assistant, helping students master technical concepts and providing mentorship.
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                My diverse skill set spans across frontend and backend development, database management, analytics, and business analysis. I&apos;m passionate about leveraging technology to optimize processes and deliver impactful solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-8 last:mb-0 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold">{edu.institution}</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {edu.startDate} – {edu.endDate}
                </p>
              </div>
              <p className="text-lg text-gray-800 dark:text-gray-200 mb-2">
                {edu.degree} - {edu.field}
              </p>
              <p className="text-blue-600 dark:text-blue-400">
                GPA: {edu.gpa}
              </p>
            </div>
          ))}
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
            <div key={experience.id} className="mb-8 last:mb-0 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
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