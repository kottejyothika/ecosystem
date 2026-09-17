export type WasteCategory =
  | 'PET Bottles'
  | 'Single-Use Cups'
  | 'Polybags & Wrappers'
  | 'Food Containers'
  | 'Straws & Cutlery'
  | 'Hard Plastics';

export interface CollectionPoint {
  id: string;
  name: string;
  locationCode: string;
  building: string;
  status: 'Active' | 'Near Capacity' | 'Recently Emptied' | 'Under Maintenance';
  capacityPercent: number;
  totalCollectedKg: number;
  lastEmptied: string;
  spotDescription: string;
  acceptedTypes: WasteCategory[];
}

export interface WasteReport {
  id: string;
  studentName: string;
  rollNo: string;
  department: string;
  stationId: string;
  stationName: string;
  wasteType: WasteCategory;
  quantityKg: number;
  itemsCount: number;
  status: 'Verified' | 'Pending Review' | 'Sent for Recycling';
  ecoPointsAwarded: number;
  notes?: string;
  timestamp: string;
}

export interface ReusableAlternative {
  id: string;
  name: string;
  category: 'Beverages' | 'Dining & Canteen' | 'Daily Carry' | 'Stationery';
  singleUseItem: string;
  reusableItem: string;
  material: string;
  estimatedYearlySaving: string;
  plasticItemsDivertedPerYear: number;
  co2SavedKg: number;
  adoptedCount: number;
  isAdopted: boolean;
  description: string;
  tip: string;
}

export interface RewardItem {
  id: string;
  title: string;
  category: 'Campus Perk' | 'Merchandise' | 'Eco Initiative' | 'Certification';
  pointsCost: number;
  description: string;
  voucherCode?: string;
  stockRemaining: number;
  isClaimed: boolean;
  badge: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  pointsThreshold: number;
  isUnlocked: boolean;
  progressPercent: number;
  category: string;
}

export interface StudentLeaderboardEntry {
  rank: number;
  name: string;
  rollNo: string;
  department: string;
  points: number;
  kgContributed: number;
  badge: string;
}

export interface DepartmentLeaderboardEntry {
  rank: number;
  department: string;
  studentCount: number;
  totalKg: number;
  totalPoints: number;
  achievement: string;
}

export interface AwarenessTip {
  id: string;
  title: string;
  category: 'Campus Habit' | 'Recycling Fact' | 'Action Guide' | 'Global Impact';
  message: string;
  impactFact: string;
  actionableStep: string;
}

export interface TechStackItem {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps & Tools' | 'Intelligence';
  role: string;
  description: string;
  keyFeatures: string[];
  color: string;
  tag: string;
}

export interface CampaignStats {
  plasticCollectedKg: number;
  plasticRecycledKg: number;
  singleUseReducedCount: number;
  studentParticipation: number;
  campusGoalKg: number;
  co2PreventedKg: number;
  landfillVolumeSavedM3: number;
}
