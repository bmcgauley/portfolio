import { ContactFormSkeleton, PageHeader } from "@/components/ui/loading"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <div className="container py-12">
      <PageHeader />
      
      <div className="max-w-3xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {Array.from({ length: 2 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="flex items-center justify-center p-6">
                <Skeleton className="h-6 w-48" />
              </CardContent>
            </Card>
          ))}
        </div>
        
        <ContactFormSkeleton />
      </div>
    </div>
  )
}