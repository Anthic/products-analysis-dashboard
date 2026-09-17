import { OrderStatus } from '@/lib/types/order';
import { mapOrderStatus } from '@/lib/transformers/mapOrderStatus';
import { cn } from '@/lib/utils';

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const cfg = mapOrderStatus(status);

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs',
        cfg.badgeClass
      )}
    >
      <span className={cn('w-1.5 h-1.5 shrink-0', cfg.dotClass)} />
      {cfg.label}
    </span>
  );
}

