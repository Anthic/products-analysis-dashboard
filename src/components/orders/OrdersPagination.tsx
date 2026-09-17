'use client';

import { useOrderFilters } from '@/lib/hook/useOrderFilters';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface OrdersPaginationProps {
  total: number;
}

export function OrdersPagination({ total }: OrdersPaginationProps) {
  const { filters, updateFilters } = useOrderFilters();

  const totalPages = Math.max(1, Math.ceil(total / filters.pageSize));
  const currentPage = Math.min(filters.page, totalPages);

  const startIdx = total === 0 ? 0 : (currentPage - 1) * filters.pageSize + 1;
  const endIdx = Math.min(currentPage * filters.pageSize, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-3 bg-white border-2 border-black rounded-none shadow-none text-xs font-mono font-bold text-black">
      <div>
        Showing <span className="font-bold underline">{startIdx}</span> to{' '}
        <span className="font-bold underline">{endIdx}</span> of{' '}
        <span className="font-bold underline">{total}</span> orders
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span>Rows:</span>
          <select
            value={filters.pageSize}
            onChange={(e) => updateFilters({ pageSize: Number(e.target.value), page: 1 })}
            aria-label="Rows per page"
            className="bg-white border-2 border-black rounded-none px-2 py-1 text-xs font-mono font-bold text-black cursor-pointer focus:outline-hidden"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            disabled={currentPage <= 1}
            onClick={() => updateFilters({ page: currentPage - 1 })}
            className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black disabled:cursor-not-allowed transition-none cursor-pointer rounded-none"
            title="Previous page"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <span className="px-2">
            Page {currentPage} of {totalPages}
          </span>

          <button
            disabled={currentPage >= totalPages}
            onClick={() => updateFilters({ page: currentPage + 1 })}
            className="p-1.5 border-2 border-black bg-white hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black disabled:cursor-not-allowed transition-none cursor-pointer rounded-none"
            title="Next page"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

