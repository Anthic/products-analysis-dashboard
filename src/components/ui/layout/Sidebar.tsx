'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const navItems: NavItem[] = [
  { name: 'Overview', href: '/', icon: LayoutDashboard },
  { name: 'Orders', href: '/orders', icon: ShoppingBag, badge: '98' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full md:w-56 lg:w-60 bg-[#9ED8C5] border-b-[3px] md:border-b-0 md:border-r-[3px] border-black flex flex-col justify-between select-none z-30 shrink-0">
      <div>
        <div className="h-16 flex items-center px-4 sm:px-5 border-b-2 border-black">
          <div className="border-2 border-black bg-white px-2.5 py-1 flex items-center gap-2 shadow-none">
            <span className="font-mono font-bold text-xs bg-black text-white px-1 py-0.5">&lt;/&gt;</span>
            <span className="font-mono font-bold text-sm tracking-widest text-black">PULSE</span>
          </div>
        </div>
        <div className="p-3 sm:p-4">
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center justify-between px-3 py-2 text-xs font-mono font-bold transition-none rounded-none border-2',
                    isActive
                      ? 'bg-black text-white border-black'
                      : 'text-black border-transparent hover:border-black hover:bg-black/5'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn('w-4 h-4', isActive ? 'text-white' : 'text-black')} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={cn(
                        'text-[10px] px-1.5 py-0.5 font-mono font-bold border',
                        isActive
                          ? 'bg-white text-black border-white'
                          : 'bg-black text-white border-black'
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
}

