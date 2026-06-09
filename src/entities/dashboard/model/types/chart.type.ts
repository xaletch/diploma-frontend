export interface IChart {
  date: string;
  profit: number;
}

export interface IChartCredentials {
  location_id?: string;
  from?: string;          // date
  to?: string;            // date
}
