"use client";

import Image from 'next/image';
import { FiExternalLink, FiGithub, FiImage, FiX } from 'react-icons/fi';
import { Project } from '@/lib/types';
import { useState, useEffect } from 'react';
import ImageGallery from '@/components/ImageGallery';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Use constant for fallback image path instead of import
const TORCH_IMAGE_PATH = "/images/profile/torch_high+res.fw.png";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>(TORCH_IMAGE_PATH);
  const [isHovered, setIsHovered] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [useSitePreview, setUseSitePreview] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function loadImages() {
      setIsLoading(true);
      let foundValidImage = false;
      
      // If we have a direct image URL, use it
      if (project.imageUrl) {
        setImageUrl(project.imageUrl);
        setUseSitePreview(false);
        foundValidImage = true;
      }
      
      // Load project folder images if available
      if (project.folderName) {
        try {
          // Note: Implement your image loading logic here
          const images: string[] = []; // Replace with your image loading logic
          if (images && images.length > 0) {
            setGalleryImages(images);
            
            if (!foundValidImage) {
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
  }, [project.folderName, project.imageUrl]);

  const handleImageError = () => {
    setImageUrl(TORCH_IMAGE_PATH);
  };

  const handleCardClick = () => {
    router.push(`/projects/${project.id}`);
  };

  const handleGalleryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowGallery(true);
  };

  const handleCloseGallery = () => {
    setShowGallery(false);
  };

  const handleExternalLinkClick = (e: React.MouseEvent, url?: string) => {
    e.stopPropagation();
    if (url) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };
  return (
    <>
      <Card
        className={cn(
          "overflow-hidden cursor-pointer transition-all duration-300 border border-gray-100 dark:border-gray-800",
          isHovered && "scale-[1.02] shadow-lg"
        )}
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative h-48 w-full">
          <div className={cn(
            "absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-0 transition-opacity",
            isHovered && "opacity-100"
          )}></div>
          {isLoading ? (
            <Skeleton className="h-full w-full" />
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
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs">
              Live Preview
            </div>
          )}
          {galleryImages.length > 0 && (
            <Button
              variant="secondary"
              size="sm"
              className="absolute bottom-2 right-2 z-10"
              onClick={handleGalleryClick}
            >
              <FiImage className="h-4 w-4 mr-1" />
              Gallery
            </Button>
          )}
        </div>
        
        <CardHeader className="p-5 pb-0">
          <h3 className="text-xl font-semibold">{project.title}</h3>
        </CardHeader>
        
        <CardContent className="p-5">
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {project.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.slice(0, 3).map((tag: string) => ( 
              <span 
              key={tag} 
              className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs"
              >
              {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
          
          <CardFooter className="px-0 flex justify-between items-center">
            <Button variant="link" className="p-0">
              View Details
            </Button>
            
            <div className="flex gap-2">
              {project.demoUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleExternalLinkClick(e, project.demoUrl)}
                  aria-label="Live Demo"
                >
                  <FiExternalLink className="h-5 w-5" />
                </Button>
              )}
              
              {project.githubUrl && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => handleExternalLinkClick(e, project.githubUrl)}
                  aria-label="GitHub Repository"
                >
                  <FiGithub className="h-5 w-5" />
                </Button>
              )}
            </div>
          </CardFooter>
        </CardContent>
      </Card>

      {showGallery && galleryImages.length > 0 && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex flex-col items-center p-4">
          <Card className="w-full max-w-7xl mx-auto">
            <CardHeader className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-bold">{project.title} Gallery</h1>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCloseGallery}
                aria-label="Close gallery"
              >
                <FiX className="h-6 w-6" />
              </Button>
            </CardHeader>
            <CardContent className="w-full overflow-y-auto flex-grow">
              <ImageGallery 
                projectFolder={project.folderName || ''}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProjectCard;