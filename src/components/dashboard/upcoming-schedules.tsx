"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useFilteredData } from "@/hooks/use-filtered-data";

export function UpcomingSchedules() {
  const { schedules } = useFilteredData();

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Upcoming Schedules</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <div key={schedule.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
              <div className="space-y-1">
                <p className="font-medium">{schedule.asset}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 dark:bg-zinc-800">{schedule.type}</span>
                  <span>•</span>
                  <span>{schedule.date}</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{schedule.pic}</p>
                <Badge 
                  variant="outline" 
                  className={
                    schedule.status === "Scheduled" ? "border-blue-500 text-blue-500" :
                    schedule.status === "Pending" ? "border-amber-500 text-amber-500" :
                    "border-rose-500 text-rose-500"
                  }
                >
                  {schedule.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
