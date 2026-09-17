import { Sidebar } from '@/components/ui/layout/Sidebar';
import { Topbar } from '@/components/ui/layout/Topbar';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#FBF7EE] text-black">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 bg-[#FBF7EE]">
        <Topbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 w-full overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}


