export interface ISummaryCredentials {
  location_id?: string;
}

export type SummaryRevenue = {
  amount: number;
  growthPercent: number;
  recommendation: string[];
}

export type SummaryClients = {
  count: number;
  growthPercent: number;
  recommendation: string[];
}

export type SummaryGrowthRate = {
  percent: number;
  recommendation: string[];
}

export interface ISummary {
  revenue: SummaryRevenue;
  clients: SummaryClients;
  growthRate: SummaryGrowthRate;
}
