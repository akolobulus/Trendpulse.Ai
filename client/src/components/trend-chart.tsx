import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

interface TrendChartProps {
  data: { day: string; mentions: number }[];
}

export function TrendChart({ data }: TrendChartProps) {
  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="text-base sm:text-lg">Mention Trends (Last 7 Days)</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200" />
              <XAxis 
                dataKey="day" 
                className="text-xs sm:text-sm"
                tick={{ fill: '#6B7280', fontSize: '12px' }}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
              />
              <YAxis 
                className="text-xs sm:text-sm"
                tick={{ fill: '#6B7280', fontSize: '12px' }}
                width={40}
              />
              <Line 
                type="monotone" 
                dataKey="mentions" 
                stroke="hsl(var(--primary))" 
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
