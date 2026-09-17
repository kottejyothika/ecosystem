import React from 'react';
import { Recycle, Trash2, ShieldCheck, Users, TrendingUp, ArrowUpRight } from 'lucide-react';
import { CampaignStats } from '../types';

interface QuickStatsProps {
  stats: CampaignStats;
  onNavigate: (tab: string) => void;
}

export const QuickStats: React.FC<QuickStatsProps> = ({ stats, onNavigate }) => {
  const recyclingRate = Math.round(
    (stats.plasticRecycledKg / (stats.plasticCollectedKg || 1)) * 100
  );

  const statCards = [
    {
      id: 'stat-collected',
      title: 'Plastic Collected',
      value: `${stats.plasticCollectedKg.toLocaleString()} kg`,
      subtitle: 'Across 6 active campus stations',
      trend: '+14.2% this month',
      icon: Trash2,
      color: 'emerald',
      bgColor: 'bg-emerald-50/80',
      borderColor: 'border-emerald-200',
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-100',
      targetTab: 'collection',
      actionText: 'View Stations',
    },
    {
      id: 'stat-recycled',
      title: 'Plastic Recycled',
      value: `${stats.plasticRecycledKg.toLocaleString()} kg`,
      subtitle: `${recyclingRate}% circular conversion rate`,
      trend: '+18.5% efficiency',
      icon: Recycle,
      color: 'teal',
      bgColor: 'bg-teal-50/80',
      borderColor: 'border-teal-200',
      iconColor: 'text-teal-700',
      iconBg: 'bg-teal-100',
      targetTab: 'dashboard',
      actionText: 'Analytics',
    },
    {
      id: 'stat-reduced',
      title: 'Single-Use Plastic Reduced',
      value: `${stats.singleUseReducedCount.toLocaleString()} items`,
      subtitle: 'Bottles, cups, & polybags diverted',
      trend: 'Estimated savings ₹1.8L+',
      icon: ShieldCheck,
      color: 'sky',
      bgColor: 'bg-sky-50/80',
      borderColor: 'border-sky-200',
      iconColor: 'text-sky-700',
      iconBg: 'bg-sky-100',
      targetTab: 'alternatives',
      actionText: 'See Reusables',
    },
    {
      id: 'stat-students',
      title: 'Student Participation',
      value: `${stats.studentParticipation.toLocaleString()}`,
      subtitle: 'Eco-volunteers across 6 departments',
      trend: 'Top: CSD Department',
      icon: Users,
      color: 'indigo',
      bgColor: 'bg-indigo-50/80',
      borderColor: 'border-indigo-200',
      iconColor: 'text-indigo-700',
      iconBg: 'bg-indigo-100',
      targetTab: 'rewards',
      actionText: 'Leaderboard',
    },
  ];

  return (
    <section id="quick-statistics-section" className="py-8 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Campus Live Metrics
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Real-Time Campaign Statistics
            </h2>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/80">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Synchronized across AITS collection hubs</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                id={card.id}
                className={`relative rounded-2xl p-5 border ${card.borderColor} ${card.bgColor} shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center font-bold`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-white/90 px-2 py-0.5 rounded-full border border-emerald-100 shadow-2xs">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      {card.trend}
                    </span>
                  </div>

                  <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
                    {card.title}
                  </h3>
                  <div className="text-2xl sm:text-3xl font-black text-slate-900 mt-1 tracking-tight">
                    {card.value}
                  </div>
                  <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">{card.subtitle}</p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60">
                  <button
                    id={`btn-navigate-${card.targetTab}`}
                    onClick={() => onNavigate(card.targetTab)}
                    className="w-full flex items-center justify-between text-xs font-bold text-slate-700 group-hover:text-emerald-700 transition-colors"
                  >
                    <span>{card.actionText}</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
