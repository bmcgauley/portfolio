import Image from "next/image";
import Link from "next/link";
import { 
  experiences, 
  education,
  skills
} from "@/lib/data";

interface Credential {
  type: string;
  program: string;
  conferred: string;
}

interface EducationWithCredentials {
  credentials?: Credential[];
}

// Use public image paths instead of imports
const PROFILE_IMAGE_PATH = "/images/profile/me-studio-portrait.png";
const TORCH_IMAGE_PATH = "/images/profile/torch_high+res.fw.webp";
const CCC_LOGO_PATH = "/images/profile/ccc-primary-full-color.webp";
const BGS_LOGO_PATH = "/images/profile/logos/bgs-logo.png";
const PKP_LOGO_PATH = "/images/profile/logos/pkp-logo.png";
const CSU_LOGO_PATH = "/images/profile/logos/csu-logo.png";
const CISSA_LOGO_PATH = "/images/profile/logos/cissa.jpg";
const PMI_CCVC_LOGO_PATH = "/images/profile/logos/pmiccvc.png";
const THREE_D_PRINT_IMG_PATH = "/images/profile/3d-printing.png";
const AUDIO_ENGINEERING_IMG_PATH = "/images/profile/audio-engineering.png";
const GAME_DEV_IMG_PATH = "/images/profile/game-development.png";

