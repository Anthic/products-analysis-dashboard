'use client';

import { ErrorState } from '@/components/shared/ErrorState';

export default function OrdersError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-12">
      <ErrorState
        title="Failed to load orders"
        message={error.message || 'There was a problem fetching the orders list.'}
        onRetry={reset}
      />
    </div>
  );
}
