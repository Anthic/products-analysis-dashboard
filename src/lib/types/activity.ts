export type ActivityType =
  | 'order_created'
  | 'order_updated'
  | 'customer_signed_up'
  | 'payment_failed'
  | 'refund_issued';

export type ActivitySeverity = 'info' | 'warning' | 'critical';

export interface SystemActivity {
  id: string;
  type: ActivityType;
  severity: ActivitySeverity;
  message: string;
  actor?: string; 
  createdAt: string;
}
