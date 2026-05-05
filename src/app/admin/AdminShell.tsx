"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Ornament } from "@/components/ui/ornament";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  exact?: boolean;
};

type NavGroup = { group: string; items: NavItem[] };

const NAV: NavGroup[] = [
  {
    group: "Content",
    items: [
      { href: "/admin", label: "Dashboard", exact: true },
      { href: "/admin/publications", label: "Publications" },
      { href: "/admin/writing", label: "Writing" },
      { href: "/admin/achievements", label: "Achievements" },
      { href: "/admin/projects", label: "Projects" },
      { href: "/admin/about", label: "About Page" },
      { href: "/admin/library", label: "Library" },
    ],
  },
  {
    group: "System",
    items: [{ href: "/admin/settings", label: "Settings" }],
  },
];

function isActive(pathname: string, item: NavItem): boolean {
  if (item.exact) return pathname === item.href;
  return pathname === item.href || pathname.startsWith(item.href + "/");
}

export default function AdminShell({
  userName,
  children,
  signOutAction,
}: {
  userName: string;
  children: React.ReactNode;
  signOutAction: () => Promise<void>;
}) {
  const pathname = usePathname() ?? "";

  return (
    <div className="min-h-screen bg-bone text-ink flex flex-col">
      {/* Top bar */}
      <header className="sticky top-0 z-50 h-14 border-b border-gold bg-bone/90 backdrop-blur-md flex items-center justify-between px-7">
        <div className="flex items-center gap-3">
          <Ornament size="sm" />
          <span className="font-display font-bold uppercase tracking-[0.18em] text-xs text-ink">
            Brian McGauley · House Office
          </span>
          <span className="ml-3 font-mono uppercase tracking-[0.22em] text-[9px] text-ink-muted hidden md:inline">
            v1.0 · MMXXVI
          </span>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-mono uppercase tracking-[0.22em] text-[10px] text-ink-soft hidden sm:inline">
            {userName}
          </span>
          <Link
            href="/"
            className="font-display uppercase tracking-[0.18em] text-xs text-ink-soft hover:text-crimson-deep"
          >
            View Site
          </Link>
          <form action={signOutAction}>
            <button
              type="submit"
              className="font-display uppercase tracking-[0.18em] text-xs text-ink-soft hover:text-crimson-deep transition-colors"
            >
              Sign Out
            </button>
          </form>
        </div>
      </header>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <aside className="w-60 shrink-0 border-r border-gold-shadow/40 bg-vellum hidden md:block">
          <nav className="py-8 px-5 space-y-8">
            {NAV.map((group) => (
              <div key={group.group}>
                <p className="font-mono uppercase tracking-[0.22em] text-[10px] text-gold-shadow mb-3 px-2">
                  {group.group}
                </p>
                <ul className="space-y-1">
                  {group.items.map((item) => {
                    const active = isActive(pathname, item);
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          className={cn(
                            "block font-display uppercase tracking-[0.05em] text-sm py-1.5 px-2 rounded-[2px] transition-colors",
                            active
                              ? "text-crimson-deep border-l-4 border-gold pl-2.5"
                              : "text-ink-soft hover:text-ink",
                          )}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 px-6 md:px-10 py-10 max-w-5xl">{children}</main>
      </div>
    </div>
  );
}
