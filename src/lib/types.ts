export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  folderName?: string;
  tags: string[];
  demoUrl?: string;
  githubUrl?: string;
  featured: boolean;
  previewUrl?: string;
  lastPreviewUpdate?: string;
}

export interface PhotoCollection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: Photo[];
}

export interface Photo {
  id: string;
  title: string;
  imageUrl: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate?: string;
  description: string;
  skills: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
}

export interface Nonprofit {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl?: string;
  role?: string;
} 