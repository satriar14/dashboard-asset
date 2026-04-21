"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useFilteredData } from "@/hooks/use-filtered-data";

export function TrendChart() {
  const { trend } = useFilteredData();

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Asset Condition Trend (2025)</CardTitle>
        <CardDescription>Historical data of asset conditions over the last 12 months</CardDescription>
      </CardHeader>
      <CardContent className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trend}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#6b7280', fontSize: 12 }} 
              tickFormatter={(value) => value.toLocaleString('en-US')}
              dx={-10} 
            />
            <Tooltip 
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => typeof value === 'number' ? value.toLocaleString('en-US') : value}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: "20px" }} />
            <Line 
              type="monotone" 
              dataKey="good" 
              name="Good Condition" 
              stroke="#10b981" 
              strokeWidth={3} 
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }} 
            />
            <Line 
              type="monotone" 
              dataKey="warning" 
              name="Warning" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }}  
            />
            <Line 
              type="monotone" 
              dataKey="critical" 
              name="Critical" 
              stroke="#e11d48" 
              strokeWidth={3}
              dot={{ r: 4, strokeWidth: 2 }} 
              activeDot={{ r: 6 }}  
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
