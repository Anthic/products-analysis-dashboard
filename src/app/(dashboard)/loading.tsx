import { StatCardGridSkeleton } from '@/components/shared/skeletons/StatCardSkeleton';
import { ChartSkeleton } from '@/components/shared/skeletons/ChartSkeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function OverviewLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 pb-4 border-b-2 border-black">
        <Skeleton className="h-8 w-40 bg-neutral-300 rounded-none" />
        <Skeleton className="h-4 w-72 bg-neutral-300 rounded-none" />
      </div>
      <StatCardGridSkeleton />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white border-2 border-black rounded-none p-5 h-80">
          <Skeleton className="h-5 w-32 mb-4 bg-neutral-300 rounded-none" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full bg-neutral-300 rounded-none" />
            ))}
          </div>
        </div>
        <div className="lg:col-span-1 bg-white border-2 border-black rounded-none p-5 h-80">
          <Skeleton className="h-5 w-32 mb-4 bg-neutral-300 rounded-none" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-neutral-300 rounded-none" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

