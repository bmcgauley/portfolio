"use client"

import { useEffect } from "react"
import { motion, useAnimation } from "framer-motion"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  progress: number
  total: number
  className?: string
  onComplete?: () => void
}

export function ProgressBar({
  progress,
  total,
  className,
  onComplete
}: ProgressBarProps) {
  const controls = useAnimation()
  const percentage = Math.min(100, (progress / total) * 100)

  useEffect(() => {
    controls.start({
      width: `${percentage}%`,
      transition: { duration: 0.3, ease: "easeOut" }
    })

    if (percentage === 100 && onComplete) {
      const timer = setTimeout(onComplete, 500)
      return () => clearTimeout(timer)
    }
  }, [percentage, controls, onComplete])

  return (
    <div 
      className={cn(
        "h-1 w-full bg-muted overflow-hidden rounded-full",
        className
      )}
    >
      <motion.div
        className="h-full bg-primary origin-left"
        initial={{ width: 0 }}
        animate={controls}
      />
    </div>
  )
}