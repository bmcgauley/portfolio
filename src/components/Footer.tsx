"use client"

import Link from "next/link"
import { FiGithub, FiLinkedin, FiMessageCircle, FiExternalLink } from "react-icons/fi"
import { FaTwitter, FaInstagram, FaFacebook, FaSpotify, FaSoundcloud, FaApple } from "react-icons/fa"

const socialLinks = [
  {
    href: "https://www.linkedin.com/in/bmcgauley/",
    label: "LinkedIn",
    icon: FiLinkedin,
  },
  {
    href: "https://github.com/bmcgauley",
    label: "GitHub",
    icon: FiGithub,
  },
  {
    href: "/contact",
    label: "Contact",
    icon: FiMessageCircle,
  },
  {
    href: "https://x.com/brian_mcgauley",
    label: "Twitter",
    icon: FaTwitter,
  },
  {
    href: "https://www.instagram.com/bmcgauley711/",
    label: "Instagram",
    icon: FaInstagram,
  },
  {
    href: "https://www.facebook.com/the.brian.mcgauley/",
    label: "Facebook",
    icon: FaFacebook,
  },
]

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/about", label: "About" },
      { href: "/music", label: "Music" },
      { href: "/photography", label: "Photography" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Featured Work",
    links: [
      { href: "https://aevita.org", label: "Aevita Nonprofit" },
      { href: "https://ajforcitycouncil.com", label: "AJ City Council" },
      { href: "/projects/statscholar", label: "StatScholar" },
    ],
  },
  {
    title: "Connect",
    links: [
      { href: "https://www.linkedin.com/in/bmcgauley/", label: "LinkedIn" },
      { href: "https://github.com/bmcgauley", label: "GitHub" },
      { href: "/contact", label: "Contact Form" },
      { href: "https://x.com/brian_mcgauley", label: "Twitter" },
      { href: "https://www.instagram.com/bmcgauley711/", label: "Instagram" },
    ],
  },
]

export default function Footer() {
  return (    <footer className="border-t border-secondary/30 bg-[#0a1929] text-white">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-8 md:py-10">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Brand and Social Icons - Takes 1 column */}
          <div className="lg:col-span-1 space-y-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-white">Brian</span>
              <span className="text-xl font-bold text-secondary ml-1">McGauley</span>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Web Developer, Music Producer & Computer Information Systems student passionate about creating impactful digital solutions and artistic experiences.
            </p>
            <div className="pt-2">
              <h4 className="text-sm font-medium text-white/90 mb-3">Connect with me</h4>
              <div className="grid grid-cols-3 gap-2 max-w-[144px]">
                {socialLinks.map((social) => (
                  <div key={social.label}>
                    {social.href.startsWith('/') ? (
                      <Link
                        href={social.href}
                        aria-label={social.label}
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-[#F59E0B]/60 bg-[#051219] text-[#F59E0B] hover:bg-[#F59E0B]/20 hover:border-[#F59E0B] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#F59E0B]/25"
                      >
                        <social.icon className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="flex items-center justify-center w-8 h-8 rounded-full border border-[#F59E0B]/60 bg-[#051219] text-[#F59E0B] hover:bg-[#F59E0B]/20 hover:border-[#F59E0B] hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-[#F59E0B]/25"
                      >
                        <social.icon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Links - Takes 3 columns */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {footerLinks.map((section) => (
              <div key={section.title} className="space-y-3">
                <h3 className="text-base font-semibold text-white relative pb-2 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-8 after:bg-secondary">
                  {section.title}
                </h3>
                <ul className="space-y-2">
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
          </div>
        </div>

        {/* Music Platforms - Centered below main content */}
        <div className="mt-8 pt-6 border-t border-secondary/20">
          <div className="text-center">
            <h4 className="text-sm font-medium text-white/90 mb-4">Music Platforms</h4>
            <div className="flex justify-center gap-6 flex-wrap">
              <a
                href="https://open.spotify.com/artist/66AbkMEAAIUz2PqEixKWkK"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <FaSpotify className="h-4 w-4" />
                Spotify
              </a>
              <a
                href="https://music.apple.com/us/artist/brian-mcgauley/1826883671"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <FaApple className="h-4 w-4" />
                Apple Music
              </a>
              <a
                href="https://soundcloud.com/brian-mcgauley-290029297"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <FaSoundcloud className="h-4 w-4" />
                SoundCloud
              </a>
              <a
                href="https://www.fiverr.com/users/brianmcgauley/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <FiExternalLink className="h-4 w-4" />
                Fiverr
              </a>
              <Link
                href="/music"
                className="text-sm text-white/70 hover:text-secondary transition-colors duration-200 flex items-center gap-2"
              >
                <FiExternalLink className="h-4 w-4" />
                All Music
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-secondary/20 pt-6 flex flex-col md:flex-row justify-between items-center">
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