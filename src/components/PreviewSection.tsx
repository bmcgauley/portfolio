import React, { useState } from 'react';
import { ImageWithLoading } from '@/components/ui/image-with-loading';
import RefreshPreviewButton from "./RefreshPreviewButton";
import { ErrorBoundary } from 'react-error-boundary';

interface PreviewSectionProps {
  projectId: string;
  demoUrl: string;
  initialPreviewUrl: string;
  title: string;
}

function ErrorFallback({ error, resetErrorBoundary }: { error: Error, resetErrorBoundary: () => void }) {
  return (
    <div className="text-center p-4 border border-red-200 rounded-md bg-red-50">
      <p className="text-red-600 mb-2">Error loading preview</p>
      <button
        onClick={resetErrorBoundary}
        className="px-4 py-2 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}

function PreviewSection({
  projectId,
  demoUrl,
  initialPreviewUrl,
  title,
}: PreviewSectionProps) {
  const [previewUrl, setPreviewUrl] = useState(initialPreviewUrl);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 3;

  const handleRefreshComplete = (newUrl: string) => {
    setPreviewUrl(newUrl);
    setIsRefreshing(false);
    setRetryCount(0);
  };

  const handleRefreshError = () => {
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      // Implement exponential backoff
      setTimeout(() => {
        setIsRefreshing(true);
      }, Math.pow(2, retryCount) * 1000);
    } else {
      setIsRefreshing(false);
      setRetryCount(0);
    }
  };

  const ErrorBoundaryWrapper = ({ children }: { children: React.ReactNode }) => (
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => {
        setRetryCount(0);
        setIsRefreshing(false);
        window.location.reload();
      }}
    >
      {children}
    </ErrorBoundary>
  );

  return (
    <ErrorBoundaryWrapper>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-medium">Site Preview</h4>
          <div className="flex items-center gap-2">
            {isRefreshing && (
              <span className="text-sm text-gray-500" role="status">
                Refreshing
                {retryCount > 0 && ` (Attempt ${retryCount}/${MAX_RETRIES})`}
              </span>
            )}
            <RefreshPreviewButton
              projectId={projectId}
              demoUrl={demoUrl}
              onRefreshComplete={handleRefreshComplete}
              onError={handleRefreshError}
              disabled={isRefreshing}
            />
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">Preview URL: {previewUrl}</p>
        <div key={previewUrl} className="relative overflow-hidden rounded-md aspect-video">
          <ImageWithLoading
            src={previewUrl}
            alt={`Preview of ${title}`}
            className="object-cover"
            fill
            sizes="(max-width: 640px) 100vw, 400px"
            priority
            onError={() => {
              if (retryCount < MAX_RETRIES) {
                setRetryCount(prev => prev + 1);
                // Trigger a retry with exponential backoff
                setTimeout(() => {
                  const img = new Image();
                  img.src = previewUrl + '?retry=' + Date.now();
                }, Math.pow(2, retryCount) * 1000);
              }
            }}
          />
        </div>
      </div>
    </ErrorBoundaryWrapper>
  );
}

export default PreviewSection;