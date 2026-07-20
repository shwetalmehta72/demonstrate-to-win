/**
 * UserContext — stores optional learner profile (name, avatar color) per device UUID.
 * No login required. Data lives in localStorage under dtw_profile_<deviceId>.
 * The first-visit "Who's learning?" prompt is handled by the WelcomeModal component.
 */

import React, { createContext, useContext, useState, useCallback } from "react";
import { getOrCreateDeviceId } from "@/hooks/useDeviceId";

export interface UserProfile {
  deviceId: string;
  name: string;           // Display name — empty string means not set yet
  avatarColor: string;    // Tailwind color class e.g. "teal", "amber", "purple"
  joinedAt: string;       // ISO date string
  hasSeenWelcome: boolean;
}

const AVATAR_COLORS = ["teal", "amber", "emerald", "purple", "red", "blue"];

function getProfileKey(deviceId: string) {
  return `dtw_profile_${deviceId}`;
}

function loadProfile(deviceId: string): UserProfile {
  try {
    const raw = localStorage.getItem(getProfileKey(deviceId));
    if (raw) return JSON.parse(raw) as UserProfile;
  } catch {}
  return {
    deviceId,
    name: "",
    avatarColor: AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    joinedAt: new Date().toISOString(),
    hasSeenWelcome: false,
  };
}

function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(getProfileKey(profile.deviceId), JSON.stringify(profile));
  } catch {}
}

interface UserContextType {
  profile: UserProfile;
  setName: (name: string) => void;
  markWelcomeSeen: () => void;
  resetProgress: () => void;
}

const UserContext = createContext<UserContextType | null>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const deviceId = getOrCreateDeviceId();
  const [profile, setProfileState] = useState<UserProfile>(() => loadProfile(deviceId));

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    setProfileState(prev => {
      const next = { ...prev, ...updates };
      saveProfile(next);
      return next;
    });
  }, []);

  const setName = useCallback((name: string) => {
    updateProfile({ name: name.trim(), hasSeenWelcome: true });
  }, [updateProfile]);

  const markWelcomeSeen = useCallback(() => {
    updateProfile({ hasSeenWelcome: true });
  }, [updateProfile]);

  const resetProgress = useCallback(() => {
    // Clears game state for this device — profile name is preserved
    try {
      const gameKey = `dtw_game_state_${deviceId}`;
      localStorage.removeItem(gameKey);
    } catch {}
    // Force page reload to re-initialize GameContext with fresh state
    window.location.reload();
  }, [deviceId]);

  return (
    <UserContext.Provider value={{ profile, setName, markWelcomeSeen, resetProgress }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}

export { AVATAR_COLORS };
