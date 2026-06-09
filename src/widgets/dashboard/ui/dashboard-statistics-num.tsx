import { accountSelector } from "@/entities/account";
import { DashboardCard, DashboardCardSkeleton, useGetSummaryQuery } from "@/entities/dashboard"
import { useSelector } from "react-redux";
import { isNegative } from "../model/utils/negative.util";



export const DashboardStatisticsNum = () => {
  const { data: summary, isLoading } = useGetSummaryQuery({});
  const { account } = useSelector(accountSelector);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-5">
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
        <DashboardCardSkeleton />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      <DashboardCard
        title="Общий доход"
        value={`${summary?.revenue.amount ?? 0}`}
        isIncreased={!isNegative(summary?.revenue.growthPercent ?? 0)}
        percentage={summary?.revenue.growthPercent ?? 0}
        description={summary?.revenue.recommendation[0] ?? "Нет данных"}
        currency={account?.company?.currency}
        recommendation={summary?.revenue.recommendation[1]}
      />

      <DashboardCard
        title="Новые клиенты"
        value={`${summary?.clients.count ?? 0}`}
        isIncreased={!isNegative(summary?.clients.growthPercent ?? 0)}
        percentage={summary?.clients.growthPercent ?? 0}
        description={summary?.clients.recommendation[0] ?? "Нет данных"}
        recommendation={summary?.clients.recommendation[1]}
      />

      <DashboardCard
        title="Темп роста"
        value={`${summary?.growthRate.percent ?? 0}%`}
        isIncreased={!isNegative(summary?.growthRate.percent ?? 0)}
        percentage={summary?.growthRate.percent ?? 0}
        description={summary?.growthRate.recommendation[0] ?? "Нет данных"}
        recommendation={summary?.growthRate.recommendation[1]}
      />

    </div>
  )
}
