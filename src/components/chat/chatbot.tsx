"use client";

import React, { useState, useRef, useEffect } from "react";
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User,
  FileText,
  Download,
  FileSpreadsheet,
} from "lucide-react";
import { processQuery, ChatMessage } from "@/lib/chat-logic";
import { RECENT_ISSUES, KPI_SUMMARY } from "@/lib/mock-data";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

// Real download libraries
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      role: "assistant",
      content: "Halo! Saya Assistant AssetGuard. Saya bisa membantu Anda memantau aset atau membuat laporan (PDF/Excel). Apa yang ingin Anda tanyakan?",
      type: "text",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      role: "user",
      content: input,
      type: "text",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI delay
    setTimeout(() => {
      const response = processQuery(input);
      setMessages((prev) => [...prev, response]);
      setIsTyping(false);
    }, 800);
  };

  const generatePDF = (filename: string) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const brandBlue = [37, 99, 235] as [number, number, number]; // #2563eb
    const brandGray = [241, 245, 249] as [number, number, number]; // #f1f5f9
    
    // 1. Header Bar
    doc.setFillColor(brandBlue[0], brandBlue[1], brandBlue[2]);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Brand title in header
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("ASSETGUARD AI", 15, 20);
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Advanced Medical Asset Management System", 15, 27);
    
    // Report title & date on the right
    doc.setFontSize(12);
    doc.text("MANAGEMENT REPORT", pageWidth - 15, 20, { align: 'right' });
    doc.setFontSize(9);
    doc.text(`Periode: ${new Date().toLocaleDateString('id-ID', { month: 'long', year: 'numeric' })}`, pageWidth - 15, 27, { align: 'right' });

    // 2. Summary Section
    let yPos = 55;
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Executive Summary", 15, yPos);
    
    yPos += 10;
    
    // KPI Cards Backgrounds
    const cardWidth = 43;
    const cardHeight = 25;
    const spacing = 5;

    const kpis = [
      { label: "Total Assets", value: KPI_SUMMARY.total_assets.value, color: [59, 130, 246] as [number, number, number] },
      { label: "Good Condition", value: KPI_SUMMARY.good_condition.value, color: [16, 185, 129] as [number, number, number] },
      { label: "Critical Cases", value: KPI_SUMMARY.critical_condition.value, color: [225, 29, 72] as [number, number, number] },
      { label: "Under Maint.", value: KPI_SUMMARY.under_maintenance.value, color: [245, 158, 11] as [number, number, number] }
    ];

    kpis.forEach((kpi, i) => {
      const x = 15 + i * (cardWidth + spacing);
      
      // Card box
      doc.setFillColor(brandGray[0], brandGray[1], brandGray[2]);
      doc.roundedRect(x, yPos, cardWidth, cardHeight, 2, 2, 'F');
      
      // Left border accent
      doc.setFillColor(kpi.color[0], kpi.color[1], kpi.color[2]);
      doc.rect(x, yPos, 2, cardHeight, 'F');
      
      // Label
      doc.setFontSize(8);
      doc.setTextColor(100);
      doc.setFont("helvetica", "normal");
      doc.text(kpi.label, x + 6, yPos + 8);
      
      // Value
      doc.setFontSize(14);
      doc.setTextColor(kpi.color[0], kpi.color[1], kpi.color[2]);
      doc.setFont("helvetica", "bold");
      doc.text(kpi.value.toString(), x + 6, yPos + 18);
    });

    yPos += cardHeight + 20;

    // 3. Technical Detail Section
    doc.setTextColor(0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Recent Critical Issues", 15, yPos);
    
    yPos += 5;
    
    const tableData = RECENT_ISSUES.map(issue => [
      issue.name,
      issue.category,
      issue.location,
      issue.issue,
      issue.status,
      issue.priority
    ]);
    
    autoTable(doc, {
      startY: yPos,
      head: [['Asset', 'Category', 'Location', 'Issue', 'Status', 'Priority']],
      body: tableData,
      theme: 'grid',
      styles: { fontSize: 9, cellPadding: 4 },
      headStyles: { 
        fillColor: brandBlue, 
        textColor: [255, 255, 255], 
        fontStyle: 'bold',
        halign: 'center' 
      },
      alternateRowStyles: { fillColor: [250, 250, 250] },
      columnStyles: {
        3: { fontStyle: 'bold' },
        4: { halign: 'center' },
        5: { halign: 'center' }
      }
    });

    // 4. Footer
    const totalPages = doc.internal.pages.length - 1;
    const footerY = doc.internal.pageSize.getHeight() - 15;
    
    doc.setDrawColor(200);
    doc.line(15, footerY - 5, pageWidth - 15, footerY - 5);
    
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.setFont("helvetica", "italic");
    doc.text("© 2026 AssetGuard AI - Confidential Information System", 15, footerY);
    doc.text(`Page 1 of ${totalPages}`, pageWidth - 15, footerY, { align: 'right' });
    
    doc.save(filename);
  };

  const generateExcel = (filename: string) => {
    // Prepare data for Excel
    const data = RECENT_ISSUES.map(issue => ({
      "Nama Aset": issue.name,
      "Kategori": issue.category,
      "Lokasi": issue.location,
      "Isu": issue.issue,
      "Status": issue.status,
      "Prioritas": issue.priority,
      "Teknisi": issue.tech,
      "Tanggal": issue.date
    }));

    // Add KPI Summary as first rows
    const summary = [
      { "Nama Aset": "RINGKASAN DASHBOARD", "Kategori": "", "Lokasi": "", "Isu": "", "Status": "", "Prioritas": "", "Teknisi": "", "Tanggal": "" },
      { "Nama Aset": "Total Aset", "Kategori": KPI_SUMMARY.total_assets.value, "Lokasi": "", "Isu": "", "Status": "", "Prioritas": "", "Teknisi": "", "Tanggal": "" },
      { "Nama Aset": "Kondisi Baik", "Kategori": KPI_SUMMARY.good_condition.value, "Lokasi": "", "Isu": "", "Status": "", "Prioritas": "", "Teknisi": "", "Tanggal": "" },
      { "Nama Aset": "", "Kategori": "", "Lokasi": "", "Isu": "", "Status": "", "Prioritas": "", "Teknisi": "", "Tanggal": "" },
      { "Nama Aset": "DETAIL DATA ISU", "Kategori": "", "Lokasi": "", "Isu": "", "Status": "", "Prioritas": "", "Teknisi": "", "Tanggal": "" },
    ];

    const finalData = [...summary, ...data];
    
    const worksheet = XLSX.utils.json_to_sheet(finalData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Laporan Aset");
    
    XLSX.writeFile(workbook, filename);
  };

  const handleDownload = (msg: ChatMessage) => {
    if (!msg.file) return;
    
    if (msg.file.type === "pdf") {
      generatePDF(msg.file.name);
    } else if (msg.file.type === "excel") {
      generateExcel(msg.file.name);
    }
  };

  const formatIDR = (value: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  const renderFile = (msg: ChatMessage) => {
    if (!msg.file) return null;
    const isPdf = msg.file.type === "pdf";

    return (
      <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-center gap-3 p-3">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${
            isPdf ? "bg-rose-50 text-rose-600 dark:bg-rose-900/20" : "bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20"
          }`}>
            {isPdf ? <FileText size={24} /> : <FileSpreadsheet size={24} />}
          </div>
          <div className="flex-1 min-w-0">
            <p className="truncate text-sm font-semibold text-slate-800 dark:text-zinc-200">
              {msg.file.name}
            </p>
            <p className="text-[10px] text-slate-500 uppercase font-medium">
              {msg.file.type} • {msg.file.size}
            </p>
          </div>
          <button 
            onClick={() => handleDownload(msg)}
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors text-slate-600 dark:text-zinc-400"
            title="Download report"
          >
            <Download size={20} />
          </button>
        </div>
        <div 
          onClick={() => handleDownload(msg)}
          className={`cursor-pointer py-2 text-center text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 ${
            isPdf ? "bg-rose-600" : "bg-emerald-600"
          }`}
        >
          Download Now
        </div>
      </div>
    );
  };

  const renderChart = (msg: ChatMessage) => {
    if (msg.chartType === "pie") {
      return (
        <div className="mt-3 h-[220px] w-full rounded-xl bg-white p-2 shadow-inner dark:bg-zinc-900">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={msg.chartData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={65}
                paddingAngle={5}
                dataKey={msg.chartData[0].value !== undefined ? "value" : "count"}
              >
                {msg.chartData.map((entry: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={entry.color || entry.fill || "#3b82f6"} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px' }}
                formatter={(val: any) => typeof val === 'number' ? val.toLocaleString('id-ID') : val}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      );
    }

    if (msg.chartType === "bar") {
      const isCost = msg.chartData[0].actual !== undefined;
      return (
        <div className="mt-3 h-[220px] w-full rounded-xl bg-white p-2 shadow-inner dark:bg-zinc-900">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={msg.chartData} 
              layout={isCost ? "horizontal" : "vertical"}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey={isCost ? "month" : "location"} 
                type={isCost ? "category" : "category"}
                fontSize={10}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={10}
                tickLine={false}
                axisLine={false}
                tickFormatter={(val) => isCost ? `${val/1000000}M` : val}
              />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', fontSize: '10px' }}
                formatter={(val: any) => isCost ? formatIDR(val) : val}
              />
              <Legend iconType="circle" wrapperStyle={{ fontSize: '10px' }} />
              {isCost ? (
                <>
                  <Bar dataKey="actual" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Actual" />
                  <Bar dataKey="budget" fill="#94a3b8" radius={[4, 4, 0, 0]} name="Budget" />
                </>
              ) : (
                <Bar dataKey="count" fill="#8b5cf6" radius={[0, 4, 4, 0]} name="Jumlah Aset" />
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 flex h-[600px] w-[400px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-4 text-white">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-md">
                <Bot size={22} />
              </div>
              <div>
                <p className="text-sm font-bold tracking-tight">AssetGuard AI Assistant</p>
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
                  <p className="text-[10px] font-medium text-blue-100">Live Reporting Active</p>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="rounded-full p-2 hover:bg-white/10 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-zinc-800"
          >
            {messages.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div className={`flex max-w-[90%] gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                  <div className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                    msg.role === "user" 
                      ? "bg-slate-100 dark:bg-zinc-800" 
                      : "bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                  }`}>
                    {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                  </div>
                  <div className={`group relative rounded-2xl px-4 py-3 text-sm shadow-sm transition-all ${
                    msg.role === "user" 
                      ? "bg-blue-600 text-white rounded-tr-none" 
                      : "bg-slate-50 text-slate-800 rounded-tl-none dark:bg-zinc-900 dark:text-zinc-200 border border-slate-100 dark:border-zinc-800"
                  }`}>
                    <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                    
                    {msg.type === "chart" && renderChart(msg)}
                    {msg.type === "file" && renderFile(msg)}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-3">
                  <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    <Bot size={16} />
                  </div>
                  <div className="flex items-center gap-1.5 rounded-2xl bg-slate-50 px-4 py-3 dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800">
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-400" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="border-t p-4 bg-slate-50/30 dark:bg-zinc-900/30">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-blue-500/20 transition-all dark:border-zinc-800 dark:bg-zinc-900">
              <input 
                type="text" 
                placeholder="Unduh PDF atau Excel aplikasi ini..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSend()}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md transition-all hover:bg-blue-700 active:scale-95 disabled:opacity-50 disabled:shadow-none disabled:active:scale-100"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {[
                { label: "📊 Ringkasan", value: "Ringkasan" },
                { label: "❤️ Kesehatan Aset", value: "Kesehatan aset" },
                { label: "🔧 Isu & Masalah", value: "Isu terbuka" },
                { label: "📅 Jadwal", value: "Jadwal mendatang" },
                { label: "📍 Lokasi", value: "Distribusi lokasi" },
                { label: "🏷️ Kategori", value: "Kategori aset" },
                { label: "💰 Biaya", value: "Biaya anggaran" },
                { label: "📄 Unduh PDF", value: "Unduh PDF" },
                { label: "📑 Unduh Excel", value: "Unduh Excel" },
              ].map((tag) => (
                <button
                  key={tag.value}
                  onClick={() => { setInput(tag.value); }}
                  className="rounded-full bg-white px-2.5 py-1 text-[10px] font-medium text-slate-500 border border-slate-200 hover:border-blue-400 hover:text-blue-600 transition-colors dark:bg-zinc-900 dark:border-zinc-800"
                >
                  {tag.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex h-16 w-16 items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen 
            ? "bg-slate-100 text-slate-600 rotate-90 dark:bg-zinc-800 dark:text-zinc-300" 
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 group-hover:animate-ping group-hover:opacity-20" />
        {isOpen ? <X size={32} /> : <MessageCircle size={32} />}
      </button>
    </div>
  );
}
