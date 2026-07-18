import { useParams, Link } from "wouter";
import { MODULES } from "@/lib/moduleData";
import { useGame, LEVEL_THRESHOLDS } from "@/contexts/GameContext";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Zap, ChevronRight, Lock, Shield, Activity, Target, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import QuizActivity from "@/components/activities/QuizActivity";
import DragDropActivity from "@/components/activities/DragDropActivity";
import MatchingActivity from "@/components/activities/MatchingActivity";
import ScenarioActivity from "@/components/activities/ScenarioActivity";
import CrimeDetectiveActivity from "@/components/activities/CrimeDetectiveActivity";
import BuildDemoActivity from "@/components/activities/BuildDemoActivity";
import FillBlankActivity from "@/components/activities/FillBlankActivity";

const accentMap = {
  teal: { text: "text-teal-400", bg: "bg-teal-500/10", border: "border-teal-500/30", dot: "bg-teal-400", progress: "bg-teal-500" },
  amber: { text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/30", dot: "bg-amber-400", progress: "bg-amber-500" },
  emerald: { text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/30", dot: "bg-emerald-400", progress: "bg-emerald-500" },
  red: { text: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", dot: "bg-red-400", progress: "bg-red-500" },
  purple: { text: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/30", dot: "bg-purple-400", progress: "bg-purple-500" },
};

const activityTypeLabels: Record<string, string> = {
  "drag-drop": "SEQUENCE",
  "quiz": "ASSESSMENT",
  "matching": "MATCHING",
  "scenario": "SCENARIO",
  "crime-detective": "DETECTIVE",
  "build-demo": "BUILD",
  "fill-blank": "WORKSHOP",
};

export default function ModulePage() {
  const params = useParams<{ id: string }>();
  const moduleId = parseInt(params.id ?? "1");
  const module = MODULES.find(m => m.id === moduleId);
  const { isActivityCompleted, isModuleUnlocked, completeModule, state } = useGame();
  const [activeActivity, setActiveActivity] = useState<string | null>(null);

  const currentLevelXP = LEVEL_THRESHOLDS[state.level - 1] ?? 0;
  const nextLevelXP = LEVEL_THRESHOLDS[state.level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const levelProgress = nextLevelXP > currentLevelXP ? ((state.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100;

  if (!module) return <div className="min-h-screen bg-background flex items-center justify-center text-white">Module not found</div>;

  // Locked state — branded "restricted access" panel
  if (!isModuleUnlocked(moduleId)) {
    const prevModule = MODULES.find(m => m.id === moduleId - 1);
    const prevCompleted = state.modules[moduleId - 1]?.activitiesCompleted.length ?? 0;
    const prevTotal = prevModule?.activities.length ?? 0;
    const prevPct = prevTotal > 0 ? Math.round((prevCompleted / prevTotal) * 100) : 0;
    return (
      <div className="min-h-screen bg-background flex flex-col" style={{ fontFamily: "var(--font-body)" }}>
        {/* Top bar */}
        <div className="border-b border-white/5 bg-white/2 sticky top-0 z-10 backdrop-blur-sm">
          <div className="px-6 py-4 flex items-center justify-between">
            <Link href="/"><button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"><ArrowLeft className="w-4 h-4" /><span>Back to Dashboard</span></button></Link>
            <div className="flex items-center gap-2 text-xs font-mono-custom text-white/30"><Shield className="w-3.5 h-3.5" />RESTRICTED ACCESS</div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="max-w-lg w-full">
            <div className="card-panel p-8 border-amber-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded border border-amber-500/30 bg-amber-500/10 flex items-center justify-center">
                  <Lock className="w-5 h-5 text-amber-400" />
                </div>
                <div>
                  <div className="text-xs font-mono-custom text-amber-400 uppercase tracking-widest">Access Restricted</div>
                  <div className="text-white font-display font-semibold">Module {moduleId} — {module.title}</div>
                </div>
              </div>
              <div className="border-t border-white/5 pt-5 mb-5">
                <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-3">Prerequisite Status</div>
                <div className="card-panel p-4 border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{prevModule?.icon}</span>
                      <div>
                        <div className="text-xs font-mono-custom text-white/40">MODULE {moduleId - 1}</div>
                        <div className="text-sm text-white font-medium">{prevModule?.title}</div>
                      </div>
                    </div>
                    <div className="text-xs font-mono-custom text-amber-400">{prevPct}% complete</div>
                  </div>
                  <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${prevPct}%` }} />
                  </div>
                  <div className="text-xs text-white/30 mt-2 font-mono-custom">{prevCompleted}/{prevTotal} activities complete</div>
                </div>
              </div>
              <div className="text-sm text-white/50 mb-6">Complete all activities in Module {moduleId - 1} to unlock this module and continue your mission.</div>
              <div className="flex gap-3">
                <Link href={`/module/${moduleId - 1}`}>
                  <Button className="bg-teal-500 hover:bg-teal-400 text-black font-semibold">
                    <ChevronRight className="w-4 h-4 mr-1" /> Go to Module {moduleId - 1}
                  </Button>
                </Link>
                <Link href="/"><Button variant="outline" className="border-white/20 text-white/60 hover:text-white">Dashboard</Button></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const colors = accentMap[module.accentColor];
  const completedActivities = module.activities.filter(a => isActivityCompleted(moduleId, a.id)).length;
  const allDone = completedActivities === module.activities.length;
  const progressPct = module.activities.length > 0 ? (completedActivities / module.activities.length) * 100 : 0;

  if (allDone && !state.modules[moduleId]?.completed) {
    const score = Math.round((completedActivities / module.activities.length) * 100);
    completeModule(moduleId, score);
  }

  const currentActivity = activeActivity ? module.activities.find(a => a.id === activeActivity) : null;

  return (
    <div className="min-h-screen bg-background flex" style={{ fontFamily: "var(--font-body)" }}>
      {/* Left Sidebar — Mission Console */}
      <aside className="w-64 flex-shrink-0 border-r border-white/5 bg-white/1 flex flex-col sticky top-0 h-screen overflow-y-auto">
        {/* Logo */}
        <div className="p-5 border-b border-white/5">
          <Link href="/">
            <div className="flex items-center gap-2.5 cursor-pointer group">
              <img src="/manus-storage/logo-icon_d2dd919d.png" alt="Logo" className="w-7 h-7 object-contain" />
              <div>
                <div className="text-xs font-mono-custom text-teal-400/70 tracking-widest uppercase leading-none">DTW</div>
                <div className="text-xs text-white/50 group-hover:text-white/70 transition-colors">Dashboard</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Operator Status */}
        <div className="p-4 border-b border-white/5">
          <div className="text-xs font-mono-custom text-white/30 uppercase tracking-wider mb-3">Operator Status</div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              <span className="text-xs font-mono-custom text-white/70">{state.xp} XP</span>
            </div>
            <span className="text-xs font-mono-custom text-white/40">LVL {state.level}</span>
          </div>
          <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden mb-1">
            <div className="h-full bg-teal-500 rounded-full transition-all" style={{ width: `${levelProgress}%` }} />
          </div>
          <div className="text-xs font-mono-custom text-white/25">{state.xp}/{nextLevelXP} to next level</div>
        </div>

        {/* Module Navigation */}
        <div className="p-4 flex-1">
          <div className="text-xs font-mono-custom text-white/30 uppercase tracking-wider mb-3">Mission Modules</div>
          <div className="space-y-1">
            {MODULES.map(m => {
              const isActive = m.id === moduleId;
              const isDone = state.modules[m.id]?.completed;
              const isLocked = !isModuleUnlocked(m.id);
              return (
                <Link key={m.id} href={`/module/${m.id}`}>
                  <div className={`flex items-center gap-2.5 px-3 py-2 rounded text-xs transition-all cursor-pointer ${isActive ? "bg-teal-500/10 border border-teal-500/30 text-teal-400" : isLocked ? "opacity-30 cursor-not-allowed" : "text-white/50 hover:text-white/80 hover:bg-white/3"}`}>
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDone ? "bg-emerald-400" : isActive ? "bg-teal-400 animate-pulse" : "bg-white/20"}`} />
                    <span className="font-mono-custom">{String(m.id).padStart(2, "0")}</span>
                    <span className="truncate font-medium">{m.title}</span>
                    {isLocked && <Lock className="w-3 h-3 ml-auto flex-shrink-0" />}
                    {isDone && <CheckCircle2 className="w-3 h-3 ml-auto flex-shrink-0 text-emerald-400" />}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Module Progress */}
        <div className="p-4 border-t border-white/5">
          <div className="text-xs font-mono-custom text-white/30 uppercase tracking-wider mb-2">Module Progress</div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs text-white/50 font-mono-custom">{completedActivities}/{module.activities.length} activities</span>
            <span className={`text-xs font-mono-custom ${colors.text}`}>{Math.round(progressPct)}%</span>
          </div>
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${colors.progress}`} style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {/* Top bar */}
        <div className="border-b border-white/5 bg-white/1 sticky top-0 z-10 backdrop-blur-sm">
          <div className="px-8 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {currentActivity ? (
                <button onClick={() => setActiveActivity(null)} className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
                  <ArrowLeft className="w-4 h-4" /><span>Back to Activities</span>
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <div className={`text-xs font-mono-custom uppercase tracking-widest ${colors.text}`}>MOD-{String(moduleId).padStart(2, "0")}</div>
                  <div className="w-px h-4 bg-white/10" />
                  <div className="text-sm text-white/60 font-mono-custom">{module.title}</div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 text-xs font-mono-custom text-white/30">
              <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{module.estimatedMinutes} min</div>
              <div className="flex items-center gap-1.5"><Activity className="w-3.5 h-3.5" />{completedActivities}/{module.activities.length}</div>
              <div className="flex items-center gap-1.5"><Zap className="w-3.5 h-3.5 text-teal-400" /><span className="text-teal-400">+{module.xpReward} XP</span></div>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 max-w-3xl">
          <AnimatePresence mode="wait">
            {currentActivity ? (
              <motion.div key={currentActivity.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.3 }}>
                {/* Activity Header */}
                <div className="mb-6">
                  <div className={`text-xs font-mono-custom uppercase tracking-widest mb-1 ${colors.text}`}>
                    {activityTypeLabels[currentActivity.type] || currentActivity.type} · +{currentActivity.xp} XP
                  </div>
                  <h2 className="text-2xl font-display font-bold text-white mb-2">{currentActivity.title}</h2>
                  <p className="text-white/55 leading-relaxed">{currentActivity.description}</p>
                </div>
                <ActivityRenderer activity={currentActivity} moduleId={moduleId} onComplete={() => setActiveActivity(null)} />
              </motion.div>
            ) : (
              <motion.div key="overview" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* Module Header */}
                <div className="mb-8">
                  <div className={`text-xs font-mono-custom uppercase tracking-widest mb-2 ${colors.text}`}>{module.tagline}</div>
                  <h1 className="text-4xl font-display font-bold text-white mb-2 leading-tight">{module.title}</h1>
                  <p className="text-white/55 text-lg mb-6">{module.subtitle}</p>

                  {/* Stats row */}
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 text-xs font-mono-custom text-white/40">
                      <Clock className="w-3.5 h-3.5" />{module.estimatedMinutes} min
                    </div>
                    <div className="flex items-center gap-2 text-xs font-mono-custom text-white/40">
                      <Target className="w-3.5 h-3.5" />{module.activities.length} activities
                    </div>
                    <div className={`flex items-center gap-2 text-xs font-mono-custom ${colors.text}`}>
                      <Zap className="w-3.5 h-3.5" />+{module.xpReward} XP reward
                    </div>
                  </div>

                  {/* Core Concept */}
                  <div className={`card-panel p-6 mb-4 ${colors.border}`}>
                    <div className={`text-xs font-mono-custom uppercase tracking-widest mb-3 ${colors.text}`}>// CORE CONCEPT</div>
                    <p className="text-white/80 leading-relaxed">{module.keyConceptSummary}</p>
                  </div>

                  {/* AI Context */}
                  <div className="card-panel p-6 border-amber-500/20">
                    <div className="text-xs font-mono-custom uppercase tracking-widest mb-3 text-amber-400">// AI SALES CONTEXT</div>
                    <p className="text-white/65 leading-relaxed">{module.aiContext}</p>
                  </div>
                </div>

                {/* Activities */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-1">
                    <h2 className="text-sm font-mono-custom uppercase tracking-widest text-white/50">Mission Activities</h2>
                    <span className={`text-xs font-mono-custom ${colors.text}`}>{completedActivities}/{module.activities.length} complete</span>
                  </div>
                  <div className="w-full h-px bg-white/5 mb-5" />
                </div>

                <div className="space-y-2">
                  {module.activities.map((activity, i) => {
                    const done = isActivityCompleted(moduleId, activity.id);
                    const typeLabel = activityTypeLabels[activity.type] || activity.type;
                    return (
                      <motion.div key={activity.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                        <button
                          onClick={() => setActiveActivity(activity.id)}
                          className={`w-full card-panel p-5 text-left transition-all duration-150 flex items-center gap-4 group ${done ? "border-emerald-500/25" : colors.border} hover:bg-white/3`}
                        >
                          <div className={`w-9 h-9 rounded border flex-shrink-0 flex items-center justify-center ${done ? "border-emerald-500/40 bg-emerald-500/10" : `${colors.border} ${colors.bg}`}`}>
                            {done ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <span className="font-mono-custom text-xs font-bold text-white/50">{String(i + 1).padStart(2, "0")}</span>}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-0.5">
                              <span className={`text-xs font-mono-custom uppercase tracking-wider ${done ? "text-emerald-400" : colors.text}`}>{typeLabel}</span>
                              <span className="text-xs font-mono-custom text-white/25">·</span>
                              <span className={`text-xs font-mono-custom ${done ? "text-emerald-400/60" : "text-white/30"}`}>+{activity.xp} XP</span>
                            </div>
                            <div className="text-white font-display font-semibold text-sm">{activity.title}</div>
                            <div className="text-white/40 text-xs mt-0.5 truncate">{activity.description}</div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/50 flex-shrink-0 transition-colors" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Module Complete */}
                {allDone && (
                  <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} className="card-panel p-8 text-center border-emerald-500/30 mt-6">
                    <div className="text-xs font-mono-custom text-emerald-400 uppercase tracking-widest mb-3">// MISSION COMPLETE</div>
                    <h3 className="text-2xl font-display font-bold text-white mb-2">{module.title} — Cleared</h3>
                    <p className="text-white/55 mb-6">All {module.activities.length} activities complete. Module {moduleId} is now on record.</p>
                    <div className="flex items-center justify-center gap-3">
                      <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 rounded px-4 py-2">
                        <Zap className="w-4 h-4 text-emerald-400" />
                        <span className="font-mono-custom text-emerald-400 text-sm font-semibold">+{module.xpReward} XP</span>
                      </div>
                      {moduleId < MODULES.length && (
                        <Link href={`/module/${moduleId + 1}`}>
                          <Button className="bg-teal-500 hover:bg-teal-400 text-black font-semibold">
                            Next Module <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                      {moduleId === MODULES.length && (
                        <Link href="/">
                          <Button className="bg-amber-500 hover:bg-amber-400 text-black font-semibold">
                            View Certification <ChevronRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ActivityRenderer({ activity, moduleId, onComplete }: { activity: import("@/lib/moduleData").Activity; moduleId: number; onComplete: () => void }) {
  switch (activity.type) {
    case "quiz": return <QuizActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "drag-drop": return <DragDropActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "matching": return <MatchingActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "scenario": return <ScenarioActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "crime-detective": return <CrimeDetectiveActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "build-demo": return <BuildDemoActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    case "fill-blank": return <FillBlankActivity activity={activity} moduleId={moduleId} onComplete={onComplete} />;
    default: return <div className="text-white/50">Activity type not supported</div>;
  }
}
