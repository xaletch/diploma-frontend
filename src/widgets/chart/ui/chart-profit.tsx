import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/shared/ui"
import { CardContent, CardHeader, CardTitle } from "@/shared/ui/card/ui/card"

export const description = "An interactive area chart"


const chartData = [
  { date: "05-01-2025 13:00", profit: 0, },
  { date: "06-01-2025 14:00", profit: 0, },
  { date: "07-01-2025 15:00", profit: 999, },
  { date: "08-01-2025 16:00", profit: 700, },
  { date: "09-01-2025 12:00", profit: 0, },
  { date: "09-01-2025 14:00", profit: 1250, },
  { date: "09-01-2025 15:00", profit: 1250, },
  { date: "09-01-2025 16:00", profit: 2500, },
  { date: "10-01-2025 19:00", profit: 1000, },
  { date: "10-01-2025 20:00", profit: 0, },
  { date: "11-01-2025 20:00", profit: 1500, },
  { date: "12-01-2025 21:00", profit: 1800, },
]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  profit: {
    label: "profit",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export const ChartProfit = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Статистика</CardTitle>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-45 w-full"
        >
          <AreaChart data={chartData} accessibilityLayer={false}>
            <defs>
              <linearGradient id="fill-profit" x1="0" y1="0" x2="0" y2="1">
                {/* <stop
                  offset="10%"
                  stopColor="var(--color-profit)"
                  stopOpacity={0.7}
                /> */}
                <stop
                  offset="100%"
                  stopColor="var(--color-profit)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false}/>
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("ru-RU", { month: "short", day: "numeric" })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => { return new Date(value).toLocaleDateString("ru-RU", { month: "short", day: "numeric", year: "numeric", }) }}
                />
              }
            />
            <Area
              dataKey={"profit"}
              type={"monotone"}
              fill={"url(#fill-profit)"}
              stroke={"var(--color-profit)"}
              strokeWidth={2}
              className={"var(--color-profit)"}
              stackId={"a"}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
