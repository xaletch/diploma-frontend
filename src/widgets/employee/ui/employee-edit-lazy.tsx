import { Skeleton } from "@/shared/ui"

export const EmployeeEditLazy = () => {
  return (
    <div className="mt-8">
      <div className="max-w-140 mx-auto space-y-8 relative">
        <Skeleton className="h-124" />
        <Skeleton className="h-44.5" />
      </div>
    </div>
  )
}
