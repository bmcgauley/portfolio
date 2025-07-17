"use client";

import { useState, useMemo, useEffect } from 'react';
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
  // Landscapes
  {
    src: "/images/photography/landscapes/1.webp",
    alt: "Serene Lake Landscape",
    category: "landscapes",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/photography/landscapes/2.webp",
    alt: "Mountain Vista",
    category: "landscapes",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/photography/landscapes/3.webp",
    alt: "Natural Scenery",
    category: "landscapes",
    width: 1920,
    height: 1080
  },
  {
    src: "/images/photography/landscapes/DSC8671.webp",
    alt: "Mountain Landscape",
    category: "landscapes",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/landscapes/DSC8718.webp",
    alt: "Scenic Valley View",
    category: "landscapes",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/landscapes/DSC8859.webp",
    alt: "Natural Landscape",
    category: "landscapes",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/landscapes/Landscape1_edited.webp",
    alt: "Edited Landscape Scene",
    category: "landscapes",
    width: 1920,
    height: 1080
  },

  // Astrophotography
  {
    src: "/images/photography/astrophotography/DSC8639.webp",
    alt: "Night Sky Photography",
    category: "astrophotography",
    width: 1920,
    height: 1280,
    priority: true
  },
  {
    src: "/images/photography/astrophotography/Moon_Color.webp",
    alt: "Colorful Moon Photography",
    category: "astrophotography",
    width: 1080,
    height: 1080
  },
  {
    src: "/images/photography/astrophotography/Path of Night.webp",
    alt: "Path of Night - Star Trail Photography",
    category: "astrophotography",
    width: 1920,
    height: 1080
  },

  // Fireworks
  {
    src: "/images/photography/fireworks/fireworks1.webp",
    alt: "Fireworks Display 1",
    category: "fireworks",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/fireworks/fireworks2.webp",
    alt: "Fireworks Display 2",
    category: "fireworks",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/fireworks/fireworks3.webp",
    alt: "Fireworks Display 3",
    category: "fireworks",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/fireworks/fireworks4.webp",
    alt: "Fireworks Display 4",
    category: "fireworks",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/fireworks/fireworks5.webp",
    alt: "Fireworks Display 5",
    category: "fireworks",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/fireworks/fireworks6.webp",
    alt: "Fireworks Display 6",
    category: "fireworks",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/fireworks/fireworks7.webp",
    alt: "Fireworks Display 7",
    category: "fireworks",
    width: 1920,
    height: 1280
  },

  // Portraits
  {
    src: "/images/photography/portraits/DSC8877.webp",
    alt: "Portrait Photography 1",
    category: "portraits",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/portraits/DSC8906.webp",
    alt: "Portrait Photography 2",
    category: "portraits",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/portraits/DSC9145.webp",
    alt: "Portrait Photography 3",
    category: "portraits",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/portraits/DSC9317.webp",
    alt: "Portrait Photography 4",
    category: "portraits",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/portraits/DSC9369.webp",
    alt: "Portrait Photography 5",
    category: "portraits",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/portraits/IMG_2895.webp",
    alt: "Portrait Photography 6",
    category: "portraits",
    width: 1440,
    height: 1080
  },
  {
    src: "/images/photography/portraits/IMG_2937.webp",
    alt: "Portrait Photography 7",
    category: "portraits",
    width: 1440,
    height: 1080
  },

  // Miscellaneous
  {
    src: "/images/photography/misc/DSC0018-HDR.webp",
    alt: "HDR Photography",
    category: "misc",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/misc/DSC0587.webp",
    alt: "Creative Photography 1",
    category: "misc",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/misc/DSC8758.webp",
    alt: "Creative Photography 2",
    category: "misc",
    width: 1920,
    height: 1280
  },
  {
    src: "/images/photography/misc/IMG_0659-2.webp",
    alt: "Creative Photography 3",
    category: "misc",
    width: 1440,
    height: 1080
  },
  {
    src: "/images/photography/misc/IMG_0659.webp",
    alt: "Creative Photography 4",
    category: "misc",
    width: 1440,
    height: 1080
  },
  {
    src: "/images/photography/misc/IMG_0662.webp",
    alt: "Creative Photography 5",
    category: "misc",
    width: 1440,
    height: 1080
  },
  {
    src: "/images/photography/misc/IMG_1122.webp",
    alt: "Creative Photography 6",
    category: "misc",
    width: 1440,
    height: 1080
  },
  {
    src: "/images/photography/misc/IMG_2562.webp",
    alt: "Creative Photography 7",
    category: "misc",
    width: 1440,
    height: 1080
  },
  {
    src: "/images/photography/misc/IMG_2726-Edit.webp",
    alt: "Edited Creative Photography",
    category: "misc",
    width: 1440,
    height: 1080
  },
  {
    src: "/images/photography/misc/IMG_2888-Edit-2.webp",
    alt: "Artistic Edit Photography",
    category: "misc",
    width: 1440,
    height: 1080
  },
  {
    src: "/images/photography/misc/IMG_6643.webp",
    alt: "Creative Photography 8",
    category: "misc",
    width: 1440,
    height: 1080
  },
  {
    src: "/images/photography/misc/Ryuu (1).webp",
    alt: "Special Photography - Ryuu",
    category: "misc",
    width: 1920,
    height: 1080
  }
];

type CategoryType = keyof typeof categories;

export default function PhotographyPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [showContent, setShowContent] = useState(false);

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  // Memoize the image sources to prevent unnecessary re-renders
  const imageSources = useMemo(() => photos.map(photo => photo.src), []);

  // Use our new preloading hook
  const { progress, total, isComplete } = useBatchImagePreload(
    imageSources,
    6 // Load 6 images at a time
  );

  // Set showContent to true when images are loaded
  useEffect(() => {
    if (isComplete) {
      setShowContent(true);
    }
  }, [isComplete]);

  const handleImageClick = (index: number) => {
    console.log('Image clicked:', index, 'Photo:', filteredPhotos[index]?.alt);
    setSelectedImageIndex(index);
  };

  const handleLightboxClose = () => {
    setSelectedImageIndex(null);
  };

  const handleLightboxNavigate = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 pb-32">
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
            images={filteredPhotos.map((photo, idx) => {
              console.log('Lightbox image', idx, ':', photo.alt);
              return { src: photo.src, alt: photo.alt };
            })}
            currentIndex={selectedImageIndex}
            onClose={handleLightboxClose}
            onNavigate={handleLightboxNavigate}
          />
        )}
      </div>
    </div>
  );
}