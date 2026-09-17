import { NextRequest, NextResponse } from "next/server";
import ordersData from "@/data/mock/orders.json";
import { ApiResponse } from "@/lib/types/api";
import { AnalyticsSeries, TimeSeriesPoint } from "@/lib/types/analytics";
import { Order } from "@/lib/types/order";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<AnalyticsSeries>>> {
  try {
    const { searchParams } = new URL(request.url);
    const fromParam = searchParams.get("from");
    const toParam = searchParams.get("to");

    const orders = ordersData as Order[];

    const revenueMap = new Map<string, number>();
    const ordersMap = new Map<string, number>();

    const fromDate = fromParam ? new Date(fromParam).getTime() : 0;
    const toDate = toParam ? new Date(toParam).getTime() : Date.now();

    for (const order of orders) {
      const orderTime = new Date(order.createdAt).getTime();
      if (orderTime < fromDate || orderTime > toDate) continue;

      const dayKey = order.createdAt.slice(0, 10);

      ordersMap.set(dayKey, (ordersMap.get(dayKey) || 0) + 1);

      if (order.status !== "cancelled" && order.status !== "refunded") {
        revenueMap.set(dayKey, (revenueMap.get(dayKey) || 0) + order.total);
      }
    }

    const allDates = Array.from(new Set([...revenueMap.keys(), ...ordersMap.keys()])).sort();

    const revenue: TimeSeriesPoint[] = allDates.map((date) => ({
      date,
      value: Number((revenueMap.get(date) || 0).toFixed(2)),
    }));

    const ordersSeries: TimeSeriesPoint[] = allDates.map((date) => ({
      date,
      value: ordersMap.get(date) || 0,
    }));

    return NextResponse.json({
      status: "success",
      data: {
        revenue,
        orders: ordersSeries,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch analytics series",
      },
      { status: 500 }
    );
  }
}
