"use client"

import { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"

interface ImageWithLoadingProps extends React.ComponentProps<typeof Image> {
  containerClassName?: string
}

export function ImageWithLoading({
  containerClassName,
  className,
  onLoad: onLoadProp,
  ...props
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false)
    onLoadProp?.(e)
  }

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true)
    setIsLoading(false)
    props.onError?.(e)
  }

  const retryLoadImage = () => {
    setHasError(false)
    setIsLoading(true)
    // Force image reload by creating a new HTMLImageElement
    const img = new window.Image()
    img.src = props.src as string
    img.onload = () => setIsLoading(false)
    img.onerror = () => setHasError(true)
  }

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center bg-muted"
          >
            <Skeleton className="w-full h-full absolute" />
            <motion.div 
              className="relative z-10"
              animate={{ 
                rotate: 360,
                transition: { duration: 1, repeat: Infinity, ease: "linear" }
              }}
            >
              <div className="h-12 w-12 border-t-2 border-b-2 border-primary rounded-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}        >
          <Image
            {...props}
            alt={props.alt || "Image"}
            className={cn(
              "transition-transform duration-300",
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
          />
        </motion.div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground">Failed to load image</p>
            <button
              onClick={retryLoadImage}
              className="mt-2 text-xs text-primary hover:underline"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  )
}