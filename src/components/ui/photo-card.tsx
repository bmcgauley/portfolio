"use client"

import { motion } from "framer-motion"
import { Photo } from "@/lib/types"
import { cn } from "@/lib/utils"
import { ImageWithLoading } from "./image-with-loading"

interface PhotoCardProps {
  photo: Photo
  onClick: () => void
  index: number
  shimmerToBase64: (w: number, h: number) => string
  priority?: boolean
}

export function PhotoCard({
  photo,
  onClick,
  index,
  shimmerToBase64,
  priority = false,
}: PhotoCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ 
        duration: 0.3,
        delay: index * 0.05 // Stagger the animations
      }}
      className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow bg-card group"
      onClick={onClick}
    >
      <ImageWithLoading
        src={photo.src}
        alt={photo.alt}
        fill
        className={cn(
          "object-cover transition-all duration-300 group-hover:scale-105",
        )}
        containerClassName="absolute inset-0"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        quality={60}
        priority={priority}
        loading={priority ? "eager" : "lazy"}
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${shimmerToBase64(700, 475)}`}
      />

      {/* Category Badge */}
      <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-full text-xs">
          {photo.category}
        </span>
      </div>

      {/* Info Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-white text-sm font-medium line-clamp-2">
          {photo.alt}
        </p>
      </div>
    </motion.div>
  )
}