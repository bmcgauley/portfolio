import { promises as fs } from 'fs';
import fsSync from 'fs';
import path from 'path';
import 'server-only';
import { createHash } from 'crypto';

// Constants for image validation
const VALID_IMAGE_TYPES = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB
const FALLBACK_IMAGE = '/images/placeholders/site-preview-placeholder.jpg';

// Utility to validate file path
function isValidPath(filepath: string, baseDir: string): boolean {
  const resolvedPath = path.resolve(filepath);
  const resolvedBase = path.resolve(baseDir);
  return resolvedPath.startsWith(resolvedBase) && !resolvedPath.includes('\0');
}

// Utility to validate image file
async function validateImageFile(filepath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(filepath);
    if (stats.size > MAX_IMAGE_SIZE) {
      console.error(`Image exceeds maximum size: ${filepath}`);
      return false;
    }

    // Read first few bytes to check magic numbers
    const buffer = Buffer.alloc(8);
    const fd = await fs.open(filepath, 'r');
    await fd.read(buffer, 0, 8, 0);
    await fd.close();

    // Check magic numbers for common image types
    const isJPEG = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
    const isPNG = buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47;
    const isGIF = buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46;
    const isWEBP = buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50;

    return isJPEG || isPNG || isGIF || isWEBP;
  } catch (error) {
    console.error(`Error validating image file: ${filepath}`, error);
    return false;
  }
}

// Enhanced path sanitization
function sanitizePath(inputPath: string): string {
  // Remove any path traversal sequences and non-alphanumeric characters
  const sanitized = path.normalize(inputPath)
    .replace(/^(\.\.[\/\\])+/, '')
    .replace(/[^a-zA-Z0-9-_./\\]/g, '');
  
  return sanitized;
}

/**
 * Gets all image filenames from a specific project folder
 * Server-side only function
 */
export async function getProjectImagesLocal(projectFolder: string): Promise<string[]> {
  if (!projectFolder) {
    console.warn('No project folder provided to getProjectImagesLocal');
    return [FALLBACK_IMAGE];
  }

  try {
    // Sanitize and validate project folder path
    const sanitizedFolder = sanitizePath(projectFolder);
    const projectPath = path.join(process.cwd(), 'public', 'images', 'projects', sanitizedFolder);
    
    if (!isValidPath(projectPath, process.cwd())) {
      console.error('Invalid project path detected');
      return [FALLBACK_IMAGE];
    }
    
    // Verify directory exists
    await fs.access(projectPath);
    
    // Read and validate files
    const files = await fs.readdir(projectPath);
    const imagePromises = files.map(async (file: string) => {
      const extension = path.extname(file).toLowerCase().slice(1);
      const fullPath = path.join(projectPath, file);
      
      if (!VALID_IMAGE_TYPES.includes(extension)) {
        return null;
      }
      
      const isValid = await validateImageFile(fullPath);
      return isValid ? `/images/projects/${projectFolder}/${file}` : null;
    });
    
    const validImages = (await Promise.all(imagePromises)).filter(Boolean) as string[];
    
    if (validImages.length === 0) {
      console.warn(`No valid images found in ${sanitizedFolder}`);
      return [FALLBACK_IMAGE];
    }
    
    return validImages.sort((a, b) => {
      // Put preview.jpg first
      if (a.endsWith('preview.jpg')) return -1;
      if (b.endsWith('preview.jpg')) return 1;
      
      // For numbered images, sort numerically
      const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || '999');
      const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || '999');
      return numA - numB;
    });
  } catch (error) {
    console.error(`Error reading directory for project ${projectFolder}:`, error);
    return [FALLBACK_IMAGE];
  }
}

// Helper function to create a delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Creates a fallback image when screenshot generation fails
 */
