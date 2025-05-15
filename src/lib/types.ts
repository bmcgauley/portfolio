export interface Photo {
  src: string;
  alt: string;
  category: 'landscapes' | 'astrophotography' | 'fireworks' | 'portraits' | 'misc';
  width: number;
  height: number;
  priority?: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  category?: string;
  technologies?: string[];
  imageUrl?: string;
  folderName?: string;
  demoUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface PhotoCollection {
  id: string;
  title: string;
  description: string;
  coverImage: string;
  images: Photo[];
  category?: string;
}