import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Recycle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Leaf,
  Layers,
  Award,
  BarChart3,
  Coffee,
  MapPin,
  Flame,
  Code2,
} from 'lucide-react';

import {
  CampaignStats,
  CollectionPoint,
  WasteReport,
  ReusableAlternative,
  RewardItem,
  Badge,
  StudentLeaderboardEntry,
  DepartmentLeaderboardEntry,
  AwarenessTip,
} from './types';

import {
  INITIAL_STATS,
  INITIAL_COLLECTION_POINTS,
  INITIAL_REPORTS,
  INITIAL_ALTERNATIVES,
  INITIAL_REWARDS,
  INITIAL_BADGES,
  STUDENT_LEADERBOARD,
  DEPARTMENT_LEADERBOARD,
  AWARENESS_TIPS,
} from './data/initialData';

import {
  getStoredStats,
  saveStoredStats,
  getStoredUserPoints,
  saveStoredUserPoints,
  getStoredStations,
  saveStoredStations,
  getStoredReports,
  saveStoredReports,
  getStoredAlternatives,
  saveStoredAlternatives,
  getStoredRewards,
  saveStoredRewards,
  getStoredBadges,
  saveStoredBadges,
  getStoredStudentLeaderboard,
  saveStoredStudentLeaderboard,
  resetAllCampaignData,
} from './utils/storage';

