"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

interface NavigationWarningProps {
  shouldWarn?: boolean
  message?: string
}

export function useNavigationWarning({ 
  shouldWarn = false, 
  message = "Are you sure you want to leave? Any unsaved changes will be lost."
}: NavigationWarningProps = {}) {
  const pathname = usePathname()

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (!shouldWarn) return

      e.preventDefault()
      e.returnValue = message
      return message
    }

    // For browser back/forward buttons and closing
    if (shouldWarn) {
      window.addEventListener("beforeunload", handleBeforeUnload)
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload)
    }
  }, [shouldWarn, message])

  // For Next.js client-side navigation
  useEffect(() => {
    if (shouldWarn) {
      // This would be where we'd hook into Next.js's router events
      // Currently, Next.js App Router doesn't expose these events
      // We'll rely on beforeunload for now
      console.log("Navigation warning active for", pathname)
    }
  }, [shouldWarn, pathname])
}