// New logo paths
const AJ_LOGO_PATH = "/images/profile/logos/aj.webp";
const BF_LOGO_PATH = "/images/profile/logos/bf.png";
const CVJC_LOGO_PATH = "/images/profile/logos/cvjc.webp";
const PAL_LOGO_PATH = "/images/profile/logos/pal.png";
const SFW_LOGO_PATH = "/images/profile/logos/sfw.png";
const KCC_LOGO_PATH = "/images/profile/logos/kcc.avif";

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
                I&apos;m Brian McGauley — a Web Developer, IT Consultant, and MBA student at California State University, Fresno. I recently graduated Summa Cum Laude with a Bachelor of Science in Business Administration (Computer Information Systems) in December 2025, and am now pursuing my MBA while running an independent consulting practice through Imaginarii (imagi-narii.com).
              </p>
              <p className="text-foreground/90 mb-4 leading-relaxed">
                Through <a href="https://imagi-narii.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Imaginarii</a>, I provide web development, branding, SEO, analytics, and technology strategy services to clients ranging from political campaigns to nonprofits and chambers of commerce. Active engagements include a pro-bono full-technology overhaul for the Kerman Chamber of Commerce and ongoing volunteer support for Fresno PAL and Success from Within.
              </p>
              <p className="text-foreground/90 mb-4 leading-relaxed">
                Beyond my technical work, I&apos;m a published music artist specializing in dubstep and electronic dance music. Tracks are available on <a href="https://open.spotify.com/artist/66AbkMEAAIUz2PqEixKWkK" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Spotify</a>, <a href="#" className="text-primary hover:underline">Apple Music</a>, and other streaming platforms. For releases and updates, visit <a href="https://music.brianmcgauley.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">music.brianmcgauley.com</a>.
              </p>
            </div>
          </div>
        </section>        {/* Education Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">Education</h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-8 last:mb-0 bg-card text-card-foreground rounded-lg shadow-md p-6">
              {/* ── Card Header: full-width logo + institution + degree meta ── */}
              <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                {/* Logo */}
                <div className="relative w-32 h-16 shrink-0">
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
                </div>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row justify-between mb-2">
                    <h3 className="text-xl font-semibold text-foreground">{edu.institution}</h3>
                    <p className="text-muted-foreground">
                      {edu.startDate} – {edu.endDate ?? 'Present'}
                    </p>
                  </div>
                  <p className="text-lg text-foreground mb-2">
                    {edu.degree}{edu.field ? ` – ${edu.field}` : ''}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {edu.graduated && (
                      <p className="text-yellow-500 dark:text-yellow-400 font-semibold text-sm" style={{color: 'rgb(180, 144, 0)', textShadow: '0 0 8px rgba(212, 175, 55, 0.5)'}}>✓ <span className="text-blue-900 dark:text-blue-200">Graduated</span></p>
                    )}
                    {edu.gpa && (
                      <p className="text-primary font-medium text-sm">GPA: {edu.gpa}</p>
                    )}
                  </div>
                  {edu.note && (
                    <p className="text-muted-foreground text-sm italic mt-1">{edu.note}</p>
                  )}
                </div>
              </div>

              {/* ── Card Body: two-column when diploma exists, single-column otherwise ── */}
              {edu.degreeImagePath ? (
                /* TWO-COLUMN LAYOUT (diploma entries) */
                <div className="flex flex-col-reverse sm:flex-row gap-6 mt-2">
                  {/* LEFT COLUMN — credentials table + honors + associations */}
                  <div className="flex-1 min-w-0">
                    {/* Credentials table */}
                    {(edu as EducationWithCredentials).credentials && (edu as EducationWithCredentials).credentials!.length > 0 && (
                      <div className="mb-4 overflow-x-auto">
                        <table className="w-full text-sm border-collapse">
                          <thead>
                            <tr className="border-b border-border">
                              <th className="text-left py-1 pr-4 text-muted-foreground font-medium">Credential</th>
                              <th className="text-left py-1 pr-4 text-muted-foreground font-medium">Program</th>
                              <th className="text-left py-1 text-muted-foreground font-medium">Conferred</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(edu as EducationWithCredentials).credentials!.map((cred: Credential, i: number) => (
                              <tr key={i} className="border-b border-border/50 last:border-0">
                                <td className="py-1 pr-4 text-foreground/90">{cred.type}</td>
                                <td className="py-1 pr-4 text-foreground/90">{cred.program}</td>
                                <td className="py-1 text-foreground/90 whitespace-nowrap">{cred.conferred}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}

                    {/* Honors & Associations — side-by-side sub-columns */}
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Honors & Awards */}
                      {edu.honors && edu.honors.length > 0 && (
                        <div className="flex-1">
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
                      {/* Associations & Honor Societies */}
                      {edu.associations && edu.associations.length > 0 && (
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-foreground mb-1">Associations & Honor Societies</h4>
                          <div className="space-y-2">
                            {edu.associations.map((association, index) => (
                              <div key={index} className="flex items-center gap-2">
                                <div className="relative w-8 h-8 shrink-0">
                                  <Image
                                    src={ASSOCIATION_LOGOS[association.name]}
                                    alt={association.name}
                                    fill
                                    className="object-contain"
                                    sizes="32px"
                                  />
                                </div>
                                <div className="flex flex-col">
                                  <span className="text-sm font-medium text-foreground">{association.name}</span>
                                  {association.induction_date && (
                                    <span className="text-xs text-muted-foreground">Inducted: {association.induction_date}</span>
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* RIGHT COLUMN — diploma image(s), full, no cropping */}
                  <div className="sm:w-64 shrink-0">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Diploma</h4>
                    {/* Wrapper div structured to accept multiple images in the future */}
                    <div className="flex flex-col gap-3">
                      <a href={edu.degreeImagePath} target="_blank" rel="noopener noreferrer">
                        <div className="relative w-full min-h-64 aspect-[11/8.5] rounded-lg overflow-hidden border border-border shadow-md hover:shadow-lg transition-shadow">
                          <Image
                            src={edu.degreeImagePath}
                            alt="Bachelor of Science Diploma – California State University, Fresno"
                            fill
                            className="object-contain"
                            sizes="(max-width: 640px) 100vw, 256px"
                          />
                          <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors flex items-end justify-center pb-2">
                            <span className="text-xs text-white bg-black/50 px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity">View full diploma</span>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              ) : (
                /* SINGLE-COLUMN LAYOUT (no diploma) */
                <div className="mt-2">
                  {/* Credentials table */}
                  {(edu as EducationWithCredentials).credentials && (edu as EducationWithCredentials).credentials!.length > 0 && (
                    <div className="mb-4 overflow-x-auto">
                      <table className="w-full text-sm border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-1 pr-4 text-muted-foreground font-medium">Credential</th>
                            <th className="text-left py-1 pr-4 text-muted-foreground font-medium">Program</th>
                            <th className="text-left py-1 text-muted-foreground font-medium">Conferred</th>
                          </tr>
                        </thead>
                        <tbody>
                          {(edu as EducationWithCredentials).credentials!.map((cred: Credential, i: number) => (
                            <tr key={i} className="border-b border-border/50 last:border-0">
                              <td className="py-1 pr-4 text-foreground/90">{cred.type}</td>
                              <td className="py-1 pr-4 text-foreground/90">{cred.program}</td>
                              <td className="py-1 text-foreground/90 whitespace-nowrap">{cred.conferred}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                  {/* Honors & Awards */}
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
                  {/* Associations & Honor Societies */}
                  {edu.associations && edu.associations.length > 0 && (
                    <div className="mt-2">
                      <h4 className="text-sm font-semibold text-foreground mb-1">Associations & Honor Societies</h4>
                      <div className="space-y-2">
                        {edu.associations.map((association, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="relative w-8 h-8 shrink-0">
                              <Image
                                src={ASSOCIATION_LOGOS[association.name]}
                                alt={association.name}
                                fill
                                className="object-contain"
                                sizes="32px"
                              />
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-medium text-foreground">{association.name}</span>
                              {association.induction_date && (
                                <span className="text-xs text-muted-foreground">Inducted: {association.induction_date}</span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
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
                  src={THREE_D_PRINT_IMG_PATH} 
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
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Cura</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">AutoCAD</span>
                </div>
              </div>
            </div>
              {/* Audio Engineering */}
            <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
              <div className="h-48 relative">
                <Image 
                  src={AUDIO_ENGINEERING_IMG_PATH} 
                  alt="Audio Engineering Setup" 
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <h3 className="absolute bottom-4 left-4 text-white text-xl font-bold">Audio Engineering</h3>
              </div>
              <div className="p-5">
                <p className="text-foreground/90 mb-4 leading-relaxed">
                  Published music artist specializing in dubstep and electronic dance music production. Experience in creating high-energy tracks available on Spotify, SoundCloud, and other streaming platforms, with expertise in sound design, mixing, and mastering.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Ableton Live</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">FL Studio</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Sound Design</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Mixing</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Mastering</span>
                  <span className="bg-muted text-foreground px-3 py-1 rounded-md text-sm font-medium">Audio Engineering</span>
                </div>
              </div>
            </div>
              {/* Game Development */}
            <div className="bg-card text-card-foreground rounded-lg overflow-hidden shadow-md">
              <div className="h-48 relative">
                <Image 
                  src={GAME_DEV_IMG_PATH} 
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
                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-white dark:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-md">
                  <Image
                    src={PMI_CCVC_LOGO_PATH}
                    alt="PMI CCVC Logo"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
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
                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-white dark:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-md">
                  <Image
                    src={PAL_LOGO_PATH}
                    alt="Fresno PAL Logo"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
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
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-white dark:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-md">
                  <Image
                    src={SFW_LOGO_PATH}
                    alt="Success from Within Logo"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">Success from Within</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">January 2025 - Present</p>
              <p className="text-foreground/90 leading-relaxed mb-2">
                Website upkeep & routine maintenance, plus occasional event support.
              </p>            </div>            {/* AJ for City Council - volunteer only Fall 2024 */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-white dark:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-md">
                  <Image
                    src={AJ_LOGO_PATH}
                    alt="AJ for City Council Logo"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">AJ for City Council</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">August 2024 – December 2024 (Volunteer)</p>
              <p className="text-foreground/90 leading-relaxed">
                Volunteer website development for Fresno District 7 Campaign during Fall 2024. Continued as paid consultant via Imaginarii from January 2025 onwards.
              </p>
            </div>
            {/* Kerman Chamber of Commerce */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">
                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-white dark:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-md">
                  <Image
                    src={KCC_LOGO_PATH}
                    alt="Kerman Chamber of Commerce Logo"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
                  />
                </div>
                <h3 className="text-xl font-semibold text-center text-secondary">Kerman Chamber of Commerce</h3>
              </div>
              <p className="text-muted-foreground mb-2 text-center">February 2026 – Present (Pro-Bono)</p>
              <p className="text-foreground/90 leading-relaxed">
                Pro-bono technology engagement: branding kit, website rebuild, domain & hosting migration, economic impact study, accessibility (WCAG), SEO & performance audits, and light automation.
              </p>
            </div>
            {/* Central Valley Justice Coalition */}
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6 hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-primary group">
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-white dark:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-md">
                  <Image
                    src={CVJC_LOGO_PATH}
                    alt="Central Valley Justice Coalition Logo"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
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
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-white dark:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-md">
                  <Image
                    src={ASSOCIATION_LOGOS['Alpha Gamma Sigma (ΑΓΣ)']}
                    alt="Alpha Gamma Sigma Honor Society"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
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
              <div className="flex flex-col items-center mb-4">                <div className="relative w-40 h-24 mb-3 p-3 rounded-lg bg-white dark:bg-gray-100 flex items-center justify-center transition-all duration-300 shadow-md">
                  <Image
                    src={BF_LOGO_PATH}
                    alt="Beautify Fresno Logo"
                    fill
                    className="object-contain p-2 transition-all duration-300 group-hover:scale-105"
                    sizes="160px"
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
                  <span className="font-medium">Imaginarii – Independent Consulting (2023–Present)</span>
                  <p className="text-sm mt-1">Active consulting practice operating via <a href="https://imagi-narii.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">imagi-narii.com</a> / <a href="https://imaginarii.net" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">imaginarii.net</a>. Services span web development, branding, SEO, analytics, and technology strategy for businesses and nonprofits.</p>
                </li>
                <li>
                  <span className="font-medium">Kerman Chamber of Commerce (2026–Present)</span>
                  <p className="text-sm mt-1">Pro-bono full technology engagement: branding, website, economic impact analysis, accessibility & SEO audits, and automation.</p>
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
