/**
 * useDeviceId — generates a unique device UUID on first visit and persists it
 * as a long-lived cookie (1 year). Returns the same UUID on every subsequent visit
 * from the same browser/device, enabling per-user progress isolation without login.
 *
 * Cookie name: dtw_device_id
 * Format: dtw_<8 random hex chars>  e.g. dtw_a3f9b2c1
 */

import { useState } from "react";

const COOKIE_NAME = "dtw_device_id";
const COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

function generateId(): string {
  // Use crypto.randomUUID if available (modern browsers), fall back to manual hex
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return "dtw_" + crypto.randomUUID().replace(/-/g, "").slice(0, 12);
  }
  const arr = new Uint8Array(6);
  crypto.getRandomValues(arr);
  return "dtw_" + Array.from(arr).map(b => b.toString(16).padStart(2, "0")).join("");
}

function readCookie(name: string): string | null {
  const match = document.cookie
    .split("; ")
    .find(row => row.startsWith(name + "="));
  return match ? decodeURIComponent(match.split("=")[1]) : null;
}

function writeCookie(name: string, value: string, maxAge: number): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
}

/**
 * Returns a stable device UUID. On first call it generates a new ID, writes the
 * cookie, and returns it. On subsequent calls it reads the existing cookie.
 * The ID is also mirrored in localStorage as a fallback for cookie-blocked browsers.
 */
export function getOrCreateDeviceId(): string {
  // 1. Try cookie first
  let id = readCookie(COOKIE_NAME);
  if (id) {
    // Refresh cookie TTL on each visit
    writeCookie(COOKIE_NAME, id, COOKIE_MAX_AGE);
    return id;
  }
  // 2. Fall back to localStorage (cookie-blocked browsers)
  try {
    const lsId = localStorage.getItem(COOKIE_NAME);
    if (lsId) {
      id = lsId;
      writeCookie(COOKIE_NAME, id, COOKIE_MAX_AGE);
      return id;
    }
  } catch {}
  // 3. Generate fresh ID
  id = generateId();
  writeCookie(COOKIE_NAME, id, COOKIE_MAX_AGE);
  try { localStorage.setItem(COOKIE_NAME, id); } catch {}
  return id;
}

/** React hook that returns the stable device ID for the current browser. */
export function useDeviceId(): string {
  const [id] = useState<string>(() => getOrCreateDeviceId());
  return id;
}
