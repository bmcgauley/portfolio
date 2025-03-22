// Client-side utility functions
'use client';

import { projects } from './data';
import { Project } from './types';

/**
 * Gets all image filenames from a specific project folder using the API
 * @param projectFolder - The name of the project folder
 * @returns Array of image URLs for the project
 */
export async function getProjectImages(projectFolder: string): Promise<string[]> {
  try {
    const response = await fetch(`/api/project-images?folder=${encodeURIComponent(projectFolder)}`);
    
    if (!response.ok) {
      console.error('Failed to fetch project images:', response.statusText);
      return [];
    }
    
    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error('Error fetching project images:', error);
    return [];
  }
}

/**
 * Client-side function to check if a project has multiple images
 * This is used in components that need to know if a gallery exists
 * without waiting for async API calls
 */
export function hasMultipleImagesSync(projectFolder: string | undefined): boolean {
  // This is a simplified check that will be updated when the component mounts
  // with the actual data from the API
  return !!projectFolder;
}

/**
 * Gets a site preview for a project
 * @param projectId - ID of the project
 * @param url - URL to capture
 * @param forceRefresh - Whether to force a refresh of the preview
 * @returns Object with previewUrl and lastUpdate
 */
export async function getSitePreview(
  projectId: string,
  url: string, 
  forceRefresh = false
): Promise<{ previewUrl: string; lastPreviewUpdate: string }> {
  try {
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      console.warn('URL must start with http:// or https://', url);
      url = `https://${url}`; // Try to fix by prefixing with https://
    }

    const params = new URLSearchParams();
    params.append('url', url);
    params.append('projectId', projectId);
    
    if (forceRefresh) {
      params.append('refresh', 'true');
    }

    console.log(`Fetching site preview for projectId: ${projectId}, url: ${url}`);
    
    // Debug the full API URL to check parameter order
    const apiUrl = `/api/site-preview?${params.toString()}`;
    console.log(`API URL: ${apiUrl}`);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get site preview');
    }

    const data = await response.json();
    
    return {
      previewUrl: data.previewUrl,
      lastPreviewUpdate: data.lastPreviewUpdate || new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error getting site preview:', error);
    
    // Return a placeholder image path if available
    return {
      previewUrl: '/images/placeholders/site-preview-placeholder.jpg',
      lastPreviewUpdate: new Date().toISOString(),
    };
  }
}

/**
 * Determines if a site preview should be refreshed based on last update time
 * @param lastUpdate - ISO timestamp of the last update
 * @param maxAge - Maximum age in hours before a refresh is needed
 * @returns Whether the preview should be refreshed
 */
export function shouldRefreshPreview(lastUpdate?: string, maxAge = 24): boolean {
  if (!lastUpdate) return true;
  
  try {
    const lastUpdateDate = new Date(lastUpdate);
    const now = new Date();
    const diffHours = (now.getTime() - lastUpdateDate.getTime()) / (1000 * 60 * 60);
    
    return diffHours > maxAge;
  } catch (error) {
    // If there's any error parsing the date, refresh to be safe
    return true;
  }
}

/**
 * Find a project by ID
 * @param id The project ID to look for
 * @returns The project or undefined if not found
 */
export function getProject(id: string): Project | undefined {
  return projects.find(project => project.id === id);
} 