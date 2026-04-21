import { 
  ASSET_HEALTH, 
  KPI_SUMMARY, 
  UPCOMING_SCHEDULES, 
  RECENT_ISSUES, 
  COST_DATA, 
  LOCATION_DATA, 
  ASSET_CATEGORIES 
} from "./mock-data";

export type MessageRole = "user" | "assistant";

export interface FileMetadata {
  name: string;
  size: string;
  type: "pdf" | "excel";
  url: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  type: "text" | "chart" | "file";
  chartType?: "pie" | "bar";
  chartData?: any;
  file?: FileMetadata;
}

export const processQuery = (query: string): ChatMessage => {
  const q = query.toLowerCase();
  const id = Math.random().toString(36).substring(7);

  // 1. Check for "report" or "laporan"
  if (q.includes("report") || q.includes("laporan") || q.includes("unduh") || q.includes("download") || q.includes("cetak")) {
    if (q.includes("excel") || q.includes("spreadsheet") || q.includes("csv")) {
      return {
        id,
        role: "assistant",
        content: "Saya telah menyiapkan laporan data aset dalam format Excel (XLSX). Silakan unduh melalui tautan di bawah ini:",
        type: "file",
        file: {
          name: "Laporan_Aset_Medis_Q2_2026.xlsx",
          size: "420 KB",
          type: "excel",
          url: "#"
        }
      };
    }
    
    return {
      id,
      role: "assistant",
      content: "Laporan analisis kesehatan aset bulanan telah berhasil dibuat dalam format PDF. Anda bisa mengunduhnya sekarang:",
      type: "file",
      file: {
        name: "Analisis_Kesehatan_Aset_April_2026.pdf",
        size: "1.2 MB",
        type: "pdf",
        url: "#"
      }
    };
  }

  // 2. Check for "kritis" or "kesehatan"
  if (q.includes("kritis") || q.includes("kesehatan") || q.includes("health")) {
    const criticalCount = ASSET_HEALTH.find((h) => h.name === "Critical")?.value || 0;
    const goodCount = ASSET_HEALTH.find((h) => h.name === "Good")?.value || 0;
    const total = ASSET_HEALTH.reduce((acc, h) => acc + h.value, 0);
    const healthRate = ((goodCount / total) * 100).toFixed(1);

    return {
      id,
      role: "assistant",
      content: `Saat ini terdapat **${criticalCount} aset** dalam kondisi kritis yang memerlukan tindakan segera. Secara keseluruhan, tingkat kesehatan aset adalah **${healthRate}%**. \n\nGrafik di bawah menunjukkan distribusi kondisi aset Anda saat ini:`,
      type: "chart",
      chartType: "pie",
      chartData: ASSET_HEALTH,
    };
  }

  // 3. Check for "biaya" or "anggaran" or "cost"
  if (q.includes("biaya") || q.includes("anggaran") || q.includes("cost") || q.includes("dana")) {
    const lastMonth = COST_DATA[COST_DATA.length - 1];
    const diff = lastMonth.actual - lastMonth.budget;
    const status = diff > 0 ? "melebihi anggaran" : "di bawah anggaran";

    return {
      id,
      role: "assistant",
      content: `Laporan biaya menunjukkan bahwa pada bulan ${lastMonth.month}, pengeluaran aktual mencapai **Rp ${lastMonth.actual.toLocaleString('id-ID')}**, yang berarti **${status}** sebesar Rp ${Math.abs(diff).toLocaleString('id-ID')}. \n\nBerikut adalah tren perbandingan biaya dan anggaran selama 6 bulan terakhir:`,
      type: "chart",
      chartType: "bar",
      chartData: COST_DATA,
    };
  }

  // 4. Check for "lokasi" or "unit" or "ruangan" or "departemen"
  if (q.includes("lokasi") || q.includes("unit") || q.includes("ruangan") || q.includes("location")) {
    const topLocation = [...LOCATION_DATA].sort((a, b) => b.count - a.count)[0];
    return {
      id,
      role: "assistant",
      content: `Aset Anda tersebar di berbagai departemen, dengan konsentrasi tertinggi berada di **Unit ${topLocation.location}** sebanyak ${topLocation.count} unit. \n\nDistribusi lengkapnya dapat dilihat pada grafik batang berikut:`,
      type: "chart",
      chartType: "bar",
      chartData: LOCATION_DATA,
    };
  }

  // 5. Check for "kategori" or "jenis" or "tipe" or "category"
  if (q.includes("kategori") || q.includes("jenis") || q.includes("tipe") || q.includes("category")) {
    const topCategory = [...ASSET_CATEGORIES].sort((a, b) => b.value - a.value)[0];
    return {
      id,
      role: "assistant",
      content: `Inventaris Anda terdiri dari berbagai jenis peralatan medis. Kategori **${topCategory.name}** adalah yang paling dominan dengan jumlah ${topCategory.value} unit. \n\nBerikut adalah rincian kategori aset Anda:`,
      type: "chart",
      chartType: "pie",
      chartData: ASSET_CATEGORIES,
    };
  }

  // 6. Check for "ringkasan" or "summary" or "statistik" or "total"
  if (q.includes("ringkasan") || q.includes("summary") || q.includes("statistik") || q.includes("total") || q.includes("kpi")) {
    const total = KPI_SUMMARY.total_assets.value;
    const good = KPI_SUMMARY.good_condition.value;
    const warning = KPI_SUMMARY.warning_condition.value;
    const critical = KPI_SUMMARY.critical_condition.value;
    const healthRate = ((good / total) * 100).toFixed(1);
    return {
      id,
      role: "assistant",
      content: `📊 **Ringkasan Dashboard Terkini:**\n- Total Aset: **${total.toLocaleString('id-ID')}** unit\n- Kondisi Baik: **${good.toLocaleString('id-ID')}** unit (${healthRate}%)\n- Perlu Perhatian: **${warning}** unit\n- Kritis: **${critical}** unit\n- Dalam Pemeliharaan: **${KPI_SUMMARY.under_maintenance.value}** unit\n- Isu Terbuka: **${KPI_SUMMARY.open_tickets.value}** tiket\n\nDistribusi kondisi aset saat ini:`,
      type: "chart",
      chartType: "pie",
      chartData: ASSET_HEALTH,
    };
  }

  // 7. Check for "jadwal" or "schedule"
  if (q.includes("jadwal") || q.includes("kegiatan") || q.includes("schedule")) {
    const nextItem = UPCOMING_SCHEDULES[0];
    const chartData = UPCOMING_SCHEDULES.slice(0, 5).reduce((acc: any[], s) => {
      const existing = acc.find(a => a.name === s.type);
      if (existing) { existing.value++; } else { acc.push({ name: s.type, value: 1, color: s.type === "Calibration" ? "#8b5cf6" : "#3b82f6" }); }
      return acc;
    }, []);
    return {
      id,
      role: "assistant",
      content: `📅 Jadwal terdekat: **${nextItem.type}** untuk **${nextItem.asset}** pada ${nextItem.date}, ditangani oleh ${nextItem.pic}.\n\nDistribusi jenis kegiatan yang akan datang:`,
      type: "chart",
      chartType: "pie",
      chartData,
    };
  }

  // 8. Check for "isu" or "masalah" or "issue"
  if (q.includes("isu") || q.includes("masalah") || q.includes("issue")) {
    const openIssues = RECENT_ISSUES.filter(i => i.status !== "Resolved").length;
    const statusCount = RECENT_ISSUES.reduce((acc: any[], issue) => {
      const existing = acc.find(a => a.name === issue.status);
      const colors: Record<string, string> = { Open: "#f59e0b", Critical: "#e11d48", Ongoing: "#8b5cf6", Pending: "#3b82f6", Resolved: "#10b981" };
      if (existing) { existing.value++; } else { acc.push({ name: issue.status, value: 1, color: colors[issue.status] || "#94a3b8" }); }
      return acc;
    }, []);
    return {
      id,
      role: "assistant",
      content: `🔧 Terdapat **${openIssues} isu aktif** yang masih terbuka. Isu terbaru: '${RECENT_ISSUES[0].issue}' pada **${RECENT_ISSUES[0].name}** (${RECENT_ISSUES[0].status}).\n\nDistribusi status semua tiket saat ini:`,
      type: "chart",
      chartType: "pie",
      chartData: statusCount,
    };
  }

  // Fallback
  return {
    id,
    role: "assistant",
    content: "Halo! Saya adalah asisten AssetGuard. Saya bisa membantu Anda dengan:\n1. 📊 **Laporan Visual** (Kesehatan, Biaya, Lokasi)\n2. 📄 **Download Report** (PDF atau Excel)\n3. 📝 **Ringkasan KPI**\n\nApa yang bisa saya bantu hari ini?",
    type: "text",
  };
};
