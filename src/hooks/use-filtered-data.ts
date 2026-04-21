"use client";

import { useMemo } from "react";
import { useFilters } from "@/components/dashboard/filter-context";
import {
  KPI_SUMMARY,
  ASSET_HEALTH,
  ASSET_CATEGORIES,
  MONTHLY_TREND,
  MAINTENANCE_DATA,
  CALIBRATION_DATA,
  COST_DATA,
  LOCATION_DATA,
  UPCOMING_SCHEDULES,
  ACTIVITY_FEED,
  RECENT_ISSUES
} from "@/lib/mock-data";

// Map condition filter value to display names used in data
const CONDITION_MAP: Record<string, string> = {
  "good": "Good",
  "warning": "Warning",
  "critical": "Critical",
};

export function useFilteredData() {
  const { filters } = useFilters();

  return useMemo(() => {
    const isAllConditions = filters.condition === "all conditions";
    const isAllLocations = filters.location === "all locations";
    const isAllCategories = filters.category === "all categories";
    const conditionLabel = CONDITION_MAP[filters.condition] ?? null;

    // ─── 1. Filter raw lists (Tables / Feeds) ───────────────────────────────
    const filteredIssues = RECENT_ISSUES.filter((item) => {
      const matchLoc = isAllLocations || item.location.toLowerCase() === filters.location.toLowerCase();
      const matchCat = isAllCategories || item.category.toLowerCase() === filters.category.toLowerCase();
      const matchCond = isAllConditions || item.condition.toLowerCase() === filters.condition.toLowerCase();
      const matchSearch = !filters.search ||
        item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        item.issue.toLowerCase().includes(filters.search.toLowerCase());
      return matchLoc && matchCat && matchCond && matchSearch;
    });

    const filteredSchedules = UPCOMING_SCHEDULES.filter((item) => {
      const matchLoc = isAllLocations || item.location.toLowerCase() === filters.location.toLowerCase();
      const matchCat = isAllCategories || item.category.toLowerCase() === filters.category.toLowerCase();
      const matchSearch = !filters.search || item.asset.toLowerCase().includes(filters.search.toLowerCase());
      return matchLoc && matchCat && matchSearch;
    });

    const filteredActivity = ACTIVITY_FEED.filter((item) => {
      const matchLoc = isAllLocations || item.location.toLowerCase() === filters.location.toLowerCase();
      const matchCat = isAllCategories || item.category.toLowerCase() === filters.category.toLowerCase();
      return matchLoc && matchCat;
    });

    // ─── 2. Factor for location / category narrowing ──────────────────────
    // Condition has its OWN specific logic below instead of a blanket factor
    let baseFactor = 1.0;
    if (!isAllLocations) baseFactor *= 0.3;
    if (!isAllCategories) baseFactor *= 0.2;

    // ─── 3. Condition-aware aggregates ────────────────────────────────────

    // Asset Health (Pie) – zero out non-matching slices when condition is set
    const filteredHealth = ASSET_HEALTH.map(item => {
      const isMatch = isAllConditions || item.name === conditionLabel;
      const value = isMatch
        ? Math.round(item.value * baseFactor)
        : 0;               // Hide non-matching slices
      return { ...item, value };
    }).filter(item => item.value > 0); // Remove zero-value slices

    // Trend chart – zero out non-matching series when condition is set
    const filteredTrend = MONTHLY_TREND.map(item => ({
      ...item,
      good: (isAllConditions || conditionLabel === "Good")
        ? Math.round(item.good * baseFactor) : 0,
      warning: (isAllConditions || conditionLabel === "Warning")
        ? Math.round(item.warning * baseFactor) : 0,
      critical: (isAllConditions || conditionLabel === "Critical")
        ? Math.round(item.critical * baseFactor) : 0,
    }));

    // KPI Cards – amplify the matching KPI, suppress the rest
    const condFactor = isAllConditions ? 1 : 0.05;
    const filteredKpis = {
      ...KPI_SUMMARY,
      total_assets: {
        ...KPI_SUMMARY.total_assets,
        value: isAllConditions
          ? Math.round(KPI_SUMMARY.total_assets.value * baseFactor)
          : Math.round(KPI_SUMMARY[
              conditionLabel === "Good" ? "good_condition"
            : conditionLabel === "Warning" ? "warning_condition"
            : "critical_condition"
            ].value * baseFactor),
      },
      good_condition: {
        ...KPI_SUMMARY.good_condition,
        value: Math.round(KPI_SUMMARY.good_condition.value * baseFactor *
          (isAllConditions || conditionLabel === "Good" ? 1 : condFactor)),
      },
      warning_condition: {
        ...KPI_SUMMARY.warning_condition,
        value: Math.round(KPI_SUMMARY.warning_condition.value * baseFactor *
          (isAllConditions || conditionLabel === "Warning" ? 1 : condFactor)),
      },
      critical_condition: {
        ...KPI_SUMMARY.critical_condition,
        value: Math.round(KPI_SUMMARY.critical_condition.value * baseFactor *
          (isAllConditions || conditionLabel === "Critical" ? 1 : condFactor)),
      },
      under_maintenance: {
        ...KPI_SUMMARY.under_maintenance,
        value: Math.round(KPI_SUMMARY.under_maintenance.value * baseFactor * (isAllConditions ? 1 : 0.3)),
      },
      overdue_calibration: {
        ...KPI_SUMMARY.overdue_calibration,
        value: Math.round(KPI_SUMMARY.overdue_calibration.value * baseFactor * (isAllConditions ? 1 : 0.3)),
      },
      open_tickets: {
        ...KPI_SUMMARY.open_tickets,
        value: Math.round(KPI_SUMMARY.open_tickets.value * baseFactor *
          (isAllConditions ? 1 : conditionLabel === "Critical" ? 1 : 0.2)),
      },
    };

    // Asset Categories – apply baseFactor + category filter
    const filteredCategories = ASSET_CATEGORIES.map(item => ({
      ...item,
      value: (isAllCategories || item.name.toLowerCase() === filters.category.toLowerCase())
        ? Math.round(item.value * baseFactor * (isAllConditions ? 1 : 0.35))
        : Math.round(item.value * 0.05),
    }));

    // Maintenance & Calibration – scale with condition severity
    const maintenanceFactor = baseFactor * (
      isAllConditions ? 1
      : conditionLabel === "Critical" ? 1.5
      : conditionLabel === "Warning" ? 0.7
      : 0.2   // Good condition → fewer maintenance tasks
    );
    const calibrationFactor = baseFactor * (
      isAllConditions ? 1
      : conditionLabel === "Good" ? 1.2
      : conditionLabel === "Warning" ? 0.6
      : 0.3
    );
    const costFactor = baseFactor * (isAllConditions ? 1 : conditionLabel === "Critical" ? 1.4 : conditionLabel === "Warning" ? 0.7 : 0.3);

    // Period filter for Trend
    let finalTrend = filteredTrend;
    if (filters.period === "this month") finalTrend = filteredTrend.slice(-1);
    else if (filters.period === "last 3 months") finalTrend = filteredTrend.slice(-3);
    else if (filters.period === "last 6 months") finalTrend = filteredTrend.slice(-6);

    return {
      kpis: filteredKpis,
      health: filteredHealth,
      trend: finalTrend,
      categories: filteredCategories,
      maintenance: MAINTENANCE_DATA.map(d => ({ ...d, count: Math.max(0, Math.round(d.count * maintenanceFactor)) })),
      calibration: CALIBRATION_DATA.map(d => ({ ...d, count: Math.max(0, Math.round(d.count * calibrationFactor)) })),
      cost: COST_DATA.map(d => ({
        ...d,
        actual: Math.round(d.actual * costFactor),
        budget: Math.round(d.budget * costFactor),
      })),
      location: LOCATION_DATA
        .filter(d => isAllLocations || d.location.toLowerCase() === filters.location.toLowerCase())
        .map(d => ({ ...d, count: Math.round(d.count * baseFactor * (isAllConditions ? 1 : 0.35)) })),
      schedules: filteredSchedules,
      activity: filteredActivity,
      issues: filteredIssues,
    };
  }, [filters]);
}
