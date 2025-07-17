// Types for SoundCloud API responses
export interface SoundCloudTrack {
  id: number;
  title: string;
  description: string;
  permalink_url: string;
  artwork_url: string;
  duration: number;
  created_at: string;
  genre: string;
  tag_list: string;
  user: {
    username: string;
    permalink: string;
  };
}

export interface SoundCloudPlaylist {
  id: number;
  title: string;
  description: string;
  permalink_url: string;
  artwork_url: string;
  track_count: number;
  created_at: string;
  tracks: SoundCloudTrack[];
  user: {
    username: string;
    permalink: string;
  };
}

export interface SoundCloudOEmbedResponse {
  html: string;
  title: string;
  author_name: string;
  author_url: string;
  provider_name: string;
  provider_url: string;
  thumbnail_url: string;
  height: number;
  width: number;
}

export interface SoundCloudData {
  tracks: SoundCloudTrack[];
  playlists: SoundCloudPlaylist[];
  error?: string;
}
