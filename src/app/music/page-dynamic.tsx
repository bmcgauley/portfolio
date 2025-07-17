"use client";

import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Music, Play, Headphones, RefreshCw } from "lucide-react";
import { useSoundCloudData } from "@/hooks/use-soundcloud-data";
import { SoundCloudEmbed, SoundCloudAutoRefresh } from "@/components/SoundCloudComponents";

export default function MusicPage() {
  const { data, loading, error, refresh, lastFetched } = useSoundCloudData();

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-secondary/10 rounded-full">
              <Music className="h-12 w-12 text-secondary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold mb-4">Music Production</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Exploring the intersection of technology and creativity through dubstep music production. 
            From concept to streaming platforms, I create high-energy electronic music that pushes boundaries.
          </p>
          
          {/* Spotify & External Links */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button asChild size="lg" className="bg-[#1DB954] hover:bg-[#1ed760] text-white">
              <Link 
                href="https://open.spotify.com/artist/66AbkMEAAIUz2PqEixKWkK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Headphones className="h-5 w-5" />
                Listen on Spotify
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg">
              <Link 
                href="https://soundcloud.com/brian-mcgauley-290029297" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Play className="h-5 w-5" />
                SoundCloud Profile
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>

        {/* About My Music */}
        <section className="mb-16">
          <Card className="bg-card text-card-foreground">
            <CardHeader>
              <CardTitle className="text-2xl">About My Music</CardTitle>
              <CardDescription>
                My journey into electronic music production
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/90 leading-relaxed">
                My passion for music production began as a creative outlet that naturally evolved into 
                a professional pursuit. Specializing in dubstep and electronic dance music, I focus on 
                creating high-energy tracks that blend heavy bass lines with intricate sound design.
              </p>
              <p className="text-foreground/90 leading-relaxed">
                I release my music across multiple platforms, with early versions and exclusive content 
                available on SoundCloud before official releases on Spotify, Apple Music, and other streaming services. 
                This approach allows me to connect with my audience throughout the creative process.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="secondary">Dubstep</Badge>
                <Badge variant="secondary">Electronic Dance Music</Badge>
                <Badge variant="secondary">Sound Design</Badge>
                <Badge variant="secondary">Music Production</Badge>
                <Badge variant="secondary">Audio Engineering</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Dynamic SoundCloud Content */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Latest Releases</h2>
            <div className="flex items-center gap-4">
              {lastFetched && (
                <span className="text-sm text-muted-foreground">
                  Last updated: {new Date(lastFetched).toLocaleString()}
                </span>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                onClick={refresh}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
          
          {loading && (
            <div className="text-center py-8">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <RefreshCw className="h-5 w-5 animate-spin" />
                Loading latest tracks...
              </div>
            </div>
          )}

          {error && (
            <Card className="bg-destructive/10 border-destructive/20">
              <CardContent className="pt-6">
                <p className="text-destructive text-center">
                  Unable to load SoundCloud data: {error}
                </p>
                <p className="text-muted-foreground text-center mt-2 text-sm">
                  Please visit my <Link href="https://soundcloud.com/brian-mcgauley-290029297" className="underline" target="_blank" rel="noopener noreferrer">SoundCloud profile</Link> directly.
                </p>
              </CardContent>
            </Card>
          )}

          {data && data.data.length > 0 && (
            <div className="grid gap-8">
              {data.data.map((release, index) => (
                <Card key={index} className="bg-card text-card-foreground">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Play className="h-5 w-5 text-secondary" />
                      {release.title}
                    </CardTitle>
                    <CardDescription>{release.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <SoundCloudEmbed release={release} />
                    <div className="mt-4 flex justify-between items-center">
                      <Badge variant="outline" className="text-xs">
                        {release.type === 'playlist' ? 'Album/Playlist' : 'Single Track'}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        Last updated: {new Date(release.lastUpdated).toLocaleDateString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {data && data.data.length === 0 && (
            <Card className="bg-card text-card-foreground">
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground">
                  No releases found. Check back soon for new music!
                </p>
              </CardContent>
            </Card>
          )}

          <SoundCloudAutoRefresh onRefresh={refresh} />
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-card text-card-foreground">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-4">Stay Connected</h3>
              <p className="text-muted-foreground mb-6">
                Follow me on SoundCloud and Spotify to get notified when I release new tracks. 
                This page automatically syncs with my latest releases.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button asChild variant="outline">
                  <Link href="/contact" className="flex items-center gap-2">
                    Get in Touch
                  </Link>
                </Button>
                <Button asChild>
                  <Link 
                    href="https://soundcloud.com/brian-mcgauley-290029297" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    Follow on SoundCloud
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
