import { Skeleton } from "@/shared/ui"

export const EmployeeServiceSettingLazy = () => {
  return (
    <div className="mt-8">
      <Skeleton className="h-110 max-w-140 mx-auto flex items-center justify-center text-sm">Загрузка</Skeleton>
    </div>
  )
}
