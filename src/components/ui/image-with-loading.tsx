"use client"

import React, { useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { motion, AnimatePresence } from "framer-motion"

interface ImageWithLoadingProps extends React.ComponentProps<typeof Image> {
  containerClassName?: string;
  fallbackSrc?: string;
}

const FALLBACK_IMAGE = '/images/placeholders/site-preview-placeholder.jpg';
const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

export function ImageWithLoading({
  containerClassName,
  className,
  onLoad: onLoadProp,
  fallbackSrc = FALLBACK_IMAGE,
  ...props
}: ImageWithLoadingProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(props.src);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoading(false);
    setRetryCount(0);
    onLoadProp?.(e);
  };

  const handleError = async (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (retryCount < MAX_RETRIES) {
      // Try loading the original image again with exponential backoff
      const delay = Math.pow(2, retryCount) * RETRY_DELAY;
      setRetryCount(prev => prev + 1);
      
      setTimeout(() => {
        setCurrentSrc(`${props.src}?retry=${Date.now()}`);
      }, delay);
      
    } else if (currentSrc !== fallbackSrc) {
      // After max retries, try the fallback image
      console.warn(`Failed to load image after ${MAX_RETRIES} retries, using fallback`);
      setCurrentSrc(fallbackSrc);
      
    } else {
      // If even the fallback fails, show error state
      setHasError(true);
      setIsLoading(false);
      props.onError?.(e);
    }
  };

  const retryLoadImage = () => {
    setHasError(false);
    setIsLoading(true);
    setRetryCount(0);
    setCurrentSrc(props.src as string);
  };

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
              className="relative z-10 flex flex-col items-center"
              animate={{ 
                rotate: 360,
                transition: { duration: 1, repeat: Infinity, ease: "linear" }
              }}
            >
              <div className="h-12 w-12 border-t-2 border-b-2 border-primary rounded-full" />
              {retryCount > 0 && (
                <span className="mt-2 text-xs text-gray-500" role="status">
                  Retry {retryCount}/{MAX_RETRIES}
                </span>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!hasError && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoading ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            {...props}
            src={currentSrc}
            alt={props.alt || "Image"}
            className={cn(
              "transition-transform duration-300",
              className
            )}
            onLoad={handleLoad}
            onError={handleError}
            data-testid="next-image"
          />
        </motion.div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <div className="text-center p-4">
            <p className="text-sm text-muted-foreground" role="alert">Failed to load image</p>
            <button
              onClick={retryLoadImage}
              className="mt-2 text-xs text-primary hover:underline focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  )
}