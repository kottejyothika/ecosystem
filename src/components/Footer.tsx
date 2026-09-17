import React from 'react';
import { Recycle, Heart, Github, Award, Mail, ExternalLink, ShieldCheck } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
  onOpenReportModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenReportModal }) => {
  return (
    <footer id="main-footer" className="bg-slate-900 text-slate-300 pt-12 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Mission */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
                <Recycle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white tracking-tight">
                  Plastic-Free College Campaign
                </h3>
                <p className="text-xs text-emerald-400 font-medium">
                  AITS Hackathon 2026 • WEBSPRINT 2026
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              An institutional initiative engineered by Team <strong>Innov8 | CSD</strong> for
              eradicating single-use plastic through smart segregation hubs, behavioral reusable
              swaps, and gamified student rewards.
            </p>

            <div className="flex items-center gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 text-emerald-300 text-[11px] font-semibold border border-emerald-800/80">
                Project Motto: Innovate. Build. Impact.
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Campaign Modules
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-nav-home"
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Home / Overview
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-collection"
                  onClick={() => onNavigate('collection')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Smart Plastic Collection Hubs
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-alternatives"
                  onClick={() => onNavigate('alternatives')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Reusable Alternatives & Swaps
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-rewards"
                  onClick={() => onNavigate('rewards')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Rewards, Badges & Leaderboard
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-dashboard"
                  onClick={() => onNavigate('dashboard')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Live Monitoring Dashboard
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-impact"
                  onClick={() => onNavigate('impact')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Project Flow & Impact
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-tech"
                  onClick={() => onNavigate('tech')}
                  className="hover:text-emerald-400 transition-colors"
                >
                  Technology Stack
                </button>
              </li>
            </ul>
          </div>

          {/* Student Actions & Credentials */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Student Eco-Pledge
            </h4>
            <div className="bg-slate-800/80 p-4 rounded-2xl border border-slate-700/80 space-y-3">
              <p className="text-xs text-slate-300 leading-relaxed italic">
                “I pledge to carry a reusable water bottle, segregate my waste at campus bins, and
                support a 100% single-use plastic-free AITS.”
              </p>
              <button
                id="footer-report-btn"
                onClick={onOpenReportModal}
                className="w-full py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xs transition-colors"
              >
                Log Today's Plastic Waste Drop
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © 2026 <strong>Plastic-Free College Campaign</strong> • Presented in WEBSPRINT 2026 by{' '}
            <span className="text-emerald-400 font-bold">Team Innov8 | CSD</span>
          </p>
          <div className="flex items-center gap-4">
            <span className="text-slate-500">AITS Hackathon 2026</span>
            <span>•</span>
            <span className="text-slate-500">Green Campus Initiative</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
