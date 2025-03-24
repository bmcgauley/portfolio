"use client";

import Image from 'next/image';
import { FiExternalLink, FiGithub, FiImage, FiX } from 'react-icons/fi';
import { Project } from '@/lib/types';
import { useState, useEffect } from 'react';
import { hasMultipleImagesSync, getProjectImages, shouldRefreshPreview } from '@/lib/utils';
import ImageGallery from '@/components/ImageGallery';
import { useRouter } from 'next/navigation';
import torchImage from '@/assets/images/profile/torch_high+res.fw.png';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  // Check if project has multiple images
  const hasMultipleImages = hasMultipleImagesSync(project.folderName);
  const [imageUrl, setImageUrl] = useState<string>(torchImage.src);
  const [isHovered, setIsHovered] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [useSitePreview, setUseSitePreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadImages() {
      setIsLoading(true);
      let foundValidImage = false;
      
      // First, try to get site preview if demo URL exists
      if (project.demoUrl && project.previewUrl) {
        try {
          const needsRefresh = shouldRefreshPreview(project.lastPreviewUpdate);
          if (!needsRefresh && project.previewUrl) {
            setImageUrl(project.previewUrl);
            setUseSitePreview(true);
            foundValidImage = true;
          }
        } catch (error) {
          console.error('Failed to load existing site preview', error);
        }
      }
      
      // If we didn't find a valid preview, try the static image
      if (!foundValidImage && project.imageUrl) {
        setImageUrl(project.imageUrl);
        setUseSitePreview(false);
      }
      
      // Also load project folder images if available
      if (project.folderName) {
        try {
          const images = await getProjectImages(project.folderName);
          if (images && images.length > 0) {
            setGalleryImages(images);
            
            // If we don't have another image set yet, use the first one from the gallery
            if (!foundValidImage && !project.imageUrl) {
              setImageUrl(images[0]);
            }
          }
        } catch (err) {
          console.error('Failed to load gallery images', err);
        }
      }
      
      setIsLoading(false);
    }
    
    loadImages();
  }, [project.folderName, project.imageUrl, project.demoUrl, project.previewUrl, project.lastPreviewUpdate]);

  // Handle image loading error - just use the fallback directly
  const handleImageError = () => {
    // Default fallback to torch image
    setImageUrl(torchImage.src);
  };

  const handleCardClick = () => {
    router.push(`/projects/${project.id}`);
  };

  const handleGalleryClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    setShowGallery(true);
  };

  const handleCloseGallery = () => {
    setShowGallery(false);
  };

  const handleExternalLinkClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation(); // Prevent card click
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <>
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer ${isHovered ? 'scale-[1.02]' : ''}`}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 w-full">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-700">
              <div className="animate-pulse w-full h-full bg-gray-200 dark:bg-gray-600"></div>
            </div>
          ) : (
            <Image
              src={imageUrl}
              alt={project.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 100vw, 384px"
              onError={handleImageError}
            />
          )}
          {useSitePreview && (
            <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
              Live Preview
            </div>
          )}
          {hasMultipleImages && (
            <div 
              className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs flex items-center gap-1 hover:bg-black/80 transition-colors z-10"
              onClick={handleGalleryClick}
            >
              <FiImage size={12} />
              <span>Gallery</span>
            </div>
          )}
        </div>
        
        <div className="p-5">
          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag) => (
              <span 
                key={tag} 
                className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded-md text-xs">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-blue-600 dark:text-blue-400 font-medium">
              View Details
            </span>
            
            <div className="flex gap-3">
              {project.demoUrl && (
                <button 
                  onClick={(e) => handleExternalLinkClick(e, project.demoUrl)}
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  aria-label="Live Demo"
                >
                  <FiExternalLink size={20} />
                </button>
              )}
              
              {project.githubUrl && (
                <button 
                  onClick={(e) => handleExternalLinkClick(e, project.githubUrl)}
                  className="text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white"
                  aria-label="GitHub Repository"
                >
                  <FiGithub size={20} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Modal */}
      {showGallery && galleryImages.length > 0 && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center p-4">
          <div className="w-full max-w-7xl mx-auto flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-white">{project.title} Gallery</h1>
            <button 
              onClick={handleCloseGallery}
              className="text-white hover:text-gray-300 p-2"
              aria-label="Close gallery"
            >
              <FiX size={24} />
            </button>
          </div>
          
          <div className="w-full max-w-7xl mx-auto overflow-y-auto flex-grow">
            <ImageGallery 
              projectFolder={project.folderName || ''}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCard; 