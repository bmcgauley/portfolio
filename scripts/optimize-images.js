import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

const QUALITY = 70; // Reduced quality from 80 to 70
const MAX_WIDTH = 1280; // Reduced from 1920 to 1280
const MAX_HEIGHT = 720; // Reduced from 1080 to 720

async function processImage(inputPath, outputPath) {
  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();

    // Calculate new dimensions while maintaining aspect ratio
    let width = metadata.width;
    let height = metadata.height;
    
    if (width > MAX_WIDTH) {
      height = Math.round((height * MAX_WIDTH) / width);
      width = MAX_WIDTH;
    }
    
    if (height > MAX_HEIGHT) {
      width = Math.round((width * MAX_HEIGHT) / height);
      height = MAX_HEIGHT;
    }

    // Create a temporary file for the optimized version
    const tempOutputPath = outputPath + '.temp';
    
    await image
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ 
        quality: QUALITY,
        effort: 6,
        nearLossless: true
      })
      .toFile(tempOutputPath);

    const originalStats = await fs.stat(inputPath);
    const optimizedStats = await fs.stat(tempOutputPath);
    
    // Only keep the optimized version if it's smaller
    if (optimizedStats.size < originalStats.size) {
      await fs.rename(tempOutputPath, outputPath);
      const savings = ((originalStats.size - optimizedStats.size) / originalStats.size * 100).toFixed(2);
      console.log(`Optimized: ${path.basename(inputPath)}`);
      console.log(`Size reduction: ${savings}%`);
    } else {
      // If the optimized version is larger, delete it and copy the original
      await fs.unlink(tempOutputPath);
      console.log(`Skipped: ${path.basename(inputPath)} (optimized version was larger)`);
    }
  } catch (error) {
    console.error(`Error processing ${inputPath}:`, error);
  }
}

async function processDirectory(inputDir, outputDir) {
  try {
    // Create output directory if it doesn't exist
    await fs.mkdir(outputDir, { recursive: true });
    
    const entries = await fs.readdir(inputDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const inputPath = path.join(inputDir, entry.name);
      
      if (entry.isDirectory()) {
        // Recursively process subdirectories
        await processDirectory(
          inputPath,
          path.join(outputDir, entry.name)
        );
      } else if (entry.isFile() && /\.(jpg|jpeg|png)$/i.test(entry.name)) {
        // Process image files
        const outputPath = path.join(
          outputDir,
          entry.name.replace(/\.(jpg|jpeg|png)$/i, '.webp')
        );
        await processImage(inputPath, outputPath);
      }
    }
  } catch (error) {
    console.error(`Error processing directory ${inputDir}:`, error);
  }
}

// Main execution
const inputDir = path.join(process.cwd(), 'public', 'images');
const outputDir = path.join(process.cwd(), 'public', 'images-optimized');

console.log('Starting image optimization...');
await processDirectory(inputDir, outputDir);
console.log('Image optimization complete!'); 