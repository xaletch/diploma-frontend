import { Skeleton } from "@/shared/ui"

export const CustomerDetailLazy = () => {
  return (
    <div className="mt-8 grid grid-cols-5 gap-8 w-full">
      <div className="col-span-3 space-y-8">
        <Skeleton className="h-57" />
        <Skeleton className="h-85" />
      </div>
      
      <div className="space-y-5 col-span-2">
        <Skeleton className="h-32"/>
      </div>
    </div>
  )
}
