'use client';

import { useEffect, useState } from 'react';

interface SoundCloudRelease {
  type: 'track' | 'playlist';
  url: string;
  title: string;
  description: string;
  embed: {
    html: string;
    title: string;
    author_name: string;
    thumbnail_url?: string;
  };
  lastUpdated: string;
}

interface SoundCloudData {
  success: boolean;
  data: SoundCloudRelease[];
  lastFetched: string;
  profileUrl: string;
}

export function useSoundCloudData() {
  const [data, setData] = useState<SoundCloudData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/soundcloud');
      const result = await response.json();
      
      if (result.success) {
        setData(result);
        setError(null);
      } else {
        setError(result.error || 'Failed to fetch SoundCloud data');
      }
    } catch (err) {
      setError('Network error while fetching SoundCloud data');
      console.error('SoundCloud fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshData = async () => {
    try {
      const response = await fetch('/api/soundcloud', { method: 'POST' });
      const result = await response.json();
      
      if (result.success) {
        setData(result);
        setError(null);
      }
    } catch (err) {
      console.error('Error refreshing SoundCloud data:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    loading,
    error,
    refresh: refreshData,
    lastFetched: data?.lastFetched
  };
}

export type { SoundCloudRelease, SoundCloudData };
