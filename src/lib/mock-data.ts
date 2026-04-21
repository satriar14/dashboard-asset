export const KPI_SUMMARY = {
  total_assets: { value: 1248, trend: "+2.4%" },
  good_condition: { value: 1020, trend: "+1.2%" },
  warning_condition: { value: 150, trend: "-5.0%" },
  critical_condition: { value: 78, trend: "-12.5%" },
  under_maintenance: { value: 64, trend: "+8.3%" },
  overdue_calibration: { value: 23, trend: "-4.2%" },
  open_tickets: { value: 41, trend: "-2.4%" }
};

export const ASSET_HEALTH = [
  { name: "Good", value: 1020, color: "#10b981" },
  { name: "Warning", value: 150, color: "#f59e0b" },
  { name: "Critical", value: 78, color: "#e11d48" }
];

export const ASSET_CATEGORIES = [
  { name: "Ventilator", value: 150, fill: "#3b82f6" },
  { name: "Infusion Pump", value: 320, fill: "#10b981" },
  { name: "Patient Monitor", value: 410, fill: "#8b5cf6" },
  { name: "ECG", value: 200, fill: "#f59e0b" },
  { name: "USG", value: 85, fill: "#ec4899" },
  { name: "MRI/CT", value: 15, fill: "#64748b" },
  { name: "Others", value: 68, fill: "#94a3b8" }
];

export const MONTHLY_TREND = [
  { month: "Jan", good: 950, warning: 120, critical: 90 },
  { month: "Feb", good: 960, warning: 125, critical: 85 },
  { month: "Mar", good: 975, warning: 110, critical: 80 },
  { month: "Apr", good: 990, warning: 115, critical: 75 },
  { month: "May", good: 1000, warning: 105, critical: 70 },
  { month: "Jun", good: 1010, warning: 130, critical: 65 },
  { month: "Jul", good: 990, warning: 140, critical: 60 },
  { month: "Aug", good: 1005, warning: 135, critical: 75 },
  { month: "Sep", good: 1015, warning: 120, critical: 80 },
  { month: "Oct", good: 1025, warning: 145, critical: 70 },
  { month: "Nov", good: 1010, warning: 155, critical: 85 },
  { month: "Dec", good: 1020, warning: 150, critical: 78 }
];

export const MAINTENANCE_DATA = [
  { status: "Scheduled", count: 120 },
  { status: "Ongoing", count: 64 },
  { status: "Overdue", count: 18 }
];

export const CALIBRATION_DATA = [
  { status: "Valid", count: 1100 },
  { status: "Due (<30d)", count: 125 },
  { status: "Expired", count: 23 }
];

export const COST_DATA = [
  { month: "Jul", actual: 4500000, budget: 5000000 },
  { month: "Aug", actual: 5200000, budget: 5000000 },
  { month: "Sep", actual: 4800000, budget: 5000000 },
  { month: "Oct", actual: 6100000, budget: 5000000 },
  { month: "Nov", actual: 4900000, budget: 5000000 },
  { month: "Dec", actual: 5500000, budget: 5000000 }
];

export const LOCATION_DATA = [
  { location: "ICU", count: 210 },
  { location: "IGD", count: 180 },
  { location: "Rawat Inap", count: 520 },
  { location: "Laboratorium", count: 210 },
  { location: "Radiologi", count: 128 }
];

export const UPCOMING_SCHEDULES = [
  { id: 1, asset: "MRI Unit 1", type: "Calibration", date: "2026-04-20", pic: "Dr. Budi", status: "Scheduled", location: "Radiologi", category: "MRI/CT" },
  { id: 2, asset: "Ventilator ICU-03", type: "Maintenance", date: "2026-04-22", pic: "Tech A", status: "Pending", location: "ICU", category: "Ventilator" },
  { id: 3, asset: "Defibrillator IGD-1", type: "Maintenance", date: "2026-04-25", pic: "Tech B", status: "Action Needed", location: "IGD", category: "Defibrillator" },
  { id: 4, asset: "USG Poli Obgyn", type: "Calibration", date: "2026-04-28", pic: "Tech A", status: "Scheduled", location: "Rawat Inap", category: "USG" },
  { id: 5, asset: "Patient Monitor-12", type: "Maintenance", date: "2026-05-02", pic: "Tech C", status: "Scheduled", location: "IGD", category: "Patient Monitor" },
  { id: 6, asset: "Syringe Pump SP-05", type: "Calibration", date: "2026-05-05", pic: "Tech B", status: "Scheduled", location: "ICU", category: "Others" },
];

export const ACTIVITY_FEED = [
  { id: 1, user: "Tech A", action: "completed maintenance on", target: "Ventilator ICU-12", time: "2 hours ago", initials: "TA", location: "ICU", category: "Ventilator" },
  { id: 2, user: "Dr. Budi", action: "reported issue with", target: "ECG Monitor 05", time: "5 hours ago", initials: "DB", location: "Radiologi", category: "ECG" },
  { id: 3, user: "Tech B", action: "calibrated", target: "Syringe Pump SP-22", time: "Yesterday", initials: "TB", location: "Rawat Inap", category: "Others" },
  { id: 4, user: "Admin", action: "added new asset", target: "Portable X-Ray Unit", time: "Yesterday", initials: "AD", location: "IGD", category: "Others" },
  { id: 5, user: "Tech C", action: "started maintenance on", target: "Patient Monitor-08", time: "2 days ago", initials: "TC", location: "ICU", category: "Patient Monitor" },
];

export const RECENT_ISSUES = [
  { id: 1, name: "Ventilator ICU-12", category: "Ventilator", location: "ICU", issue: "Pressure alarm", status: "Resolved", priority: "High", tech: "Tech A", date: "2026-04-16", condition: "Good" },
  { id: 2, name: "MRI Unit 2", category: "MRI/CT", location: "Radiologi", issue: "Cooling system", status: "Pending", priority: "High", tech: "Pending", date: "2026-04-17", condition: "Critical" },
  { id: 3, name: "Infusion Pump-88", category: "Infusion Pump", location: "Rawat Inap", issue: "Battery dead", status: "Ongoing", priority: "Medium", tech: "Tech B", date: "2026-04-17", condition: "Warning" },
  { id: 4, name: "Patient Monitor-45", category: "Patient Monitor", location: "IGD", issue: "Screen flicker", status: "Open", priority: "Low", tech: "Tech C", date: "2026-04-16", condition: "Warning" },
  { id: 5, name: "Defibrillator-02", category: "Defibrillator", location: "ICU", issue: "Self-test failed", status: "Critical", priority: "High", tech: "Tech A", date: "2026-04-15", condition: "Critical" },
  { id: 6, name: "ECG Monitor-05", category: "ECG", location: "Radiologi", issue: "Leads broken", status: "Resolved", priority: "Medium", tech: "Tech B", date: "2026-04-14", condition: "Good" },
];
