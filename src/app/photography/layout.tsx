"use client"

import { useNavigationWarning } from "@/hooks/use-navigation-warning"
import { useEffect, useState } from "react"

export default function PhotoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [hasInteraction, setHasInteraction] = useState(false)
  
  useNavigationWarning({
    shouldWarn: hasInteraction,
    message: "Are you sure you want to leave? Any lightbox or filtering progress will be lost."
  })

  useEffect(() => {
    const handleInteraction = () => setHasInteraction(true)

    // Set hasInteraction to true on first meaningful interaction
    const handleMeaningfulInteraction = (e: MouseEvent | KeyboardEvent) => {
      // Only count clicks on buttons or images, and specific keyboard events
      if (e instanceof MouseEvent) {
        const target = e.target as HTMLElement
        if (target.closest('button') || target.closest('img')) {
          setHasInteraction(true)
        }
      } else if (e instanceof KeyboardEvent) {
        // Count arrow keys, escape, and 'i' key as meaningful interactions
        if (['ArrowLeft', 'ArrowRight', 'Escape', 'i'].includes(e.key)) {
          setHasInteraction(true)
        }
      }
    }

    window.addEventListener("click", handleMeaningfulInteraction)
    window.addEventListener("keydown", handleMeaningfulInteraction)

    return () => {
      window.removeEventListener("click", handleMeaningfulInteraction)
      window.removeEventListener("keydown", handleMeaningfulInteraction)
    }
  }, [])

  return children
}