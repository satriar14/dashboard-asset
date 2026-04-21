import { KpiCards } from "@/components/dashboard/kpi-cards";
import { HealthCharts } from "@/components/dashboard/health-charts";
import { MaintenanceCalibration } from "@/components/dashboard/maintenance-calibration";
import { RecentIssues } from "@/components/dashboard/recent-issues";
import { TrendChart } from "@/components/dashboard/trend-chart";
import { AssetCategories } from "@/components/dashboard/asset-categories";
import { UpcomingSchedules } from "@/components/dashboard/upcoming-schedules";
import { CostTracker } from "@/components/dashboard/cost-tracker";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { DashboardFilters } from "@/components/dashboard/dashboard-filters";
import { FilterProvider } from "@/components/dashboard/filter-context";
import {
  LayoutDashboard,
  MapPin,
  Search,
  Bell,
  UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <FilterProvider>
      <div className="min-h-screen bg-slate-50/50 dark:bg-zinc-950">
        {/* Top Header */}
        <header className="sticky top-0 z-10 border-b bg-white/80 backdrop-blur-md dark:bg-zinc-900/80">
          <div className="container mx-auto flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
                <LayoutDashboard size={20} />
              </div>
              <span className="text-xl font-bold tracking-tight">AssetGuard AI</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="hidden items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5 dark:bg-zinc-800 md:flex">
                <Search size={16} className="text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="bg-transparent text-sm outline-none"
                />
              </div>
              <Button variant="ghost" size="icon" className="relative">
                <Bell size={20} />
                <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-rose-500" />
              </Button>
              <Button variant="ghost" size="icon">
                <UserCircle size={20} />
              </Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto space-y-8 p-4 py-8 md:p-8">
          {/* Page Title */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
              <p className="text-muted-foreground italic">Real-time health and status monitoring for all medical assets.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Export Report</Button>
              <Button className="bg-blue-600 hover:bg-blue-700">Add New Asset</Button>
            </div>
          </div>

          {/* Quick Filters */}
          <DashboardFilters />

          {/* 1. KPI Cards */}
          <KpiCards />

          {/* 2 & 3. Primary Charts */}
          <div className="grid gap-8">
            <HealthCharts />
            <MaintenanceCalibration />
          </div>

          {/* 4. Secondary Charts */}
          <div className="grid gap-8 md:grid-cols-2">
            <AssetCategories />
            <CostTracker />
          </div>

          {/* 5. Lists & Feeds */}
          <div className="grid gap-8 md:grid-cols-2 items-start">
            <UpcomingSchedules />
            <ActivityFeed />
          </div>

          {/* 6. Bottom Section: Trend & Table */}
          <div className="grid gap-8">
            <TrendChart />
            <RecentIssues />
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-white p-4 text-center text-sm text-muted-foreground dark:bg-zinc-900">
          <p>© 2026 AssetGuard AI - Advanced Medical Asset Management System</p>
        </footer>
      </div>
    </FilterProvider>
  );
}
