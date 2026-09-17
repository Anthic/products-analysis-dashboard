import { PaginatedResponse } from "../types/api";
import { Order, OrdersQueryParams } from "../types/order";
import { apiClient } from "./client";

export async function getOrders(
    params : OrdersQueryParams = {}
) : Promise<PaginatedResponse<Order>>{
    const searchParams = new URLSearchParams()

    if (params.search) searchParams.set('search', params.search);
    if (params.status) searchParams.set('status', params.status);
    if (params.from) searchParams.set('from', params.from);
    if (params.to) searchParams.set('to', params.to);
    if (params.page) searchParams.set('page', params.page.toString());
    if (params.pageSize) searchParams.set('pageSize', params.pageSize.toString());
    if (params.sortBy) searchParams.set('sortBy', params.sortBy);
    if (params.sortDir) searchParams.set('sortDir', params.sortDir);

    const queryString = searchParams.toString()
    const endpoint = queryString ? `api/orders?${queryString}` : `api/orders`

    return apiClient<PaginatedResponse<Order>>(endpoint, {
        cache : 'no-store'
    })


}

export async function getOrderById(id: string): Promise<Order> {
  return apiClient<Order>(`/api/orders/${encodeURIComponent(id)}`);
}