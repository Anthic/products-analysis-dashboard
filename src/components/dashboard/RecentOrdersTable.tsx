
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import { formatCurrency } from '@/lib/transformers/formatCurrency';
import { formatDate } from '@/lib/transformers/formatDate';
import { mapOrderStatus } from '@/lib/transformers/mapOrderStatus';
import { Order } from '@/lib/types/order';

interface RecentOrdersTableProps {
  orders: Order[];
}

export function RecentOrdersTable({ orders }: RecentOrdersTableProps) {
  return (
    <div className="bg-white border-2 border-black rounded-none shadow-none overflow-hidden">
      <div className="p-4 border-b-2 border-black flex items-center justify-between bg-white">
        <div>
          <h2 className="text-sm md:text-base font-bold font-mono text-black uppercase tracking-tight">Recent Orders</h2>
          <p className="text-xs text-neutral-700 font-sans font-medium">Latest customer transactions</p>
        </div>
        <Link
          href="/orders"
          className="text-xs font-bold font-mono text-black bg-white border-2 border-black px-3 py-1 hover:bg-black hover:text-white transition-none inline-flex items-center gap-1 cursor-pointer"
        >
          View all
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b-2 border-black bg-[#9ED8C5] text-black font-mono font-bold">
              <th className="py-2.5 px-4">Order #</th>
              <th className="py-2.5 px-4">Customer</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Date</th>
              <th className="py-2.5 px-4 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y-2 divide-black">
            {orders.map((order) => {
              const statusCfg = mapOrderStatus(order.status);
              return (
                <tr key={order.id} className="hover:bg-[#F6C851]/15 transition-none">
                  <td className="py-3 px-4 font-mono font-bold text-black">
                    {order.orderNumber}
                  </td>
                  <td className="py-3 px-4 text-black font-semibold">
                    {order.customerName}
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] ${statusCfg.badgeClass}`}
                    >
                      <span className={`w-1.5 h-1.5 ${statusCfg.dotClass}`} />
                      {statusCfg.label}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-black font-mono text-[11px]">
                    {formatDate(order.createdAt)}
                  </td>
                  <td className="py-3 px-4 text-right font-bold text-black font-mono">
                    {formatCurrency(order.total)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

