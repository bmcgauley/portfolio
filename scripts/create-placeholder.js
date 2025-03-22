const { createCanvas } = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a placeholder image for site previews
async function createPlaceholderImage() {
  const width = 1200;
  const height = 630;
  
  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Fill background
  ctx.fillStyle = '#0f172a'; // Dark blue (Tailwind slate-900)
  ctx.fillRect(0, 0, width, height);
  
  // Add text
  ctx.font = 'bold 64px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('Preview Unavailable', width / 2, height / 2 - 40);
  
  // Add secondary text
  ctx.font = '36px Arial';
  ctx.fillText('Click to refresh', width / 2, height / 2 + 40);
  
  // Save the image
  const outputDir = path.join(__dirname, '..', 'public', 'images', 'placeholders');
  
  // Ensure directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  const outputPath = path.join(outputDir, 'site-preview-placeholder.jpg');
  const buffer = canvas.toBuffer('image/jpeg');
  fs.writeFileSync(outputPath, buffer);
  
  console.log(`Created placeholder image at: ${outputPath}`);
}

createPlaceholderImage().catch(err => console.error('Error creating placeholder:', err)); 