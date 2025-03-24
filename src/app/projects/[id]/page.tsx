import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import ImageGallery from '@/components/ImageGallery';
import RefreshPreviewButton from '@/components/RefreshPreviewButton';
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  // Get the project ID from params
  const id = params.id;
  // Find the project
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | My Portfolio`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: { id: string };
}) {
  // Get the project ID from params
  const id = params.id;
  // Find the project
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="container max-w-5xl py-10 px-4 mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link
          href="/#projects"
          className="hover:text-primary transition-colors"
        >
          Projects
        </Link>
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 dark:text-gray-300 font-medium">
          {project.title}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Project Gallery */}
          {project.folderName && (
            <ImageGallery projectFolder={project.folderName} />
          )}

          {/* Project Content */}
          <div className="mt-8">
            <h1 className="text-3xl font-bold">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 prose dark:prose-invert max-w-none">
              <p className="text-lg">{project.description}</p>
              <h2>Project Details</h2>
              <p>{project.description}</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 sticky top-20">
            <h3 className="text-xl font-semibold mb-4">Project Info</h3>
            
            {/* Site Preview */}
            {project.demoUrl && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Site Preview</h4>
                  <RefreshPreviewButton 
                    projectId={project.id}
                    demoUrl={project.demoUrl}
                  />
                </div>
                <div className="relative overflow-hidden rounded-md aspect-video">
                  <Image
                    src={project.imageUrl || '/images/placeholders/site-preview-placeholder.jpg'}
                    alt={`Preview of ${project.title}`}
                    className="object-cover"
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    unoptimized={project.imageUrl?.startsWith('/images/previews/')}
                  />
                </div>
              </div>
            )}
            
            {/* Project Links */}
            <div className="space-y-4">
              {project.demoUrl && (
                <div>
                  <h4 className="font-medium mb-2">Live Demo</h4>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Demo
                  </a>
                </div>
              )}

              {project.githubUrl && (
                <div>
                  <h4 className="font-medium mb-2">Source Code</h4>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 px-4 bg-gray-800 dark:bg-gray-700 text-white rounded-md hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
                  >
                    View on GitHub
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 