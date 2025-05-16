import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Client-side function to fetch project images from the API
 * @param projectFolder - The name of the project folder
 * @returns Promise resolving to array of image URLs
 */
export async function getProjectImages(projectFolder: string): Promise<string[]> {
  if (!projectFolder) {
    console.warn('No project folder provided to getProjectImages');
    return ['/images/profile/torch_high+res.fw.webp']; // Return fallback image
  }
  
  try {
    const response = await fetch(`/api/project-images?folder=${encodeURIComponent(projectFolder)}`);
    
    if (!response.ok) {
      console.warn(`API returned error for project ${projectFolder}: ${response.status}`);
      // Use fallback image if API returns error
      return ['/images/profile/torch_high+res.fw.webp'];
    }
    
    const data = await response.json();
    const images = data.images || [];
    
    // If no images were found, return fallback image
    if (images.length === 0) {
      console.info(`No images found for project ${projectFolder}, using fallback`);
      return ['/images/profile/torch_high+res.fw.webp'];
    }
    
    return images;
  } catch (error) {
    console.error(`Error fetching images for project ${projectFolder}:`, error);
    // Return fallback image on error
    return ['/images/profile/torch_high+res.fw.webp'];
  }
}
