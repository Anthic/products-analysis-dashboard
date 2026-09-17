'use client';
import { useState } from 'react';
import { ArrowUpDown } from 'lucide-react';
import { Order } from '@/lib/types/order';
import { OrderStatusBadge } from './OrderStatusBadge';
import { OrderDetailsSheet } from './OrderDetailsSheet';
import { formatCurrency } from '@/lib/transformers/formatCurrency';
import { formatDate } from '@/lib/transformers/formatDate';
import { useOrderFilters } from '@/lib/hook/useOrderFilters';
import { EmptyState } from '@/components/shared/EmptyState';

interface OrdersTableProps {
  orders: Order[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { filters, updateFilters } = useOrderFilters();

  const handleSort = (field: 'createdAt' | 'total' | 'customerName') => {
    if (filters.sortBy === field) {
      updateFilters({ sortDir: filters.sortDir === 'asc' ? 'desc' : 'asc' });
    } else {
      updateFilters({ sortBy: field, sortDir: 'desc' });
    }
  };

  return (
    <>
      <div className="bg-white border-2 border-black rounded-none shadow-none overflow-hidden text-black">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b-2 border-black bg-black text-white font-mono font-bold select-none">
                <th className="py-3 px-4 font-mono">Order #</th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-[#F6C851] transition-none"
                  onClick={() => handleSort('customerName')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Customer</span>
                    <ArrowUpDown className="w-3 h-3 text-white" />
                  </div>
                </th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Destination</th>
                <th 
                  className="py-3 px-4 cursor-pointer hover:text-[#F6C851] transition-none"
                  onClick={() => handleSort('createdAt')}
                >
                  <div className="flex items-center gap-1.5">
                    <span>Date</span>
                    <ArrowUpDown className="w-3 h-3 text-white" />
                  </div>
                </th>
                <th 
                  className="py-3 px-4 text-right cursor-pointer hover:text-[#F6C851] transition-none"
                  onClick={() => handleSort('total')}
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Total</span>
                    <ArrowUpDown className="w-3 h-3 text-white" />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-black">
              {orders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 px-4">
                    <EmptyState
                      title="No orders found"
                      description="No orders match your filter criteria. Try clearing search or resetting filters."
                    />
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => setSelectedOrder(order)}
                    className="hover:bg-[#F6C851]/15 transition-none cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-black">
                      {order.orderNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-black font-sans">{order.customerName}</div>
                      <div className="text-[11px] text-neutral-600 font-mono">{order.customerEmail}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <OrderStatusBadge status={order.status} />
                    </td>
                    <td className="py-3.5 px-4 text-black font-sans font-medium">
                      {order.shippingAddress.city}, {order.shippingAddress.country}
                    </td>
                    <td className="py-3.5 px-4 text-black font-mono font-bold">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="py-3.5 px-4 text-right font-bold text-black font-mono">
                      {formatCurrency(order.total)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      <OrderDetailsSheet
        order={selectedOrder}
        onClose={() => setSelectedOrder(null)}
      />
    </>
  );
}

