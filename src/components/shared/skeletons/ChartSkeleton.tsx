import { Skeleton } from '@/components/ui/skeleton';

export function ChartSkeleton() {
  return (
    <div className="bg-white border-2 border-black rounded-none p-4 md:p-5 shadow-none">
      <div className="space-y-1.5 mb-6">
        <Skeleton className="h-4 w-32 bg-neutral-300 rounded-none" />
        <Skeleton className="h-3 w-48 bg-neutral-300 rounded-none" />
      </div>
      <div className="h-[280px] w-full flex items-end gap-2 pt-8">
        {Array.from({ length: 12 }).map((_, i) => (
          <Skeleton
            key={i}
            className="flex-1 rounded-none bg-neutral-300"
            style={{ height: `${20 + ((i * 17) % 75)}%` }}
          />
        ))}
      </div>
    </div>
  );
}


