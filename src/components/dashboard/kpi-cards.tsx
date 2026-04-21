"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFilteredData } from "@/hooks/use-filtered-data";
import {
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Settings,
  History,
  Ticket,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export function KpiCards() {
  const { kpis } = useFilteredData();

  const cards = [
    {
      title: "Total Assets",
      value: kpis.total_assets.value,
      trend: kpis.total_assets.trend,
      icon: Package,
      className: "text-blue-600",
    },
    {
      title: "Good Condition",
      value: kpis.good_condition.value,
      trend: kpis.good_condition.trend,
      icon: CheckCircle2,
      className: "text-emerald-600",
    },
    {
      title: "Warning",
      value: kpis.warning_condition.value,
      trend: kpis.warning_condition.trend,
      icon: AlertTriangle,
      className: "text-amber-600",
    },
    {
      title: "Critical",
      value: kpis.critical_condition.value,
      trend: kpis.critical_condition.trend,
      icon: XCircle,
      className: "text-rose-600",
    },
    {
      title: "Maintenance",
      value: kpis.under_maintenance.value,
      trend: kpis.under_maintenance.trend,
      icon: Settings,
      className: "text-purple-600",
    },
    {
      title: "Overdue Calib",
      value: kpis.overdue_calibration.value,
      trend: kpis.overdue_calibration.trend,
      icon: History,
      className: "text-orange-600",
    },
    {
      title: "Open Tickets",
      value: kpis.open_tickets.value,
      trend: kpis.open_tickets.trend,
      icon: Ticket,
      className: "text-indigo-600",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {cards.map((card) => (
        <Card key={card.title} className="overflow-hidden border-none shadow-md transition-all hover:shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-base font-bold text-muted-foreground">
              {card.title}
            </CardTitle>
            <card.icon className={`h-4 w-4 ${card.className}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value.toLocaleString()}</div>
            <p className="mt-1 flex items-center text-sm text-muted-foreground">
              {card.trend.startsWith("+") ? (
                <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
              ) : (
                <ArrowDownRight className="mr-1 h-3 w-3 text-rose-500" />
              )}
              <span className={card.trend.startsWith("+") ? "text-emerald-500 font-medium" : "text-rose-500 font-medium"}>
                {card.trend}
              </span>
              <span className="ml-1">vs last month</span>
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
