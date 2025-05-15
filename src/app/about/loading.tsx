import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutLoading() {
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <Skeleton className="h-12 w-48 mb-8" />
        
        {/* Bio Section */}
        <section className="mb-16">
          <div className="flex flex-col md:flex-row gap-10">
            <div className="md:w-1/3">
              <Skeleton className="aspect-square rounded-lg" />
            </div>
            <div className="md:w-2/3">
              <Skeleton className="h-8 w-24 mb-4" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-4/5" />
                <Skeleton className="h-4 w-full" />
              </div>
            </div>
          </div>
        </section>

        {/* Education Section */}
        <section className="mb-16">
          <Skeleton className="h-8 w-36 mb-6" />
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="mb-8 last:mb-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center gap-6 mb-4">
                  <Skeleton className="w-32 h-16" />
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between mb-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                    <Skeleton className="h-5 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-24 mb-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Skills Section */}
        <section className="mb-16">
          <Skeleton className="h-8 w-48 mb-6" />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-36 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 4 }).map((_, j) => (
                      <Skeleton key={j} className="h-6 w-20" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Creative Skills Section */}
        <section className="mb-16">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="grid md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="h-48 w-full" />
                <CardContent className="p-5">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <Skeleton className="h-4 w-4/6 mb-4" />
                  <div className="flex flex-wrap gap-2">
                    {Array.from({ length: 3 }).map((_, j) => (
                      <Skeleton key={j} className="h-6 w-16" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Professional Experience Section */}
        <section className="mb-16">
          <Skeleton className="h-8 w-64 mb-6" />
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i} className="mb-8 last:mb-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row justify-between mb-2">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <Skeleton className="h-5 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full mb-3" />
                <div className="flex flex-wrap gap-2">
                  {Array.from({ length: 4 }).map((_, j) => (
                    <Skeleton key={j} className="h-6 w-20" />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Call to Action Section */}
        <section className="text-center py-16 px-4 rounded-2xl">
          <Skeleton className="h-8 w-48 mx-auto mb-6" />
          <div className="max-w-2xl mx-auto mb-8">
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}