'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback } from 'react';
import { OrderStatus } from '@/lib/types/order';

export function useOrderFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';
  const status = (searchParams.get('status') as OrderStatus) || '';
  const from = searchParams.get('from') || '';
  const to = searchParams.get('to') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10);
  const sortBy = searchParams.get('sortBy') || 'createdAt';
  const sortDir = (searchParams.get('sortDir') as 'asc' | 'desc') || 'desc';

  const updateFilters = useCallback(
    (updates: Record<string, string | number | null | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === undefined || value === '') {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });
      if (!('page' in updates) && updates.page === undefined) {
        params.set('page', '1');
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const resetFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  return {
    filters: { search, status, from, to, page, pageSize, sortBy, sortDir },
    updateFilters,
    resetFilters,
  };
}