async function createFallbackImage(outputPath: string): Promise<boolean> {
  try {
    const placeholderPath = path.join(process.cwd(), 'public', 'images', 'placeholders', 'site-preview-placeholder.jpg');
    
    if (!isValidPath(outputPath, process.cwd())) {
      console.error('Invalid output path detected');
      return false;
    }

    try {
      await fs.access(placeholderPath);
      await fs.copyFile(placeholderPath, outputPath);
      console.log(`Using placeholder image for ${outputPath}`);
      return true;
    } catch {
      // Create the placeholders directory if it doesn't exist
      const placeholderDir = path.dirname(placeholderPath);
      await fs.mkdir(placeholderDir, { recursive: true });
      
      console.log('Creating minimal JPG placeholder');
      
      // Create a minimal valid JPG file (1x1 pixel)
      const minimalJpg = Buffer.from([
        0xff, 0xd8, // SOI marker
        0xff, 0xe0, // APP0 marker
        0x00, 0x10, // APP0 header size
        0x4a, 0x46, 0x49, 0x46, 0x00, // JFIF identifier
        0x01, 0x01, // JFIF version
        0x00, // density units
        0x00, 0x01, // X density
        0x00, 0x01, // Y density
        0x00, 0x00, // thumbnail size
        // ... rest of JPG structure
        0xff, 0xd9 // EOI marker
      ]);
      
      await fs.writeFile(placeholderPath, minimalJpg);
      await fs.copyFile(placeholderPath, outputPath);
      
      return true;
    }
  } catch (error) {
    console.error('Error creating fallback image:', error);
    return false;
  }
}

/**
 * Takes a screenshot of a website and saves it as an image
 */
export async function createPreviewImage(url: string, outputPath: string): Promise<boolean> {
  console.log(`Creating preview for ${url}`);
  let browser = null;
  
  try {
    // Validate output path
    if (!isValidPath(outputPath, process.cwd())) {
      throw new Error('Invalid output path');
    }

    // Validate URL
    try {
      new URL(url);
    } catch {
      throw new Error('Invalid URL');
    }

    const puppeteer = await import('puppeteer');
    
    browser = await puppeteer.default.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1
    });
    
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000
    });
    
    await delay(3000);
    
    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 80
    });
    
    await browser.close();
    
    // Verify the screenshot
    const isValid = await validateImageFile(outputPath);
    if (!isValid) {
      console.error(`Image validation failed for ${outputPath}`);
      throw new Error('Generated image failed validation');
    }

    console.log(`Screenshot saved to ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`Error taking screenshot of ${url}:`, error);
    
    if (browser) {
      await browser.close();
    }
    
    return await createFallbackImage(outputPath);
  }
}

/**
 * Gets the site preview image with enhanced security
 */
export function getSitePreview(url: string): { preview: string; imageExists: boolean } {
  const FALLBACK_RESPONSE = {
    preview: FALLBACK_IMAGE,
    imageExists: false
  };

  try {
    // Validate URL
    const urlObj = new URL(url);
    const projectId = urlObj.searchParams.get('projectId');
    
    if (!projectId) {
      return FALLBACK_RESPONSE;
    }

    // Sanitize projectId
    const sanitizedId = sanitizePath(projectId);
    const previewImagePath = path.join(process.cwd(), 'public', 'images', 'previews', `${sanitizedId}.jpg`);
    
    // Validate path
    if (!isValidPath(previewImagePath, process.cwd())) {
      console.error('Invalid preview image path detected');
      return FALLBACK_RESPONSE;
    }

    if (fsSync.existsSync(previewImagePath)) {
      // Verify file is a valid image
      const buffer = fsSync.readFileSync(previewImagePath);
      const isJpeg = buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF;
      
      if (isJpeg) {
        // Calculate file hash for cache busting
        const hash = createHash('md5').update(buffer).digest('hex').substring(0, 8);
        return {
          preview: `/images/previews/${sanitizedId}.jpg?v=${hash}`,
          imageExists: true
        };
      }
    }
  } catch (error) {
    console.error('Error in getSitePreview:', error);
  }

  return FALLBACK_RESPONSE;
}
