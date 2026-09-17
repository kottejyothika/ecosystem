import React, { useState, useMemo } from 'react';
import {
  Coffee,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Search,
  Check,
  TrendingUp,
  Leaf,
  DollarSign,
  Plus,
  HelpCircle,
} from 'lucide-react';
import { ReusableAlternative } from '../types';

interface ReusableAlternativesProps {
  alternatives: ReusableAlternative[];
  onBackToHome: () => void;
  onToggleAdopt: (id: string) => void;
  onProposeAlternative: (name: string, replaces: string) => void;
}

export const ReusableAlternatives: React.FC<ReusableAlternativesProps> = ({
  alternatives,
  onBackToHome,
  onToggleAdopt,
  onProposeAlternative,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Proposal form state
  const [showProposalForm, setShowProposalForm] = useState(false);
  const [propName, setPropName] = useState('');
  const [propReplaces, setPropReplaces] = useState('');

  const categories = ['All', 'Beverages', 'Dining & Canteen', 'Daily Carry', 'Stationery'];

  const filteredAlternatives = useMemo(() => {
    return alternatives.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.singleUseItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.reusableItem.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [alternatives, selectedCategory, searchQuery]);

  const userAdoptedCount = alternatives.filter((a) => a.isAdopted).length;
  const totalDivertedPerYear = alternatives
    .filter((a) => a.isAdopted)
    .reduce((acc, curr) => acc + curr.plasticItemsDivertedPerYear, 0);
  const totalCo2Saved = alternatives
    .filter((a) => a.isAdopted)
    .reduce((acc, curr) => acc + curr.co2SavedKg, 0);

  const handleProposalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propName.trim() || !propReplaces.trim()) return;
    onProposeAlternative(propName.trim(), propReplaces.trim());
    setPropName('');
    setPropReplaces('');
    setShowProposalForm(false);
  };

  return (
    <div id="reusable-alternatives-page" className="py-8 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              id="back-to-home-from-alt-btn"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline mb-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home Overview</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🥤</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Reusable Alternatives & Single-Use Swaps
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              Divert disposable plastics by adopting reusable alternatives across campus cafeterias,
              labs, and dorms.
            </p>
          </div>

          <button
            id="propose-swap-btn"
            onClick={() => setShowProposalForm(true)}
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Propose New Reusable Swap</span>
          </button>
        </div>

        {/* Personal Eco-Habit Summary Banner */}
        <div className="bg-gradient-to-r from-sky-900 via-teal-900 to-emerald-900 text-white rounded-3xl p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
            <div className="md:col-span-1 border-b md:border-b-0 md:border-r border-white/10 pb-4 md:pb-0 md:pr-4">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                Your Personal Impact
              </span>
              <h3 className="text-2xl font-black mt-1">
                {userAdoptedCount} of {alternatives.length} Adopted
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Mark your daily reusable habits below to earn EcoPoints.
              </p>
            </div>

            <div className="grid grid-cols-3 col-span-1 md:col-span-3 gap-4">
              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-xs text-emerald-300 font-semibold mb-1">
                  <Leaf className="w-3.5 h-3.5" />
                  <span>Plastic Diverted</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  {totalDivertedPerYear} items
                </div>
                <span className="text-[11px] text-slate-300">Prevented / year</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-xs text-sky-300 font-semibold mb-1">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>CO₂ Prevented</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  {totalCo2Saved.toFixed(1)} kg
                </div>
                <span className="text-[11px] text-slate-300">Carbon emission cut</span>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 backdrop-blur-xs">
                <div className="flex items-center gap-1.5 text-xs text-amber-300 font-semibold mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Bonus Points</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-300">
                  +{userAdoptedCount * 50} pts
                </div>
                <span className="text-[11px] text-slate-300">+50 per habit adopted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter & Search Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-xs border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`cat-filter-${cat.toLowerCase().replace(/[\s&]+/g, '-')}`}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="search-alternatives-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search swaps or materials..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Alternatives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAlternatives.map((item) => {
            return (
              <div
                key={item.id}
                id={`alt-card-${item.id}`}
                className={`rounded-2xl p-6 border transition-all duration-300 flex flex-col justify-between relative overflow-hidden ${
                  item.isAdopted
                    ? 'bg-emerald-50/40 border-emerald-300 shadow-md ring-1 ring-emerald-300'
                    : 'bg-white border-slate-200/80 shadow-xs hover:shadow-md'
                }`}
              >
                <div>
                  {/* Category & Adoption Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {item.category}
                    </span>
                    {item.isAdopted && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                        <Check className="w-3 h-3" />
                        Adopted Habit
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">{item.name}</h3>

                  {/* Replaces vs Swap box */}
                  <div className="my-4 space-y-2 text-xs">
                    <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100/80 text-rose-900">
                      <span className="text-[10px] uppercase font-bold text-rose-600 block">
                        Replaces Disposable Item:
                      </span>
                      <span className="font-semibold">{item.singleUseItem}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100/80 text-emerald-900">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 block">
                        Recommended Reusable Alternative:
                      </span>
                      <span className="font-semibold">{item.reusableItem}</span>
                      <div className="text-[11px] text-emerald-700 mt-0.5 font-medium">
                        Material: {item.material}
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.description}</p>

                  {/* Impact Metrics Grid */}
                  <div className="grid grid-cols-3 gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-100 text-center mb-4">
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                        Diverted
                      </span>
                      <span className="text-xs font-black text-slate-800">
                        {item.plasticItemsDivertedPerYear}/yr
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                        Savings
                      </span>
                      <span className="text-xs font-black text-emerald-600">
                        {item.estimatedYearlySaving}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 font-semibold block uppercase">
                        CO₂ Cut
                      </span>
                      <span className="text-xs font-black text-sky-600">
                        {item.co2SavedKg} kg
                      </span>
                    </div>
                  </div>

                  {/* Campus Tip */}
                  <div className="text-[11px] text-slate-500 bg-sky-50/50 p-2.5 rounded-lg border border-sky-100 flex items-start gap-1.5 mb-4">
                    <HelpCircle className="w-3.5 h-3.5 text-sky-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Campus Tip:</strong> {item.tip}
                    </span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <span className="text-xs text-slate-500 font-medium">
                    Adopted by <strong>{item.adoptedCount}</strong> students
                  </span>

                  <button
                    id={`btn-toggle-adopt-${item.id}`}
                    onClick={() => onToggleAdopt(item.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 active:scale-95 ${
                      item.isAdopted
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                        : 'bg-white border border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    {item.isAdopted ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-white" />
                        <span>I Use This! (+50 pts)</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Mark as Adopted</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Propose Modal */}
        {showProposalForm && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-slate-900">
                Propose a New Campus Reusable Alternative
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Help the Innov8 team identify additional single-use plastic items used in labs,
                canteens, or student clubs.
              </p>

              <form onSubmit={handleProposalSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Reusable Alternative Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Silicone Collapsible Snack Bowl"
                    value={propName}
                    onChange={(e) => setPropName(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Disposable Item It Replaces *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Single-use plastic snack pouches / wraps"
                    value={propReplaces}
                    onChange={(e) => setPropReplaces(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowProposalForm(false)}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl shadow-xs"
                  >
                    Submit Proposal (+25 pts)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
