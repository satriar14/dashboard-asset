"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList
} from "recharts";
import { useFilteredData } from "@/hooks/use-filtered-data";

export function CostTracker() {
  const { cost } = useFilteredData();

  const formatCurrency = (value: number) => {
    return `${(value / 1000000).toFixed(1)}jt`;
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Cost Tracker (Maintenance Cost vs Budget)</CardTitle>
        <CardDescription>Actual spending compared to monthly budget (in jt)</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={cost}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="month" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis fontSize={12} tickLine={false} axisLine={false} tickFormatter={formatCurrency} />
            <Tooltip 
               cursor={{ fill: 'rgba(0,0,0,0.05)' }}
               contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
               formatter={(value: any) => typeof value === 'number' ? formatCurrency(value) : value}
            />
            <Legend wrapperStyle={{ paddingTop: "20px" }} />
            <Bar dataKey="actual" name="Actual Cost" fill="#3b82f6" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="actual" position="top" fill="#6b7280" fontSize={11} formatter={(v: any) => typeof v === 'number' ? formatCurrency(v) : v} />
            </Bar>
            <Bar dataKey="budget" name="Budget" fill="#94a3b8" radius={[4, 4, 0, 0]}>
              <LabelList dataKey="budget" position="top" fill="#6b7280" fontSize={11} formatter={(v: any) => typeof v === 'number' ? formatCurrency(v) : v} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
