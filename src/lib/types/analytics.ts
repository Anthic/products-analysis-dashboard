export interface AnalyticsSummary {
  totalRevenue: number;
  totalRevenueChangePct: number;
  totalOrders: number;
  totalOrdersChangePct: number;
  activeCustomers: number;
  activeCustomersChangePct: number;
  conversionRate: number;
  conversionRateChangePct: number;
}

export interface TimeSeriesPoint {
  date: string;
  value: number;
}

export interface AnalyticsSeries {
  revenue: TimeSeriesPoint[];
  orders: TimeSeriesPoint[];
}

export interface AnalyticsQueryParams {
  from?: string;
  to?: string;
}

export interface SeriesQueryParams extends AnalyticsQueryParams {
  granularity?: 'day' | 'week' | 'month';
}
