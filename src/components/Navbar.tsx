import React, { useState } from 'react';
import {
  Recycle,
  Sparkles,
  PlusCircle,
  Menu,
  X,
  RotateCcw,
  BarChart3,
  Award,
  Coffee,
  MapPin,
  Flame,
  Code2,
  Home,
} from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  userPoints: number;
  onOpenReportModal: (stationId?: string) => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  userPoints,
  onOpenReportModal,
  onResetData,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home / Overview', icon: Home },
    { id: 'collection', label: 'Smart Collection', icon: MapPin },
    { id: 'alternatives', label: 'Reusable Alternatives', icon: Coffee },
    { id: 'rewards', label: 'Rewards & Awareness', icon: Award },
    { id: 'dashboard', label: 'Monitoring Dashboard', icon: BarChart3 },
    { id: 'impact', label: 'Impact & Benefits', icon: Flame },
    { id: 'tech', label: 'Tech Stack', icon: Code2 },
  ];

  const handleNavClick = (tabId: string) => {
    onSelectTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-header"
      className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-100/80 shadow-xs"
    >
      {/* Top micro banner for Hackathon credentials */}
      <div
        id="hackathon-top-bar"
        className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white text-[11px] font-medium py-1 px-4 text-center tracking-wide flex items-center justify-between"
      >
        <div className="flex items-center gap-2 mx-auto">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>AITS Hackathon 2026 — Innovate. Build. Impact.</span>
          <span className="text-emerald-300/60">•</span>
          <span className="text-emerald-200 font-semibold">WEBSPRINT 2026</span>
          <span className="text-emerald-300/60">•</span>
          <span className="text-emerald-300 font-bold">Innov8 | CSD</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <div
            id="brand-logo-container"
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Recycle className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                  Plastic-Free Campus
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-md bg-emerald-100 text-emerald-800 border border-emerald-200">
                  AITS 2026
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">
                Smart Waste Segregation & Eco-Rewards
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-800 shadow-xs border border-emerald-200/60'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 ${
                      isActive ? 'text-emerald-700' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Points Wallet & CTA Action */}
          <div className="hidden sm:flex items-center gap-3">
            {/* EcoPoints Wallet Pill */}
            <button
              id="ecopoints-wallet-pill"
              onClick={() => handleNavClick('rewards')}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-900 hover:border-emerald-400 transition-all shadow-xs group"
              title="Click to view Eco-Rewards & Leaderboard"
            >
              <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs group-hover:rotate-12 transition-transform">
                <Sparkles className="w-3 h-3" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] uppercase font-bold text-emerald-700 tracking-wider">
                  EcoPoints
                </span>
                <span className="text-xs font-extrabold text-slate-900 leading-none">
                  {userPoints} pts
                </span>
              </div>
            </button>

            {/* Quick Report Waste Button */}
            <button
              id="quick-report-waste-btn"
              onClick={() => onOpenReportModal()}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Waste</span>
            </button>

            {/* Reset Demo Data Button */}
            <button
              id="reset-demo-data-btn"
              onClick={() => setShowConfirmReset(true)}
              className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              title="Reset Campaign Demo Data"
              aria-label="Reset Demo Data"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              id="mobile-ecopoints-pill"
              onClick={() => handleNavClick('rewards')}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold"
            >
              <Sparkles className="w-3 h-3 text-emerald-600" />
              <span>{userPoints} pts</span>
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu-dropdown"
          className="xl:hidden bg-white border-b border-emerald-100 px-4 pt-2 pb-6 space-y-1 shadow-lg"
        >
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-slate-400'}`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              id="mobile-report-waste-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReportModal();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-emerald-600 text-white font-semibold text-sm shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report Plastic Waste</span>
            </button>

            <button
              id="mobile-reset-btn"
              onClick={() => {
                setMobileMenuOpen(false);
                setShowConfirmReset(true);
              }}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg text-slate-500 hover:bg-slate-100 text-xs font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Campaign Demo Data</span>
            </button>
          </div>
        </div>
      )}

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div
          id="reset-confirm-modal"
          className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200">
            <div className="w-12 h-12 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Reset Demo Data?</h3>
            <p className="text-sm text-slate-600 mt-2">
              This will restore all default statistics, collection stations, reports, and rewards
              for the AITS Hackathon 2026 presentation.
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                id="cancel-reset-btn"
                onClick={() => setShowConfirmReset(false)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                id="confirm-reset-btn"
                onClick={() => {
                  onResetData();
                  setShowConfirmReset(false);
                }}
                className="px-4 py-2 text-sm font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs"
              >
                Yes, Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
