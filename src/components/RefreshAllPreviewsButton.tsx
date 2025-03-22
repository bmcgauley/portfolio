"use client";

import { useState } from 'react';

interface RefreshResult {
  id: string;
  title: string;
  status: 'success' | 'error' | 'skipped';
  previewUrl?: string;
  error?: string;
  reason?: string;
}

export default function RefreshAllPreviewsButton() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<RefreshResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refreshAllPreviews = async () => {
    setIsLoading(true);
    setError(null);
    setResults([]);
    setShowResults(true);
    
    try {
      console.log('Refreshing all project previews...');
      
      const response = await fetch('/api/refresh-all-previews', {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed with status: ${response.status}`);
      }

      const data = await response.json();
      
      if (!data.success) {
        throw new Error(data.error || 'Failed to refresh previews');
      }
      
      setResults(data.results);
      console.log('All previews refreshed!', data.results);
    } catch (err) {
      console.error('Error refreshing all previews:', err);
      setError(err instanceof Error ? err.message : 'Failed to refresh previews');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleResults = () => {
    setShowResults(!showResults);
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
        <h3 className="text-lg font-semibold">Project Previews</h3>
        
        <div className="flex gap-2">
          <button
            onClick={toggleResults}
            disabled={results.length === 0 && !error}
            className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            {showResults ? 'Hide Results' : 'Show Results'}
          </button>
          
          <button
            onClick={refreshAllPreviews}
            disabled={isLoading}
            className="text-sm px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 flex items-center gap-1"
          >
            {isLoading && (
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            )}
            {isLoading ? 'Refreshing...' : 'Refresh All Previews'}
          </button>
        </div>
      </div>
      
      {error && showResults && (
        <div className="text-red-500 text-sm mb-3 p-2 bg-red-50 dark:bg-red-900/20 rounded">
          {error}
        </div>
      )}
      
      {showResults && results.length > 0 && (
        <div className="mt-3 text-sm">
          <h4 className="font-medium mb-2">Results:</h4>
          <div className="max-h-60 overflow-y-auto border dark:border-gray-700 rounded">
            <table className="w-full text-left">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-2">Project</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Details</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result) => (
                  <tr key={result.id} className="border-t dark:border-gray-700">
                    <td className="px-4 py-2">{result.title}</td>
                    <td className="px-4 py-2">
                      <span className={`px-2 py-1 rounded text-xs ${
                        result.status === 'success' 
                          ? 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200' 
                          : result.status === 'error'
                            ? 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-200'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                      }`}>
                        {result.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      {result.status === 'success' && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          Preview updated
                        </span>
                      )}
                      {result.status === 'error' && (
                        <span className="text-xs text-red-500">
                          {result.error}
                        </span>
                      )}
                      {result.status === 'skipped' && (
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {result.reason}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
} 