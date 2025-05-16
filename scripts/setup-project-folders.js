const fs = require('fs');
const path = require('path');

// Import projects data dynamically since it's ESM
let projects;
try {
  // Use a dynamic import trick for importing ESM modules in CommonJS
  const projectsPath = path.join(__dirname, '../src/lib/data.ts');
  const content = fs.readFileSync(projectsPath, 'utf8');
  
  // Extract the projects array from the data.ts file
  // This is a simple parser for demonstration - in production you might want a more robust solution
  const projectsMatch = content.match(/export\s+const\s+projects\s*=\s*\[([\s\S]*?)];/);
  
  if (projectsMatch && projectsMatch[1]) {
    // Parse the projects from the string - this is a very simplistic approach
    const projectsData = [];
    const projectBlocks = projectsMatch[1].split('},');
    
    projectBlocks.forEach((block, index) => {
      if (!block.trim()) return;
      
      // Add closing brace if it's not the last item
      if (index < projectBlocks.length - 1) {
        block += '}';
      }
      
      // Extract id, title, and folderName
      const idMatch = block.match(/id:\s*['"]([^'"]+)['"]/);
      const titleMatch = block.match(/title:\s*['"]([^'"]+)['"]/);
      const folderMatch = block.match(/folderName:\s*['"]([^'"]+)['"]/);
      
      if (idMatch && titleMatch) {
        projectsData.push({
          id: idMatch[1],
          title: titleMatch[1],
          folderName: folderMatch ? folderMatch[1] : null
        });
      }
    });
    
    projects = projectsData;
  } else {
    throw new Error('Could not parse projects from data.ts');
  }
} catch (error) {
  console.error('Error importing projects:', error);
  projects = [];

// Define the base directory for project images
const BASE_PROJECT_IMAGES_DIR = path.join(__dirname, '../public/images/projects');

// Create the base directory if it doesn't exist
if (!fs.existsSync(BASE_PROJECT_IMAGES_DIR)) {
  console.log(`Creating base projects directory at: ${BASE_PROJECT_IMAGES_DIR}`);
  fs.mkdirSync(BASE_PROJECT_IMAGES_DIR, { recursive: true });
}

// Iterate through each project and ensure its folder exists
projects.forEach(project => {
  if (!project.folderName) {
    console.warn(`Project "${project.title}" (ID: ${project.id}) doesn't have a folderName. Skipping.`);
    return;
  }
  
  const projectDir = path.join(BASE_PROJECT_IMAGES_DIR, project.folderName);
  
  // Check if project directory exists, create if it doesn't
  if (!fs.existsSync(projectDir)) {
    console.log(`Creating directory for project "${project.title}": ${projectDir}`);
    fs.mkdirSync(projectDir, { recursive: true });
    
    // Create a placeholder image if there's no image provided yet
    const placeholderSource = path.join(__dirname, '../public/images/profile/torch_high+res.fw.webp');
    
    if (fs.existsSync(placeholderSource)) {
      const placeholderDest = path.join(projectDir, 'placeholder.webp');
      console.log(`Creating placeholder image in: ${placeholderDest}`);
      fs.copyFileSync(placeholderSource, placeholderDest);
    }
    
    // Create a README.md with instructions
    const readmePath = path.join(projectDir, 'README.md');
    const readmeContent = `# ${project.title} Images\n\nPlace project images in this folder. They will be automatically displayed in the project gallery.\n\nRecommended image sizes:\n- Feature images: 1200x630 pixels\n- Gallery images: 800x600 pixels or similar aspect ratio\n`;
    
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`Created README.md with instructions in: ${readmePath}`);
  } else {
    console.log(`Project directory already exists for "${project.title}": ${projectDir}`);
  }
});

console.log('Project folder setup complete!')
}
