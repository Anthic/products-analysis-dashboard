import { AnalyticsQueryParams, AnalyticsSeries, AnalyticsSummary, SeriesQueryParams } from '../types/analytics';
import { apiClient } from './client';

export async function getAnalyticsSummary(
  params: AnalyticsQueryParams = {}
): Promise<AnalyticsSummary> {
  const searchParams = new URLSearchParams();
  if (params.from) searchParams.set('from', params.from);
  if (params.to) searchParams.set('to', params.to);

  const query = searchParams.toString();
  return apiClient<AnalyticsSummary>(query ? `/api/analytics/summary?${query}` : '/api/analytics/summary');
}

export async function getAnalyticsSeries(
  params: SeriesQueryParams = {}
): Promise<AnalyticsSeries> {
  const searchParams = new URLSearchParams();
  if (params.from) searchParams.set('from', params.from);
  if (params.to) searchParams.set('to', params.to);
  if (params.granularity) searchParams.set('granularity', params.granularity);

  const query = searchParams.toString();
  return apiClient<AnalyticsSeries>(query ? `/api/analytics/series?${query}` : '/api/analytics/series');
}
