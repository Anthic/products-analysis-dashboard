import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b-2 border-black">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold font-mono tracking-tight text-black">
          {title}
        </h1>
        {description && (
          <p className="text-xs sm:text-sm text-neutral-800 font-sans font-medium mt-1">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex items-center gap-2.5 flex-wrap">
          {children}
        </div>
      )}
    </div>
  );
}

