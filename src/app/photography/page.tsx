"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Photo } from '@/lib/types';
import { Lightbox } from "@/components/ui/lightbox";
import { PhotoCard } from "@/components/ui/photo-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { CategoryFilter } from "@/components/ui/category-filter";
import { MasonryGrid } from "@/components/ui/masonry-grid";
import { useBatchImagePreload } from "@/hooks/use-image-preload";

// Define categories and their images
const categories = {
  all: "All Photos",
  landscapes: "Landscapes",
  astrophotography: "Astrophotography",
  fireworks: "Fireworks",
  portraits: "Portraits",
  misc: "Other"
} as const;

// Generate a proper blur data URL
const shimmer = (w: number, h: number) => `
<svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <defs>
    <linearGradient id="g">
      <stop stop-color="#333" offset="20%" />
      <stop stop-color="#222" offset="50%" />
      <stop stop-color="#333" offset="70%" />
    </linearGradient>
  </defs>
  <rect width="${w}" height="${h}" fill="#333" />
  <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
  <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === 'undefined'
    ? Buffer.from(str).toString('base64')
    : window.btoa(str);

// Combined function that generates the blur data URL
const generateBlurDataUrl = (width: number, height: number) => {
  return toBase64(shimmer(width, height));
};

const photos: Photo[] = [
  // ... (keep your existing photos array)
];

type CategoryType = keyof typeof categories;

export default function PhotographyPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  // Use our new preloading hook
  const { progress, total, isComplete } = useBatchImagePreload(
    photos.map(photo => photo.src),
    6 // Load 6 images at a time
  );

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleLightboxClose = () => {
    setSelectedImageIndex(null);
  };

  const handleLightboxNavigate = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Photography</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A collection of my photographic work spanning various styles and subjects.
            From landscapes to astrophotography, each image captures a unique moment in time.
          </p>
        </div>

        {/* Loading Progress */}
        <AnimatePresence mode="wait">
          {!isComplete && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-md mx-auto mb-12"
            >
              <div className="text-center mb-4">
                <p className="text-muted-foreground">
                  Loading gallery... {Math.round((progress / total) * 100)}%
                </p>
              </div>
              <ProgressBar
                progress={progress}
                total={total}
                onComplete={() => setShowContent(true)}
                className="h-1.5"
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Category Filter */}
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                className="mb-12"
              />

              {/* Photo Grid */}
              <AnimatePresence mode="wait">
                <div className="px-4 sm:px-0">
                  {filteredPhotos.length > 0 ? (
                    <MasonryGrid
                      items={filteredPhotos}
                      columnCount={{
                        mobile: 1,
                        tablet: 2,
                        desktop: 3
                      }}
                      gap={16}
                      renderItem={(photo, index) => (
                        <PhotoCard
                          photo={photo}
                          index={index}
                          onClick={() => handleImageClick(index)}
                          shimmerToBase64={generateBlurDataUrl}
                          priority={index < 6 || photo.priority}
                        />
                      )}
                    />
                  ) : (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <p className="text-muted-foreground">
                        No photos found in this category.
                      </p>
                    </motion.div>
                  )}
                </div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        {selectedImageIndex !== null && (
          <Lightbox
            images={filteredPhotos.map(photo => ({ src: photo.src, alt: photo.alt }))}
            currentIndex={selectedImageIndex}
            onClose={handleLightboxClose}
            onNavigate={handleLightboxNavigate}
          />
        )}
      </div>
    </div>
  );
}