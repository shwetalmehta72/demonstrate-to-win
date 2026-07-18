import React, { createContext, useContext, useState, useCallback, useEffect } from "react";

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
  { id: "bridge_builder", name: "Bridge Builder", icon: "🌉", description: "Complete the Bridge Building module", earned: false },
  { id: "crime_detective", name: "Demo Detective", icon: "🔍", description: "Identify 5 demo crimes correctly", earned: false },
  { id: "tell_show_tell", name: "TST Master", icon: "🎯", description: "Complete the Tell-Show-Tell module with 100%", earned: false },
  { id: "discovery_pro", name: "Discovery Pro", icon: "🧭", description: "Complete the Discovery module", earned: false },
  { id: "value_closer", name: "Value Closer", icon: "💎", description: "Complete the Value Close module", earned: false },
  { id: "ai_se_certified", name: "AI SE Certified", icon: "🏆", description: "Complete all 7 modules", earned: false },
];

const LEVEL_THRESHOLDS = [0, 100, 250, 500, 800, 1200, 1800, 2500];

const STORAGE_KEY = "dtw_game_state";

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
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultState;
  });
  const [xpAnimating, setXpAnimating] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
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
      const badgeMap: Record<number, string> = { 2: "bridge_builder", 3: "crime_detective", 1: "tell_show_tell", 4: "discovery_pro", 7: "value_closer" };
      if (badgeMap[moduleId]) newBadges = newBadges.map(b => b.id === badgeMap[moduleId] ? { ...b, earned: true } : b);
      const allCompleted = [1,2,3,4,5,6,7].every(id => id === moduleId ? true : prev.modules[id]?.completed);
      if (allCompleted) newBadges = newBadges.map(b => b.id === "ai_se_certified" ? { ...b, earned: true } : b);
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

export { LEVEL_THRESHOLDS };

