import { SearchX } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function EmptyState({
  title = 'No results found',
  description = 'Try adjusting your search or filters to find what you are looking for.',
  action,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-10 text-center bg-white border-2 border-dashed border-black rounded-none text-black">
      <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none border border-black mb-3">
        <SearchX className="w-5 h-5" />
      </div>
      <h3 className="text-sm sm:text-base font-bold font-mono text-black uppercase">{title}</h3>
      <p className="text-xs text-neutral-700 font-sans max-w-sm mt-1 mb-4 font-medium">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
}

