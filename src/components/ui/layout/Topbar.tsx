'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, Bell } from 'lucide-react';

export function Topbar() {
  const pathname = usePathname();
  const router = useRouter();

  const getPageTitle = () => {
    if (pathname === '/orders') return 'Orders Management';
    if (pathname.startsWith('/orders/')) return 'Order Details';
    return 'Overview';
  };

  return (
    <header className="h-16 border-b-[3px] border-black bg-[#FBF7EE] sticky top-0 z-20 px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => router.back()}
          aria-label="Go back"
          className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-none cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <h1 className="text-base sm:text-lg font-bold font-mono text-black tracking-tight uppercase">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center gap-3">

        <button 
          type="button" 
          aria-label="View notifications"
          className="w-8 h-8 border-2 border-black bg-white flex items-center justify-center text-black hover:bg-black hover:text-white transition-none cursor-pointer relative shrink-0"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-black border border-white" />
        </button>

        <div className="w-8 h-8 border-2 border-black bg-[#F6C851] flex items-center justify-center font-mono font-bold text-xs text-black shrink-0">
          AD
        </div>
      </div>
    </header>
  );
}

