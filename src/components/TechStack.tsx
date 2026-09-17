import React, { useState } from 'react';
import {
  Code2,
  ArrowLeft,
  Database,
  Flame,
  Terminal,
  Cpu,
  GitBranch,
  Layers,
  CheckCircle2,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { TECH_STACK_DATA } from '../data/initialData';
import { TechStackItem } from '../types';

interface TechStackProps {
  onBackToHome: () => void;
}

export const TechStack: React.FC<TechStackProps> = ({ onBackToHome }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Database', 'DevOps & Tools', 'Intelligence'];

  const filteredTech = TECH_STACK_DATA.filter(
    (item) => selectedCategory === 'All' || item.category === selectedCategory
  );

  const getTechIcon = (id: string) => {
    switch (id) {
      case 'tech-html':
        return Code2;
      case 'tech-js':
        return Terminal;
      case 'tech-py':
        return Terminal;
      case 'tech-mongo':
        return Database;
      case 'tech-firebase':
        return Flame;
      case 'tech-git':
        return GitBranch;
      case 'tech-ai':
        return Cpu;
      default:
        return Layers;
    }
  };

  return (
    <div id="tech-stack-page" className="py-8 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              id="back-to-home-from-tech-btn"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline mb-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home Overview</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💻</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Technology Stack & Engineering Architecture
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              Developed by Team Innov8 | CSD for WEBSPRINT 2026, AITS Hackathon 2026.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span>Modern Full-Stack Cloud Architecture</span>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 bg-white p-2 rounded-2xl border border-slate-200 shadow-2xs">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`tech-filter-${cat.toLowerCase().replace(/[\s&]+/g, '-')}`}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Stack Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTech.map((tech: TechStackItem) => {
            const Icon = getTechIcon(tech.id);
            return (
              <div
                key={tech.id}
                id={`tech-card-${tech.id}`}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Bar with category & tag */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700">
                      {tech.category}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-400 font-mono">
                      {tech.tag}
                    </span>
                  </div>

                  {/* Icon & Title */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${tech.color} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 leading-tight">{tech.name}</h3>
                      <p className="text-xs font-semibold text-emerald-700">{tech.role}</p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-600 leading-relaxed mb-5">{tech.description}</p>

                  {/* Key Features / Role */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block">
                      Key Technical Capabilities:
                    </span>
                    {tech.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
                  <span>Innov8 Verified Stack</span>
                  <span className="font-mono text-[10px] text-slate-400">AITS 2026</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stack Integration Architecture Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              Integrated System Workflow
            </span>
            <h3 className="text-2xl font-bold tracking-tight">
              Seamless Synergy Between Hardware, Software & Cloud
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Student drop-offs are captured via client responsive forms (HTML5 & TypeScript),
              synchronized in real-time with Firestore and MongoDB collections, aggregated using
              Python analytics scripts, and delivered with instant push updates. Version-controlled
              on GitHub by Team Innov8 | CSD.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
