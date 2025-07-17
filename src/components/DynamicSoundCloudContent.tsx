'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, ExternalLink } from 'lucide-react';

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
  releases: SoundCloudRelease[];
  error?: string;
  lastFetch: string;
}

export default function DynamicSoundCloudContent() {
  const [data, setData] = useState<SoundCloudData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSoundCloudData = async () => {
    try {
      const url = `/api/soundcloud`;
      const response = await fetch(url);
      const result = await response.json();
      
      // Transform API response to match expected structure
      if (result.success && result.data) {
        setData({
          releases: result.data,
          lastFetch: result.lastFetched || new Date().toISOString()
        });
      } else {
        setData({
          releases: [],
          error: result.error || 'Failed to load SoundCloud content',
          lastFetch: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error fetching SoundCloud data:', error);
      setData({
        releases: [],
        error: 'Failed to load SoundCloud content',
        lastFetch: new Date().toISOString()
      });
    }
  };



  useEffect(() => {
    fetchSoundCloudData().finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="grid gap-8">
        {[1, 2].map((i) => (
          <Card key={i} className="bg-card text-card-foreground">
            <CardHeader>
              <div className="h-6 bg-muted rounded animate-pulse mb-2"></div>
              <div className="h-4 bg-muted rounded animate-pulse max-w-2/3"></div>
            </CardHeader>
            <CardContent>
              <div className="h-[450px] bg-muted rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!data || data.error) {
    return (
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle className="text-red-500">Error Loading Music</CardTitle>
          <CardDescription>
            {data?.error || 'Unknown error occurred'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => fetchSoundCloudData()} variant="outline">
            {/* <RefreshCw className="h-4 w-4 mr-2" /> */}
            Try Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-8">
      {/* Last updated info */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Last updated: {new Date(data.lastFetch).toLocaleString()}
        </p>
      </div>

      {/* Releases */}
      <div className="grid gap-8">
        {data.releases && data.releases.length > 0 ? data.releases.map((release, index) => (
          <Card key={index} className="bg-card text-card-foreground border-l-4 border-l-secondary">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/10 rounded-full">
                    <Play className="h-5 w-5 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-semibold">
                      {release.title}
                      <span className="ml-2 text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
                        {release.type === 'playlist' ? 'Album' : 'Single'}
                      </span>
                    </CardTitle>
                    <CardDescription className="mt-1">
                      {release.description}
                    </CardDescription>
                  </div>
                </div>
                <Button
                  asChild
                  variant="ghost"
                  size="sm"
                  className="shrink-0"
                >
                  <a
                    href={release.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-muted-foreground hover:text-secondary"
                  >
                    <ExternalLink className="h-3 w-3" />
                    Open in SoundCloud
                  </a>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div 
                className="soundcloud-embed rounded-lg overflow-hidden shadow-md"
                dangerouslySetInnerHTML={{ __html: release.embed.html }}
              />
              <div className="mt-4 flex items-center justify-between text-sm text-muted-foreground">
                <span>By {release.embed.author_name}</span>
                <span>{release.type === 'playlist' ? 'Full Album' : 'Single Track'}</span>
              </div>
            </CardContent>
          </Card>
        )) : null}
      </div>

      {data.releases && data.releases.length === 0 && (
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>No Releases Found</CardTitle>
            <CardDescription>
              No SoundCloud releases are currently available. Check back later for new music!
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
