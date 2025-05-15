"use client"

import Link from "next/link"
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    href: "https://github.com/yourusername",
    label: "GitHub",
    icon: FiGithub,
  },
  {
    href: "https://linkedin.com/in/yourusername",
    label: "LinkedIn",
    icon: FiLinkedin,
  },
  {
    href: "mailto:your.email@example.com",
    label: "Email",
    icon: FiMail,
  },
]

const footerLinks = [
  {
    title: "Pages",
    links: [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/about", label: "About" },
      { href: "/photography", label: "Photography" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Projects",
    links: [
      { href: "/projects/statscholar", label: "StatScholar" },
      { href: "/projects/aevita", label: "Aevita Nonprofit" },
      { href: "/projects/aj-city-council", label: "AJ City Council" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "https://github.com/yourusername", label: "GitHub" },
      { href: "https://linkedin.com/in/yourusername", label: "LinkedIn" },
      { href: "mailto:your.email@example.com", label: "Email" },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur-sm">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">Brian</span>
              <span className="text-xl font-bold text-secondary ml-1">McGauley</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Web Developer & Computer Information Systems student passionate about creating impactful digital solutions.
            </p>
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full h-9 w-9 border-primary/20 hover:bg-primary/10 hover:text-primary"
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-base font-semibold text-foreground relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-primary/50">
                {section.title}
              </h3>
              <ul className="space-y-3 pt-1">
                {section.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith("http") ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 border-t border-border/40 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Brian McGauley. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}