"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

// Define categories and their images
const categories = {
  all: "All Photos",
  landscapes: "Landscapes",
  astrophotography: "Astrophotography",
  fireworks: "Fireworks",
  portraits: "Portraits",
  misc: "Other"
};

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

const photos = [
  // Landscapes
  { 
    src: '/images/photography/landscapes/1.webp',
    alt: 'Mountain Valley Landscape',
    category: 'landscapes',
    width: 1280,
    height: 720,
    priority: true
  },
  { 
    src: '/images/photography/landscapes/2.webp',
    alt: 'Mountain Peak View',
    category: 'landscapes',
    width: 1280,
    height: 720,
    priority: true
  },
  { 
    src: '/images/photography/landscapes/3.webp',
    alt: 'Snowy Mountain Landscape',
    category: 'landscapes',
    width: 1280,
    height: 720,
    priority: true
  },
  { 
    src: '/images/photography/landscapes/DSC8718.webp',
    alt: 'Scenic Mountain View',
    category: 'landscapes',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/landscapes/DSC8671.webp',
    alt: 'Natural Landscape',
    category: 'landscapes',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/landscapes/DSC8859.webp',
    alt: 'Silhouette Landscape',
    category: 'landscapes',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/landscapes/Landscape1_edited.webp',
    alt: 'Edited Landscape View',
    category: 'landscapes',
    width: 1280,
    height: 720
  },
  
  // Astrophotography
  { 
    src: '/images/photography/astrophotography/Moon_Color.webp',
    alt: 'Moon in Color',
    category: 'astrophotography',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/astrophotography/Path of Night.webp',
    alt: 'Path of Night',
    category: 'astrophotography',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/astrophotography/DSC8639.webp',
    alt: 'Night Sky',
    category: 'astrophotography',
    width: 1280,
    height: 720
  },
  
  // Fireworks
  { 
    src: '/images/photography/fireworks/fireworks1.webp',
    alt: 'Fireworks Display 1',
    category: 'fireworks',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/fireworks/fireworks2.webp',
    alt: 'Fireworks Display 2',
    category: 'fireworks',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/fireworks/fireworks3.webp',
    alt: 'Fireworks Display 3',
    category: 'fireworks',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/fireworks/fireworks4.webp',
    alt: 'Fireworks Display 4',
    category: 'fireworks',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/fireworks/fireworks5.webp',
    alt: 'Fireworks Display 5',
    category: 'fireworks',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/fireworks/fireworks6.webp',
    alt: 'Fireworks Display 6',
    category: 'fireworks',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/fireworks/fireworks7.webp',
    alt: 'Fireworks Display 7',
    category: 'fireworks',
    width: 1280,
    height: 720
  },

  // Portraits & People
  {
    src: '/images/photography/portraits/DSC8877.webp',
    alt: 'Silhouette Portrait',
    category: 'portraits',
    width: 1280,
    height: 720
  },
  {
    src: '/images/photography/portraits/DSC8906.webp',
    alt: 'Outdoor Portrait',
    category: 'portraits',
    width: 1280,
    height: 720
  },
  {
    src: '/images/photography/portraits/DSC9145.webp',
    alt: 'Park Portrait',
    category: 'portraits',
    width: 1280,
    height: 720
  },
  {
    src: '/images/photography/portraits/DSC9317.webp',
    alt: 'Urban Portrait',
    category: 'portraits',
    width: 1280,
    height: 720
  },
  {
    src: '/images/photography/portraits/DSC9369.webp',
    alt: 'Artistic Portrait',
    category: 'portraits',
    width: 1280,
    height: 720
  },
  {
    src: '/images/photography/portraits/IMG_2895.webp',
    alt: 'Natural Portrait',
    category: 'portraits',
    width: 1280,
    height: 720
  },
  {
    src: '/images/photography/portraits/IMG_2937.webp',
    alt: 'Candid Portrait',
    category: 'portraits',
    width: 1280,
    height: 720
  },
  
  // Misc/Other
  { 
    src: '/images/photography/misc/DSC0018-HDR.webp',
    alt: 'HDR Photography',
    category: 'misc',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/misc/DSC0587.webp',
    alt: 'Abstract Shot',
    category: 'misc',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/misc/IMG_1122.webp',
    alt: 'Creative Shot',
    category: 'misc',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/misc/IMG_2562.webp',
    alt: 'Nature Detail',
    category: 'misc',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/misc/IMG_2726-Edit.webp',
    alt: 'Edited Nature Shot',
    category: 'misc',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/misc/IMG_2888-Edit-2.webp',
    alt: 'Artistic Edit',
    category: 'misc',
    width: 1280,
    height: 720
  },
  { 
    src: '/images/photography/misc/Ryuu (1).webp',
    alt: 'Animal Portrait',
    category: 'misc',
    width: 1280,
    height: 720
  }
];

export default function PhotographyPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const filteredPhotos = selectedCategory === 'all'
    ? photos
    : photos.filter(photo => photo.category === selectedCategory);

  // Prefetch all images on mount
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = photos.map((photo) => {
        return new Promise((resolve, reject) => {
          const img = document.createElement('img');
          img.src = photo.src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        console.error('Failed to preload some images:', error);
        setImagesLoaded(true); // Still set to true to show whatever loaded
      }
    };

    preloadImages();
  }, []);

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Hidden container for pre-rendering all images */}
      <div className="hidden">
        {photos.map((photo) => (
          <Image
            key={`preload-${photo.src}`}
            src={photo.src}
            alt={photo.alt}
            width={1920}
            height={1080}
            priority={true}
            loading="eager"
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Photography</h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A collection of my photographic work spanning various styles and subjects.
            From landscapes to astrophotography, each image captures a unique moment in time.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {Object.entries(categories).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedCategory === key
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {!imagesLoaded && (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Photo Grid */}
        <AnimatePresence>
          {imagesLoaded && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {filteredPhotos.map((photo) => (
                <motion.div
                  key={photo.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="relative aspect-[4/3] cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow bg-gray-900"
                  onClick={() => setSelectedImage(photo.src)}
                >
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={60}
                    priority={true}
                    loading="eager"
                    placeholder="blur"
                    blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(700, 475))}`}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Lightbox */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-gray-300 p-2"
              onClick={() => setSelectedImage(null)}
              aria-label="Close image viewer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full max-w-6xl max-h-[90vh]">
              <Image
                src={selectedImage}
                alt="Selected photograph"
                className="object-contain w-full h-full"
                width={1920}
                height={1080}
                quality={85}
                priority={true}
                placeholder="blur"
                blurDataURL={`data:image/svg+xml;base64,${toBase64(shimmer(1920, 1080))}`}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 