import { Navbar } from './components/Navbar';
import { ToastContainer, ToastMessage } from './components/Toast';
import { HeroSection } from './components/HeroSection';
import { QuickStats } from './components/QuickStats';
import { FeatureCards } from './components/FeatureCards';
import { SmartCollection } from './components/SmartCollection';
import { ReusableAlternatives } from './components/ReusableAlternatives';
import { RewardsAwareness } from './components/RewardsAwareness';
import { MonitoringDashboard } from './components/MonitoringDashboard';
import { ImpactBenefits } from './components/ImpactBenefits';
import { TechStack } from './components/TechStack';
import { ReportWasteModal } from './components/ReportWasteModal';
import { Footer } from './components/Footer';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [userPoints, setUserPoints] = useState<number>(getStoredUserPoints);
  const [stats, setStats] = useState<CampaignStats>(getStoredStats);
  const [stations, setStations] = useState<CollectionPoint[]>(getStoredStations);
  const [reports, setReports] = useState<WasteReport[]>(getStoredReports);
  const [alternatives, setAlternatives] = useState<ReusableAlternative[]>(getStoredAlternatives);
  const [rewards, setRewards] = useState<RewardItem[]>(getStoredRewards);
  const [badges, setBadges] = useState<Badge[]>(getStoredBadges);
  const [studentLeaderboard, setStudentLeaderboard] = useState<StudentLeaderboardEntry[]>(
    getStoredStudentLeaderboard
  );
  const [departmentLeaderboard] = useState<DepartmentLeaderboardEntry[]>(DEPARTMENT_LEADERBOARD);
  const [awarenessTips] = useState<AwarenessTip[]>(AWARENESS_TIPS);

  // Modal & Toast UI state
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [modalTargetStationId, setModalTargetStationId] = useState<string | undefined>(undefined);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Smooth scroll to top when changing tabs
  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const addToast = useCallback((type: 'success' | 'info' | 'warning', title: string, message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 6);
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const fireConfetti = () => {
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#10b981', '#0ea5e9', '#f59e0b', '#14b8a6'],
      });
    } catch {
      // fallback safe
    }
  };

  // 1. Submit Waste Report Action
  const handleAddWasteReport = (
    reportInput: Omit<WasteReport, 'id' | 'timestamp' | 'status' | 'ecoPointsAwarded'>
  ) => {
    const pointsEarned = Math.max(10, Math.round(reportInput.quantityKg * 20));
    const now = new Date();
    const timeString = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate()
    ).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(
      now.getMinutes()
    ).padStart(2, '0')}`;

    const newReport: WasteReport = {
      ...reportInput,
      id: `rep-${Date.now()}`,
      status: 'Verified',
      ecoPointsAwarded: pointsEarned,
      timestamp: timeString,
    };

    // Update Reports
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    saveStoredReports(updatedReports);

    // Update Station
    const updatedStations = stations.map((s) => {
      if (s.id === reportInput.stationId) {
        const newTotal = Math.round((s.totalCollectedKg + reportInput.quantityKg) * 10) / 10;
        const newCapacity = Math.min(100, s.capacityPercent + Math.round(reportInput.quantityKg * 4));
        return {
          ...s,
          totalCollectedKg: newTotal,
          capacityPercent: newCapacity,
          status: (newCapacity >= 80 ? 'Near Capacity' : 'Active') as CollectionPoint['status'],
        };
      }
      return s;
    });
    setStations(updatedStations);
    saveStoredStations(updatedStations);

    // Update Stats
    const updatedStats: CampaignStats = {
      ...stats,
      plasticCollectedKg: Math.round((stats.plasticCollectedKg + reportInput.quantityKg) * 10) / 10,
      plasticRecycledKg:
        Math.round((stats.plasticRecycledKg + reportInput.quantityKg * 0.84) * 10) / 10,
      singleUseReducedCount: stats.singleUseReducedCount + reportInput.itemsCount,
      co2PreventedKg: Math.round((stats.co2PreventedKg + reportInput.quantityKg * 2.1) * 10) / 10,
      landfillVolumeSavedM3:
        Math.round((stats.landfillVolumeSavedM3 + reportInput.quantityKg * 0.028) * 10) / 10,
    };
    setStats(updatedStats);
    saveStoredStats(updatedStats);

    // Update User EcoPoints
    const updatedPoints = userPoints + pointsEarned;
    setUserPoints(updatedPoints);
    saveStoredUserPoints(updatedPoints);

    // Update Student Leaderboard
    const studentIdx = studentLeaderboard.findIndex(
      (s) => s.rollNo.toUpperCase() === reportInput.rollNo.toUpperCase()
    );
    let updatedLeaderboard: StudentLeaderboardEntry[];

    if (studentIdx >= 0) {
      updatedLeaderboard = [...studentLeaderboard];
      updatedLeaderboard[studentIdx] = {
        ...updatedLeaderboard[studentIdx],
        points: updatedLeaderboard[studentIdx].points + pointsEarned,
        kgContributed:
          Math.round((updatedLeaderboard[studentIdx].kgContributed + reportInput.quantityKg) * 10) /
          10,
      };
    } else {
      updatedLeaderboard = [
        ...studentLeaderboard,
        {
          rank: studentLeaderboard.length + 1,
          name: reportInput.studentName,
          rollNo: reportInput.rollNo,
          department: reportInput.department,
          points: pointsEarned,
          kgContributed: reportInput.quantityKg,
          badge: 'Eco Rookie',
        },
      ];
    }

    // Sort by points
    updatedLeaderboard.sort((a, b) => b.points - a.points);
    updatedLeaderboard.forEach((entry, idx) => {
      entry.rank = idx + 1;
    });
    setStudentLeaderboard(updatedLeaderboard);
    saveStoredStudentLeaderboard(updatedLeaderboard);

    // Visual feedback
    fireConfetti();
    addToast(
      'success',
      'Waste Drop Recorded Successfully!',
      `Logged ${reportInput.quantityKg} kg at ${reportInput.stationName}. You earned +${pointsEarned} EcoPoints!`
    );
  };

  // 2. Toggle Reusable Alternative Adoption
  const handleToggleAdoptAlternative = (altId: string) => {
    let wasAdopted = false;
    let targetAltName = '';

    const updatedAlternatives = alternatives.map((alt) => {
      if (alt.id === altId) {
        wasAdopted = !alt.isAdopted;
        targetAltName = alt.name;
        return {
          ...alt,
          isAdopted: wasAdopted,
          adoptedCount: wasAdopted ? alt.adoptedCount + 1 : Math.max(0, alt.adoptedCount - 1),
        };
      }
      return alt;
    });

    setAlternatives(updatedAlternatives);
    saveStoredAlternatives(updatedAlternatives);

    if (wasAdopted) {
      const newPoints = userPoints + 50;
      setUserPoints(newPoints);
      saveStoredUserPoints(newPoints);

      // increment stats reduced
      const newStats = {
        ...stats,
        singleUseReducedCount: stats.singleUseReducedCount + 180,
      };
      setStats(newStats);
      saveStoredStats(newStats);

      fireConfetti();
      addToast(
        'success',
        'Eco-Habit Adopted!',
        `You adopted "${targetAltName}". +50 EcoPoints awarded to your wallet!`
      );
    } else {
      const newPoints = Math.max(0, userPoints - 50);
      setUserPoints(newPoints);
      saveStoredUserPoints(newPoints);
      addToast('info', 'Habit Removed', `"${targetAltName}" was removed from your active habits.`);
    }
  };

  // 3. Propose New Alternative
  const handleProposeAlternative = (name: string, replaces: string) => {
    const newPoints = userPoints + 25;
    setUserPoints(newPoints);
    saveStoredUserPoints(newPoints);

    addToast(
      'success',
      'Swap Proposal Submitted!',
      `Thank you for proposing "${name}"! +25 EcoPoints credited.`
    );
  };

  // 4. Claim Reward Item
  const handleClaimReward = (rewardId: string) => {
    const targetReward = rewards.find((r) => r.id === rewardId);
    if (!targetReward) return;

    if (targetReward.isClaimed) {
      addToast('info', 'Already Claimed', 'You have already activated this voucher pass.');
      return;
    }

    if (userPoints < targetReward.pointsCost) {
      addToast(
        'warning',
        'Insufficient EcoPoints',
        `You need ${targetReward.pointsCost - userPoints} more EcoPoints to claim this reward.`
      );
      return;
    }

    const updatedPoints = userPoints - targetReward.pointsCost;
    setUserPoints(updatedPoints);
    saveStoredUserPoints(updatedPoints);

    const updatedRewards = rewards.map((r) => {
      if (r.id === rewardId) {
        return {
          ...r,
          isClaimed: true,
          stockRemaining: Math.max(0, r.stockRemaining - 1),
        };
      }
      return r;
    });

    setRewards(updatedRewards);
    saveStoredRewards(updatedRewards);

    fireConfetti();
    addToast(
      'success',
      'Reward Unlocked!',
      `Redeemed "${targetReward.title}". Your pass voucher code is: ${targetReward.voucherCode}`
    );
  };

  // 5. Daily Eco Quiz points
  const handleEarnQuizPoints = (earnedPoints: number) => {
    const newPoints = userPoints + earnedPoints;
    setUserPoints(newPoints);
    saveStoredUserPoints(newPoints);
    fireConfetti();
    addToast(
      'success',
      'Knowledge Bonus Earned!',
      `+${earnedPoints} EcoPoints awarded for answering the daily campus sustainability quiz!`
    );
  };

  // 6. Request Bin Clear
  const handleRequestBinClear = (stationId: string) => {
    const updatedStations = stations.map((s) => {
      if (s.id === stationId) {
        return {
          ...s,
          capacityPercent: 12,
          status: 'Recently Emptied' as CollectionPoint['status'],
          lastEmptied: 'Just now (Cleaned by sweepers)',
        };
      }
      return s;
    });
    setStations(updatedStations);
    saveStoredStations(updatedStations);
    addToast(
      'success',
      'Housekeeping Alert Dispatched',
      'Smart sweepers notified. Collection bin cleared and capacity reset to 12%!'
    );
  };

  // 7. Reset Data to Defaults
  const handleResetData = () => {
    resetAllCampaignData();
    setUserPoints(310);
    setStats(INITIAL_STATS);
    setStations(INITIAL_COLLECTION_POINTS);
    setReports(INITIAL_REPORTS);
    setAlternatives(INITIAL_ALTERNATIVES);
    setRewards(INITIAL_REWARDS);
    setBadges(INITIAL_BADGES);
    setStudentLeaderboard(STUDENT_LEADERBOARD);
    addToast('info', 'Demo Data Restored', 'All campaign metrics and stations reset to defaults.');
  };

  const handleOpenReportModal = (stationId?: string) => {
    setModalTargetStationId(stationId);
    setIsReportModalOpen(true);
  };

  const unlockedBadgeCount = badges.filter((b) => b.isUnlocked).length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-emerald-100 selection:text-emerald-900">
      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={handleDismissToast} />

      {/* Global Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        userPoints={userPoints}
        onOpenReportModal={() => handleOpenReportModal()}
        onResetData={handleResetData}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <div>
            {/* Hero Section */}
            <HeroSection
              stats={stats}
              onNavigate={handleSelectTab}
              onOpenReportModal={() => handleOpenReportModal()}
            />

            {/* Live 4 Quick Statistics Banner */}
            <QuickStats stats={stats} onNavigate={handleSelectTab} />

            {/* 4 Core Clickable Feature Modules */}
            <FeatureCards
              onSelectFeature={handleSelectTab}
              stationCount={stations.length}
              alternativeCount={alternatives.length}
              unlockedBadgeCount={unlockedBadgeCount}
              collectedKg={stats.plasticCollectedKg}
            />

            {/* Campus Segregation Guide & Best Practices */}
            <section
              id="segregation-guide-section"
              className="py-12 bg-white border-y border-slate-100"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-8">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Campus Segregation Protocol
                  </span>
                  <h2 className="text-2xl font-black text-slate-900 mt-2 tracking-tight">
                    How We Sort Plastic at AITS
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Follow the 3-bin standard across canteen plazas, lab corridors, and academic blocks.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Blue Bin */}
                  <div className="bg-sky-50/70 rounded-2xl p-5 border border-sky-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center font-bold">
                      💧
                    </div>
                    <h3 className="text-base font-bold text-sky-950">Blue: Clean Recyclables</h3>
                    <p className="text-xs text-sky-900/80 leading-relaxed">
                      Empty PET bottles, clean plastic caps, rinsed cups, milk pouches, and dry
                      cardboard food packaging.
                    </p>
                    <div className="text-[11px] font-semibold text-sky-800 bg-white/80 p-2 rounded-lg border border-sky-100">
                      Rule: Empty all liquids and crush bottles before dropping.
                    </div>
                  </div>

                  {/* Green Bin */}
                  <div className="bg-emerald-50/70 rounded-2xl p-5 border border-emerald-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold">
                      🍏
                    </div>
                    <h3 className="text-base font-bold text-emerald-950">
                      Green: Compostable & Food
                    </h3>
                    <p className="text-xs text-emerald-900/80 leading-relaxed">
                      Leftover canteen meals, fruit peels, paper napkins, wooden spoons, and certified
                      PLA biodegradable cutlery.
                    </p>
                    <div className="text-[11px] font-semibold text-emerald-800 bg-white/80 p-2 rounded-lg border border-emerald-100">
                      Rule: Never mix plastic wraps or foil with food waste.
                    </div>
                  </div>

                  {/* Amber Bin */}
                  <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200 space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold">
                      📦
                    </div>
                    <h3 className="text-base font-bold text-amber-950">
                      Amber: Polybags & Flexible Films
                    </h3>
                    <p className="text-xs text-amber-900/80 leading-relaxed">
                      Polythene shopping bags, biscuit wrappers, bubble wrap, stretch films, and
                      multi-layered laminates.
                    </p>
                    <div className="text-[11px] font-semibold text-amber-800 bg-white/80 p-2 rounded-lg border border-amber-100">
                      Rule: Pelletized separately into eco-paver tiles.
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Hackathon Credentials & Quick Teaser Banner */}
            <section className="py-10 bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                    WEBSPRINT 2026 • Innov8 | CSD
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                    Ready to explore the full campaign ecosystem?
                  </h3>
                  <p className="text-xs text-slate-300 max-w-xl">
                    View interactive collection maps, mark reusable habits adopted, climb the
                    student leaderboard, or inspect live telemetry charts.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <button
                    id="banner-explore-collection-btn"
                    onClick={() => handleSelectTab('collection')}
                    className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                  >
                    <span>Open Smart Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    id="banner-explore-tech-btn"
                    onClick={() => handleSelectTab('tech')}
                    className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
                  >
                    View Tech Stack
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {currentTab === 'collection' && (
          <SmartCollection
            stations={stations}
            reports={reports}
            onBackToHome={() => handleSelectTab('home')}
            onOpenReportModal={(stationId) => handleOpenReportModal(stationId)}
            onSubmitInlineReport={handleAddWasteReport}
            onRequestBinClear={handleRequestBinClear}
          />
        )}

        {currentTab === 'alternatives' && (
          <ReusableAlternatives
            alternatives={alternatives}
            onBackToHome={() => handleSelectTab('home')}
            onToggleAdopt={handleToggleAdoptAlternative}
            onProposeAlternative={handleProposeAlternative}
          />
        )}

        {currentTab === 'rewards' && (
          <RewardsAwareness
            userPoints={userPoints}
            rewards={rewards}
            badges={badges}
            studentLeaderboard={studentLeaderboard}
            departmentLeaderboard={departmentLeaderboard}
            awarenessTips={awarenessTips}
            onBackToHome={() => handleSelectTab('home')}
            onClaimReward={handleClaimReward}
            onEarnQuizPoints={handleEarnQuizPoints}
          />
        )}

        {currentTab === 'dashboard' && (
          <MonitoringDashboard
            stats={stats}
            reports={reports}
            stations={stations}
            onBackToHome={() => handleSelectTab('home')}
            onOpenReportModal={() => handleOpenReportModal()}
          />
        )}

        {currentTab === 'impact' && (
          <ImpactBenefits
            onBackToHome={() => handleSelectTab('home')}
            onExploreFeatures={handleSelectTab}
          />
        )}

        {currentTab === 'tech' && <TechStack onBackToHome={() => handleSelectTab('home')} />}
      </main>

      {/* Global Report Plastic Waste Modal */}
      <ReportWasteModal
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        stations={stations}
        initialStationId={modalTargetStationId}
        onSubmitReport={handleAddWasteReport}
      />

      {/* Global Footer */}
      <Footer
        onNavigate={handleSelectTab}
        onOpenReportModal={() => handleOpenReportModal()}
      />
    </div>
  );
}
