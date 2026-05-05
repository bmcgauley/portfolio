import Image from "next/image";
import Link from "next/link";
import { CredentialCard } from "@/components/ui/credential-card";
import { SectionDivider } from "@/components/ui/section-divider";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { experiences, skills } from "@/lib/data";

const PROFILE_IMAGE_PATH = "/images/profile/me-studio-portrait.png";

type Honor = {
  award: string;
  body: string;
  date: string;
};

type Engagement = {
  org: string;
  role: string;
  date: string;
};

type Involvement = {
  org: string;
  date: string;
  description: string;
};

const involvements: Involvement[] = [
  {
    org: "PMI CCVC Chapter",
    date: "May 2025 – Present",
    description:
      "IT intern; supporting the chapter website overhaul and redesign using systems analysis and design principles.",
  },
  {
    org: "Fresno PAL",
    date: "January 2024 – Present",
    description:
      "Website upkeep and routine maintenance in support of youth programs.",
  },
  {
    org: "Success From Within",
    date: "January 2025 – Present",
    description:
      "Website maintenance and occasional event support; brand strategy advisory.",
  },
  {
    org: "AJ for City Council",
    date: "August 2024 – December 2024",
    description:
      "Volunteer website development for the Fresno District 7 campaign. Continued as paid consultant via Imaginarii from January 2025.",
  },
  {
    org: "Kerman Chamber of Commerce",
    date: "February 2026 – Present",
    description:
      "Pro-bono technology engagement: branding, website rebuild, domain and hosting migration, accessibility (WCAG), SEO, and light automation.",
  },
  {
    org: "Central Valley Justice Coalition",
    date: "August 2024 – December 2024",
    description:
      "Marketing and education for community outreach; digital signage and printable materials for volunteer awareness.",
  },
  {
    org: "Beautify Fresno",
    date: "March 2023 – Present",
    description: "Donated time with regular clean-up efforts around the city.",
  },
];

type Certification = {
  title: string;
  issuer: string;
  date: string;
  description: string;
};

const certifications: Certification[] = [
  {
    title: "Introduction to Packet Tracer",
    issuer: "Cisco Networking Academy",
    date: "September 2021",
    description:
      "Network simulation and visualization training covering protocols and configurations.",
  },
];

const honors: Honor[] = [
  {
    award: "Lewis & Virginia Eaton Business Scholarship",
    body: "CSU Fresno",
    date: "2025–2026",
  },
  { award: "Re-Entry Student Award", body: "CSU Fresno", date: "May 2026" },
  {
    award: "Certificate of Recognition",
    body: "PMI Central California Valley Chapter",
    date: "2025",
  },
  { award: "President's List", body: "CSU Fresno", date: "Spring 2025" },
  { award: "President's List", body: "CSU Fresno", date: "Fall 2023" },
  { award: "Dean's List", body: "CSU Fresno", date: "Spring 2024" },
  { award: "Summa Cum Laude", body: "CSU Fresno", date: "December 2025" },
];

