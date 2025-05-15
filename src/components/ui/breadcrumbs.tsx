"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItemProps {
  href?: string;
  label: string;
  isCurrent?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItemProps[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav
      className={cn(
        "flex items-center text-sm text-muted-foreground",
        className
      )}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center flex-wrap">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground/50" />
            )}
            
            {item.href && !item.isCurrent ? (
              <Link
                href={item.href}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={cn(
                  "font-medium",
                  item.isCurrent && "text-foreground"
                )}
                aria-current={item.isCurrent ? "page" : undefined}
              >
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
