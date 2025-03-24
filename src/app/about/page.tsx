import Image from "next/image";
import Link from "next/link";
import { 
  experiences, 
  education,
  skills
} from "@/lib/data";

// Use public image paths instead of imports
const PROFILE_IMAGE_PATH = "/images/profile/DSC07056-2.jpg";
const TORCH_IMAGE_PATH = "/images/profile/torch_high+res.fw.png";
const CCC_LOGO_PATH = "/images/profile/ccc-primary-full-color.png";

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
                  src={PROFILE_IMAGE_PATH}
                  alt="Brian McGauley"
                  fill
                  className="object-cover"
                  priority
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
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                {/* Logo for each institution */}
                <div className="relative w-32 h-16">
                  {edu.institution === 'Clovis Community College' ? (
                    <Image
                      src={CCC_LOGO_PATH}
                      alt="Clovis Community College Logo"
                      fill
                      className="object-contain"
                    />
                  ) : null}
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <h3 className="text-xl font-semibold">{edu.institution}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {edu.startDate} – {edu.endDate}
                    </p>
                  </div>
                  <p className="text-lg text-gray-800 dark:text-gray-200 mb-2">
                    {edu.degree} - {edu.field}
                  </p>
                  <p className="text-blue-600 dark:text-blue-400 mb-2">
                    GPA: {edu.gpa}
                  </p>
                  {/* Show AGS membership for Clovis Community College */}
                  {edu.institution === 'Clovis Community College' && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="relative w-8 h-8">
                        <Image
                          src={TORCH_IMAGE_PATH}
                          alt="Alpha Gamma Sigma Honor Society"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        Alpha Gamma Sigma (ΑΓΣ) Honor Society Member
                      </span>
                    </div>
                  )}
                </div>
              </div>
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

        {/* Community Involvement */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Community Involvement</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Central Valley Justice Coalition */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Central Valley Justice Coalition</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">August 2024</p>
              <ul className="text-gray-700 dark:text-gray-300 list-disc list-inside space-y-2">
                <li>Developed digital signage for volunteer opportunity awareness</li>
                <li>Created printable flyers & tri-fold brochures for volunteer opportunities & human trafficking awareness</li>
              </ul>
            </div>

            {/* Alpha Gamma Sigma */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-8 h-8">
                  <Image
                    src={TORCH_IMAGE_PATH}
                    alt="Alpha Gamma Sigma Honor Society"
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold">Alpha Gamma Sigma (ΑΓΣ)</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-2">March 2023</p>
              <p className="text-gray-700 dark:text-gray-300">
                Permanent membership established in 2023 prior to graduation from Clovis Community College
              </p>
            </div>

            {/* Beautify Fresno */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-3">Beautify Fresno</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-2">2023</p>
              <p className="text-gray-700 dark:text-gray-300">
                Collaborated with Community Based Organization (CBO) on multiple occasions to assist in city-wide cleanup efforts
              </p>
            </div>
          </div>
        </section>

        {/* Certifications & Training */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Certifications & Training</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Packet Tracer */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Introduction to Packet Tracer</h3>
                <span className="text-gray-600 dark:text-gray-400">September 2021</span>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                Completed comprehensive training in network simulation and visualization using Cisco&apos;s Packet Tracer, enhancing understanding of network protocols and configurations.
              </p>
            </div>

            {/* Personal Projects */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Notable Projects</h3>
              <ul className="text-gray-700 dark:text-gray-300 space-y-3">
                <li>
                  <span className="font-medium">Imaginarii Home Business (2023)</span>
                  <p className="text-sm mt-1">Development and implementation of business solutions and web applications.</p>
                </li>
                <li>
                  <span className="font-medium">Ocean Voyage Collaboration (2018)</span>
                  <p className="text-sm mt-1">Collaborated with Professor at Miami Dade on interactive educational content.</p>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-16 px-4 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Let&apos;s Connect</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in discussing new projects, opportunities, or ways to collaborate. 
            Whether you&apos;re looking for a web developer, need technical consultation, or want to discuss potential collaborations, I&apos;m here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="/projects"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 rounded-md font-medium transition-colors"
            >
              Contact Me
            </Link>
            <Link
              href="https://www.linkedin.com/in/brian-mcgauley-1602aa133/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 rounded-md font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              LinkedIn Profile
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
} 