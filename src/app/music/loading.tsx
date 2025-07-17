import { Music } from "lucide-react";

export default function MusicLoading() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Loading */}
        <section className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-secondary/10 rounded-full animate-pulse">
              <Music className="h-12 w-12 text-secondary" />
            </div>
          </div>
          <div className="h-12 bg-muted rounded-lg animate-pulse mb-4 max-w-md mx-auto"></div>
          <div className="h-6 bg-muted rounded-lg animate-pulse mb-2 max-w-2xl mx-auto"></div>
          <div className="h-6 bg-muted rounded-lg animate-pulse mb-8 max-w-xl mx-auto"></div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <div className="h-12 w-40 bg-muted rounded-lg animate-pulse"></div>
            <div className="h-12 w-40 bg-muted rounded-lg animate-pulse"></div>
          </div>
        </section>

        {/* About Section Loading */}
        <section className="mb-16">
          <div className="bg-card rounded-lg p-6">
            <div className="h-8 bg-muted rounded-lg animate-pulse mb-4 max-w-xs"></div>
            <div className="h-4 bg-muted rounded-lg animate-pulse mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-muted rounded-lg animate-pulse"></div>
              <div className="h-4 bg-muted rounded-lg animate-pulse"></div>
              <div className="h-4 bg-muted rounded-lg animate-pulse max-w-3/4"></div>
            </div>
          </div>
        </section>

        {/* Tracks Loading */}
        <section className="mb-16">
          <div className="h-10 bg-muted rounded-lg animate-pulse mb-8 max-w-xs mx-auto"></div>
          <div className="grid gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-6">
                <div className="h-6 bg-muted rounded-lg animate-pulse mb-4 max-w-sm"></div>
                <div className="h-4 bg-muted rounded-lg animate-pulse mb-4 max-w-md"></div>
                <div className="h-40 bg-muted rounded-lg animate-pulse"></div>
              </div>
            ))}
          </div>
        </section>

        {/* Services Loading */}
        <section>
          <div className="h-10 bg-muted rounded-lg animate-pulse mb-8 max-w-xs mx-auto"></div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-card rounded-lg p-6">
                <div className="h-6 bg-muted rounded-lg animate-pulse mb-4"></div>
                <div className="h-4 bg-muted rounded-lg animate-pulse"></div>
                <div className="h-4 bg-muted rounded-lg animate-pulse mt-2 max-w-3/4"></div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
