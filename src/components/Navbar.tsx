"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FiMenu } from "react-icons/fi"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

const routes = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/projects",
    label: "Projects",
  },
  {
    href: "/about",
    label: "About",
  },
  {
    href: "/photography",
    label: "Photography",
  },
  {
    href: "/contact",
    label: "Contact",
  },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (    <header className="sticky top-0 z-50 w-full border-b border-secondary/30 bg-[#0a1929] shadow-md">
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center font-semibold text-lg">
          <span className="text-white">Brian</span>
          <span className="text-secondary ml-1">McGauley</span>
        </Link>
          <nav className="hidden md:flex items-center gap-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:text-secondary",
                pathname === route.href
                  ? "text-secondary border-b-2 border-secondary"
                  : "text-white/80"
              )}
            >
              {route.label}
            </Link>
          ))}
          <div className="ml-4">
            <Button variant="default" asChild className="bg-secondary hover:bg-secondary/90 text-[#0a1929] font-medium">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </nav>        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <FiMenu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[80vw] sm:w-[350px] border-r border-secondary/30 bg-[#0a1929]">
            <div className="px-2 py-6">
              <Link href="/" className="flex items-center mb-6 font-semibold text-lg" onClick={() => setOpen(false)}>
                <span className="text-white">Brian</span>
                <span className="text-secondary ml-1">McGauley</span>
              </Link>
              <nav className="flex flex-col gap-1">
                {routes.map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      pathname === route.href
                        ? "bg-secondary/10 text-secondary border-l-2 border-secondary pl-[10px]"
                        : "hover:bg-white/5 hover:text-secondary text-white/80"
                    )}
                  >
                    {route.label}
                  </Link>
                ))}                <div className="mt-6">
                  <Button variant="default" asChild className="w-full bg-secondary hover:bg-secondary/90 text-[#0a1929] font-medium">
                    <Link href="/contact" onClick={() => setOpen(false)}>Get in Touch</Link>
                  </Button>
                </div>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}