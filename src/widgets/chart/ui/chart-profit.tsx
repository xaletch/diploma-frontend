import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import { Card, ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/shared/ui"
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"
import type { IChart } from "@/entities/dashboard"
import { LazyBlur } from "@/widgets/loading"
import { ChartEmpty } from "./chart-empty"
import { useMemo } from "react"
import { parseChartDate } from "../model/lib/chart"

export const description = "An interactive area chart"

// const MOCK_DATA: IChart[] = [
//   { date: "2026-01-01", profit: 4200 },
//   { date: "2026-01-08", profit: 7800 },
//   { date: "07-05-2026", profit: 5100 },
//   { date: "07-25-2026", profit: 9400 },
//   { date: "2026-01-29", profit: 6600 },
//   { date: "2026-02-05", profit: 11200 },
//   { date: "23-05-2026 04:30", profit: 8300 },
// ];

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  profit: {
    label: "profit",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

interface ChartProfitProps {
  data: IChart[] | undefined;
  isLoading: boolean;
  isFetching: boolean;
}

export const ChartProfit = ({ data, isLoading, isFetching }: ChartProfitProps) => {
  const isEmpty = !isLoading && !data?.length;
  // const chartData = !isLoading ? MOCK_DATA : (data ?? []);

  const prepared = useMemo(() => {
    if (!data?.length) return [];
    return data
      .map(item => ({ ...item, date: parseChartDate(item.date) }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [data]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Статистика</CardTitle>
      </CardHeader>
      <CardContent className="pb-0 relative">
        {isFetching && <LazyBlur />}
        {isEmpty ? (
          <ChartEmpty />
        ) : (
          <div className="">
            {isLoading && <LazyBlur />}
            <ChartContainer config={chartConfig} className="aspect-auto h-45 w-full">
              <AreaChart data={prepared} accessibilityLayer={false}>
                <defs>
                  <linearGradient id="fill-profit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-profit)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--color-profit)" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={32}
                  tickFormatter={(value) =>
                    new Date(value).toLocaleDateString("ru-RU", {
                      month: "short",
                      day: "numeric",
                    })
                  }
                />
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      labelFormatter={(value) =>
                        new Date(value).toLocaleDateString("ru-RU", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      }
                    />
                  }
                />
                <Area
                  dataKey="profit"
                  type="monotone"
                  fill="url(#fill-profit)"
                  stroke="var(--color-profit)"
                  strokeWidth={2}
                  stackId="a"
                />
              </AreaChart>
            </ChartContainer>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
