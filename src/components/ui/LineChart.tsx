
import {
  Line,
  LineChart as RechartsLineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis
} from 'recharts';

interface LineChartProps {
  data: {
    date: string;
    realizedSavings: number;
  }[];
  title?: string;
}

const LineChart = ({ data, title }: LineChartProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('de-DE', {
      day: '2-digit',
      month: '2-digit'
    }).format(date);
  };

  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="font-medium">
            {new Date(label).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
          <p className="text-indigo-700">
            Einsparungen gesamt: {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(payload[0]?.value || 0)}
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
        <RechartsLineChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis 
            dataKey="date" 
            tickFormatter={formatDate} 
            tickLine={false}
          />
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
          <Line 
            type="monotone" 
            dataKey="realizedSavings" 
            stroke="#2563eb" 
            strokeWidth={2}
            dot={{ stroke: '#2563eb', strokeWidth: 2, r: 4 }}
            activeDot={{ stroke: '#2563eb', strokeWidth: 2, r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
