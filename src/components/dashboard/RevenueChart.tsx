'use client';

import { useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

import { formatCurrency } from '@/lib/transformers/formatCurrency';
import { TimeSeriesPoint } from '@/lib/types/analytics';

interface RevenueChartProps {
  data: TimeSeriesPoint[];
}

export function RevenueChart({ data }: RevenueChartProps) {
  const chartData = useMemo(() => {
    return data.map((point) => {
      const d = new Date(point.date);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        date: label,
        fullDate: point.date,
        revenue: point.value,
      };
    });
  }, [data]);

  return (
    <div className="bg-white border-2 border-black rounded-none p-4 md:p-5 shadow-none text-black">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm md:text-base font-bold font-mono text-black uppercase tracking-tight">Revenue Trend</h2>
          <p className="text-xs text-neutral-700 font-sans font-medium">Daily revenue performance in BDT</p>
        </div>
        <span className="bg-[#9ED8C5] border-2 border-black font-mono font-bold text-xs px-2.5 py-0.5 text-black">
          BDT (৳)
        </span>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#000000" opacity={0.2} />
            <XAxis
              dataKey="date"
              stroke="#000000"
              fontSize={11}
              fontFamily="var(--font-space-mono), monospace"
              tickLine={false}
              axisLine={{ stroke: '#000000', strokeWidth: 2 }}
              minTickGap={24}
            />
            <YAxis
              stroke="#000000"
              fontSize={11}
              fontFamily="var(--font-space-mono), monospace"
              tickLine={false}
              axisLine={{ stroke: '#000000', strokeWidth: 2 }}
              tickFormatter={(v) => `৳${v >= 1000 ? `${(v / 1000).toFixed(0)}k` : v}`}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const val = payload[0].value as number;
                  return (
                    <div className="bg-white border-2 border-black px-3 py-2 text-xs shadow-none">
                      <p className="text-neutral-600 font-mono text-[11px]">{payload[0].payload.fullDate}</p>
                      <p className="font-bold font-mono text-black text-sm mt-0.5">
                        {formatCurrency(val)}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="linear"
              dataKey="revenue"
              stroke="#000000"
              strokeWidth={3}
              fill="#F6C851"
              fillOpacity={0.85}
              dot={{ r: 3, fill: '#000000', stroke: '#000000' }}
              activeDot={{ r: 6, fill: '#38BDF8', stroke: '#000000', strokeWidth: 2.5 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


