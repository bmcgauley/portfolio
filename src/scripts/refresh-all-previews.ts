import { projects } from '../lib/data';

/**
 * This script helps refresh all project previews
 * Run it with ts-node or similar tool
 */
async function refreshAllPreviews() {
  console.log('Starting preview refresh for all projects...');
  
  for (const project of projects) {
    if (project.demoUrl) {
      try {
        console.log(`Refreshing preview for ${project.title} (ID: ${project.id})...`);
        
        // Build the API URL in the same way as RefreshPreviewButton
        const apiUrl = `/api/site-preview?projectId=${encodeURIComponent(project.id)}&url=${encodeURIComponent(project.demoUrl)}&refresh=true`;
        
        // Since this is a Node.js script, we need to use the full URL
        const baseUrl = 'http://localhost:3000';
        const fullUrl = `${baseUrl}${apiUrl}`;
        
        // Make the API call
        const response = await fetch(fullUrl);
        
        if (!response.ok) {
          throw new Error(`Failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log(`✅ Success! Preview URL: ${data.previewUrl}`);
      } catch (error) {
        console.error(`❌ Error refreshing preview for ${project.title}:`, error);
      }
    } else {
      console.log(`⚠️ Skipping ${project.title} (ID: ${project.id}) - no demo URL`);
    }
  }
  
  console.log('Preview refresh complete!');
}

// Run the function
refreshAllPreviews(); 