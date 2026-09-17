import { Skeleton } from '@/components/ui/skeleton';

export function StatCardSkeleton() {
  return (
    <div className="bg-white border-2 border-black rounded-none p-4 md:p-5 shadow-none">
      <div className="flex items-center justify-between">
        <Skeleton className="h-3.5 w-24 bg-neutral-300 rounded-none" />
        <Skeleton className="h-7 w-7 bg-neutral-300 rounded-none" />
      </div>
      <div className="mt-4 space-y-2">
        <Skeleton className="h-8 w-32 bg-neutral-300 rounded-none" />
        <Skeleton className="h-4 w-20 bg-neutral-300 rounded-none" />
      </div>
    </div>
  );
}

export function StatCardGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <StatCardSkeleton key={i} />
      ))}
    </div>
  );
}

