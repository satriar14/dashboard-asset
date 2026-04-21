"use client";

import { Search, Filter, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFilters } from "./filter-context";

const LOCATIONS = ["All Locations", "ICU", "IGD", "Rawat Inap", "Laboratorium", "Radiologi"];
const CATEGORIES = ["All Categories", "Ventilator", "Infusion Pump", "Patient Monitor", "ECG", "USG", "MRI/CT"];
const CONDITIONS = ["All Conditions", "Good", "Warning", "Critical"];
const PERIODS = ["All Periods", "This Month", "Last 3 Months", "Last 6 Months", "Year 2025", "Year 2024"];

export function DashboardFilters() {
  const { filters, setFilter, resetFilters } = useFilters();

  return (
    <Card className="border-none bg-white/50 p-4 shadow-sm backdrop-blur-sm dark:bg-zinc-900/50">
      <div className="flex flex-col gap-4 md:flex-row md:items-center">
        {/* Filter Label */}
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-zinc-400">
          <Filter size={16} />
          <span>Filters:</span>
        </div>

        {/* Filter Selects */}
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* Location Filter */}
          <div className="relative">
            <select 
              value={filters.location}
              onChange={(e) => setFilter("location", e.target.value)}
              className="w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-950"
            >
              {LOCATIONS.map((loc) => (
                <option key={loc} value={loc.toLowerCase()}>{loc}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select 
              value={filters.category}
              onChange={(e) => setFilter("category", e.target.value)}
              className="w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-950"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>

          {/* Condition Filter */}
          <div className="relative">
            <select 
              value={filters.condition}
              onChange={(e) => setFilter("condition", e.target.value)}
              className="w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-950"
            >
              {CONDITIONS.map((cond) => (
                <option key={cond} value={cond.toLowerCase()}>{cond}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>

          {/* Period Filter */}
          <div className="relative">
            <select 
              value={filters.period}
              onChange={(e) => setFilter("period", e.target.value)}
              className="w-full appearance-none rounded-lg border bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-800 dark:bg-zinc-950"
            >
              {PERIODS.map((p) => (
                <option key={p} value={p.toLowerCase()}>{p}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          </div>

          {/* Search Search */}
          <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2 text-sm dark:border-zinc-800 dark:bg-zinc-950">
            <Search size={14} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Asset ID or SN..." 
              value={filters.search}
              onChange={(e) => setFilter("search", e.target.value)}
              className="w-full bg-transparent outline-none placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={resetFilters}
            className="h-9 gap-2 text-slate-500 hover:text-rose-500"
          >
            <X size={14} />
            Reset
          </Button>
          <Button size="sm" className="h-9 gap-2 bg-slate-900 shadow-lg hover:bg-slate-800 dark:bg-blue-600 dark:hover:bg-blue-700">
            <SlidersHorizontal size={14} />
            Apply
          </Button>
        </div>
      </div>
    </Card>
  );
}
