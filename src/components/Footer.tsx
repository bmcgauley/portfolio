"use client"

import Link from "next/link"
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi"
import { Button } from "@/components/ui/button"

const socialLinks = [
  {
    href: "https://github.com/bmcgauley",
    label: "GitHub",
    icon: FiGithub,
  },
  {
    href: "https://www.linkedin.com/in/bmcgauley/",
    label: "LinkedIn",
    icon: FiLinkedin,
  },
  {
    href: "mailto:brian@mcgauley.com",
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
  {    title: "Connect",
    links: [
      { href: "https://github.com/bmcgauley", label: "GitHub" },
      { href: "https://www.linkedin.com/in/bmcgauley/", label: "LinkedIn" },
      { href: "mailto:brian@mcgauley.com", label: "Email" },
    ],
  },
]

export default function Footer() {
  return (    <footer className="border-t border-secondary/30 bg-[#0a1929] text-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">Brian</span>
              <span className="text-xl font-bold text-secondary ml-1">McGauley</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Web Developer & Computer Information Systems student passionate about creating impactful digital solutions.
            </p>
            <div className="flex gap-2 pt-2">
              {socialLinks.map((social) => (
                <Button
                  key={social.label}
                  variant="outline"
                  size="icon"
                  asChild
                  className="rounded-full h-9 w-9 border-secondary/40 bg-transparent hover:bg-secondary/10 hover:text-secondary text-white/80"
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
          </div>          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-base font-semibold text-white relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-secondary">
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
                        className="text-sm text-white/70 hover:text-secondary transition-colors duration-200"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-white/70 hover:text-secondary transition-colors duration-200"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>        <div className="mt-16 border-t border-secondary/20 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Brian McGauley. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="text-xs text-white/60 hover:text-secondary transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-xs text-white/60 hover:text-secondary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}