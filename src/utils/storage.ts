import {
  CampaignStats,
  CollectionPoint,
  WasteReport,
  ReusableAlternative,
  RewardItem,
  Badge,
  StudentLeaderboardEntry,
  DepartmentLeaderboardEntry,
} from '../types';
import {
  INITIAL_STATS,
  INITIAL_COLLECTION_POINTS,
  INITIAL_REPORTS,
  INITIAL_ALTERNATIVES,
  INITIAL_REWARDS,
  INITIAL_BADGES,
  STUDENT_LEADERBOARD,
  DEPARTMENT_LEADERBOARD,
} from '../data/initialData';

const STORAGE_KEYS = {
  STATS: 'aits_plastic_free_stats_v1',
  POINTS: 'aits_plastic_free_user_points_v1',
  STATIONS: 'aits_plastic_free_stations_v1',
  REPORTS: 'aits_plastic_free_reports_v1',
  ALTERNATIVES: 'aits_plastic_free_alternatives_v1',
  REWARDS: 'aits_plastic_free_rewards_v1',
  BADGES: 'aits_plastic_free_badges_v1',
  STUDENT_LEADERBOARD: 'aits_plastic_free_students_v1',
};

export const getStoredStats = (): CampaignStats => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STATS);
    return data ? JSON.parse(data) : INITIAL_STATS;
  } catch {
    return INITIAL_STATS;
  }
};

export const saveStoredStats = (stats: CampaignStats) => {
  try {
    localStorage.setItem(STORAGE_KEYS.STATS, JSON.stringify(stats));
  } catch (e) {
    console.error('Failed to save stats', e);
  }
};

export const getStoredUserPoints = (): number => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.POINTS);
    return data ? Number(data) : 310;
  } catch {
    return 310;
  }
};

export const saveStoredUserPoints = (points: number) => {
  try {
    localStorage.setItem(STORAGE_KEYS.POINTS, points.toString());
  } catch (e) {
    console.error('Failed to save user points', e);
  }
};

export const getStoredStations = (): CollectionPoint[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STATIONS);
    return data ? JSON.parse(data) : INITIAL_COLLECTION_POINTS;
  } catch {
    return INITIAL_COLLECTION_POINTS;
  }
};

export const saveStoredStations = (stations: CollectionPoint[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.STATIONS, JSON.stringify(stations));
  } catch (e) {
    console.error('Failed to save stations', e);
  }
};

export const getStoredReports = (): WasteReport[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REPORTS);
    return data ? JSON.parse(data) : INITIAL_REPORTS;
  } catch {
    return INITIAL_REPORTS;
  }
};

export const saveStoredReports = (reports: WasteReport[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REPORTS, JSON.stringify(reports));
  } catch (e) {
    console.error('Failed to save reports', e);
  }
};

export const getStoredAlternatives = (): ReusableAlternative[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ALTERNATIVES);
    return data ? JSON.parse(data) : INITIAL_ALTERNATIVES;
  } catch {
    return INITIAL_ALTERNATIVES;
  }
};

export const saveStoredAlternatives = (alternatives: ReusableAlternative[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ALTERNATIVES, JSON.stringify(alternatives));
  } catch (e) {
    console.error('Failed to save alternatives', e);
  }
};

export const getStoredRewards = (): RewardItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.REWARDS);
    return data ? JSON.parse(data) : INITIAL_REWARDS;
  } catch {
    return INITIAL_REWARDS;
  }
};

export const saveStoredRewards = (rewards: RewardItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards));
  } catch (e) {
    console.error('Failed to save rewards', e);
  }
};

export const getStoredBadges = (): Badge[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BADGES);
    return data ? JSON.parse(data) : INITIAL_BADGES;
  } catch {
    return INITIAL_BADGES;
  }
};

export const saveStoredBadges = (badges: Badge[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
  } catch (e) {
    console.error('Failed to save badges', e);
  }
};

export const getStoredStudentLeaderboard = (): StudentLeaderboardEntry[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.STUDENT_LEADERBOARD);
    return data ? JSON.parse(data) : STUDENT_LEADERBOARD;
  } catch {
    return STUDENT_LEADERBOARD;
  }
};

export const saveStoredStudentLeaderboard = (leaderboard: StudentLeaderboardEntry[]) => {
  try {
    localStorage.setItem(STORAGE_KEYS.STUDENT_LEADERBOARD, JSON.stringify(leaderboard));
  } catch (e) {
    console.error('Failed to save leaderboard', e);
  }
};

export const resetAllCampaignData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  } catch (e) {
    console.error('Failed to reset storage', e);
  }
};
