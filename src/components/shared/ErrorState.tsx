'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An error occurred while loading this section. Please try again.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-10 text-center bg-[#F7B5CD] border-2 border-black rounded-none text-black">
      <div className="w-10 h-10 bg-black text-white flex items-center justify-center rounded-none border border-black mb-3">
        <AlertCircle className="w-5 h-5" />
      </div>
      <h3 className="text-sm sm:text-base font-bold font-mono text-black uppercase">{title}</h3>
      <p className="text-xs text-neutral-900 font-sans max-w-md mt-1 mb-4 font-medium">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-mono font-bold rounded-none bg-black text-white hover:bg-neutral-800 transition-none cursor-pointer border-2 border-black"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Try Again
        </button>
      )}
    </div>
  );
}

