export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa: string;
  honors?: {
    type: string;
    date: string;
    description?: string;
  }[];
  associations?: {
    name: string;
    induction_date?: string;
    role?: string;
  }[];
}

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
  images: Array<{
    id: string;
    title: string;
    imageUrl: string;
    description: string;
  }>;
  category?: string;
}

export interface Business {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
}

export interface Nonprofit {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  role: string;
}