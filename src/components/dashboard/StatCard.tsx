import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  changePct: number;
  icon: React.ComponentType<{ className?: string }>;
  description?: string;
  bgColor?: string;
}

export function StatCard({
  title,
  value,
  changePct,
  icon: Icon,
  description = 'vs prev period',
  bgColor = 'bg-white',
}: StatCardProps) {
  const isPositive = changePct > 0;
  const isNegative = changePct < 0;

  return (
    <div className={cn('border-2 border-black rounded-none p-4 md:p-5 text-black shadow-none flex flex-col justify-between', bgColor)}>
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-mono font-bold tracking-wider text-black uppercase">
          {title}
        </span>
        <div className="w-7 h-7 bg-black text-white flex items-center justify-center rounded-none border border-black shrink-0">
          <Icon className="w-3.5 h-3.5" />
        </div>
      </div>

      <div className="mt-3">
        <div className="text-2xl lg:text-3xl font-bold font-mono tracking-tight text-black tabular-nums">
          {value}
        </div>

        <div className="mt-2.5 flex items-center gap-1.5 flex-wrap">
          <span className="inline-flex items-center gap-0.5 font-mono font-bold px-1.5 py-0.5 text-[11px] border border-black bg-white text-black">
            {isPositive && <TrendingUp className="w-3 h-3" />}
            {isNegative && <TrendingDown className="w-3 h-3" />}
            {!isPositive && !isNegative && <Minus className="w-3 h-3" />}
            {Math.abs(changePct)}%
          </span>
          <span className="text-black/80 font-sans text-[11px] font-medium">{description}</span>
        </div>
      </div>
    </div>
  );
}

