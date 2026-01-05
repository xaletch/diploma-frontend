import { Card } from "@/shared/ui"
import { ChartProfit } from "@/widgets/chart"
import { DashboardStatisticsNum } from "@/widgets/dashboard"

export const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8">
      
      <DashboardStatisticsNum />
      
      <ChartProfit />
      
      <div className="flex-1">
        <div className="flex items-center gap-5">
          <Card className="h-23 w-full" />
          <Card className="h-23 w-full" />
        </div>
      </div>
      <div className="w-full bg-card/60 rounded-3xl h-full"></div>
    </div>
  )
}
