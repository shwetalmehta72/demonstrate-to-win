import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getOrCreateDeviceId } from "@/hooks/useDeviceId";

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  earned: boolean;
}

export interface ModuleProgress {
  id: number;
  completed: boolean;
  score: number;
  xpEarned: number;
  activitiesCompleted: string[];
}

interface GameState {
  xp: number;
  level: number;
  modules: Record<number, ModuleProgress>;
  badges: Badge[];
  totalActivitiesCompleted: number;
}

interface GameContextType {
  state: GameState;
  addXP: (amount: number, moduleId?: number) => void;
  completeActivity: (moduleId: number, activityId: string, xp: number) => void;
  completeModule: (moduleId: number, score: number) => void;
  isActivityCompleted: (moduleId: number, activityId: string) => boolean;
  isModuleCompleted: (moduleId: number) => boolean;
  isModuleUnlocked: (moduleId: number) => boolean;
  getModuleProgress: (moduleId: number) => ModuleProgress | null;
  xpAnimating: boolean;
}

const INITIAL_BADGES: Badge[] = [
  { id: "first_step", name: "First Step", icon: "🚀", description: "Complete your first activity", earned: false },
  { id: "tell_show_tell", name: "TST Master", icon: "🎯", description: "Complete the Tell-Show-Tell module", earned: false },
  { id: "bridge_builder", name: "Bridge Builder", icon: "🌉", description: "Complete the Bridge Building module", earned: false },
  { id: "crime_detective", name: "Demo Detective", icon: "🔍", description: "Complete the Demo Crime Files module", earned: false },
  { id: "discovery_pro", name: "Discovery Pro", icon: "🧭", description: "Complete the Discovery module", earned: false },
  { id: "value_closer", name: "Value Closer", icon: "💎", description: "Complete the Value Close module", earned: false },
  { id: "ai_se_certified", name: "AI SE Certified", icon: "🏆", description: "Complete all 7 core modules", earned: false },
  { id: "six_habits", name: "Six Habits SE", icon: "⚡", description: "Complete The Six Habits module", earned: false },
  { id: "challenger", name: "Challenger SE", icon: "⚔️", description: "Complete The Challenger SE module", earned: false },
  { id: "meddpicc_pro", name: "MEDDPICC Pro", icon: "🎖️", description: "Complete MEDDPICC Mastery module", earned: false },
  { id: "spin_master", name: "SPIN Master", icon: "🔄", description: "Complete SPIN Selling for SEs module", earned: false },
  { id: "methodology_master", name: "Methodology Master", icon: "🌟", description: "Complete all 11 modules", earned: false },
];

export const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1800, 2200, 2530]; // Calibrated to max 2530 XP from 32 activities

// Storage key is namespaced per device UUID — each visitor has isolated progress
function getStorageKey(): string {
  return `dtw_game_state_${getOrCreateDeviceId()}`;
}

function computeLevel(xp: number): number {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    if (xp >= LEVEL_THRESHOLDS[i]) return i + 1;
  }
  return 1;
}

const defaultState: GameState = {
  xp: 0,
  level: 1,
  modules: {},
  badges: INITIAL_BADGES,
  totalActivitiesCompleted: 0,
};

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge any new badges that don't exist in saved state
        const savedBadgeIds = new Set((parsed.badges || []).map((b: Badge) => b.id));
        const newBadges = INITIAL_BADGES.filter(b => !savedBadgeIds.has(b.id));
        if (newBadges.length > 0) {
          parsed.badges = [...(parsed.badges || []), ...newBadges];
        }
        return parsed;
      }
    } catch {}
    return defaultState;
  });
  const [xpAnimating, setXpAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(state));
  }, [state]);

  const addXP = useCallback((amount: number) => {
    setXpAnimating(true);
    setTimeout(() => setXpAnimating(false), 500);
    setState(prev => {
      const newXP = prev.xp + amount;
      return { ...prev, xp: newXP, level: computeLevel(newXP) };
    });
  }, []);

  const completeActivity = useCallback((moduleId: number, activityId: string, xp: number) => {
    setState(prev => {
      const mod = prev.modules[moduleId] || { id: moduleId, completed: false, score: 0, xpEarned: 0, activitiesCompleted: [] };
      if (mod.activitiesCompleted.includes(activityId)) return prev;
      const newMod = { ...mod, activitiesCompleted: [...mod.activitiesCompleted, activityId], xpEarned: mod.xpEarned + xp };
      const newXP = prev.xp + xp;
      const newTotal = prev.totalActivitiesCompleted + 1;
      let newBadges = [...prev.badges];
      if (newTotal === 1) newBadges = newBadges.map(b => b.id === "first_step" ? { ...b, earned: true } : b);
      return { ...prev, xp: newXP, level: computeLevel(newXP), modules: { ...prev.modules, [moduleId]: newMod }, badges: newBadges, totalActivitiesCompleted: newTotal };
    });
    setXpAnimating(true);
    setTimeout(() => setXpAnimating(false), 500);
  }, []);

  const completeModule = useCallback((moduleId: number, score: number) => {
    setState(prev => {
      const mod = prev.modules[moduleId] || { id: moduleId, completed: false, score: 0, xpEarned: 0, activitiesCompleted: [] };
      const newMod = { ...mod, completed: true, score };
      let newBadges = [...prev.badges];
      // Badge map for all 11 modules
      const badgeMap: Record<number, string> = {
        1: "tell_show_tell",
        2: "bridge_builder",
        3: "crime_detective",
        4: "discovery_pro",
        7: "value_closer",
        8: "six_habits",
        9: "challenger",
        10: "meddpicc_pro",
        11: "spin_master",
      };
      if (badgeMap[moduleId]) newBadges = newBadges.map(b => b.id === badgeMap[moduleId] ? { ...b, earned: true } : b);
      // Core 7 modules certification
      const core7 = [1,2,3,4,5,6,7];
      const core7Done = core7.every(id => id === moduleId ? true : prev.modules[id]?.completed);
      if (core7Done) newBadges = newBadges.map(b => b.id === "ai_se_certified" ? { ...b, earned: true } : b);
      // All 11 modules certification
      const all11 = [1,2,3,4,5,6,7,8,9,10,11];
      const all11Done = all11.every(id => id === moduleId ? true : prev.modules[id]?.completed);
      if (all11Done) newBadges = newBadges.map(b => b.id === "methodology_master" ? { ...b, earned: true } : b);
      return { ...prev, modules: { ...prev.modules, [moduleId]: newMod }, badges: newBadges };
    });
  }, []);

  const isActivityCompleted = useCallback((moduleId: number, activityId: string) => {
    return state.modules[moduleId]?.activitiesCompleted.includes(activityId) ?? false;
  }, [state.modules]);

  const isModuleCompleted = useCallback((moduleId: number) => {
    return state.modules[moduleId]?.completed ?? false;
  }, [state.modules]);

  const isModuleUnlocked = useCallback((moduleId: number) => {
    if (moduleId === 1) return true;
    // Bonus modules (8-11) require module 7 to be completed
    if (moduleId >= 8) return state.modules[7]?.completed ?? false;
    return state.modules[moduleId - 1]?.completed ?? false;
  }, [state.modules]);

  const getModuleProgress = useCallback((moduleId: number) => {
    return state.modules[moduleId] ?? null;
  }, [state.modules]);

  return (
    <GameContext.Provider value={{ state, addXP, completeActivity, completeModule, isActivityCompleted, isModuleCompleted, isModuleUnlocked, getModuleProgress, xpAnimating }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error("useGame must be used within GameProvider");
  return ctx;
}
