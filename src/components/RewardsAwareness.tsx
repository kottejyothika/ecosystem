import React, { useState } from 'react';
import {
  Award,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Gift,
  Copy,
  Check,
  Flame,
  Users,
  Lightbulb,
  Search,
  BookOpen,
} from 'lucide-react';
import {
  RewardItem,
  Badge,
  StudentLeaderboardEntry,
  DepartmentLeaderboardEntry,
  AwarenessTip,
} from '../types';

interface RewardsAwarenessProps {
  userPoints: number;
  rewards: RewardItem[];
  badges: Badge[];
  studentLeaderboard: StudentLeaderboardEntry[];
  departmentLeaderboard: DepartmentLeaderboardEntry[];
  awarenessTips: AwarenessTip[];
  onBackToHome: () => void;
  onClaimReward: (rewardId: string) => void;
  onEarnQuizPoints: (points: number) => void;
}

export const RewardsAwareness: React.FC<RewardsAwarenessProps> = ({
  userPoints,
  rewards,
  badges,
  studentLeaderboard,
  departmentLeaderboard,
  awarenessTips,
  onBackToHome,
  onClaimReward,
  onEarnQuizPoints,
}) => {
  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<'students' | 'departments'>(
    'students'
  );
  const [leaderboardSearch, setLeaderboardSearch] = useState('');
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  // Daily eco quiz state
  const [quizAnswered, setQuizAnswered] = useState(false);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSuccess, setQuizSuccess] = useState<boolean | null>(null);

  const quizQuestion = {
    question:
      'Which plastic resin code indicates PET (Polyethylene Terephthalate) commonly used in water bottles and most easily recycled on campus?',
    options: ['Code #1 (PET / PETE)', 'Code #3 (PVC)', 'Code #6 (PS - Polystyrene)', 'Code #7 (OTHER)'],
    correctIndex: 0,
    explanation:
      'Correct! Resin Code #1 (PET/PETE) is the highest-value recyclable plastic on campus and gets pelletized into recycled polyester yarn and new clean containers.',
  };

  const handleQuizAnswer = (index: number) => {
    if (quizAnswered) return;
    setQuizSelectedOption(index);
    setQuizAnswered(true);
    if (index === quizQuestion.correctIndex) {
      setQuizSuccess(true);
      onEarnQuizPoints(15);
    } else {
      setQuizSuccess(false);
    }
  };

  const copyVoucherCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2500);
  };

  const filteredStudents = studentLeaderboard.filter(
    (s) =>
      s.name.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(leaderboardSearch.toLowerCase()) ||
      s.department.toLowerCase().includes(leaderboardSearch.toLowerCase())
  );

  const filteredDepartments = departmentLeaderboard.filter((d) =>
    d.department.toLowerCase().includes(leaderboardSearch.toLowerCase())
  );

  return (
    <div id="rewards-awareness-page" className="py-8 bg-slate-50/60 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumb & Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <button
              id="back-to-home-from-rewards-btn"
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline mb-2 group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Home Overview</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🏆</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Rewards, Badges & Awareness Hub
              </h1>
            </div>
            <p className="text-sm text-slate-600">
              Redeem earned EcoPoints for cafeteria vouchers and certificates, climb campus
              leaderboards, and learn daily sustainability habits.
            </p>
          </div>
        </div>

        {/* Top Wallet & Achievement Overview Banner */}
        <div className="bg-gradient-to-r from-amber-600 via-amber-700 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-4 space-y-2 border-b lg:border-b-0 lg:border-r border-white/20 pb-6 lg:pb-0 lg:pr-6">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-200">
                Your Eco-Wallet Balance
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl font-black tracking-tight">{userPoints}</span>
                <span className="text-base font-bold text-amber-200">EcoPoints</span>
              </div>
              <p className="text-xs text-amber-100/90 leading-relaxed">
                Earned from verified plastic drop-offs and reusable alternatives adopted.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {badges.slice(0, 4).map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border text-center transition-all ${
                    badge.isUnlocked
                      ? 'bg-white/15 border-white/30 backdrop-blur-xs'
                      : 'bg-black/20 border-white/10 opacity-70'
                  }`}
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 flex items-center justify-center mx-auto mb-1.5 font-bold text-sm">
                    {badge.isUnlocked ? '🌟' : '🔒'}
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{badge.title}</h4>
                  <span className="text-[10px] text-amber-200/80 block mt-0.5">
                    {badge.isUnlocked ? 'Unlocked' : `${badge.pointsThreshold} pts required`}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Redeemable Rewards Catalog */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Gift className="w-5 h-5 text-amber-600" />
                <span>Campus Rewards Catalog</span>
              </h2>
              <p className="text-xs text-slate-500">
                Claim perks using your verified EcoPoints balance
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-lg border border-slate-200 shadow-2xs">
              Available: <strong>{userPoints} pts</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {rewards.map((reward) => {
              const canAfford = userPoints >= reward.pointsCost;
              return (
                <div
                  key={reward.id}
                  id={`reward-card-${reward.id}`}
                  className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-50 text-amber-800 border border-amber-200">
                        {reward.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {reward.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {reward.title}
                    </h3>
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {reward.description}
                    </p>

                    <div className="mt-4 flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                      <span className="font-extrabold text-amber-700 text-sm">
                        {reward.pointsCost} EcoPoints
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        {reward.stockRemaining} vouchers left
                      </span>
                    </div>

                    {/* If claimed, show voucher code */}
                    {reward.isClaimed && reward.voucherCode && (
                      <div className="mt-3 p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                        <div className="truncate">
                          <span className="text-[10px] uppercase font-bold text-emerald-800 block">
                            Your Voucher Pass:
                          </span>
                          <span className="font-mono text-xs font-bold text-emerald-950">
                            {reward.voucherCode}
                          </span>
                        </div>
                        <button
                          id={`copy-code-${reward.id}`}
                          onClick={() => copyVoucherCode(reward.id, reward.voucherCode!)}
                          className="p-1.5 rounded-lg bg-white border border-emerald-300 text-emerald-700 hover:bg-emerald-100 transition-colors shrink-0 ml-2"
                          title="Copy voucher code"
                        >
                          {copiedCodeId === reward.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-700" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <button
                      id={`btn-claim-${reward.id}`}
                      onClick={() => onClaimReward(reward.id)}
                      disabled={!canAfford && !reward.isClaimed}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 active:scale-98 ${
                        reward.isClaimed
                          ? 'bg-slate-100 text-slate-500 cursor-default'
                          : canAfford
                          ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-xs'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      {reward.isClaimed ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Redeemed Pass Active</span>
                        </>
                      ) : canAfford ? (
                        <>
                          <Sparkles className="w-4 h-4" />
                          <span>Redeem for {reward.pointsCost} pts</span>
                        </>
                      ) : (
                        <span>Need {reward.pointsCost - userPoints} more pts</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Eco Quiz & Knowledge Card */}
        <div
          id="daily-eco-quiz-card"
          className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-emerald-200 relative overflow-hidden"
        >
          <div className="max-w-3xl space-y-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 border border-emerald-200">
              <Lightbulb className="w-3.5 h-3.5 text-emerald-700" />
              Daily Campus Eco-Quiz (+15 EcoPoints)
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900">
              {quizQuestion.question}
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {quizQuestion.options.map((option, idx) => {
              const isSelected = quizSelectedOption === idx;
              const isCorrect = idx === quizQuestion.correctIndex;
              let btnStyle = 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-800';

              if (quizAnswered) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                } else if (isSelected) {
                  btnStyle = 'bg-rose-50 border-rose-300 text-rose-900';
                }
              }

              return (
                <button
                  key={idx}
                  id={`quiz-option-${idx}`}
                  onClick={() => handleQuizAnswer(idx)}
                  disabled={quizAnswered}
                  className={`p-3 rounded-xl border text-xs text-left font-medium transition-all ${btnStyle}`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>
                  <span>{option}</span>
                </button>
              );
            })}
          </div>

          {quizAnswered && (
            <div
              className={`p-3.5 rounded-xl text-xs leading-relaxed ${
                quizSuccess
                  ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                  : 'bg-amber-50 border border-amber-200 text-amber-900'
              }`}
            >
              <strong>{quizSuccess ? '🎉 Correct! +15 EcoPoints awarded!' : 'Notice:'}</strong>{' '}
              {quizQuestion.explanation}
            </div>
          )}
        </div>

        {/* Campus Leaderboard Section */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-slate-200/90 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Flame className="w-5 h-5 text-orange-500" />
                <span>Campus Sustainability Leaderboards</span>
              </h2>
              <p className="text-xs text-slate-500">
                Recognizing top student eco-champions and leading department classes
              </p>
            </div>

            <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                id="btn-tab-students-leaderboard"
                onClick={() => setActiveLeaderboardTab('students')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeLeaderboardTab === 'students'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>Top Students</span>
              </button>
              <button
                id="btn-tab-departments-leaderboard"
                onClick={() => setActiveLeaderboardTab('departments')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                  activeLeaderboardTab === 'departments'
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5 text-indigo-500" />
                <span>Department Classes</span>
              </button>
            </div>
          </div>

          {/* Search box */}
          <div className="relative max-w-sm">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="search-leaderboard-input"
              type="text"
              value={leaderboardSearch}
              onChange={(e) => setLeaderboardSearch(e.target.value)}
              placeholder="Search rank, name, roll no, or branch..."
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 rounded-xl border border-slate-200 focus:outline-hidden focus:border-emerald-500"
            />
          </div>

          {/* Students Table */}
          {activeLeaderboardTab === 'students' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-semibold">
                    <th className="py-2.5 px-3 text-center w-12">Rank</th>
                    <th className="py-2.5 px-3">Student Name & Roll No</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3 text-right">Plastic Collected</th>
                    <th className="py-2.5 px-3 text-right">Points</th>
                    <th className="py-2.5 px-3 text-center">Badge Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((entry) => (
                    <tr
                      key={entry.rollNo}
                      className={`hover:bg-slate-50/70 transition-colors ${
                        entry.rank <= 3 ? 'bg-amber-50/30' : ''
                      }`}
                    >
                      <td className="py-3 px-3 text-center font-bold">
                        {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : `#${entry.rank}`}
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-900">
                        <div>{entry.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{entry.rollNo}</div>
                      </td>
                      <td className="py-3 px-3 text-slate-600">{entry.department}</td>
                      <td className="py-3 px-3 text-right font-bold text-slate-800">
                        {entry.kgContributed} kg
                      </td>
                      <td className="py-3 px-3 text-right font-black text-amber-600">
                        {entry.points} pts
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">
                          {entry.badge}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Departments Table */}
          {activeLeaderboardTab === 'departments' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700 border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200 text-slate-600 uppercase text-[10px] tracking-wider font-semibold">
                    <th className="py-2.5 px-3 text-center w-12">Rank</th>
                    <th className="py-2.5 px-3">Department Branch</th>
                    <th className="py-2.5 px-3 text-center">Student Volunteers</th>
                    <th className="py-2.5 px-3 text-right">Total Kg Diverted</th>
                    <th className="py-2.5 px-3 text-right">EcoPoints</th>
                    <th className="py-2.5 px-3">Campus Achievement</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDepartments.map((dept) => (
                    <tr key={dept.department} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-3 text-center font-bold">
                        {dept.rank === 1 ? '🏆' : `#${dept.rank}`}
                      </td>
                      <td className="py-3 px-3 font-bold text-slate-900">{dept.department}</td>
                      <td className="py-3 px-3 text-center font-semibold text-slate-700">
                        {dept.studentCount} students
                      </td>
                      <td className="py-3 px-3 text-right font-bold text-emerald-700">
                        {dept.totalKg} kg
                      </td>
                      <td className="py-3 px-3 text-right font-black text-amber-600">
                        {dept.totalPoints.toLocaleString()} pts
                      </td>
                      <td className="py-3 px-3 text-xs text-slate-600 font-medium">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-100">
                          {dept.achievement}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Awareness Tips & Sustainability Messages */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-700" />
                <span>Awareness Tips & Campus Sustainability Messages</span>
              </h2>
              <p className="text-xs text-slate-500">
                Practical zero-waste knowledge tailored for college campuses
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {awarenessTips.map((tip) => (
              <div
                key={tip.id}
                id={`awareness-tip-${tip.id}`}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-100">
                    {tip.category}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">Verified Science</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">{tip.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{tip.message}</p>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-emerald-700 tracking-wide">
                    Impact Fact:
                  </div>
                  <p className="font-semibold text-slate-900">{tip.impactFact}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-sky-50/70 border border-sky-100 text-xs text-sky-950 space-y-1">
                  <div className="text-[10px] font-bold uppercase text-sky-700 tracking-wide">
                    What You Can Do Today:
                  </div>
                  <p className="font-medium">{tip.actionableStep}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
