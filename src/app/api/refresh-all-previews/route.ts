import { NextRequest, NextResponse } from 'next/server';
import { projects } from '@/lib/data';
import { getSitePreview } from '@/lib/utils';

// This is an admin API endpoint to refresh all project previews
export async function GET() {
  try {
    const results = [];
    
    // Loop through all projects with demoUrls
    for (const project of projects) {
      if (project.demoUrl) {
        try {
          console.log(`Refreshing preview for ${project.title} (ID: ${project.id})...`);
          
          // Get the site preview (with force refresh)
          const preview = await getSitePreview(project.id, project.demoUrl, true);
          
          results.push({
            id: project.id,
            title: project.title,
            status: 'success',
            previewUrl: preview.previewUrl
          });
          
          console.log(`✅ Success refreshing preview for ${project.title}`);
        } catch (error) {
          console.error(`❌ Error refreshing preview for ${project.title}:`, error);
          
          results.push({
            id: project.id,
            title: project.title,
            status: 'error',
            error: error instanceof Error ? error.message : 'Unknown error'
          });
        }
        
        // Add a small delay to avoid overwhelming the server
        await new Promise(resolve => setTimeout(resolve, 500));
      } else {
        results.push({
          id: project.id,
          title: project.title,
          status: 'skipped',
          reason: 'No demo URL'
        });
      }
    }
    
    return NextResponse.json({
      success: true,
      message: 'Refresh process completed',
      results
    });
  } catch (error) {
    console.error('Error in refresh all previews API:', error);
    
    return NextResponse.json(
      { 
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 