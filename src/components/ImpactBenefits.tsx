import React, { useState } from 'react';
import {
  Sparkles,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Maximize2,
  DollarSign,
  TrendingDown,
  Layers,
  Zap,
  Globe,
  CheckCircle2,
  TreePine,
} from 'lucide-react';

interface ImpactBenefitsProps {
  onBackToHome: () => void;
  onExploreFeatures: (tab: string) => void;
}

export const ImpactBenefits: React.FC<ImpactBenefitsProps> = ({
  onBackToHome,
  onExploreFeatures,
}) => {
  // Interactive 4-year degree calculator
  const [weeklyBottles, setWeeklyBottles] = useState<number>(4);
  const [weeklyCups, setWeeklyCups] = useState<number>(5);

  const degreeYears = 4;
  const weeksPerAcademicYear = 36;
  const totalWeeks = degreeYears * weeksPerAcademicYear;

  const totalPlasticItems = (weeklyBottles + weeklyCups) * totalWeeks;
  const totalMoneySaved = weeklyBottles * 20 * totalWeeks + weeklyCups * 10 * totalWeeks;
  const totalCo2Kg = Math.round(totalPlasticItems * 0.082);

  const flowSteps = [
    {
      step: '01',
      title: 'Input',
      subtitle: 'Plastic Waste Data & Student Participation',
      desc: 'Active student logging, waste quantity measurements, campus station capacity sensors, and volunteer registration across academic departments.',
      badge: 'Data Ingestion',
      icon: Users,
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-300',
      iconColor: 'text-emerald-700',
    },
    {
      step: '02',
      title: 'Process',
      subtitle: 'Collection, Segregation & Recycling',
      desc: 'Smart collection stations with color-coded receptacles, verified sorting (PET, Polypropylene, films), and handover to certified recycling vendors.',
      badge: 'Circular Workflow',
      icon: Layers,
      bgColor: 'bg-teal-50',
      borderColor: 'border-teal-300',
      iconColor: 'text-teal-700',
    },
    {
      step: '03',
      title: 'Output',
      subtitle: 'Reduced Plastic Waste & Rewards',
      desc: 'Measurable metric reductions in single-use plastic, gamified EcoPoints awarded to students, canteen perks, and verified digital certificates.',
      badge: 'Tangible Outcomes',
      icon: Award,
      bgColor: 'bg-sky-50',
      borderColor: 'border-sky-300',
      iconColor: 'text-sky-700',
    },
    {
      step: '04',
      title: 'Impact',
      subtitle: 'Cleaner, Greener & Plastic-Free Campus',
      desc: 'Transformation into a model zero-waste institutional campus, sustained student environmental habits, and scalable framework for university networks.',
      badge: 'Lasting Mission',
      icon: TreePine,
      bgColor: 'bg-emerald-100/70',
      borderColor: 'border-emerald-400',
      iconColor: 'text-emerald-800',
    },
  ];

  const keyBenefits = [
    {
      id: 'benefit-1',
      title: 'Cleaner and Greener Campus',
      description:
        'Eliminates plastic litter from canteen corridors, auditoriums, sports grounds, and academic lawns through strategically placed smart segregation hubs.',
      icon: TreePine,
      color: 'text-emerald-700',
      bg: 'bg-emerald-50',
      stat: '98% litter reduction in pilot blocks',
    },
    {
      id: 'benefit-2',
      title: 'Reduced Plastic Waste',
      description:
        'Drastic decrease in single-use mineral water bottles, polythene carry pouches, disposable plastic cutlery, and polystyrene lunch trays across college amenities.',
      icon: TrendingDown,
      color: 'text-teal-700',
      bg: 'bg-teal-50',
      stat: '46,800+ single-use items diverted',
    },
    {
      id: 'benefit-3',
      title: 'Increased Student Awareness',
      description:
        'Educational science-backed daily eco tips, microplastic health awareness, and interactive habit challenges transform passive observers into proactive advocates.',
      icon: Users,
      color: 'text-indigo-700',
      bg: 'bg-indigo-50',
      stat: '920+ active student participants',
    },
    {
      id: 'benefit-4',
      title: 'Better Collection and Segregation',
      description:
        'Color-coded source segregation separates clean PET from greasy food plastics, elevating recycling contamination efficiency to an industry-standard 84%.',
      icon: ShieldCheck,
      color: 'text-cyan-700',
      bg: 'bg-cyan-50',
      stat: '84% verified recycling conversion',
    },
    {
      id: 'benefit-5',
      title: 'Rewards for Participation',
      description:
        'Incentivizes positive sustainability actions through the EcoPoints wallet, cafeteria meal discounts, official Green Ambassador certificates, and campus tree planting.',
      icon: Award,
      color: 'text-amber-700',
      bg: 'bg-amber-50',
      stat: 'Instant gamified EcoPoint credits',
    },
    {
      id: 'benefit-6',
      title: 'Scalability to Schools, Colleges and Communities',
      description:
        'Modular architecture designed for rapid replication across higher educational institutions, school districts, tech parks, and residential civic townships.',
      icon: Maximize2,
      color: 'text-sky-700',
      bg: 'bg-sky-50',
      stat: 'Cross-campus multi-tenant readiness',
    },
    {
      id: 'benefit-7',
      title: 'Low-Cost and Easy Implementation',
      description:
        'Leverages existing campus infrastructure, standard mobile browsers, and low-cost digital QR logging without requiring expensive hardware installations.',
      icon: DollarSign,
      color: 'text-slate-700',
      bg: 'bg-slate-100',
      stat: 'Zero mandatory hardware overhead',
    },
  ];

  return (
    <div id="impact-benefits-page" className="py-8 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              id="back-to-home-from-impact-btn"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline mb-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home Overview</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🌿</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Project Impact, Flow & Sustainable Benefits
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              Presented in WEBSPRINT 2026 by Team Innov8 | CSD for AITS Hackathon 2026.
            </p>
          </div>
        </div>

        {/* Project Flow Section: Input -> Process -> Output -> Impact */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xs border border-emerald-200 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200">
              System Architecture & Methodology
            </span>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">
              Project Execution Lifecycle
            </h2>
            <p className="text-xs text-slate-500">
              Input → Process → Output → Impact framework powering our zero-plastic institutional model
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
            {flowSteps.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  id={`flow-step-${item.step}`}
                  className={`rounded-2xl p-5 border ${item.borderColor} ${item.bgColor} shadow-2xs relative flex flex-col justify-between`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-black font-mono px-2 py-0.5 rounded-md bg-white/80 text-slate-700 border border-slate-200">
                        {item.step}
                      </span>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white text-slate-700">
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mb-2">
                      <div className={`p-2 rounded-xl bg-white shadow-2xs ${item.iconColor}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                    </div>

                    <h4 className="text-xs font-bold text-slate-700 mb-2 leading-snug">
                      {item.subtitle}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>

                  {idx < 3 && (
                    <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 bg-white p-1 rounded-full border border-slate-300 shadow-xs">
                      <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* The 7 Core Campaign Benefits Grid */}
        <div className="space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Measurable Campus Advancements
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              7 Key Benefits of the Campaign
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Delivering quantifiable environmental, social, and economic benefits to our college
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {keyBenefits.map((b) => {
              const Icon = b.icon;
              return (
                <div
                  key={b.id}
                  id={b.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div
                      className={`w-11 h-11 rounded-xl ${b.bg} ${b.color} flex items-center justify-center font-bold mb-4`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{b.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">{b.description}</p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{b.stat}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive 4-Year College Footprint Calculator */}
        <div
          id="student-calculator-card"
          className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                Student Personal Impact Calculator
              </span>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Calculate Your 4-Year College Footprint Savings
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Adjust your typical weekly single-use plastic habits to see the cumulative impact of
                switching to reusable flasks and cups during your 4 years at AITS.
              </p>

              {/* Sliders */}
              <div className="space-y-4 pt-2">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Disposable Water Bottles Bought / Week:</span>
                    <span className="text-emerald-400 font-bold">{weeklyBottles} bottles</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="14"
                    value={weeklyBottles}
                    onChange={(e) => setWeeklyBottles(parseInt(e.target.value, 10))}
                    className="w-full accent-emerald-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span>Disposable Plastic / Wax Chai Cups / Week:</span>
                    <span className="text-sky-400 font-bold">{weeklyCups} cups</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={weeklyCups}
                    onChange={(e) => setWeeklyCups(parseInt(e.target.value, 10))}
                    className="w-full accent-sky-400"
                  />
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-6 bg-white/10 rounded-2xl p-6 border border-white/10 backdrop-blur-md">
              <span className="text-[11px] uppercase font-bold text-emerald-300 tracking-wider block mb-3">
                Projected Savings Over Your 4-Year B.Tech Degree
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-black/20 p-4 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-semibold text-slate-300 block">
                    Plastic Prevented
                  </span>
                  <div className="text-2xl font-black text-emerald-400 mt-1">
                    {totalPlasticItems.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">single-use items</span>
                </div>

                <div className="bg-black/20 p-4 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-semibold text-slate-300 block">
                    Pocket Money Saved
                  </span>
                  <div className="text-2xl font-black text-amber-300 mt-1">
                    ₹{totalMoneySaved.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-400">canteen budget</span>
                </div>

                <div className="bg-black/20 p-4 rounded-xl text-center">
                  <span className="text-[10px] uppercase font-semibold text-slate-300 block">
                    CO₂ Cut
                  </span>
                  <div className="text-2xl font-black text-sky-400 mt-1">{totalCo2Kg} kg</div>
                  <span className="text-[10px] text-slate-400">carbon footprint</span>
                </div>
              </div>

              <button
                id="calc-adopt-btn"
                onClick={() => onExploreFeatures('alternatives')}
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
              >
                <span>Adopt Campus Reusables Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
