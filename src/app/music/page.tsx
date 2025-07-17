import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Music, Play, Headphones } from "lucide-react";
import DynamicSoundCloudContent from "@/components/DynamicSoundCloudContent";

export const metadata: Metadata = {
  title: "Music Production | Brian McGauley",
  description: "Explore Brian McGauley's dubstep music production work, featuring tracks available on Spotify, SoundCloud, and other streaming platforms.",
  openGraph: {
    title: "Music Production | Brian McGauley",
    description: "Dubstep music production and audio engineering work",
    type: "website",
  },
};

export default function MusicPage() {
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
              <p className="text-foreground/90 leading-relaxed">
                Currently expanding my presence in the electronic music scene, with plans to develop 
                custom music services for artists and content creators in the future.
              </p>
              
              <div className="flex flex-wrap gap-2 mt-6">
                <Badge variant="secondary">Dubstep</Badge>
                <Badge variant="secondary">Electronic Dance Music</Badge>
                <Badge variant="secondary">Sound Design</Badge>
                <Badge variant="secondary">Music Production</Badge>
                <Badge variant="secondary">Audio Engineering</Badge>
                <Badge variant="secondary">Mixing & Mastering</Badge>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Latest Releases */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Latest Releases</h2>
          <p className="text-center text-muted-foreground mb-8">
            Listen to my latest work on SoundCloud. These tracks and albums showcase my evolving style 
            and production techniques, automatically synced from my SoundCloud profile.
          </p>
          
          <DynamicSoundCloudContent />
        </section>

        {/* Connect Section */}
        <section className="text-center py-16 px-4 bg-card rounded-2xl shadow-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Connect & Follow</h2>
          <p className="text-foreground/90 leading-relaxed mb-8 max-w-2xl mx-auto">
            Follow my musical journey and stay updated with new releases. Connect with me on streaming platforms 
            and social media to be the first to hear new tracks and upcoming projects.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="outline">
              <Link href="/contact" className="flex items-center gap-2">
                Get in Touch
              </Link>
            </Button>
            <Button asChild className="bg-[#1DB954] hover:bg-[#1ed760] text-white">
              <Link 
                href="https://open.spotify.com/artist/66AbkMEAAIUz2PqEixKWkK" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <Headphones className="h-5 w-5" />
                Follow on Spotify
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
