'use client';

import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';

import { OrderStatus } from '@/lib/types/order';
import { useOrderFilters } from '@/lib/hook/useOrderFilters';
import { useDebouncedValue } from '@/lib/hook/useDebouncedValue';

const STATUS_OPTIONS: { label: string; value: OrderStatus | '' }[] = [
  { label: 'All Statuses', value: '' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Shipped', value: 'shipped' },
  { label: 'Processing', value: 'processing' },
  { label: 'Pending', value: 'pending' },
  { label: 'Cancelled', value: 'cancelled' },
  { label: 'Refunded', value: 'refunded' },
];

export function OrdersToolbar() {
  const { filters, updateFilters, resetFilters } = useOrderFilters();
  const [searchInput, setSearchInput] = useState(filters.search);
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  useEffect(() => {
    if (debouncedSearch !== filters.search) {
      updateFilters({ search: debouncedSearch || null });
    }
  }, [debouncedSearch, filters.search, updateFilters]);

  useEffect(() => {
    setSearchInput(filters.search);
  }, [filters.search]);

  const hasActiveFilters = Boolean(filters.search || filters.status || filters.from || filters.to);

  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white border-2 border-black p-3.5 rounded-none shadow-none text-black">
      <div className="flex flex-1 flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-black" />
          <input
            type="text"
            placeholder="Search by order # or customer..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="w-full bg-white border-2 border-black rounded-none pl-9 pr-8 py-1.5 text-xs font-mono font-bold text-black placeholder:text-neutral-500 focus:outline-hidden"
          />
          {searchInput && (
            <button
              onClick={() => setSearchInput('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-black hover:opacity-60 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <div className="relative">
          <select
            value={filters.status}
            onChange={(e) => updateFilters({ status: e.target.value || null })}
            aria-label="Filter orders by status"
            className="bg-white border-2 border-black rounded-none px-3 py-1.5 text-xs font-mono font-bold text-black focus:outline-hidden cursor-pointer"
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-1.5 bg-white border-2 border-black rounded-none px-2.5 py-1 text-xs font-mono font-bold text-black">
          <input
            type="date"
            value={filters.from}
            onChange={(e) => updateFilters({ from: e.target.value || null })}
            aria-label="Filter from date"
            className="bg-transparent text-xs font-mono font-bold text-black focus:outline-hidden cursor-pointer"
          />
          <span className="text-black text-xs font-bold">-</span>
          <input
            type="date"
            value={filters.to}
            onChange={(e) => updateFilters({ to: e.target.value || null })}
            aria-label="Filter to date"
            className="bg-transparent text-xs font-mono font-bold text-black focus:outline-hidden cursor-pointer"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <button
          onClick={resetFilters}
          className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-black bg-white border-2 border-black px-3 py-1.5 hover:bg-black hover:text-white transition-none cursor-pointer self-end md:self-auto rounded-none"
        >
          <X className="w-3.5 h-3.5" />
          Clear filters
        </button>
      )}
    </div>
  );
}

