import React, { useState } from 'react';
import {
  BarChart3,
  ArrowLeft,
  Download,
  Calendar,
  PieChart as PieIcon,
  TrendingUp,
  Recycle,
  Trash2,
  Users,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { CampaignStats, WasteReport, CollectionPoint } from '../types';

interface MonitoringDashboardProps {
  stats: CampaignStats;
  reports: WasteReport[];
  stations: CollectionPoint[];
  onBackToHome: () => void;
  onOpenReportModal: () => void;
}

export const MonitoringDashboard: React.FC<MonitoringDashboardProps> = ({
  stats,
  reports,
  stations,
  onBackToHome,
  onOpenReportModal,
}) => {
  const [timeRange, setTimeRange] = useState<'year' | 'semester'>('year');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);
  const [hoveredDonutSlice, setHoveredDonutSlice] = useState<string | null>(null);

  // Monthly data for 2026
  const monthlyData = [
    { month: 'Jan', collected: 95, recycled: 76 },
    { month: 'Feb', collected: 110, recycled: 90 },
    { month: 'Mar', collected: 125, recycled: 102 },
    { month: 'Apr', collected: 140, recycled: 115 },
    { month: 'May', collected: 130, recycled: 108 },
    { month: 'Jun', collected: 85, recycled: 72 }, // vacation dip
    { month: 'Jul', collected: 145, recycled: 120 },
    { month: 'Aug', collected: 165, recycled: 142 },
    { month: 'Sep', collected: 180, recycled: 155 }, // current hackathon peak
    { month: 'Oct', collected: 150, recycled: 128 },
    { month: 'Nov', collected: 135, recycled: 112 },
    { month: 'Dec', collected: 125, recycled: 105 },
  ];

  const displayedMonths = timeRange === 'semester' ? monthlyData.slice(6, 12) : monthlyData;
  const maxCollected = Math.max(...displayedMonths.map((m) => m.collected));

  // Category composition data
  const categoryBreakdown = [
    { name: 'PET Bottles', percent: 42, color: '#10b981', kg: Math.round(stats.plasticCollectedKg * 0.42) },
    { name: 'Food Containers', percent: 22, color: '#0ea5e9', kg: Math.round(stats.plasticCollectedKg * 0.22) },
    { name: 'Polybags & Wrappers', percent: 16, color: '#f59e0b', kg: Math.round(stats.plasticCollectedKg * 0.16) },
    { name: 'Single-Use Cups', percent: 12, color: '#8b5cf6', kg: Math.round(stats.plasticCollectedKg * 0.12) },
    { name: 'Hard Plastics & Spools', percent: 8, color: '#64748b', kg: Math.round(stats.plasticCollectedKg * 0.08) },
  ];

  // Department contribution distribution
  const departmentBreakdown = [
    { dept: 'CSD (Comp. Science & Design)', kg: 468, percent: 32, students: 142 },
    { dept: 'Computer Science & Engineering', kg: 412, percent: 28, students: 210 },
    { dept: 'Electronics & Communication', kg: 245, percent: 17, students: 135 },
    { dept: 'Mechanical Engineering', kg: 232, percent: 15, students: 160 },
    { dept: 'Information Technology', kg: 128, percent: 8, students: 110 },
  ];

  const handleExportData = () => {
    const summaryData = {
      campaign: 'Plastic-Free College Campaign - WEBSPRINT 2026',
      team: 'Innov8 | CSD, AITS Hackathon 2026',
      generatedAt: new Date().toISOString(),
      stats,
      stations,
      recentReportsCount: reports.length,
    };
    const blob = new Blob([JSON.stringify(summaryData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `AITS_Plastic_Free_Analytics_${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const recyclingEfficiency = Math.round(
    (stats.plasticRecycledKg / (stats.plasticCollectedKg || 1)) * 100
  );
  const goalPercent = Math.min(
    100,
    Math.round((stats.plasticCollectedKg / stats.campusGoalKg) * 100)
  );

  return (
    <div id="monitoring-dashboard-page" className="py-8 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              id="back-to-home-from-dashboard-btn"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline mb-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home Overview</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📊</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Monitoring Dashboard & Analytics
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              Campus waste telemetry, monthly collection progress, category breakdown, and
              department participation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="export-analytics-btn"
              onClick={handleExportData}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-xs transition-colors"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Export Audit Data (JSON)</span>
            </button>
            <button
              id="dashboard-report-btn"
              onClick={onOpenReportModal}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>+ Add Collection</span>
            </button>
          </div>
        </div>

        {/* 6 Executive Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-emerald-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Collected</span>
              <Trash2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {stats.plasticCollectedKg.toLocaleString()} kg
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold">+14.2% this month</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-teal-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Recycled</span>
              <Recycle className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {stats.plasticRecycledKg.toLocaleString()} kg
            </div>
            <span className="text-[11px] text-teal-700 font-semibold">
              {recyclingEfficiency}% conversion
            </span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-sky-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Single-Use Cut</span>
              <ShieldCheck className="w-4 h-4 text-sky-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {stats.singleUseReducedCount.toLocaleString()}
            </div>
            <span className="text-[11px] text-sky-700 font-semibold">Items diverted</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-indigo-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Volunteers</span>
              <Users className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {stats.studentParticipation}
            </div>
            <span className="text-[11px] text-indigo-700 font-semibold">Across 6 branches</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-amber-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">CO₂ Avoided</span>
              <TrendingUp className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {stats.co2PreventedKg.toLocaleString()} kg
            </div>
            <span className="text-[11px] text-amber-700 font-semibold">Emissions averted</span>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Landfill Saved</span>
              <BarChart3 className="w-4 h-4 text-slate-600" />
            </div>
            <div className="text-xl sm:text-2xl font-black text-slate-900">
              {stats.landfillVolumeSavedM3} m³
            </div>
            <span className="text-[11px] text-slate-600 font-semibold">Dumping avoided</span>
          </div>
        </div>

        {/* Goal Milestone Card */}
        <div className="bg-white rounded-3xl p-6 shadow-xs border border-emerald-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                Institutional Milestone Tracker
              </span>
              <h3 className="text-lg font-bold text-slate-900">
                AITS Zero-Plastic Target: 2,000 kg for Academic Year 2026
              </h3>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
              {goalPercent}% Achieved
            </span>
          </div>

          <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200 mb-2">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-full transition-all duration-700"
              style={{ width: `${goalPercent}%` }}
            />
          </div>

          <div className="flex justify-between text-xs font-medium text-slate-500">
            <span>Collected: {stats.plasticCollectedKg} kg</span>
            <span>Target: {stats.campusGoalKg} kg</span>
          </div>
        </div>

        {/* Interactive Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Monthly Trends Multi-Bar Chart */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-emerald-600" />
                  <span>Monthly Collection vs. Recycling Progress (2026)</span>
                </h3>
                <p className="text-xs text-slate-500">
                  Hover over bars to inspect monthly kg statistics
                </p>
              </div>

              <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  id="btn-range-year"
                  onClick={() => setTimeRange('year')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    timeRange === 'year' ? 'bg-white text-slate-900 shadow-2xs' : 'text-slate-600'
                  }`}
                >
                  Full Year (12 Mo)
                </button>
                <button
                  id="btn-range-semester"
                  onClick={() => setTimeRange('semester')}
                  className={`px-2.5 py-1 rounded-lg transition-all ${
                    timeRange === 'semester'
                      ? 'bg-white text-slate-900 shadow-2xs'
                      : 'text-slate-600'
                  }`}
                >
                  Current Semester
                </button>
              </div>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-4 text-xs font-semibold pt-1">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" />
                <span className="text-slate-700">Plastic Collected (kg)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-sm bg-teal-400 inline-block" />
                <span className="text-slate-700">Plastic Recycled (kg)</span>
              </div>
            </div>

            {/* SVG Interactive Bar Chart */}
            <div className="relative pt-4 pb-2">
              <div className="h-56 flex items-end justify-between gap-2 sm:gap-3 px-2 border-b border-slate-200">
                {displayedMonths.map((item, idx) => {
                  const collectedHeight = Math.round((item.collected / (maxCollected * 1.15)) * 100);
                  const recycledHeight = Math.round((item.recycled / (maxCollected * 1.15)) * 100);
                  const isHovered = hoveredMonth === idx;

                  return (
                    <div
                      key={item.month}
                      onMouseEnter={() => setHoveredMonth(idx)}
                      onMouseLeave={() => setHoveredMonth(null)}
                      className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                    >
                      {/* Hover Tooltip */}
                      {isHovered && (
                        <div className="absolute -top-12 z-20 bg-slate-900 text-white text-[10px] p-2 rounded-lg shadow-lg whitespace-nowrap pointer-events-none">
                          <div className="font-bold text-emerald-300">{item.month} 2026</div>
                          <div>Collected: {item.collected} kg</div>
                          <div>Recycled: {item.recycled} kg</div>
                        </div>
                      )}

                      {/* Bar Pair */}
                      <div className="w-full flex items-end justify-center gap-1 h-full">
                        {/* Collected Bar */}
                        <div
                          className="w-1/2 rounded-t-md bg-emerald-500 group-hover:bg-emerald-600 transition-all duration-300"
                          style={{ height: `${collectedHeight}%` }}
                        />
                        {/* Recycled Bar */}
                        <div
                          className="w-1/2 rounded-t-md bg-teal-400 group-hover:bg-teal-500 transition-all duration-300"
                          style={{ height: `${recycledHeight}%` }}
                        />
                      </div>

                      <span className="text-[10px] font-semibold text-slate-500 mt-2">
                        {item.month}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Waste Composition Donut Chart */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xs border border-slate-200/90 space-y-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <PieIcon className="w-4 h-4 text-teal-600" />
                  <span>Plastic Type Composition</span>
                </h3>
                <span className="text-xs text-slate-400">By Weight Ratio</span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Segregated plastic breakdown across all campus stations
              </p>
            </div>

            {/* Donut graphic & visual representation */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 py-4">
              <div className="relative w-36 h-36 shrink-0">
                <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                  {/* Background ring */}
                  <path
                    className="text-slate-100"
                    strokeWidth="4"
                    stroke="currentColor"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  {/* Slices calculated using strokeDasharray */}
                  {/* Slice 1: PET (42%) */}
                  <path
                    stroke="#10b981"
                    strokeWidth="4.5"
                    strokeDasharray="42, 100"
                    strokeDashoffset="0"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Slice 2: Food containers (22%) */}
                  <path
                    stroke="#0ea5e9"
                    strokeWidth="4.5"
                    strokeDasharray="22, 100"
                    strokeDashoffset="-42"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Slice 3: Polybags (16%) */}
                  <path
                    stroke="#f59e0b"
                    strokeWidth="4.5"
                    strokeDasharray="16, 100"
                    strokeDashoffset="-64"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Slice 4: Cups (12%) */}
                  <path
                    stroke="#8b5cf6"
                    strokeWidth="4.5"
                    strokeDasharray="12, 100"
                    strokeDashoffset="-80"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Slice 5: Hard Plastics (8%) */}
                  <path
                    stroke="#64748b"
                    strokeWidth="4.5"
                    strokeDasharray="8, 100"
                    strokeDashoffset="-92"
                    fill="none"
                    strokeLinecap="round"
                  />
                </svg>

                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
                  <span className="text-xs font-semibold text-slate-400">Total</span>
                  <span className="text-sm font-black text-slate-800">
                    {stats.plasticCollectedKg} kg
                  </span>
                </div>
              </div>

              {/* Legend with exact kg */}
              <div className="space-y-1.5 w-full text-xs">
                {categoryBreakdown.map((cat) => (
                  <div
                    key={cat.name}
                    onMouseEnter={() => setHoveredDonutSlice(cat.name)}
                    onMouseLeave={() => setHoveredDonutSlice(null)}
                    className="flex items-center justify-between p-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2.5 h-2.5 rounded-full shrink-0"
                        style={{ backgroundColor: cat.color }}
                      />
                      <span className="font-semibold text-slate-700">{cat.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-black text-slate-900 mr-2">{cat.percent}%</span>
                      <span className="text-slate-400 text-[11px]">({cat.kg} kg)</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-900 font-medium">
              💡 <strong>Segregation Insight:</strong> PET bottles and food containers comprise 64% of
              campus waste. Promoting hydration flasks cuts this volume drastically.
            </div>
          </div>
        </div>

        {/* Department-wise Participation Table / Progress */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/90 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Department-wise Participation & Contribution
              </h3>
              <p className="text-xs text-slate-500">
                Cross-branch performance in the WEBSPRINT 2026 campaign
              </p>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
              Innov8 | CSD Leading
            </span>
          </div>

          <div className="space-y-4 pt-2">
            {departmentBreakdown.map((dept) => (
              <div key={dept.dept} className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-800">{dept.dept}</span>
                  <span className="text-slate-600">
                    <strong>{dept.kg} kg</strong> ({dept.percent}%) • {dept.students} volunteers
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all duration-500"
                    style={{ width: `${dept.percent * 2.8}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
