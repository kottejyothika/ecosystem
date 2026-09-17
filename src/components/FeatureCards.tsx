import React from 'react';
import {
  Recycle,
  Coffee,
  Award,
  BarChart3,
  ArrowRight,
  MapPin,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface FeatureCardsProps {
  onSelectFeature: (featureId: string) => void;
  stationCount: number;
  alternativeCount: number;
  unlockedBadgeCount: number;
  collectedKg: number;
}

export const FeatureCards: React.FC<FeatureCardsProps> = ({
  onSelectFeature,
  stationCount,
  alternativeCount,
  unlockedBadgeCount,
  collectedKg,
}) => {
  const features = [
    {
      id: 'collection',
      emoji: '♻️',
      title: 'Smart Plastic Collection',
      badge: `${stationCount} Campus Hubs`,
      description:
        'Locate smart campus collection points, report plastic waste collected, and view real-time bin capacity and status.',
      bulletPoints: [
        'Interactive campus station locator & status',
        'Direct reporting form for plastic waste logging',
        'Automatic EcoPoints awarded for every verified kg',
      ],
      cta: 'Explore Collection Hubs',
      colorTheme: 'from-emerald-500/10 to-teal-500/5',
      accentColor: 'text-emerald-700',
      borderAccent: 'border-emerald-200 hover:border-emerald-400',
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      icon: Recycle,
      tag: 'Core Action',
    },
    {
      id: 'alternatives',
      emoji: '🥤',
      title: 'Reusable Alternatives',
      badge: `${alternativeCount} Campus Swaps`,
      description:
        'Discover eco-friendly swaps for single-use bottles, cups, food containers, and polybags. Mark adopted items to build collective zero-waste habits.',
      bulletPoints: [
        'Compare cost savings & plastic diverted',
        'One-click "Adopt Alternative" tracking',
        '+50 EcoPoints reward per habit adopted',
      ],
      cta: 'View Reusable Swaps',
      colorTheme: 'from-sky-500/10 to-blue-500/5',
      accentColor: 'text-sky-700',
      borderAccent: 'border-sky-200 hover:border-sky-400',
      btnBg: 'bg-sky-600 hover:bg-sky-700 text-white',
      icon: Coffee,
      tag: 'Prevention',
    },
    {
      id: 'rewards',
      emoji: '🏆',
      title: 'Rewards & Awareness',
      badge: `${unlockedBadgeCount} Badges Unlocked`,
      description:
        'Redeem earned points for campus canteen coupons, official certificates, and tree planting. Climb student & class leaderboards while learning daily eco tips.',
      bulletPoints: [
        'Redeemable campus vouchers & swag',
        'Real-time student & department rankings',
        'Daily sustainability tips & facts',
      ],
      cta: 'Open Rewards Hub',
      colorTheme: 'from-amber-500/10 to-yellow-500/5',
      accentColor: 'text-amber-700',
      borderAccent: 'border-amber-200 hover:border-amber-400',
      btnBg: 'bg-amber-600 hover:bg-amber-700 text-white',
      icon: Award,
      tag: 'Gamification',
    },
    {
      id: 'dashboard',
      emoji: '📊',
      title: 'Monitoring Dashboard',
      badge: `${collectedKg.toLocaleString()} kg Tracked`,
      description:
        'Dive into campus-wide analytics with interactive charts displaying monthly collection, recycling rates, waste composition, and department metrics.',
      bulletPoints: [
        'Monthly collection vs. recycling trends',
        'Plastic type breakdown (PET, food boxes, films)',
        'Class participation distribution charts',
      ],
      cta: 'Open Live Analytics',
      colorTheme: 'from-teal-500/10 to-cyan-500/5',
      accentColor: 'text-teal-700',
      borderAccent: 'border-teal-200 hover:border-teal-400',
      btnBg: 'bg-teal-600 hover:bg-teal-700 text-white',
      icon: BarChart3,
      tag: 'Insights',
    },
  ];

  return (
    <section id="main-features-section" className="py-12 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Core Campaign Modules
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Integrated Campus Zero-Waste Ecosystem
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2">
            Click any module below to interact with its dedicated working tools, real-time forms,
            and live campus data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                id={`feature-card-${item.id}`}
                onClick={() => onSelectFeature(item.id)}
                className={`bg-white rounded-2xl p-6 sm:p-7 border ${item.borderAccent} shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden`}
              >
                {/* Background wash gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.colorTheme} opacity-70 pointer-events-none`}
                />

                <div className="relative z-10">
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white shadow-xs border border-slate-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                        {item.emoji}
                      </div>
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                          {item.tag}
                        </span>
                        <h3 className="text-lg sm:text-xl font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-white border border-slate-200/80 text-slate-700 shadow-2xs">
                      {item.badge}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {item.description}
                  </p>

                  <div className="space-y-2 mb-6">
                    {item.bulletPoints.map((point, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 group-hover:text-slate-900 transition-colors">
                    Click to launch module
                  </span>
                  <button
                    id={`btn-open-${item.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectFeature(item.id);
                    }}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold shadow-xs transition-all ${item.btnBg}`}
                  >
                    <span>{item.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
