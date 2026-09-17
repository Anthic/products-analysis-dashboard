import { getOrders } from '@/lib/api/orders.service';
import { PageHeader } from '@/components/ui/layout/PageHeader';
import { OrdersToolbar } from '@/components/orders/OrdersToolbar';
import { OrdersTable } from '@/components/orders/OrdersTable';
import { OrdersPagination } from '@/components/orders/OrdersPagination';
import { OrdersQueryParams, OrderStatus } from '@/lib/types/order';

export const dynamic = 'force-dynamic';

interface OrdersPageProps {
  searchParams: Promise<{
    search?: string;
    status?: string;
    from?: string;
    to?: string;
    page?: string;
    pageSize?: string;
    sortBy?: 'createdAt' | 'total' | 'customerName';
    sortDir?: 'asc' | 'desc';
  }>;
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const params = await searchParams;
  const queryParams: OrdersQueryParams = {
    search: params.search,
    status: params.status as OrderStatus | undefined,
    from: params.from,
    to: params.to,
    page: params.page ? parseInt(params.page, 10) : 1,
    pageSize: params.pageSize ? parseInt(params.pageSize, 10) : 10,
    sortBy: params.sortBy || 'createdAt',
    sortDir: params.sortDir || 'desc',
  };

  const ordersRes = await getOrders(queryParams);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Orders"
        description="Search, filter, and inspect customer transactions and order fulfillment details."
      />
      <OrdersToolbar />
      <OrdersTable orders={ordersRes.items} />
      <OrdersPagination total={ordersRes.total} />
    </div>
  );
}
