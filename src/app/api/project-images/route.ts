import { NextRequest, NextResponse } from 'next/server';
import { getProjectImagesLocal } from '@/lib/server-utils';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const projectFolder = searchParams.get('folder');

    if (!projectFolder) {
      return NextResponse.json(
        { error: 'Project folder parameter is required' },
        { status: 400 }
      );
    }

    // Sanitize project folder name
    const sanitizedFolder = path.normalize(projectFolder).replace(/[^a-zA-Z0-9-_]/g, '');
    
    // Validate path
    const projectPath = path.join(process.cwd(), 'public', 'images', 'projects', sanitizedFolder);
    const resolvedPath = path.resolve(projectPath);
    const publicDir = path.resolve(process.cwd(), 'public');
    
    if (!resolvedPath.startsWith(publicDir)) {
      return NextResponse.json(
        { error: 'Invalid project folder path' },
        { status: 400 }
      );
    }

    try {
      await fs.access(projectPath);
    } catch {
      // Create the directory if it doesn't exist
      console.log(`Creating project directory: ${projectPath}`);
      await fs.mkdir(projectPath, { recursive: true });
      
      // Create README with instructions
      const readmePath = path.join(projectPath, 'README.md');
      const readmeContent = `# ${sanitizedFolder} Images

Place project images in this folder. They will be automatically displayed in the project gallery.

Recommended image sizes:
- Feature images: 1200x630 pixels
- Gallery images: 800x600 pixels or similar aspect ratio

Supported formats: .jpg, .jpeg, .png, .gif, .webp
`;
      
      await fs.writeFile(readmePath, readmeContent);
    }
    
    // Get and validate images
    const images = await getProjectImagesLocal(sanitizedFolder);
    
    // Add cache control headers
    return new NextResponse(
      JSON.stringify({ images }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=60, stale-while-revalidate=300'
        }
      }
    );
  } catch (error) {
    console.error('Error in project-images route:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}