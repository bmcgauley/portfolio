"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface CategoryFilterProps<T extends string> {
  categories: Record<T, string>
  selectedCategory: T
  onSelectCategory: (category: T) => void
  className?: string
}

export function CategoryFilter<T extends string>({
  categories,
  selectedCategory,
  onSelectCategory,
  className
}: CategoryFilterProps<T>) {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Number keys 1-9 for quick category selection
      if (e.key >= "1" && e.key <= "9") {
        const index = parseInt(e.key) - 1
        const categoryKeys = Object.keys(categories) as T[]
        if (index < categoryKeys.length) {
          onSelectCategory(categoryKeys[index])
        }
      }

      // Alt + A for "All" category
      if (e.altKey && e.key.toLowerCase() === "a") {
        const allCategory = Object.keys(categories).find(
          key => categories[key as T].toLowerCase() === "all photos"
        )
        if (allCategory) {
          onSelectCategory(allCategory as T)
        }
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [categories, onSelectCategory])

  return (
    <div 
      className={cn(
        "flex flex-wrap justify-center gap-4", 
        className
      )}
      role="tablist"
      aria-label="Filter categories"
    >
      {(Object.entries(categories) as [T, string][]).map(([key, label], index) => (
        <motion.div
          key={key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        >
          <Button
            onClick={() => onSelectCategory(key)}
            variant={selectedCategory === key ? "default" : "outline"}
            className="rounded-full relative group"
            role="tab"
            aria-selected={selectedCategory === key}
            aria-controls={`category-${key}`}
          >
            <span className="relative z-10">{label}</span>
            
            {/* Keyboard shortcut tooltip */}
            <span 
              className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-background/80 
                backdrop-blur-sm border text-xs rounded opacity-0 group-hover:opacity-100 
                transition-opacity pointer-events-none whitespace-nowrap"
            >
              {index === 0 ? "Alt + A" : `Press ${index + 1}`}
            </span>
          </Button>
        </motion.div>
      ))}
    </div>
  )
}