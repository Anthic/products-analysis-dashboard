import { OrderStatus } from "../types/order";

export interface StatusConfig {
  label: string;
  badgeClass: string;
  dotClass: string;
}

export function mapOrderStatus(status: OrderStatus): StatusConfig {
  switch (status) {
    case 'delivered':
      return {
        label: 'Delivered',
        badgeClass: 'bg-[#9ED8C5] text-black border-2 border-black rounded-none font-mono font-bold',
        dotClass: 'bg-black',
      };
    case 'shipped':
      return {
        label: 'Shipped',
        badgeClass: 'bg-[#93C5FD] text-black border-2 border-black rounded-none font-mono font-bold',
        dotClass: 'bg-black',
      };
    case 'processing':
      return {
        label: 'Processing',
        badgeClass: 'bg-[#F6C851] text-black border-2 border-black rounded-none font-mono font-bold',
        dotClass: 'bg-black',
      };
    case 'pending':
      return {
        label: 'Pending',
        badgeClass: 'bg-[#FED7AA] text-black border-2 border-black rounded-none font-mono font-bold',
        dotClass: 'bg-black',
      };
    case 'cancelled':
      return {
        label: 'Cancelled',
        badgeClass: 'bg-[#F7B5CD] text-black border-2 border-black rounded-none font-mono font-bold',
        dotClass: 'bg-black',
      };
    case 'refunded':
      return {
        label: 'Refunded',
        badgeClass: 'bg-[#E9D5FF] text-black border-2 border-black rounded-none font-mono font-bold',
        dotClass: 'bg-black',
      };
    default:
      return {
        label: status,
        badgeClass: 'bg-white text-black border-2 border-black rounded-none font-mono font-bold',
        dotClass: 'bg-black',
      };
  }
}

