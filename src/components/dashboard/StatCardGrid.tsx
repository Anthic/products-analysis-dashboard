import { Wallet, ShoppingBag, Users, Percent } from 'lucide-react';

import { StatCard } from './StatCard';
import { formatCurrency } from '@/lib/transformers/formatCurrency';
import { AnalyticsSummary } from '@/lib/types/analytics';

interface StatCardGridProps {
  summary: AnalyticsSummary;
}

export function StatCardGrid({ summary }: StatCardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Revenue"
        value={formatCurrency(summary.totalRevenue)}
        changePct={summary.totalRevenueChangePct}
        icon={Wallet}
        bgColor="bg-[#F6C851]"
      />
      <StatCard
        title="Total Orders"
        value={summary.totalOrders.toLocaleString()}
        changePct={summary.totalOrdersChangePct}
        icon={ShoppingBag}
        bgColor="bg-[#F7B5CD]"
      />
      <StatCard
        title="Active Customers"
        value={summary.activeCustomers.toLocaleString()}
        changePct={summary.activeCustomersChangePct}
        icon={Users}
        bgColor="bg-[#9ED8C5]"
      />
      <StatCard
        title="Conversion Rate"
        value={`${(summary.conversionRate * 100).toFixed(1)}%`}
        changePct={summary.conversionRateChangePct}
        icon={Percent}
        bgColor="bg-[#FED7AA]"
      />
    </div>
  );
}

