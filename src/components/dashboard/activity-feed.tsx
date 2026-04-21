"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFilteredData } from "@/hooks/use-filtered-data";

export function ActivityFeed() {
  const { activity } = useFilteredData();

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
        <CardDescription>Recent updates and actions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {activity.map((item) => (
            <div key={item.id} className="flex gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-bold text-slate-600 dark:bg-zinc-800 dark:text-zinc-400">
                {item.initials}
              </div>
              <div className="space-y-1">
                <p className="text-sm leading-tight">
                  <span className="font-bold">{item.user}</span> {item.action}{" "}
                  <span className="font-medium text-blue-600 dark:text-blue-400">{item.target}</span>
                </p>
                <p className="text-xs text-muted-foreground">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
