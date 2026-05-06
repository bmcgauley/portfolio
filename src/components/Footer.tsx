import Link from "next/link";
import { Wordmark } from "@/components/ui/wordmark";
import { Ornament } from "@/components/ui/ornament";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
];

const otherProperties = [
  {
    href: "https://imagi-narii.com",
    name: "IMAGINARII",
    description: "Independent consulting practice.",
  },
  {
    href: "https://drawnfrom.com",
    name: "DRAWN FROM",
    description: "Publishing imprint.",
  },
  {
    href: "https://mcgauleylabs.news",
    name: "MCGAULEY LABS",
    description: "AI news & writing.",
  },
  {
    href: "https://music.brianmcgauley.com",
    name: "MUSIC",
    description: "Electronic music releases.",
  },
];

export default function Footer() {
  return (
    <footer className="border-t-2 border-gold bg-parchment">
      <div className="mx-auto max-w-6xl py-16 px-6 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          <div>
            <Wordmark variant="compact" />
            <p className="font-serif italic text-ink-soft max-w-xs mt-4">
              Incoming MBA student, independent consultant, and educator.
            </p>
          </div>

          <div>
            <h3 className="font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-4">
              NAVIGATE
            </h3>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-serif text-ink-soft hover:text-ink block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display uppercase tracking-[0.18em] text-xs text-crimson-deep mb-4">
              OTHER PROPERTIES
            </h3>
            <ul className="space-y-3">
              {otherProperties.map((property) => (
                <li key={property.href}>
                  <a
                    href={property.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block group"
                  >
                    <span className="font-display uppercase text-sm tracking-[0.05em] text-ink">
                      {property.name}
                    </span>
                    <span className="block font-serif italic text-ink-muted text-sm">
                      {property.description}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-gold">
        <div className="mx-auto max-w-6xl py-6 px-6 md:px-12 flex items-center justify-center gap-4">
          <Ornament />
          <span className="font-mono uppercase tracking-[0.18em] text-[11px] text-gold-shadow">
            © MMXXVI · BRIANMCGAULEY.COM
          </span>
          <Ornament />
        </div>
      </div>
    </footer>
  );
}
