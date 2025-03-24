import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createPreviewImage } from '@/lib/server-utils';

// This is where we'd normally store or cache the preview images
const PREVIEW_CACHE_DIR = path.join(process.cwd(), 'public', 'images', 'previews');
const PREVIEW_METADATA_FILE = path.join(process.cwd(), 'data', 'preview-metadata.json');
const PLACEHOLDER_DIR = path.join(process.cwd(), 'public', 'images', 'placeholders');
const DEFAULT_PLACEHOLDER = path.join(PLACEHOLDER_DIR, 'site-preview-placeholder.jpg');

// Ensure the cache directory exists
try {
  if (!fs.existsSync(PREVIEW_CACHE_DIR)) {
    fs.mkdirSync(PREVIEW_CACHE_DIR, { recursive: true });
    console.log('Created previews directory:', PREVIEW_CACHE_DIR);
  }
  
  // Ensure the placeholders directory exists
  if (!fs.existsSync(PLACEHOLDER_DIR)) {
    fs.mkdirSync(PLACEHOLDER_DIR, { recursive: true });
    console.log('Created placeholders directory:', PLACEHOLDER_DIR);
  }
  
  // Create a default placeholder if none exists
  if (!fs.existsSync(DEFAULT_PLACEHOLDER)) {
    // Create a very basic text file as a placeholder
    fs.writeFileSync(DEFAULT_PLACEHOLDER, 'PLACEHOLDER IMAGE');
    console.log('Created default placeholder image');
  }
  
  // Ensure the data directory exists
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log('Created data directory:', dataDir);
  }
  
  // Initialize metadata if it doesn't exist
  if (!fs.existsSync(PREVIEW_METADATA_FILE)) {
    fs.writeFileSync(PREVIEW_METADATA_FILE, JSON.stringify({}));
    console.log('Initialized metadata file');
  }
} catch (error) {
  console.error('Error setting up directories:', error);
}

interface PreviewMetadata {
  [key: string]: {
    timestamp: number;
    previewUrl: string;
  };
}

// Helper function to read metadata
function readMetadata() {
  try {
    if (!fs.existsSync(PREVIEW_METADATA_FILE)) {
      console.log('Metadata file not found, creating new one');
      fs.writeFileSync(PREVIEW_METADATA_FILE, JSON.stringify({}));
      return {};
    }
    
    const data = fs.readFileSync(PREVIEW_METADATA_FILE, 'utf8');
    
    // Check if the file is empty or contains invalid content
    if (!data || data.trim() === '') {
      console.log('Metadata file is empty, initializing with empty object');
      fs.writeFileSync(PREVIEW_METADATA_FILE, JSON.stringify({}));
      return {};
    }
    
    try {
      return JSON.parse(data);
    } catch (parseError) {
      console.error('Error parsing metadata JSON, resetting file:', parseError);
      // If we can't parse the JSON, reset the metadata file
      fs.writeFileSync(PREVIEW_METADATA_FILE, JSON.stringify({}));
      return {};
    }
  } catch (error) {
    console.error('Error reading metadata:', error);
    // Attempt to recreate the metadata file
    try {
      fs.writeFileSync(PREVIEW_METADATA_FILE, JSON.stringify({}));
    } catch (writeError) {
      console.error('Failed to recreate metadata file:', writeError);
    }
    return {};
  }
}

// Helper function to write metadata
function writeMetadata(metadata: PreviewMetadata) {
  try {
    const data = JSON.stringify(metadata, null, 2);
    fs.writeFileSync(PREVIEW_METADATA_FILE, data, 'utf8');
    return true;
  } catch (error) {
    console.error('Error writing metadata:', error);
    // Try to create the directory if it's missing
    try {
      const dataDir = path.dirname(PREVIEW_METADATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
        // Try writing again
        fs.writeFileSync(PREVIEW_METADATA_FILE, JSON.stringify(metadata, null, 2), 'utf8');
        return true;
      }
    } catch (mkdirError) {
      console.error('Failed to create data directory:', mkdirError);
    }
    return false;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const url = searchParams.get('url');
  const projectId = searchParams.get('projectId');
  const forceRefresh = searchParams.get('refresh') === 'true';

  if (!url) {
    return NextResponse.json(
      { error: 'URL parameter is required' },
      { status: 400 }
    );
  }

  if (!projectId) {
    return NextResponse.json(
      { error: 'Project ID parameter is required' },
      { status: 400 }
    );
  }

  // Validate URL to ensure it has protocol
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    console.log(`Invalid URL format: ${url}. Must start with http:// or https://`);
    return NextResponse.json(
      { 
        error: 'Invalid URL format. Must start with http:// or https://',
        previewUrl: '/images/placeholders/site-preview-placeholder.jpg'
      },
      { status: 400 }
    );
  }

  try {
    // Create a safe filename from the project ID
    const safeFilename = projectId.replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const previewFilename = `${safeFilename}.jpg`;
    const previewPath = path.join(PREVIEW_CACHE_DIR, previewFilename);
    const previewUrl = `/images/previews/${previewFilename}`;
    
    // Get the metadata
    const metadata = readMetadata();
    const projectMetadata = metadata[projectId] || {};
    
    // Check if preview exists and is not requested to be refreshed
    const previewExists = fs.existsSync(previewPath);
    
    if (previewExists && !forceRefresh) {
      console.log(`Using cached preview for ${projectId}`);
      // Return cached preview with metadata
      return NextResponse.json({ 
        previewUrl,
        cached: true,
        lastPreviewUpdate: projectMetadata.lastPreviewUpdate || new Date().toISOString()
      });
    }

    // Generate new preview
    console.log(`Generating preview for ${url}...`);
    const success = await createPreviewImage(url, previewPath);
    
    if (success) {
      // Verify the file was actually created
      if (!fs.existsSync(previewPath)) {
        console.error(`File was not created at ${previewPath}`);
        return NextResponse.json({
          error: 'Failed to generate preview image',
          previewUrl: `/images/placeholders/site-preview-placeholder.jpg`
        }, { status: 500 });
      }
      
      // Update metadata
      const now = new Date().toISOString();
      metadata[projectId] = {
        ...projectMetadata,
        lastPreviewUpdate: now,
        url
      };
      writeMetadata(metadata);
      
      return NextResponse.json({
        previewUrl,
        cached: false,
        lastPreviewUpdate: now
      });
    } else {
      // If unable to generate preview, return a placeholder
      return NextResponse.json({
        error: 'Failed to generate preview',
        previewUrl: `/images/placeholders/site-preview-placeholder.jpg`
      }, { status: 500 });
    }
    
  } catch (error) {
    console.error(`Error generating site preview for ${url}:`, error);
    return NextResponse.json(
      { 
        error: 'Failed to generate site preview',
        previewUrl: `/images/placeholders/site-preview-placeholder.jpg` 
      },
      { status: 500 }
    );
  }
} 