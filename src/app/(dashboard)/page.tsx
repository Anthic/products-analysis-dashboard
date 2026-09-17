import { getAnalyticsSummary, getAnalyticsSeries } from '@/lib/api/analytics.service';
import { getOrders } from '@/lib/api/orders.service';
import { getRecentActivities } from '@/lib/api/activities.service';

import { PageHeader } from '@/components/ui/layout/PageHeader';
import { StatCardGrid } from '@/components/dashboard/StatCardGrid';
import { RevenueChart } from '@/components/dashboard/RevenueChart';
import { OrdersChart } from '@/components/dashboard/OrdersChart';
import { RecentOrdersTable } from '@/components/dashboard/RecentOrdersTable';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

export const dynamic = 'force-dynamic';

export default async function OverviewPage() {
  const [summary, series, ordersRes, activities] = await Promise.all([
    getAnalyticsSummary(),
    getAnalyticsSeries(),
    getOrders({ pageSize: 5, sortBy: 'createdAt', sortDir: 'desc' }),
    getRecentActivities(6),
  ]);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Overview"
        description="Monitor sales performance, customer growth, and business KPIs in real-time."
      />
      <StatCardGrid summary={summary} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={series.revenue} />
        <OrdersChart data={series.orders} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={ordersRes.items} />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  );
}
