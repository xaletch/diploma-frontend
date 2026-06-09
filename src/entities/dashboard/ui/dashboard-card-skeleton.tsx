import { Card, CardContent, Skeleton } from "@/shared/ui";

export const DashboardCardSkeleton = () => (
  <Card>
    <CardContent>
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
      <Skeleton className="h-8 w-32 mt-2" />
      <div className="mt-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-3/4" />
      </div>
    </CardContent>
  </Card>
);
