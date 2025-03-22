import { NextRequest, NextResponse } from 'next/server';
import { getProjectImagesLocal } from '@/lib/server-utils';

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
    const images = getProjectImagesLocal(projectFolder);
    return NextResponse.json({ images });
  } catch (error) {
    console.error(`Error reading directory for project ${projectFolder}:`, error);
    return NextResponse.json(
      { error: 'Failed to read project images' },
      { status: 500 }
    );
  }
} 