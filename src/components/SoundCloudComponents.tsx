'use client';

import { useEffect, useState } from 'react';
import { SoundCloudRelease } from '@/hooks/use-soundcloud-data';

interface SoundCloudEmbedProps {
  release: SoundCloudRelease;
}

export function SoundCloudEmbed({ release }: SoundCloudEmbedProps) {
  return (
    <div className="w-full">
      <div 
        dangerouslySetInnerHTML={{ __html: release.embed.html }}
        className="soundcloud-embed"
      />
    </div>
  );
}

interface SoundCloudAutoRefreshProps {
  onRefresh: () => void;
}

export function SoundCloudAutoRefresh({ onRefresh }: SoundCloudAutoRefreshProps) {
  const [nextRefresh, setNextRefresh] = useState<Date | null>(null);

  useEffect(() => {
    // Refresh every 24 hours
    const interval = setInterval(() => {
      onRefresh();
    }, 24 * 60 * 60 * 1000);

    // Set next refresh time
    const next = new Date();
    next.setHours(next.getHours() + 24);
    setNextRefresh(next);

    return () => clearInterval(interval);
  }, [onRefresh]);

  return (
    <div className="text-xs text-muted-foreground mt-4">
      {nextRefresh && (
        <p>Next auto-refresh: {nextRefresh.toLocaleString()}</p>
      )}
    </div>
  );
}
