'use client';

import { X, User, MapPin, Tag } from 'lucide-react';
import { Order } from '@/lib/types/order';
import { OrderStatusBadge } from './OrderStatusBadge';
import { formatCurrency } from '@/lib/transformers/formatCurrency';
import { formatDateTime } from '@/lib/transformers/formatDate';

interface OrderDetailsSheetProps {
  order: Order | null;
  onClose: () => void;
}

export function OrderDetailsSheet({ order, onClose }: OrderDetailsSheetProps) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50">
      <div className="w-full max-w-md bg-[#FBF7EE] border-l-[3px] border-black h-full shadow-none flex flex-col justify-between rounded-none text-black">
        <div className="p-5 border-b-2 border-black flex items-center justify-between bg-white">
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-base font-bold text-black font-mono">
                {order.orderNumber}
              </h2>
              <OrderStatusBadge status={order.status} />
            </div>
            <p className="text-xs text-neutral-700 mt-0.5 font-mono">
              ID: {order.id}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-none cursor-pointer rounded-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 overflow-y-auto space-y-4 flex-1 text-xs">
          <div className="bg-white border-2 border-black rounded-none p-4 space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold text-black uppercase">
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-none border border-black">
                <User className="w-3.5 h-3.5" />
              </div>
              <span>Customer Information</span>
            </div>
            <div className="space-y-1">
              <p className="font-bold text-black font-sans">{order.customerName}</p>
              <p className="font-mono text-neutral-700">{order.customerEmail}</p>
            </div>
          </div>

          <div className="bg-white border-2 border-black rounded-none p-4 space-y-2">
            <div className="flex items-center gap-2 font-mono font-bold text-black uppercase">
              <div className="w-6 h-6 bg-black text-white flex items-center justify-center rounded-none border border-black">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <span>Shipping Address</span>
            </div>
            <div>
              <p className="font-bold text-black font-sans">{order.shippingAddress.city}</p>
              <p className="text-neutral-700 font-sans">{order.shippingAddress.country}</p>
            </div>
          </div>

          <div>
            <h3 className="font-mono font-bold text-black uppercase mb-2">Order Items ({order.items.length})</h3>
            {order.items.length === 0 ? (
              <div className="p-4 bg-white border-2 border-dashed border-black text-center font-mono text-neutral-700">
                No items in this order
              </div>
            ) : (
              <div className="border-2 border-black rounded-none divide-y-2 divide-black bg-white overflow-hidden">
                {order.items.map((item, idx) => (
                  <div key={idx} className="p-3 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-black font-sans">{item.productName}</p>
                      <p className="text-[11px] text-neutral-700 font-mono">
                        Qty: {item.quantity} × {formatCurrency(item.unitPrice)}
                      </p>
                    </div>
                    <span className="font-bold text-black font-mono">
                      {formatCurrency(item.quantity * item.unitPrice)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-[#F6C851] border-2 border-black rounded-none p-4 space-y-2 font-mono text-black font-bold">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCurrency(order.subtotal)}</span>
            </div>
            {order.discount && (
              <div className="flex justify-between text-black">
                <span className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  Discount ({order.discount.code})
                </span>
                <span>-{formatCurrency(order.discount.amount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Tax</span>
              <span>{formatCurrency(order.tax)}</span>
            </div>
            <div className="border-t-2 border-black pt-2 flex justify-between text-base">
              <span>Total</span>
              <span>{formatCurrency(order.total)}</span>
            </div>
          </div>

          <div className="bg-white border-2 border-black p-3 text-[11px] text-neutral-700 font-mono space-y-1">
            <p>Created: {formatDateTime(order.createdAt)}</p>
            <p>Updated: {formatDateTime(order.updatedAt)}</p>
            <p className="capitalize font-bold text-black">Channel: {order.channel} • Payment: {order.paymentMethod}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

