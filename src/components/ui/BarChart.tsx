
import { useState } from 'react';
import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from 'recharts';

interface BarChartProps {
  data: {
    name: string;
    planned: number;
    realized: number;
  }[];
  title?: string;
}

const BarChart = ({ data, title }: BarChartProps) => {
  const [activeBar, setActiveBar] = useState<string | null>(null);

  const CustomTooltip = ({ active, payload }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">{payload[0].payload.name}</p>
          <p className="text-blue-600">
            Geplant: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(payload[0]?.value || 0)}
          </p>
          <p className="text-indigo-700">
            Realisiert: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(payload[1]?.value || 0)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px]">
      {title && <h2 className="text-lg font-medium mb-4">{title}</h2>}
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
          barGap={8}
          onMouseMove={(state) => {
            if (state?.activeTooltipIndex !== undefined) {
              setActiveBar(data[state.activeTooltipIndex]?.name || null);
            }
          }}
          onMouseLeave={() => setActiveBar(null)}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} />
          <YAxis 
            tickFormatter={(value) => 
              new Intl.NumberFormat('de-DE', { 
                notation: 'compact',
                compactDisplay: 'short',
                maximumFractionDigits: 1
              }).format(value)
            } 
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            name="Geplante Einsparungen" 
            dataKey="planned" 
            fill="#93c5fd" 
            radius={[4, 4, 0, 0]}
            className={activeBar ? "opacity-70" : ""}
          />
          <Bar 
            name="Realisierte Einsparungen" 
            dataKey="realized" 
            fill="#2563eb" 
            radius={[4, 4, 0, 0]}
            className={activeBar ? "opacity-70" : ""}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
