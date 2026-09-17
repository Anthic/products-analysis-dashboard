import { NextRequest, NextResponse } from 'next/server';
import ordersData from '@/data/mock/orders.json';
import { Order } from '@/lib/types/order';
import { ApiResponse } from '@/lib/types/api';
import { AnalyticsSummary } from '@/lib/types/analytics';


export async function GET(request: NextRequest): Promise<NextResponse<ApiResponse<AnalyticsSummary>>> {
  try {
    const { searchParams } = new URL(request.url);
    const fromParam = searchParams.get('from');
    const toParam = searchParams.get('to');

    const orders = ordersData as Order[];

 
    const toDate = toParam ? new Date(toParam).getTime() : Date.now();
    const fromDate = fromParam ? new Date(fromParam).getTime() : toDate - 30 * 24 * 60 * 60 * 1000;
    const periodDuration = toDate - fromDate;
    const prevFromDate = fromDate - periodDuration;
    const prevToDate = fromDate;

 
    const currentOrders = orders.filter((or: Order) => {
      const t = new Date(or.createdAt).getTime();
      return t >= fromDate && t <= toDate;
    });

    const prevOrders = orders.filter((od:Order) => {
      const t = new Date(od.createdAt).getTime();
      return t >= prevFromDate && t < prevToDate;
    });


    const validCurrentOrders = currentOrders.filter(
      (o: Order) => o.status !== 'cancelled' && o.status !== 'refunded'
    );
    const validPrevOrders = prevOrders.filter(
      (o: Order) => o.status !== 'cancelled' && o.status !== 'refunded'
    );

    const totalRevenue = validCurrentOrders.reduce((sum:number, o:Order) => sum + o.total, 0);
    const prevRevenue = validPrevOrders.reduce((sum:number, o:Order) => sum + o.total, 0);
    const totalRevenueChangePct = prevRevenue === 0 ? 0 : Number((((totalRevenue - prevRevenue) / prevRevenue) * 100).toFixed(1));

    const totalOrders = currentOrders.length;
    const prevTotalOrders = prevOrders.length;
    const totalOrdersChangePct = prevTotalOrders === 0 ? 0 : Number((((totalOrders - prevTotalOrders) / prevTotalOrders) * 100).toFixed(1));

    const activeCustomerIds = new Set(validCurrentOrders.map((o: Order) => o.customerId));
    const activeCustomers = activeCustomerIds.size;

    const prevActiveCustomerIds = new Set(validPrevOrders.map((o: Order) => o.customerId));
    const prevActiveCustomers = prevActiveCustomerIds.size;
    const activeCustomersChangePct = prevActiveCustomers === 0 ? 0 : Number((((activeCustomers - prevActiveCustomers) / prevActiveCustomers) * 100).toFixed(1));

    const estimatedVisitors = Math.max(totalOrders * 32, 100);
    const conversionRate = Number((totalOrders / estimatedVisitors).toFixed(3));
    const prevVisitors = Math.max(prevTotalOrders * 31, 100);
    const prevConversionRate = Number((prevTotalOrders / prevVisitors).toFixed(3));
    const conversionRateChangePct = prevConversionRate === 0 ? 0 : Number((((conversionRate - prevConversionRate) / prevConversionRate) * 100).toFixed(1));

    const data: AnalyticsSummary = {
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalRevenueChangePct,
      totalOrders,
      totalOrdersChangePct,
      activeCustomers,
      activeCustomersChangePct,
      conversionRate,
      conversionRateChangePct,
    };

    return NextResponse.json({
      status: 'success',
      data,
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to calculate analytics summary',
      },
      { status: 500 }
    );
  }
}
