import { NextRequest, NextResponse } from 'next/server';
import { getProjectImagesLocal } from '@/lib/server-utils';
import path from 'path';
import fs from 'fs/promises';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const projectFolder = searchParams.get('folder');

  if (!projectFolder) {
    return NextResponse.json(
      { error: 'Project folder parameter is required' },
      { status: 400 }
    );
  }

  try {
    // Ensure project folder exists
    const projectPath = path.join(process.cwd(), 'public', 'images', 'projects', projectFolder);
    
    try {
      await fs.access(projectPath);
    } catch (e) {
      // Create the directory if it doesn't exist
      console.log(`Creating missing project directory: ${projectPath}`);
      await fs.mkdir(projectPath, { recursive: true });
      
      // Create a README.md with instructions
      const readmePath = path.join(projectPath, 'README.md');
      const readmeContent = `# ${projectFolder} Images\n\nPlace project images in this folder. They will be automatically displayed in the project gallery.\n\nRecommended image sizes:\n- Feature images: 1200x630 pixels\n- Gallery images: 800x600 pixels or similar aspect ratio\n`;
      
      await fs.writeFile(readmePath, readmeContent);
    }
    
    // Get images
    const images = await getProjectImagesLocal(projectFolder);
    return NextResponse.json({ images });
  } catch (error) {
    console.error(`Error reading directory for project ${projectFolder}:`, error);
    return NextResponse.json(
      { error: 'Failed to read project images' },
      { status: 500 }
    );
  }
}