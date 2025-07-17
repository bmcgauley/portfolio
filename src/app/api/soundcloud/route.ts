import { NextRequest, NextResponse } from 'next/server';

const SOUNDCLOUD_USER_ID = 'brian-mcgauley-290029297';

// SoundCloud oEmbed API for fetching track/playlist data
async function fetchSoundCloudData(url: string) {
  try {
    const oembedUrl = `https://soundcloud.com/oembed?format=json&url=${encodeURIComponent(url)}`;
    const response = await fetch(oembedUrl);
    
    if (!response.ok) {
      throw new Error(`SoundCloud API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching SoundCloud data:', error);
    return null;
  }
}

// Parse SoundCloud RSS feed to discover tracks
async function parseRSSFeed() {
  try {
    const rssUrl = `https://feeds.soundcloud.com/users/soundcloud:users:${SOUNDCLOUD_USER_ID}/sounds.rss`;
    const response = await fetch(rssUrl);
    
    if (!response.ok) {
      throw new Error(`RSS fetch failed: ${response.status}`);
    }
    
    const rssText = await response.text();
    
    // Parse RSS to extract track URLs
    const trackUrls = [];
    const linkMatches = rssText.match(/<link>([^<]+)<\/link>/g);
    
    if (linkMatches) {
      for (const match of linkMatches) {
        const url = match.replace(/<\/?link>/g, '');
        if (url.includes(`soundcloud.com/${SOUNDCLOUD_USER_ID}/`) && !url.includes('/sets/')) {
          trackUrls.push(url);
        }
      }
    }
    
    return trackUrls;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
}

// Discover user content via web scraping (fallback method)
async function discoverUserContent() {
  try {
    const profileUrl = `https://soundcloud.com/${SOUNDCLOUD_USER_ID}`;
    const response = await fetch(profileUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });
    
    if (!response.ok) {
      throw new Error(`Profile fetch failed: ${response.status}`);
    }
    
    const html = await response.text();
    
    // Extract track and playlist URLs from the HTML
    const urls: Array<{url: string; type: string}> = [];
    
    // Look for track URLs
    const trackMatches = html.match(new RegExp(`https://soundcloud.com/${SOUNDCLOUD_USER_ID}/[^"\\s]+`, 'g'));
    if (trackMatches) {
      for (const url of trackMatches) {
        const item = {
          url: url,
          type: url.includes('/sets/') ? 'playlist' : 'track'
        };
        if (!urls.some(existing => existing.url === url) && !url.includes('?')) {
          urls.push(item);
        }
      }
    }
    
    return urls;
  } catch (error) {
    console.error('Error discovering user content:', error);
    return [];
  }
}

// Fetch all user tracks and playlists dynamically
async function fetchAllUserContent() {
  try {
    // Method 1: Try RSS feed first
    console.log('Fetching from RSS feed...');
    let trackUrls = await parseRSSFeed();
    
    // Method 2: Fallback to profile scraping
    if (trackUrls.length === 0) {
      console.log('RSS failed, trying profile discovery...');
      const discovered = await discoverUserContent();
      trackUrls = discovered.map(item => item.url);
    }
    
    // Method 3: Fallback to known URLs if both methods fail
    if (trackUrls.length === 0) {
      console.log('Using fallback known URLs...');
      trackUrls = [
        'https://soundcloud.com/brian-mcgauley-290029297/three-evils-extended-cut',
        'https://soundcloud.com/brian-mcgauley-290029297/sets/cdb244cc-e970-4747-bd23-0bf2ccd41a68'
      ];
    }
    
    console.log(`Found ${trackUrls.length} items to process`);
    
    const releases = [];
    
    // Fetch embed data for each discovered URL
    for (const url of trackUrls.slice(0, 10)) { // Limit to 10 items to avoid timeouts
      try {
        const embedData = await fetchSoundCloudData(url);
        if (embedData) {
          releases.push({
            type: url.includes('/sets/') ? 'playlist' : 'track',
            url: url,
            title: embedData.title || 'Untitled',
            description: embedData.description || '',
            embed: embedData,
            lastUpdated: new Date().toISOString()
          });
        }
      } catch (error) {
        console.error(`Error processing ${url}:`, error);
      }
    }
    
    // Sort by newest first (based on URL or title)
    releases.sort((a, b) => {
      const aDate = new Date(a.lastUpdated);
      const bDate = new Date(b.lastUpdated);
      return bDate.getTime() - aDate.getTime();
    });
    
    return releases;
  } catch (error) {
    console.error('Error in fetchAllUserContent:', error);
    return [];
  }
}

export async function GET() {
  try {
    const tracks = await fetchAllUserContent();
    
    return NextResponse.json({
      success: true,
      data: tracks,
      lastFetched: new Date().toISOString(),
      profileUrl: `https://soundcloud.com/${SOUNDCLOUD_USER_ID}`
    });
  } catch (error) {
    console.error('Error in SoundCloud API route:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to fetch SoundCloud data',
        fallbackData: []
      },
      { status: 500 }
    );
  }
}

// Optional: Add a POST endpoint to manually refresh the cache
export async function POST() {
  try {
    // You could implement caching here with Redis or similar
    const tracks = await fetchAllUserContent();
    
    return NextResponse.json({
      success: true,
      message: 'SoundCloud data refreshed',
      data: tracks,
      refreshedAt: new Date().toISOString()
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to refresh SoundCloud data' },
      { status: 500 }
    );
  }
}
