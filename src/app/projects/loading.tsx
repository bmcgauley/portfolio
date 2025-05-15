import { ProjectGridSkeleton, PageHeader } from "@/components/ui/loading"

export default function ProjectsLoading() {
  return (
    <div className="container py-12">
      <PageHeader />
      <ProjectGridSkeleton />
    </div>
  )
}