import { Skeleton } from '@/components/ui/skeleton';

export default function OrdersLoading() {
  return (
    <div className="space-y-6">
      <div className="space-y-2 pb-4 border-b-2 border-black">
        <Skeleton className="h-8 w-32 bg-neutral-300 rounded-none" />
        <Skeleton className="h-4 w-80 bg-neutral-300 rounded-none" />
      </div>
      <div className="bg-white border-2 border-black p-3.5 rounded-none flex gap-3">
        <Skeleton className="h-8 w-64 bg-neutral-300 rounded-none" />
        <Skeleton className="h-8 w-32 bg-neutral-300 rounded-none" />
      </div>
      <div className="bg-white border-2 border-black rounded-none p-4">
        <div className="space-y-3">
          <Skeleton className="h-9 w-full bg-neutral-300 rounded-none" />
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full bg-neutral-300 rounded-none" />
          ))}
        </div>
      </div>
    </div>
  );
}

