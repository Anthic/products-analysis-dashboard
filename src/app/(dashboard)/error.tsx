'use client';
import { ErrorState } from '@/components/shared/ErrorState';
export default function OverviewError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="py-12">
      <ErrorState
        title="Failed to load dashboard overview"
        message={error.message || 'There was a problem fetching dashboard metrics.'}
        onRetry={reset}
      />
    </div>
  );
}
