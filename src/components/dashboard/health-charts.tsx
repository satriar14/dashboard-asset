"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  LabelList,
} from "recharts";
import { useFilteredData } from "@/hooks/use-filtered-data";

export function HealthCharts() {
  const { health, location } = useFilteredData();

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Asset Health</CardTitle>
          <CardDescription>Current condition of all tracked assets</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={health}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                label={({ value }) => typeof value === 'number' ? value.toLocaleString('en-US') : value}
              >
                {health.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any) => typeof value === 'number' ? value.toLocaleString('en-US') : value}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Distribution by Location</CardTitle>
          <CardDescription>Number of assets per department</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={location} layout="vertical">
              <XAxis type="number" hide />
              <YAxis 
                dataKey="location" 
                type="category" 
                width={100} 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                 cursor={{ fill: 'transparent' }}
                 contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                 formatter={(value: any) => typeof value === 'number' ? value.toLocaleString('en-US') : value}
              />
              <Bar 
                dataKey="count" 
                fill="#3b82f6" 
                radius={[0, 4, 4, 0]} 
                barSize={20}
              >
                <LabelList dataKey="count" position="right" fill="#6b7280" fontSize={12} formatter={(v: any) => typeof v === 'number' ? v.toLocaleString('en-US') : v} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
