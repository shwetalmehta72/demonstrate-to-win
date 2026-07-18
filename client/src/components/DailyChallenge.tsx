import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ChevronRight, Star, RefreshCw, X, CheckCircle2, Calendar } from "lucide-react";
import { Link } from "wouter";
import { ALL_MODULES } from "@/lib/moduleData";
import { useGame } from "@/contexts/GameContext";
import QuizActivity from "@/components/activities/QuizActivity";
import DragDropActivity from "@/components/activities/DragDropActivity";
import MatchingActivity from "@/components/activities/MatchingActivity";
import ScenarioActivity from "@/components/activities/ScenarioActivity";
import CrimeDetectiveActivity from "@/components/activities/CrimeDetectiveActivity";
import BuildDemoActivity from "@/components/activities/BuildDemoActivity";
import FillBlankActivity from "@/components/activities/FillBlankActivity";

// Style: Mission Control — daily challenge as "mission of the day" broadcast card
// Seed is deterministic per calendar date so all users see the same challenge each day

function getDailySeed(): number {
  const now = new Date();
  // Seed = YYYYMMDD as integer — changes every day at midnight local time
  return now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
}

function seededRandom(seed: number): () => number {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function getDailyChallenge() {
  // Only pick from core modules (1-7) so the challenge is always accessible to new learners
  // Bonus modules (8-11) require completing all 7 core modules first
  const seed = getDailySeed();
  const rand = seededRandom(seed);

  // Build a flat list of core module (module, activity) pairs only
  const pairs: Array<{ module: (typeof ALL_MODULES)[0]; activity: (typeof ALL_MODULES)[0]["activities"][0] }> = [];
  for (const mod of ALL_MODULES.filter(m => m.id <= 7)) {
    for (const act of mod.activities) {
      pairs.push({ module: mod, activity: act });
    }
  }

  const idx = Math.floor(rand() * pairs.length);
  return pairs[idx];
}

const activityTypeLabels: Record<string, string> = {
  "drag-drop": "SEQUENCE",
  "quiz": "ASSESSMENT",
  "matching": "MATCHING",
  "scenario": "SCENARIO",
  "crime-detective": "DETECTIVE",
  "build-demo": "BUILD",
  "fill-blank": "WORKSHOP",
};

const accentMap: Record<string, { text: string; border: string; bg: string; glow: string; dot: string }> = {
  teal:    { text: "text-teal-400",    border: "border-teal-500/40",    bg: "bg-teal-500/8",    glow: "shadow-[0_0_30px_oklch(0.72_0.18_195/0.12)]",    dot: "bg-teal-400" },
  amber:   { text: "text-amber-400",   border: "border-amber-500/40",   bg: "bg-amber-500/8",   glow: "shadow-[0_0_30px_oklch(0.72_0.19_55/0.12)]",     dot: "bg-amber-400" },
  emerald: { text: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/8", glow: "shadow-[0_0_30px_oklch(0.72_0.17_145/0.12)]",    dot: "bg-emerald-400" },
  red:     { text: "text-red-400",     border: "border-red-500/40",     bg: "bg-red-500/8",     glow: "shadow-[0_0_30px_oklch(0.65_0.22_25/0.12)]",     dot: "bg-red-400" },
  purple:  { text: "text-purple-400",  border: "border-purple-500/40",  bg: "bg-purple-500/8",  glow: "shadow-[0_0_30px_oklch(0.6_0.15_280/0.12)]",     dot: "bg-purple-400" },
};

export default function DailyChallenge() {
  const { isActivityCompleted, isModuleUnlocked } = useGame();
  const [expanded, setExpanded] = useState(false);
  const [completed, setCompleted] = useState(false);

  const { module, activity } = useMemo(() => getDailyChallenge(), []);
  const colors = accentMap[module.accentColor] ?? accentMap.teal;
  const alreadyDone = isActivityCompleted(module.id, activity.id);
  const moduleUnlocked = isModuleUnlocked(module.id);
  const typeLabel = activityTypeLabels[activity.type] || activity.type;

  // Format today's date for display
  // Format today's date for display
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });

  function handleComplete() {
    setCompleted(true);
    setExpanded(false);
  }

  return (
    <div className="mb-8 md:mb-10">
      <AnimatePresence mode="wait">
        {!expanded ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
            className={`card-panel ${colors.border} ${colors.bg} ${colors.glow} relative overflow-hidden`}
          >
            {/* Animated scan line */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-current to-transparent opacity-30 animate-pulse" style={{ color: "var(--color-teal-400)" }} />

            <div className="p-5 md:p-6">
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded border ${colors.border} ${colors.bg} flex items-center justify-center flex-shrink-0`}>
                    <Calendar className={`w-4 h-4 ${colors.text}`} />
                  </div>
                  <div>
                    <div className={`text-xs font-mono-custom uppercase tracking-widest ${colors.text} flex items-center gap-2`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
                      Daily Challenge
                    </div>
                    <div className="text-xs text-white/30 font-mono-custom">{dateStr}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
              {(alreadyDone || completed) && (
                    <div role="status" aria-live="polite" className="flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-2.5 py-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-xs font-mono-custom text-emerald-400">Done</span>
                    </div>
                  )}
                  <div className={`flex items-center gap-1.5 ${colors.bg} border ${colors.border} rounded-full px-2.5 py-1`}>
                    <Star className={`w-3.5 h-3.5 ${colors.text}`} />
                    <span className={`text-xs font-mono-custom ${colors.text} font-semibold`}>+{activity.xp} XP</span>
                  </div>
                </div>
              </div>

              {/* Activity info */}
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0">{module.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs font-mono-custom uppercase tracking-wider ${colors.text}`}>{typeLabel}</span>
                    <span className="text-white/20 text-xs">·</span>
                    <span className="text-xs font-mono-custom text-white/35">Module {module.id}: {module.title}</span>
                  </div>
                  <h3 className="text-base md:text-lg font-display font-bold text-white mb-1">{activity.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed line-clamp-2">{activity.description}</p>
                </div>
              </div>

              {/* Action row */}
              <div className="flex items-center gap-3 mt-5">
                {moduleUnlocked ? (
                  <button
                    onClick={() => setExpanded(true)}
                    className={`flex items-center gap-2 bg-teal-500 hover:bg-teal-400 active:scale-[0.97] text-black font-semibold text-sm px-4 py-2 rounded transition-all duration-150`}
                  >
                    <Zap className="w-4 h-4" />
                    {alreadyDone || completed ? "Replay Challenge" : "Start Challenge"}
                  </button>
                ) : (
                  <Link href={`/module/${module.id}`}>
                    <button className="flex items-center gap-2 border border-white/20 text-white/50 hover:text-white text-sm px-4 py-2 rounded transition-colors">
                      <RefreshCw className="w-3.5 h-3.5" />
                      Unlock Module {module.id} first
                    </button>
                  </Link>
                )}
                <Link href={`/module/${module.id}`}>
                  <button className={`flex items-center gap-1.5 text-xs font-mono-custom ${colors.text} opacity-60 hover:opacity-100 transition-opacity`}>
                    View full module <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className={`card-panel ${colors.border} ${colors.bg}`}
          >
            {/* Expanded header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className={`w-1.5 h-1.5 rounded-full ${colors.dot} animate-pulse`} />
                <div>
                  <div className={`text-xs font-mono-custom uppercase tracking-widest ${colors.text}`}>Daily Challenge · {typeLabel}</div>
                  <div className="text-sm font-display font-bold text-white">{activity.title}</div>
                </div>
              </div>
              <button
                onClick={() => setExpanded(false)}
                className="w-7 h-7 flex items-center justify-center text-white/30 hover:text-white transition-colors rounded hover:bg-white/5"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Activity description */}
            <div className="px-5 pt-4 pb-2">
              <p className="text-sm text-white/55 leading-relaxed mb-4">{activity.description}</p>
            </div>

            {/* Activity renderer */}
            <div className="px-5 pb-6">
              <ActivityRenderer activity={activity} moduleId={module.id} onComplete={handleComplete} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActivityRenderer({ activity, moduleId, onComplete }: {
  activity: import("@/lib/moduleData").Activity;
  moduleId: number;
  onComplete: () => void;
}) {
  switch (activity.type) {
    case "quiz":            return <QuizActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "drag-drop":       return <DragDropActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "matching":        return <MatchingActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "scenario":        return <ScenarioActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "crime-detective": return <CrimeDetectiveActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "build-demo":      return <BuildDemoActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "fill-blank":      return <FillBlankActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    default:                return <div className="text-white/50 text-sm">Activity type not supported.</div>;
  }
}
