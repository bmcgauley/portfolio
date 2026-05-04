"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Wordmark } from "@/components/ui/wordmark"
import { cn } from "@/lib/utils"

const routes = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/publications", label: "Publications" },
  { href: "/writing", label: "Writing" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gold bg-bone/90 backdrop-blur-md">
      <div className="container mx-auto flex h-[60px] items-center justify-between px-4 sm:px-6 md:h-[72px] lg:px-8">
        <Link href="/" aria-label="Brian McGauley — Home">
          <Wordmark variant="compact" />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {routes.slice(0, -1).map((route) => {
            const isActive = pathname === route.href
            return (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "font-display uppercase text-sm tracking-[0.05em] transition-colors",
                  isActive
                    ? "text-crimson-deep border-b-2 border-gold pb-0.5"
                    : "text-ink-soft hover:text-ink"
                )}
              >
                {route.label}
              </Link>
            )
          })}
        </nav>

        <div className="hidden md:block">
          <Link
            href="/contact"
            className="inline-block bg-crimson-deep text-vellum font-display uppercase tracking-[0.05em] text-sm px-7 py-[14px] rounded-[4px] hover:bg-crimson transition-colors"
          >
            Contact
          </Link>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-ink">
              <FiMenu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80vw] sm:w-[350px] border-l border-gold bg-bone">
            <div className="px-2 py-6">
              <Link href="/" className="mb-8 inline-block" onClick={() => setOpen(false)}>
                <Wordmark variant="compact" />
              </Link>
              <nav className="flex flex-col gap-1">
                {routes.slice(0, -1).map((route) => {
                  const isActive = pathname === route.href
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "font-display uppercase text-sm tracking-[0.05em] py-2 transition-colors",
                        isActive
                          ? "text-crimson-deep border-l-4 border-gold pl-3"
                          : "text-ink-soft hover:text-ink pl-3"
                      )}
                    >
                      {route.label}
                    </Link>
                  )
                })}
                <div className="mt-6">
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="block text-center bg-crimson-deep text-vellum font-display uppercase tracking-[0.05em] text-sm px-7 py-[14px] rounded-[4px] hover:bg-crimson transition-colors"
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
