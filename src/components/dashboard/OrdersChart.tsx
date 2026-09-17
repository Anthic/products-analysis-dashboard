'use client';

import { TimeSeriesPoint } from '@/lib/types/analytics';
import { useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface OrdersChartProps {
  data: TimeSeriesPoint[];
}

const BAR_COLORS = ['#F6C851', '#38BDF8', '#9ED8C5', '#A78BFA', '#FB923C', '#F472B6'];

export function OrdersChart({ data }: OrdersChartProps) {
  const chartData = useMemo(() => {
    return data.map((point) => {
      const d = new Date(point.date);
      const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      return {
        date: label,
        fullDate: point.date,
        orders: point.value,
      };
    });
  }, [data]);

  return (
    <div className="bg-[#F7B5CD] border-2 border-black rounded-none p-4 md:p-5 shadow-none text-black">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm md:text-base font-bold font-mono text-black uppercase tracking-tight">Orders Volume</h2>
          <p className="text-xs text-neutral-800 font-sans font-medium">Daily order count distribution</p>
        </div>
        <span className="bg-white border-2 border-black font-mono font-bold text-xs px-2.5 py-0.5 text-black">
          Volume
        </span>
      </div>

      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              allowDecimals={false}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white border-2 border-black px-3 py-2 text-xs shadow-none">
                      <p className="text-neutral-700 font-mono text-[11px]">{payload[0].payload.fullDate}</p>
                      <p className="font-bold font-mono text-black text-sm mt-0.5">
                        {payload[0].value} Orders
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="orders" radius={[0, 0, 0, 0]} maxBarSize={28}>
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={BAR_COLORS[index % BAR_COLORS.length]}
                  stroke="#000000"
                  strokeWidth={2}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


