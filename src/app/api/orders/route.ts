import { NextRequest, NextResponse } from "next/server";
import ordersData from "@/data/mock/orders.json";
import { ApiResponse, PaginatedResponse } from "@/lib/types/api";
import { Order, OrderStatus } from "@/lib/types/order";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest
): Promise<NextResponse<ApiResponse<PaginatedResponse<Order>>>> {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search")?.toLowerCase().trim();
    const status = searchParams.get("status") as OrderStatus | null;
    const from = searchParams.get("from");
    const to = searchParams.get("to");
    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const pageSize = Math.max(1, parseInt(searchParams.get("pageSize") || "10", 10));
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortDir = searchParams.get("sortDir") === "asc" ? "asc" : "desc";

    let filtered = (ordersData as Order[]).filter((order) => {
      // 1. search
      if (search) {
        const matchesNumber = order.orderNumber.toLowerCase().includes(search);
        const matchesName = order.customerName.toLowerCase().includes(search);
        if (!matchesNumber && !matchesName) return false;
      }
      // 2. status filter
      if (status && order.status !== status) {
        return false;
      }
      // 3. date range filter
      if (from) {
        const fromDate = new Date(from).getTime();
        const orderDate = new Date(order.createdAt).getTime();
        if (orderDate < fromDate) return false;
      }
      if (to) {
        const toDate = new Date(to.includes("T") ? to : `${to}T23:59:59.999Z`).getTime();
        const orderDate = new Date(order.createdAt).getTime();
        if (orderDate > toDate) return false;
      }
      return true;
    });

    // sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === "total") {
        comparison = a.total - b.total;
      } else if (sortBy === "customerName") {
        comparison = a.customerName.localeCompare(b.customerName);
      } else {
        comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return sortDir === "asc" ? comparison : -comparison;
    });

    // pagination
    const total = filtered.length;
    const startIndex = (page - 1) * pageSize;
    const items = filtered.slice(startIndex, startIndex + pageSize);

    return NextResponse.json({
      status: "success",
      data: {
        items,
        total,
        page,
        pageSize,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}
