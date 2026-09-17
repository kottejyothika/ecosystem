import React from 'react';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  PlusCircle,
  Leaf,
  RefreshCw,
  Target,
} from 'lucide-react';
import { CampaignStats } from '../types';

interface HeroSectionProps {
  stats: CampaignStats;
  onNavigate: (tab: string) => void;
  onOpenReportModal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  stats,
  onNavigate,
  onOpenReportModal,
}) => {
  const goalPercent = Math.min(
    100,
    Math.round((stats.plasticCollectedKg / stats.campusGoalKg) * 100)
  );

  return (
    <section
      id="hero-section"
      className="relative overflow-hidden bg-gradient-to-b from-emerald-50/70 via-white to-sky-50/40 border-b border-emerald-100/60 pt-8 pb-12 sm:pt-12 sm:pb-16"
    >
      {/* Subtle ecological background pattern accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 -mb-12 w-80 h-80 bg-sky-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main Hero Copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Project & Hackathon Meta Pill */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-900 border border-emerald-300/80 shadow-xs">
                <Leaf className="w-3.5 h-3.5 text-emerald-700" />
                AITS Hackathon 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-900 border border-sky-300/80">
                <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                WEBSPRINT 2026
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 text-white">
                Team Innov8 | CSD
              </span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Plastic-Free{' '}
                <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600 bg-clip-text text-transparent">
                  College Campaign
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl">
                A smart student-driven initiative for reducing, collecting, segregating, and
                recycling plastic waste on campus. Empowering students with real-time tracking,
                reusable alternatives, and gamified eco-rewards.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                id="hero-report-waste-btn"
                onClick={onOpenReportModal}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all active:scale-98"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Report Waste Collected</span>
              </button>

              <button
                id="hero-explore-stations-btn"
                onClick={() => onNavigate('collection')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-emerald-50/80 text-emerald-800 font-semibold text-sm border border-emerald-200 shadow-xs hover:border-emerald-300 transition-all"
              >
                <span>Find Collection Points</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-dashboard-btn"
                onClick={() => onNavigate('dashboard')}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-sky-50 hover:bg-sky-100 text-sky-800 font-medium text-sm border border-sky-200 transition-all"
              >
                <span>Live Analytics</span>
              </button>
            </div>

            {/* Value Pillars List */}
            <div className="pt-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Smart Campus Collection Hubs</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <RefreshCw className="w-4 h-4 text-teal-600 shrink-0" />
                <span>Verified Circular Recycling</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-slate-700">
                <Award className="w-4 h-4 text-amber-500 shrink-0" />
                <span>EcoPoints & Student Rewards</span>
              </div>
            </div>
          </div>

          {/* Right Hero Card: Campus Target & Quick Highlights */}
          <div className="lg:col-span-5">
            <div className="bg-white/95 rounded-2xl p-6 shadow-xl border border-emerald-100 relative overflow-hidden backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                    <Target className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      Semester Zero-Waste Target
                    </h3>
                    <p className="text-xs text-slate-500">AITS Campus Goal 2026</p>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {goalPercent}% Achieved
                </span>
              </div>

              {/* Goal Progress Bar */}
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Progress: {stats.plasticCollectedKg.toLocaleString()} kg</span>
                  <span className="text-slate-500">Goal: {stats.campusGoalKg.toLocaleString()} kg</span>
                </div>
                <div className="w-full h-3.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div
                    className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-full transition-all duration-700"
                    style={{ width: `${goalPercent}%` }}
                  />
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  {stats.campusGoalKg - stats.plasticCollectedKg} kg remaining to reach the clean
                  campus semester milestone!
                </p>
              </div>

              {/* Environmental Impact Equivalents */}
              <div className="grid grid-cols-2 gap-3 bg-emerald-50/60 rounded-xl p-3 border border-emerald-100/80 mb-4">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold text-emerald-900 uppercase tracking-wide">
                    CO₂ Prevented
                  </span>
                  <div className="text-lg font-extrabold text-emerald-700">
                    {stats.co2PreventedKg.toLocaleString()} kg
                  </div>
                  <span className="text-[10px] text-emerald-800/80">
                    ≈ {Math.round(stats.co2PreventedKg / 22)} trees planted equivalent
                  </span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[11px] font-semibold text-teal-900 uppercase tracking-wide">
                    Landfill Diverted
                  </span>
                  <div className="text-lg font-extrabold text-teal-700">
                    {stats.landfillVolumeSavedM3} m³
                  </div>
                  <span className="text-[10px] text-teal-800/80">
                    ≈ {stats.singleUseReducedCount.toLocaleString()} items diverted
                  </span>
                </div>
              </div>

              {/* Quick Prompt to Adopt */}
              <button
                id="hero-adopt-reusable-banner-btn"
                onClick={() => onNavigate('alternatives')}
                className="w-full flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-sky-50 to-emerald-50 hover:from-sky-100 hover:to-emerald-100 border border-sky-200/80 text-sky-900 text-xs font-semibold transition-all group"
              >
                <div className="flex items-center gap-2">
                  <span className="text-base">🥤</span>
                  <span>Swapped a single-use bottle today?</span>
                </div>
                <span className="text-emerald-700 font-bold group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                  Claim +50 pts <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
