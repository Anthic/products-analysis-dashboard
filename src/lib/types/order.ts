export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentMethod = 'card' | 'paypal' | 'bank_transfer' | 'cod';
export type OrderChannel = 'web' | 'mobile' | 'api';

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Address {
  city: string;
  country: string;
}

export interface OrderDiscount {
  code: string;
  amount: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  channel: OrderChannel;
  shippingAddress: Address;
  items: OrderItem[]; 
  discount: OrderDiscount | null;
  subtotal: number;
  tax: number;
  total: number;
  createdAt: string; 
  updatedAt: string; 
}

export interface OrdersQueryParams {
  search?: string;
  status?: OrderStatus;
  from?: string;
  to?: string;
  page?: number;
  pageSize?: number;
  sortBy?: 'createdAt' | 'total' | 'customerName';
  sortDir?: 'asc' | 'desc';
}