const engagements: Engagement[] = [
  {
    org: "Kerman Chamber of Commerce",
    role: "Web & branding consultant",
    date: "2024–present",
  },
  {
    org: "AJ for City Council",
    role: "Campaign technology lead",
    date: "2025",
  },
  {
    org: "Success From Within",
    role: "Brand strategy advisor",
    date: "2024–present",
  },
  {
    org: "Imaginarii",
    role: "Founder, independent consultant",
    date: "2023–present",
  },
  {
    org: "Drawn From Publishing",
    role: "Founder, editorial",
    date: "2024–present",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-bone min-h-screen">
      <section className="bg-bone py-16 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="font-display font-bold uppercase tracking-[0.04em] text-display-2 text-ink">
            About
          </h1>
          <p className="font-serif italic text-body-lg text-ink-soft mt-4">
            Credentials, current engagements, and the work behind them.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 grid md:grid-cols-[auto_1fr] gap-12 items-start">
        <div className="bg-vellum p-3 border border-gold rounded-[2px] shadow-[0_2px_8px_rgba(122,79,20,0.08)] mx-auto md:mx-0">
          <div className="relative w-64 h-64 rounded-[2px] overflow-hidden">
            <Image
              src={PROFILE_IMAGE_PATH}
              alt="Brian McGauley, professional headshot in business attire"
              fill
              className="object-cover"
              priority
              sizes="256px"
            />
          </div>
        </div>

        <div className="font-serif text-body text-ink space-y-5">
          <p>
            I&apos;m Brian McGauley — a Web Developer, IT Consultant, and MBA
            student at California State University, Fresno. I recently
            graduated Summa Cum Laude with a Bachelor of Science in Business
            Administration (Computer Information Systems) in December 2025,
            and am now pursuing my MBA while running an independent consulting
            practice through Imaginarii (imagi-narii.com).
          </p>
          <p>
            Through{" "}
            <a
              href="https://imagi-narii.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson-deep italic underline-offset-4 hover:underline"
            >
              Imaginarii
            </a>
            , I provide web development, branding, SEO, analytics, and
            technology strategy services to clients ranging from political
            campaigns to nonprofits and chambers of commerce. Active
            engagements include a pro-bono full-technology overhaul for the
            Kerman Chamber of Commerce and ongoing volunteer support for
            Fresno PAL and Success from Within.
          </p>
          <p>
            Beyond my technical work, I&apos;m a published music artist
            specializing in dubstep and electronic dance music. Tracks are
            available on{" "}
            <a
              href="https://open.spotify.com/artist/66AbkMEAAIUz2PqEixKWkK"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson-deep italic underline-offset-4 hover:underline"
            >
              Spotify
            </a>{" "}
            and other streaming platforms. For releases and updates, visit{" "}
            <a
              href="https://music.brianmcgauley.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-crimson-deep italic underline-offset-4 hover:underline"
            >
              music.brianmcgauley.com
            </a>
            .
          </p>
        </div>
      </section>

      <SectionDivider />

      <section className="max-w-5xl mx-auto px-6">
        <header className="mb-8">
          <p className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow">
            Education
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink mt-2">
            Credentials
          </h2>
        </header>
        <div className="space-y-4">
          <CredentialCard
            institution="California State University, Fresno"
            credential="Incoming MBA Student · Craig School of Business"
            date="Beginning Spring 2026"
          />
          <div className="space-y-0">
            <CredentialCard
              institution="California State University, Fresno"
              credential="B.S. Business Administration, Computer Information Systems"
              date="December 2025"
              honors="Summa Cum Laude · GPA 3.85"
              societies={["Phi Kappa Phi", "Beta Gamma Sigma"]}
              className="rounded-b-none border-b border-gold/30"
            />
            <figure className="bg-vellum border-l-8 border-parchment rounded-[2px] rounded-t-none px-8 py-6 shadow-[0_2px_8px_rgba(122,79,20,0.08)]">
              <figcaption className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow mb-3">
                Diploma
              </figcaption>
              <a
                href="/images/profile/degree-bs-fresnostate.webp"
                target="_blank"
                rel="noopener noreferrer"
                className="block group"
                aria-label="View full B.S. diploma from California State University, Fresno"
              >
                <div className="relative w-full max-w-md aspect-[11/8.5] bg-bone p-2 border border-gold rounded-[2px] overflow-hidden transition-shadow group-hover:shadow-[0_4px_16px_rgba(122,79,20,0.16)]">
                  <Image
                    src="/images/profile/degree-bs-fresnostate.webp"
                    alt="Bachelor of Science diploma — California State University, Fresno"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 28rem"
                  />
                </div>
                <span className="font-serif italic text-caption text-ink-muted mt-3 inline-block group-hover:text-crimson-deep transition-colors">
                  Click to view full diploma →
                </span>
              </a>
            </figure>
          </div>
          <CredentialCard
            institution="Clovis Community College"
            credential="Associate's Degrees & Certificate · IS Networking, IS Programming for Web, Cyber Security, Business Administration"
            date="2021–2023"
            honors="GPA 3.958"
            societies={["Alpha Gamma Sigma"]}
          />
        </div>
      </section>

      <SectionDivider />

      <section className="max-w-5xl mx-auto px-6">
        <header className="mb-8">
          <p className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow">
            Honors &amp; Awards
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink mt-2">
            Recognition
          </h2>
        </header>
        <div className="bg-bone">
          {honors.map((h, i) => (
            <div
              key={`${h.award}-${i}`}
              className="grid grid-cols-1 md:grid-cols-[2fr_1fr_auto] gap-2 md:gap-6 items-baseline py-4 border-t border-gold first:border-t-0"
            >
              <span className="font-serif text-body text-ink">{h.award}</span>
              <span className="font-serif italic text-ink-soft">{h.body}</span>
              <span className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow md:text-right">
                {h.date}
              </span>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="max-w-5xl mx-auto px-6">
        <header className="mb-8">
          <p className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow">
            Current Engagements
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink mt-2">
            Active Work
          </h2>
        </header>
        <div className="grid md:grid-cols-2 gap-4">
          {engagements.map((e) => (
            <Card key={e.org}>
              <CardHeader>
                <CardTitle>{e.org}</CardTitle>
                <CardDescription>
                  {e.role} · {e.date}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="max-w-5xl mx-auto px-6">
        <header className="mb-8">
          <p className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow">
            Experience
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink mt-2">
            Professional History
          </h2>
        </header>
        <div className="space-y-8">
          {experiences.map((exp) => (
            <article
              key={exp.id}
              className="grid md:grid-cols-[1fr_3fr] gap-4 md:gap-8 pb-8 border-b border-gold-shadow/30 last:border-b-0"
            >
              <div>
                <p className="font-mono uppercase tracking-[0.18em] text-mono-label text-gold-shadow">
                  {exp.startDate}
                  {exp.endDate ? ` – ${exp.endDate}` : " – Present"}
                </p>
              </div>
              <div>
                <h3 className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-ink">
                  {exp.position}
                </h3>
                <p className="font-serif italic text-gold-shadow text-caption mt-1">
                  {exp.company}
                </p>
                <div className="font-serif text-body text-ink mt-3">
                  <Markdown content={exp.description} variant="tight" />
                </div>
                {exp.skills && exp.skills.length > 0 && (
                  <ul className="flex flex-wrap gap-x-3 gap-y-1 mt-4">
                    {exp.skills.map((skill) => (
                      <li
                        key={skill}
                        className="font-mono uppercase tracking-[0.18em] text-[11px] text-gold-shadow"
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="max-w-5xl mx-auto px-6">
        <header className="mb-8">
          <p className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow">
            Skills
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink mt-2">
            Technical Practice
          </h2>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-8">
          {skills.map((group) => (
            <div key={group.category}>
              <h3 className="font-display font-bold uppercase tracking-[0.04em] text-h3 text-crimson-deep mb-3">
                {group.category}
              </h3>
              <ul className="font-serif text-body text-ink space-y-1">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="max-w-5xl mx-auto px-6">
        <header className="mb-8">
          <p className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow">
            Community Involvement
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink mt-2">
            Volunteer & Pro-Bono Work
          </h2>
        </header>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {involvements.map((item) => (
            <Card key={item.org}>
              <CardHeader>
                <CardTitle>{item.org}</CardTitle>
                <CardDescription>{item.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <Markdown content={item.description} variant="tight" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="max-w-5xl mx-auto px-6">
        <header className="mb-8">
          <p className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow">
            Certifications
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink mt-2">
            Training & Continuing Education
          </h2>
        </header>
        <div className="grid md:grid-cols-2 gap-4">
          {certifications.map((cert) => (
            <Card key={cert.title}>
              <CardHeader>
                <CardTitle>{cert.title}</CardTitle>
                <CardDescription>
                  {cert.issuer} · {cert.date}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Markdown content={cert.description} variant="tight" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <SectionDivider />

      <section className="max-w-5xl mx-auto px-6">
        <header className="mb-8">
          <p className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow">
            Photography
          </p>
          <h2 className="font-display font-bold uppercase tracking-[0.04em] text-h1 text-ink mt-2">
            Personal Practice
          </h2>
        </header>
        <p className="font-serif text-body text-ink max-w-2xl mb-6">
          A separate visual practice in landscape, astrophotography, and
          fireworks. Hosted as a sub-page of this site.
        </p>
        <Button asChild variant="secondary" size="lg">
          <Link href="/about/photography">View Gallery</Link>
        </Button>
      </section>

      <SectionDivider />

      <section className="max-w-5xl mx-auto px-6 py-12 text-center">
        <Button asChild variant="default" size="lg">
          <a href="/Brian_McGauley_Resume.pdf" download>
            Download Resume
          </a>
        </Button>
        {/* COPY: placeholder, refine — confirm resume PDF exists at /public/Brian_McGauley_Resume.pdf */}
        <p className="font-mono uppercase tracking-[0.18em] text-caption text-gold-shadow mt-4">
          PDF · Updated May 2026
        </p>
      </section>
    </div>
  );
}
