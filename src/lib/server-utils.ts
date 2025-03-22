import fs from 'fs';
import path from 'path';
import { promises as fsPromises } from 'fs';
import puppeteer from 'puppeteer';

/**
 * Gets all image filenames from a specific project folder
 * Server-side only function
 * @param projectFolder - The name of the project folder
 * @returns Array of image URLs for the project
 */
export function getProjectImagesLocal(projectFolder: string): string[] {
  const projectPath = path.join(process.cwd(), 'public', 'images', 'projects', projectFolder);
  
  try {
    if (!fs.existsSync(projectPath)) {
      return [];
    }
    
    const files = fs.readdirSync(projectPath);
    const imageFiles = files.filter(file => {
      const extension = path.extname(file).toLowerCase();
      return ['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(extension);
    });
    
    // Sort files to get consistent order (preview.jpg first if it exists)
    return imageFiles
      .sort((a, b) => {
        // Put preview.jpg first
        if (a === 'preview.jpg') return -1;
        if (b === 'preview.jpg') return 1;
        
        // For numbered images like image (1).png, sort numerically
        const numA = parseInt(a.match(/\((\d+)\)/)?.[1] || '999');
        const numB = parseInt(b.match(/\((\d+)\)/)?.[1] || '999');
        return numA - numB;
      })
      .map(file => `/images/projects/${projectFolder}/${file}`);
  } catch (error) {
    console.error(`Error reading directory for project ${projectFolder}:`, error);
    return [];
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
    
    // Check if placeholder exists
    if (fs.existsSync(placeholderPath)) {
      // Copy the placeholder to the target location
      fs.copyFileSync(placeholderPath, outputPath);
      console.log(`Using placeholder image for ${outputPath}`);
      return true;
    } else {
      // Create a directory for the placeholder if it doesn't exist
      const placeholderDir = path.dirname(placeholderPath);
      if (!fs.existsSync(placeholderDir)) {
        fs.mkdirSync(placeholderDir, { recursive: true });
      }
      
      console.log('No placeholder image found, attempting to create minimal JPG');
      
      // Create a minimal valid JPG file (1x1 pixel)
      const minimalJpg = Buffer.from([
        0xff, 0xd8, // SOI marker
        0xff, 0xe0, // APP0 marker
        0x00, 0x10, // APP0 header size (16 bytes)
        0x4a, 0x46, 0x49, 0x46, 0x00, // JFIF identifier
        0x01, 0x01, // JFIF version
        0x00, // density units
        0x00, 0x01, // X density (1)
        0x00, 0x01, // Y density (1)
        0x00, 0x00, // thumbnail width/height (0)
        0xff, 0xdb, // DQT marker
        0x00, 0x43, // DQT length (67 bytes)
        0x00, // Precision and table index
        // Luminance quantization table (values don't matter much for a placeholder)
        0x10, 0x0b, 0x0c, 0x0e, 0x0c, 0x0a, 0x10, 0x0e,
        0x0d, 0x0e, 0x12, 0x11, 0x10, 0x13, 0x18, 0x28,
        0x1a, 0x18, 0x16, 0x16, 0x18, 0x31, 0x23, 0x25,
        0x1d, 0x28, 0x3a, 0x33, 0x3d, 0x3c, 0x39, 0x33,
        0x38, 0x37, 0x40, 0x48, 0x5c, 0x4e, 0x40, 0x44,
        0x57, 0x45, 0x37, 0x38, 0x50, 0x6d, 0x51, 0x57,
        0x5f, 0x62, 0x67, 0x68, 0x67, 0x3e, 0x4d, 0x71,
        0x79, 0x70, 0x64, 0x78, 0x5c, 0x65, 0x67, 0x63,
        // SOF marker (start of frame)
        0xff, 0xc0, // SOF0 marker
        0x00, 0x0b, // SOF0 length (11 bytes)
        0x08, // Precision (8 bits)
        0x00, 0x01, // Height (1 pixel)
        0x00, 0x01, // Width (1 pixel)
        0x01, // Number of components (1 = grayscale)
        0x01, 0x11, 0x00, // Component 1 parameters
        // DHT marker (define Huffman table)
        0xff, 0xc4, // DHT marker
        0x00, 0x14, // DHT length (20 bytes)
        0x00, // Table class and index
        0x01, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, // Counts 
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x0a, // Value for code length 1
        // SOS marker (start of scan)
        0xff, 0xda, // SOS marker
        0x00, 0x08, // SOS length (8 bytes)
        0x01, // Number of components (1)
        0x01, 0x00, // First component parameters
        0x00, 0x00, 0x00, // Spectral selection
        0x3f, // Example data byte
        0xff, 0xd9 // EOI marker
      ]);
      
      fs.writeFileSync(placeholderPath, minimalJpg);
      fs.copyFileSync(placeholderPath, outputPath);
      
      console.log(`Created minimal JPG placeholder for ${outputPath}`);
      return true;
    }
  } catch (error) {
    console.error('Error creating fallback image:', error);
    
    // Last resort - create an empty file
    try {
      // Create an empty file to prevent repeated errors
      fs.writeFileSync(outputPath, Buffer.alloc(0));
      return true;
    } catch (e) {
      console.error('Failed to create even an empty fallback file:', e);
      return false;
    }
  }
}

/**
 * Takes a screenshot of a website and saves it as an image
 */
export async function createPreviewImage(url: string, outputPath: string): Promise<boolean> {
  console.log(`Creating preview for ${url} at ${outputPath}`);
  let browser = null;
  
  try {
    browser = await puppeteer.launch({
      headless: true, 
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set viewport size for the screenshot
    await page.setViewport({
      width: 1200,
      height: 630,
      deviceScaleFactor: 1
    });
    
    // Navigate to URL with a timeout
    await page.goto(url, { 
      waitUntil: 'networkidle2',
      timeout: 30000  // 30 seconds timeout
    });
    
    // Wait for the page to stabilize (3 seconds)
    await delay(3000);
    
    // Take a screenshot
    await page.screenshot({
      path: outputPath,
      type: 'jpeg',
      quality: 80
    });
    
    await browser.close();
    
    // Verify the file was created
    if (fs.existsSync(outputPath)) {
      console.log(`Screenshot saved to ${outputPath}`);
      return true;
    } else {
      console.error(`Failed to save screenshot to ${outputPath}`);
      return await createFallbackImage(outputPath);
    }
  } catch (error) {
    console.error(`Error taking screenshot of ${url}:`, error);
    
    // Clean up browser if it's still open
    if (browser) {
      await browser.close();
    }
    
    // Use fallback image
    return await createFallbackImage(outputPath);
  }
} 