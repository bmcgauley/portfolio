import Image from "next/image";
import Link from "next/link";
import { 
  experiences, 
  education,
  skills
} from "@/lib/data";

// Use public image paths instead of imports
const PROFILE_IMAGE_PATH = "/images/profile/DSC07056-2.webp";
const TORCH_IMAGE_PATH = "/images/profile/torch_high+res.fw.webp";
const CCC_LOGO_PATH = "/images/profile/ccc-primary-full-color.webp";
const BGS_LOGO_PATH = "/images/profile/logos/bgs-logo.png";
const PKP_LOGO_PATH = "/images/profile/logos/pkp-logo.png";
const CSU_LOGO_PATH = "/images/profile/logos/csu-logo.png";
const CISSA_LOGO_PATH = "/images/profile/logos/cissa.jpg";
const PMI_CCVC_LOGO_PATH = "/images/profile/logos/pmiccvc.png";

// New logo paths
const AJ_LOGO_PATH = "/images/profile/logos/aj.webp";
const BF_LOGO_PATH = "/images/profile/logos/bf.png";
const CVJC_LOGO_PATH = "/images/profile/logos/cvjc.webp";
const PAL_LOGO_PATH = "/images/profile/logos/pal.png";
const SFW_LOGO_PATH = "/images/profile/logos/sfw.png";

