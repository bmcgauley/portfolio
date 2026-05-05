"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiImage, FiX } from "react-icons/fi";
import { Project } from "@/lib/types";
import ImageGallery from "@/components/ImageGallery";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { Markdown } from "@/components/ui/markdown";
import { cn } from "@/lib/utils";

const TORCH_IMAGE_PATH = "/images/profile/torch_high+res.fw.png";

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string>(TORCH_IMAGE_PATH);
  const [hasImage, setHasImage] = useState<boolean>(Boolean(project.imageUrl));
  const [showGallery, setShowGallery] = useState(false);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      setIsLoading(true);
      let foundValidImage = false;

      if (project.imageUrl) {
        setImageUrl(project.imageUrl);
        setHasImage(true);
        foundValidImage = true;
      }

      if (project.folderName) {
        try {
          const images: string[] = [];
          if (images && images.length > 0) {
            setGalleryImages(images);
            if (!foundValidImage) {
              setImageUrl(images[0]);
              setHasImage(true);
            }
          }
        } catch (err) {
          console.error("Failed to load gallery images", err);
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

  const primaryHref = project.demoUrl || project.githubUrl;
  const primaryLabel = project.demoUrl ? "View Site →" : project.githubUrl ? "View Repository →" : "View Details →";

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (project.demoUrl || project.githubUrl) {
      window.open(primaryHref, "_blank", "noopener,noreferrer");
    } else {
      router.push(`/projects/${project.id}`);
    }
  };

  const visibleTags = project.tags?.slice(0, 4) ?? [];

  return (
    <>
      <Card
        onClick={handleCardClick}
        className={cn(
          "h-full cursor-pointer overflow-hidden p-0 gap-0",
          "transition-shadow hover:shadow-[0_4px_16px_rgba(122,79,20,0.12)]"
        )}
      >
        {hasImage && (
          <div className="relative aspect-[16/10] w-full border-b border-gold-shadow/40">
            {isLoading ? (
              <Skeleton className="h-full w-full" />
            ) : (
              <Image
                src={imageUrl}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                onError={handleImageError}
              />
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
        )}

        <div className="flex flex-1 flex-col gap-5 p-7 md:p-8">
          <CardHeader className="p-0 gap-2">
            <CardTitle>{project.title}</CardTitle>
            {project.category && <CardDescription>{project.category}</CardDescription>}
          </CardHeader>

          <CardContent className="p-0 text-body line-clamp-3">
            <Markdown content={project.description} variant="tight" />
          </CardContent>

          {visibleTags.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              {visibleTags.map((tag, idx) => (
                <span key={tag} className="flex items-center gap-2">
                  <span className="font-mono uppercase tracking-[0.18em] text-[11px] text-gold-shadow">
                    {tag}
                  </span>
                  {idx < visibleTags.length - 1 && (
                    <span aria-hidden className="text-gold text-[11px]">◆</span>
                  )}
                </span>
              ))}
            </div>
          )}

          <CardFooter className="p-0 flex justify-between items-center gap-4">
            <Button
              variant="link"
              className="px-0 h-auto py-0"
              onClick={handlePrimaryAction}
            >
              {primaryLabel}
            </Button>
            {project.featured && (
              <span className="font-serif italic text-caption text-ink-muted">
                Featured
              </span>
            )}
          </CardFooter>
        </div>
      </Card>

      {showGallery && galleryImages.length > 0 && (
        <div className="fixed inset-0 bg-bone/95 backdrop-blur-sm z-50 flex flex-col items-center p-4">
          <Card className="w-full max-w-7xl mx-auto">
            <CardHeader className="flex flex-row justify-between items-center">
              <CardTitle>{project.title} Gallery</CardTitle>
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
              <ImageGallery projectFolder={project.folderName || ""} />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default ProjectCard;
