import { DashboardCard, DashboardCardSkeleton, useGetSummaryQuery } from "@/entities/dashboard"
import { isNegative } from "../model/utils/negative.util";

interface DashboardStatisticsNumProps {
  location_id: string | undefined;
  currency: CurrencyType;
}

export const DashboardStatisticsNum = ({ currency }: DashboardStatisticsNumProps) => {
  const { data: summary, isLoading, isFetching } = useGetSummaryQuery({ });
  
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
        currency={currency}
        recommendation={summary?.revenue.recommendation[1]}
        isFetching={isFetching}
      />

      <DashboardCard
        title="Новые клиенты"
        value={`${summary?.clients.count ?? 0}`}
        isIncreased={!isNegative(summary?.clients.growthPercent ?? 0)}
        percentage={summary?.clients.growthPercent ?? 0}
        description={summary?.clients.recommendation[0] ?? "Нет данных"}
        recommendation={summary?.clients.recommendation[1]}
        isFetching={isFetching}
      />

      <DashboardCard
        title="Темп роста"
        value={`${summary?.growthRate.percent ?? 0}%`}
        isIncreased={!isNegative(summary?.growthRate.percent ?? 0)}
        percentage={summary?.growthRate.percent ?? 0}
        description={summary?.growthRate.recommendation[0] ?? "Нет данных"}
        recommendation={summary?.growthRate.recommendation[1]}
        isFetching={isFetching}
      />

    </div>
  )
}
