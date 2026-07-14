// import { useAccount } from "@/entities/account"
// import { useGetChartQuery } from "@/entities/dashboard"
// import { ChartProfit } from "@/widgets/chart"
// import { DashboardStatisticsNum } from "@/widgets/dashboard"
// import { useSelector } from "react-redux"

export const Dashboard = () => {
  // const { location, account } = useSelector(useAccount);

  // const { data: chart, isLoading, isFetching } = useGetChartQuery({ location_id: location?.id });

  return (
    <div className="flex flex-col gap-8">
      
      {/* <DashboardStatisticsNum location_id={location?.id} currency={account!.company!.currency ?? "RUB"} /> */}
      
      {/* <ChartProfit data={chart} isLoading={isLoading} isFetching={isFetching} /> */}
    </div>
  )
}
