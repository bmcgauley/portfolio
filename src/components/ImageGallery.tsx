"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight, FiX } from 'react-icons/fi';
import { getProjectImages } from '@/lib/utils';

interface ClientImageGalleryProps {
  images: string[];
  title: string;
  fullScreen?: boolean;
}

interface ServerImageGalleryProps {
  projectFolder: string;
}

const ClientImageGallery = ({ images, title, fullScreen = false }: ClientImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // For fullscreen gallery, open the first image after a short delay
  useEffect(() => {
    // Removed auto-open functionality
    return;
  }, [fullScreen, images]);
  
  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      
      if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex]);

  if (!images.length) {
    return null;
  }

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedImageIndex(null);
    // Re-enable scrolling
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction: -1 | 1) => {
    if (selectedImageIndex === null) return;
    
    const newIndex = selectedImageIndex + direction;
    if (newIndex >= 0 && newIndex < images.length) {
      setSelectedImageIndex(newIndex);
    }
  };

  const galleryGridColumns = fullScreen ? 
    "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" : 
    "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={fullScreen ? "" : "mt-10"}>
      {!fullScreen && <h2 className="text-2xl font-semibold mb-4">Project Gallery</h2>}
      
      <div className={`grid ${galleryGridColumns} gap-4`}>
        {images.map((image, index) => (
          <div 
            key={index}
            className="relative aspect-square rounded-md overflow-hidden cursor-pointer shadow-md hover:shadow-lg transition-all hover:scale-[1.05]"
            onClick={() => openModal(index)}
          >
            <Image
              src={image}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              onLoad={() => setIsLoading(false)}
            />
            <div className="absolute inset-0 bg-black/20 hover:bg-black/10 transition-colors" />
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={closeModal}
        >
          <div className="relative w-full max-w-5xl h-[85vh] p-4">
            <div 
              className="absolute inset-0 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[selectedImageIndex]}
                alt={`${title} - Image ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            
            {/* Navigation */}
            {selectedImageIndex > 0 && (
              <button 
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
                aria-label="Previous image"
              >
                <FiChevronLeft size={24} />
              </button>
            )}
            
            {selectedImageIndex < images.length - 1 && (
              <button 
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
                aria-label="Next image"
              >
                <FiChevronRight size={24} />
              </button>
            )}
            
            {/* Close Button */}
            <button 
              className="absolute top-4 right-4 text-white bg-black/50 hover:bg-black/70 p-2 rounded-full z-10"
              onClick={closeModal}
              aria-label="Close gallery"
            >
              <FiX size={24} />
            </button>
            
            {/* Image Counter */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
              {selectedImageIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// This wrapper component takes a projectFolder prop and loads images on the client side
const ImageGallery = ({ projectFolder }: ServerImageGalleryProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      if (projectFolder) {
        try {
          const projectImages = await getProjectImages(projectFolder);
          setImages(projectImages);
        } catch (error) {
          console.error(`Error loading images for ${projectFolder}:`, error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    }

    loadImages();
  }, [projectFolder]);

  // Show loading state or no images message
  if (loading) {
    return <div className="p-4 text-center">Loading images...</div>;
  }

  if (!loading && images.length === 0) {
    return <div className="p-4 text-center">No images available for this project</div>;
  }

  // Render the gallery with loaded images
  return <ClientImageGallery images={images} title={projectFolder} />;
};

export default ImageGallery; 