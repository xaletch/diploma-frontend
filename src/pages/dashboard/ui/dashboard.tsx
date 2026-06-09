import { useGetChartQuery } from "@/entities/dashboard"
import { ChartProfit } from "@/widgets/chart"
import { DashboardStatisticsNum } from "@/widgets/dashboard"

export const Dashboard = () => {
  const { data: chart, isLoading } = useGetChartQuery({});

  return (
    <div className="flex flex-col gap-8">
      
      <DashboardStatisticsNum />
      
      <ChartProfit data={chart} isLoading={isLoading} />
    </div>
  )
}
