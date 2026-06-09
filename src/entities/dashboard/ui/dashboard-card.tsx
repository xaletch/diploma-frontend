import { TrendingDownIcon } from "@/shared/icons";
import { Badge, Card } from "@/shared/ui"
import { CardContent } from "@/shared/ui/card/ui/card"
import { formatCurrency } from "@/shared/utils";
import { TrendingUpIcon } from "lucide-react"

interface DashboardCardProps {
  title: string;
  value: string;
  isIncreased: boolean;
  percentage: number;
  description: string;
  currency?: CurrencyType;
  recommendation: string | undefined;
}

export const DashboardCard = ({ title, value, isIncreased, percentage, description, currency, recommendation }: DashboardCardProps) => {
  const hasGrowthData = percentage !== 0;
  return (
    <Card>
      <CardContent>
        <div className="flex items-center justify-between">
          <p className="text-sm text-accent/60">{title}</p>
          {hasGrowthData && 
            <Badge variant={isIncreased ? "profit_up" : "profit_down"}>
              {isIncreased ? <TrendingUpIcon /> : <TrendingDownIcon/>}
              {percentage}%
            </Badge>
          }
        </div>
        <p className="text-3xl font-bold leading-8 mt-2">
          {currency ? formatCurrency(value, currency) : value}
        </p>
        <div className="mt-4">
          <div className="flex items-center gap-2">
            <p>{description}</p>
            
            {hasGrowthData &&
              <span className="[&>svg]:size-4.5">
                {isIncreased ? <TrendingUpIcon /> : <TrendingDownIcon/>}
              </span>
            }
          </div>
          {recommendation && <p className="text-xs text-accent/50 mt-1">{recommendation}</p>}
        </div>
      </CardContent>
    </Card>
  )
}
