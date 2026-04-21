"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFilteredData } from "@/hooks/use-filtered-data";

export function RecentIssues() {
  const { issues } = useFilteredData();

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle>Recent Issues & Tickets</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Asset Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Technician</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell className="text-muted-foreground">{issue.date}</TableCell>
                <TableCell className="font-medium">{issue.name}</TableCell>
                <TableCell>{issue.category}</TableCell>
                <TableCell>{issue.location}</TableCell>
                <TableCell>{issue.issue}</TableCell>
                <TableCell>
                  <Badge 
                    variant="secondary"
                    className={
                      issue.status === "Open" ? "bg-rose-100 text-rose-700 hover:bg-rose-100" :
                      issue.status === "Critical" ? "bg-red-500 text-white hover:bg-red-600" :
                      issue.status === "Ongoing" ? "bg-amber-100 text-amber-700 hover:bg-amber-100" : 
                      issue.status === "Pending" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                      issue.status === "Resolved" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-100" :
                      ""
                    }
                  >
                    {issue.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge 
                    variant="outline"
                    className={
                      issue.priority === "High" ? "border-rose-500 text-rose-500" : 
                      issue.priority === "Medium" ? "border-amber-500 text-amber-500" :
                      "border-emerald-500 text-emerald-500"
                    }
                  >
                    {issue.priority}
                  </Badge>
                </TableCell>
                <TableCell>{issue.tech}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
