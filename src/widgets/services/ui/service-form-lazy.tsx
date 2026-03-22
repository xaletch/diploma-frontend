import { Skeleton } from "@/shared/ui"

export const ServiceFormLazy = () => {
  return (
    <div className="space-y-8 mt-8">
      <Skeleton className="h-70 max-w-140 mx-auto" />
      <Skeleton className="h-43 max-w-140 mx-auto" />
      <Skeleton className="h-68.5 max-w-140 mx-auto" />
    </div>
  )
}
