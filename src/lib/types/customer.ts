import { Address } from './order';

export type CustomerSegment = 'new' | 'regular' | 'vip';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  isActive: boolean;
  segment: CustomerSegment;
  location: Address;
  totalOrders: number;
  totalSpent: number;
  joinedAt: string; 
}
