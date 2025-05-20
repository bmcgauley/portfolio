import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/lib/data';
import ImageGallery from '@/components/ImageGallery';
import RefreshPreviewButton from '@/components/RefreshPreviewButton';
import PreviewSection from '@/components/PreviewSection';
import { Metadata } from "next";

type ParamsType = Promise<{ id: string }>;

export async function generateMetadata({
  params,
}: {
  params: ParamsType;
}): Promise<Metadata> {
  // Get the project ID from params
  const { id } = await params;
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
  params: ParamsType;
}) {
  // Get the project ID from params
  const { id } = await params;
  // Find the project
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <main className="container max-w-5xl py-10 px-4 mx-auto">      {/* Breadcrumb */}
      <div className="mb-6">
        <nav className="flex items-center text-sm text-muted-foreground">
          <ol className="flex items-center">
            <li>
              <Link href="/" className="hover:text-primary transition-colors">
                Home
              </Link>
            </li>
            <svg className="h-4 w-4 mx-1 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <li>
              <Link href="/projects" className="hover:text-primary transition-colors">
                Projects
              </Link>
            </li>
            <svg className="h-4 w-4 mx-1 text-muted-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <li className="font-medium text-foreground">
              {project.title}
            </li>
          </ol>
        </nav>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* Project Gallery */}
          {project.folderName && (
            <ImageGallery projectFolder={project.folderName} />
          )}

          {/* Project Content */}
          <div className="mt-8">            <h1 className="text-3xl font-bold">{project.title}</h1>
            <div className="flex flex-wrap gap-2 mt-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground"
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
        </div>        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card text-card-foreground border rounded-lg p-6 sticky top-20 shadow-sm">
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
            <div className="space-y-4">              {project.demoUrl && (
                <div>
                  <h4 className="font-medium mb-2">Live Demo</h4>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2 px-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-md transition-colors"
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
                    className="block w-full text-center py-2 px-4 border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
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