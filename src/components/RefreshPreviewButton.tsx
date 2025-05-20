"use client";

import { useState } from 'react';

export interface RefreshPreviewButtonProps {
  projectId: string;
  demoUrl: string;
  onRefreshComplete?: (previewUrl: string) => void;
  onError?: () => void;
  disabled?: boolean;
}

export default function RefreshPreviewButton({
  projectId,
  demoUrl,
  onRefreshComplete,
  onError,
  disabled = false,
}: RefreshPreviewButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshPreview = async () => {
    if (!demoUrl) {
      console.error('No demo URL available for this project');
      setError('No demo URL available');
      onError?.();
      return;
    }

    setIsLoading(true);
    setError(null);
    console.log(`Refreshing preview for project ${projectId}, URL: ${demoUrl}`);

    try {
      const apiUrl = `/api/site-preview?projectId=${encodeURIComponent(projectId)}&url=${encodeURIComponent(demoUrl)}&refresh=true`;
      console.log(`API call: ${apiUrl}`);
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      // Add a timestamp to the URL to force browser to reload the image
      const previewUrl = `${data.previewUrl}?t=${Date.now()}`;
      
      console.log('Preview refreshed successfully!');
      
      if (onRefreshComplete) {
        onRefreshComplete(previewUrl);
      }
    } catch (error) {
      console.error('Error refreshing preview:', error);
      setError(error instanceof Error ? error.message : 'Failed to refresh preview');
      onError?.();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={refreshPreview}
        disabled={isLoading || !demoUrl || disabled}
        className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        title={!demoUrl ? 'No demo URL available' : 'Refresh site preview'}
      >
        <svg 
          className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
          />
        </svg>
        {isLoading ? 'Refreshing...' : 'Refresh Preview'}
      </button>
      {error && (
        <div className="text-xs text-red-500 mt-1">{error}</div>
      )}
    </div>
  );
}