// Map association names to their logo paths
const ASSOCIATION_LOGOS: { [key: string]: string } = {
  'Beta Gamma Sigma (ΒΓΣ)': BGS_LOGO_PATH,
  'Phi Kappa Phi (ΦΚΦ)': PKP_LOGO_PATH,
  'CISSA (Computer Information Systems Student Association)': CISSA_LOGO_PATH,
  'Alpha Gamma Sigma (ΑΓΣ)': TORCH_IMAGE_PATH
};

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
            </div>            <div className="md:w-2/3">
              <h2 className="text-2xl font-bold mb-4 text-foreground">Bio</h2>
              <p className="text-foreground/90 mb-4 leading-relaxed">
                I&apos;m Brian McGauley, a Web Developer pursuing a Bachelor&apos;s Degree in Business Administration with a focus on Computer Information Systems at California State University, Fresno. With a strong academic background and practical experience, I specialize in developing innovative web solutions and business process improvements.
              </p>
              <p className="text-foreground/90 mb-4 leading-relaxed">
                Currently working as a Web Developer at Fresno State Student Housing, I&apos;ve successfully led various initiatives including analytics automation, SEO optimization, and digital signage solutions. I have also served as a Teaching Assistant, helping students master technical concepts and providing mentorship.
               </p>
               <p className="text-foreground/90 mb-4 leading-relaxed">
                I&apos;m passionate about leveraging technology and collaborating with industry professionals to drive innovation in cybersecurity, small business development, technical literacy, and educational development.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                My diverse skill set spans across frontend and backend development, database management, analytics, and business analysis. I&apos;m passionate about leveraging technology to optimize processes and deliver impactful solutions.
              </p>
            </div>
          </div>
        </section>        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-8 last:mb-0 bg-card text-card-foreground rounded-lg shadow-md p-6">
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
                  ) : edu.institution === 'California State University, Fresno' ? (
                    <Image
                      src={CSU_LOGO_PATH}
                      alt="California State University, Fresno Logo"
                      fill
                      className="object-contain"
                    />
                  ) : null}
                </div>                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{edu.institution}</h3>
                    <p className="text-muted-foreground">
                      {edu.startDate} – {edu.endDate}
                    </p>
                  </div>
                  <p className="text-lg text-foreground mb-2">
                    {edu.degree} - {edu.field}
                  </p>
                  <p className="text-primary font-medium mb-2">
                    GPA: {edu.gpa}
                  </p>                  {/* Show Honors */}
                  {edu.honors && edu.honors.length > 0 && (
                    <div className="mb-3">
                      <h4 className="text-sm font-semibold text-foreground mb-1">Honors & Awards</h4>
                      <div className="space-y-1">
                        {edu.honors.map((honor, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <span className="text-sm font-medium text-secondary">{honor.type}</span>
                            <span className="text-sm text-muted-foreground">({honor.date})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {/* Show Associations */}
                  {edu.associations && edu.associations.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold text-foreground mb-1">Associations & Honor Societies</h4>
                      <div className="space-y-2">
                        {edu.associations.map((association, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="relative w-8 h-8">
                              <Image
                                src={ASSOCIATION_LOGOS[association.name]}
                                alt={association.name}
                                fill
                                className="object-contain"
                                sizes="32px"
                              />
                            </div>                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-foreground">
                                {association.name}
                              </span>
                              {association.induction_date && (
                                <span className="text-xs text-muted-foreground">
                                  Inducted: {association.induction_date}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </section>
        
        {/* Skills Section */}
        <section id="skills" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Skills & Technologies</h2>          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skillGroup, index) => (
              <div key={index} className="bg-card text-card-foreground rounded-lg shadow-md p-6">
                <h3 className="text-xl font-semibold mb-4 text-secondary">
                  {skillGroup.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <span 
                      key={skillIndex} 
                      className="bg-muted text-foreground px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
        
        {/* Creative Skills Showcase */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Creative & Technical Specialties</h2>
          <div className="grid md:grid-cols-3 gap-8">            {/* 3D Printing */}
            <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
              <div className="h-48 relative">
                <Image 
                  src={TORCH_IMAGE_PATH} 
                  alt="3D Printing Projects" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">3D Printing</h3>
              </div>              <div className="p-5">
                <p className="text-foreground/90 mb-4 leading-relaxed">
                  Experienced in both FDM and resin printing technologies, creating functional prototypes and custom designs using various materials and post-processing techniques.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Fusion 360</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Cura</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">PrusaSlicer</span>
                </div>
              </div>
            </div>
              {/* Audio Engineering */}
            <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
              <div className="h-48 relative">
                <Image 
                  src={TORCH_IMAGE_PATH} 
                  alt="Audio Engineering Setup" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">Audio Engineering</h3>
              </div>
              <div className="p-5">
                <p className="text-foreground/90 mb-4 leading-relaxed">
                  Skilled in audio production, sound design, and music composition using industry-standard DAWs. Experience in recording, mixing, and mastering for various media projects.                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Pro Tools</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Ableton Live</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Sound Design</span>
                </div>
              </div>
            </div>
              {/* Game Development */}
            <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
              <div className="h-48 relative">
                <Image 
                  src={TORCH_IMAGE_PATH} 
                  alt="Game Development Project" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">Game Development</h3>
              </div>
              <div className="p-5">
                <p className="text-foreground/90 mb-4 leading-relaxed">
                  Proficient in game development using Unity and Unreal engines. Experience in gameplay programming, shader development, and interactive experience design.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Unity</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Unreal Engine</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">C#</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Professional Experience */}        <section id="experience" className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Professional Experience</h2>
          {experiences.map((experience) => (
            <div key={experience.id} className="mb-8 last:mb-0 bg-card text-card-foreground rounded-lg shadow-md p-6">
              <div className="flex flex-col sm:flex-row justify-between mb-2">
                <h3 className="text-xl font-semibold text-secondary">{experience.position}</h3>
                <p className="text-muted-foreground">
                  {experience.startDate} – {experience.endDate || 'Present'}
                </p>
              </div>
              <p className="text-lg text-foreground mb-2">{experience.company}</p>
              <p className="text-foreground/90 mb-3 leading-relaxed">{experience.description}</p>
              <div className="flex flex-wrap gap-2">
                {experience.skills.map((skill) => (
                  <span 
                    key={skill} 
                    className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </section>        {/* Community Involvement */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Community Involvement</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">            {/* PMI CCVC */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/50 dark:group-hover:to-blue-700/50 transition-all duration-300 shadow-md">
                  <Image
                    src={PMI_CCVC_LOGO_PATH}
                    alt="PMI CCVC Logo"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(10, 25, 41, 0.4)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 0 1px rgba(255, 255, 255, 0.1))'
                    }}
                  />                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">PMI CCVC Chapter</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">May 2025 - Present</p>
              <p className="text-foreground/90 mb-3 leading-relaxed">
                Serving as an IT Intern and assisting with website overhaul & redesign using systems analysis and 
                design principles.
              </p>            </div>{/* Fresno PAL */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/50 dark:group-hover:to-blue-700/50 transition-all duration-300 shadow-md">
                  <Image
                    src={PAL_LOGO_PATH}  
                    alt="Fresno PAL Logo" 
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(10, 25, 41, 0.4)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 0 1px rgba(255, 255, 255, 0.1))'
                    }}
                  />                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">Fresno PAL</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">January 2024 - Present</p>
              <p className="text-foreground/90 leading-relaxed">
                Website upkeep & routine maintenance to support youth programs.
              </p>
            </div>
              {/* Success from Within */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/50 dark:group-hover:to-blue-700/50 transition-all duration-300 shadow-md">
                  <Image
                    src={SFW_LOGO_PATH}  
                    alt="Success from Within Logo" 
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(10, 25, 41, 0.4)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 0 1px rgba(255, 255, 255, 0.1))'
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">Success from Within</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">January 2025 - Present</p>
              <p className="text-foreground/90 leading-relaxed mb-2">
                Website upkeep & routine maintenance, plus occasional event support.
              </p>            </div>            {/* AJ for City Council */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/50 dark:group-hover:to-blue-700/50 transition-all duration-300 shadow-md">
                  <Image
                    src={AJ_LOGO_PATH}  
                    alt="AJ for City Council Logo" 
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(10, 25, 41, 0.4)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 0 1px rgba(255, 255, 255, 0.1))'
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">AJ for City Council</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">January 2025 - Present</p>
              <p className="text-foreground/90 leading-relaxed">
                Website development for Fresno District 7 Campaign.
              </p>
            </div>            {/* Central Valley Justice Coalition */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/50 dark:group-hover:to-blue-700/50 transition-all duration-300 shadow-md">
                  <Image
                    src={CVJC_LOGO_PATH}  
                    alt="Central Valley Justice Coalition Logo" 
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(10, 25, 41, 0.4)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 0 1px rgba(255, 255, 255, 0.1))'
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">Central Valley Justice Coalition</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">August 2024 - December 2024</p>
              <p className="text-foreground/90 leading-relaxed">
                Marketing & Education for Community Outreach, including digital signage and printable materials for volunteer awareness.
              </p>
            </div>
              {/* Alpha Gamma Sigma */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/50 dark:group-hover:to-blue-700/50 transition-all duration-300 shadow-md">
                  <Image
                    src={ASSOCIATION_LOGOS['Alpha Gamma Sigma (ΑΓΣ)']}
                    alt="Alpha Gamma Sigma Honor Society"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(10, 25, 41, 0.4)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 0 1px rgba(255, 255, 255, 0.1))'
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">Alpha Gamma Sigma (ΑΓΣ)</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">March 2023</p>
              <p className="text-foreground/90 leading-relaxed">
                Permanent membership established in 2023 prior to graduation from Clovis Community College.
              </p>
            </div>            {/* Beautify Fresno */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/40 dark:to-blue-800/40 flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 dark:group-hover:from-blue-800/50 dark:group-hover:to-blue-700/50 transition-all duration-300 shadow-md">
                  <Image
                    src={BF_LOGO_PATH}  
                    alt="Beautify Fresno Logo" 
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                    style={{
                      filter: 'drop-shadow(0 3px 6px rgba(10, 25, 41, 0.4)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2)) drop-shadow(0 0 0 1px rgba(255, 255, 255, 0.1))'
                    }}
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">Beautify Fresno</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">March 2023 - Present</p>
              <p className="text-foreground/90 leading-relaxed">
                Donated time with regular clean-up efforts around the city.
              </p>
            </div>
          </div>
        </section>

        {/* Certifications & Training */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Certifications & Training</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Packet Tracer */}            <div className="bg-card text-card-foreground rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-secondary">Introduction to Packet Tracer</h3>
                <span className="text-muted-foreground">September 2021</span>
              </div>
              <p className="text-foreground/90 leading-relaxed">
                Completed comprehensive training in network simulation and visualization using Cisco&apos;s Packet Tracer, enhancing understanding of network protocols and configurations.
              </p>
            </div>            {/* Personal Projects */}
            <div className="bg-card text-card-foreground rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4 text-secondary">Notable Projects</h3>
              <ul className="text-foreground/90 leading-relaxed space-y-3">
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
        </section>        {/* Call to Action Section */}
        <section className="text-center py-16 px-4 bg-card rounded-2xl shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Let&apos;s Connect</h2>
          <p className="text-foreground/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            I&apos;m always interested in discussing new projects, opportunities, or ways to collaborate. 
            Whether you&apos;re looking for a web developer, need technical consultation, or want to discuss potential collaborations, I&apos;m here to help.
          </p>
          <div className="flex flex-wrap justify-center gap-4">            <Link 
              href="/projects"
              className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md font-medium transition-colors"
            >
              View Projects
            </Link>            <Link
              href="/contact"
              className="px-6 py-3 border border-border hover:border-secondary/50 text-foreground hover:text-secondary rounded-md font-medium transition-colors"
            >
              Contact Me
            </Link>            <Link
              href="https://www.linkedin.com/in/bmcgauley/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-border hover:border-secondary/50 text-foreground hover:text-secondary rounded-md font-medium transition-colors flex items-center gap-2"
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
