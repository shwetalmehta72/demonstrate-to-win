import { useGame, LEVEL_THRESHOLDS } from "@/contexts/GameContext";
import { MODULES } from "@/lib/moduleData";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Trophy, Zap, Star, Lock, CheckCircle2, ChevronRight, BookOpen, Target, Shield } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const accentColors = {
  teal: { border: "border-teal-500/30", glow: "hover:border-teal-500/60 hover:shadow-[0_0_20px_oklch(0.72_0.18_195/0.2)]", badge: "bg-teal-500/10 text-teal-400 border-teal-500/30", icon: "text-teal-400", progress: "bg-teal-500" },
  amber: { border: "border-amber-500/30", glow: "hover:border-amber-500/60 hover:shadow-[0_0_20px_oklch(0.72_0.19_55/0.2)]", badge: "bg-amber-500/10 text-amber-400 border-amber-500/30", icon: "text-amber-400", progress: "bg-amber-500" },
  emerald: { border: "border-emerald-500/30", glow: "hover:border-emerald-500/60 hover:shadow-[0_0_20px_oklch(0.72_0.17_145/0.2)]", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", icon: "text-emerald-400", progress: "bg-emerald-500" },
  red: { border: "border-red-500/30", glow: "hover:border-red-500/60 hover:shadow-[0_0_20px_oklch(0.65_0.22_25/0.2)]", badge: "bg-red-500/10 text-red-400 border-red-500/30", icon: "text-red-400", progress: "bg-red-500" },
  purple: { border: "border-purple-500/30", glow: "hover:border-purple-500/60 hover:shadow-[0_0_20px_oklch(0.6_0.15_280/0.2)]", badge: "bg-purple-500/10 text-purple-400 border-purple-500/30", icon: "text-purple-400", progress: "bg-purple-500" },
};

export default function Home() {
  const { state, isModuleCompleted, isModuleUnlocked } = useGame();
  const currentLevelXP = LEVEL_THRESHOLDS[state.level - 1] ?? 0;
  const nextLevelXP = LEVEL_THRESHOLDS[state.level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const levelProgress = nextLevelXP > currentLevelXP ? ((state.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100;
  const completedModules = MODULES.filter(m => isModuleCompleted(m.id)).length;
  const earnedBadges = state.badges.filter(b => b.earned).length;

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "var(--font-body)" }}>
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/manus-storage/hero-bg_3aa8359d.jpg')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
        <div className="scanlines absolute inset-0 pointer-events-none opacity-30" />
        <div className="relative container mx-auto px-6 pt-16 pb-24">
          {/* Nav */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center gap-3">
              <img src="/manus-storage/logo-icon_d2dd919d.png" alt="Logo" className="w-9 h-9 object-contain" />
              <div>
                <div className="text-xs font-mono-custom text-teal-400 tracking-widest uppercase">Mission Briefing</div>
                <div className="text-sm font-display font-semibold text-white leading-tight">Demonstrate to Win</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <Zap className="w-4 h-4 text-teal-400" />
                <span className="font-mono-custom text-sm text-white font-medium">{state.xp} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="font-mono-custom text-sm text-white font-medium">Lvl {state.level}</span>
              </div>
            </div>
          </nav>

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-4 py-1.5 mb-6">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-mono-custom text-teal-400 tracking-wider uppercase">AI Sales Engineer Training Program</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
              Your Demo is Either<br />
              <span className="text-teal-400">a Bridge or a Wall.</span>
            </h1>
            <p className="text-lg text-white/70 max-w-2xl mb-8 leading-relaxed">
              Master the complete methodology from Robert Reifstahl's <em>Demonstrate to Win</em> — adapted for the world of complex AI solutions. 7 modules. Dozens of interactive challenges. One certification.
            </p>
            <div className="flex items-center gap-6 text-sm text-white/50">
              <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" /><span>7 Modules</span></div>
              <div className="flex items-center gap-2"><Target className="w-4 h-4" /><span>30+ Activities</span></div>
              <div className="flex items-center gap-2"><Trophy className="w-4 h-4" /><span>8 Badges</span></div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" /><span>Certification</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-y border-white/5 bg-white/2">
        <div className="container mx-auto px-6 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">Total XP</div>
              <div className="text-2xl font-display font-bold text-teal-400">{state.xp}</div>
            </div>
            <div>
              <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">Level</div>
              <div className="flex items-center gap-3">
                <div className="text-2xl font-display font-bold text-white">{state.level}</div>
                <div className="flex-1">
                  <Progress value={levelProgress} className="h-1.5 bg-white/10" />
                  <div className="text-xs text-white/30 mt-0.5 font-mono-custom">{state.xp}/{nextLevelXP}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">Modules Complete</div>
              <div className="text-2xl font-display font-bold text-white">{completedModules}<span className="text-white/30 text-lg">/{MODULES.length}</span></div>
            </div>
            <div>
              <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">Badges Earned</div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-display font-bold text-amber-400">{earnedBadges}</div>
                <div className="flex gap-1">
                  {state.badges.slice(0, 4).map(b => (
                    <span key={b.id} className={`text-lg ${b.earned ? "opacity-100" : "opacity-20 grayscale"}`}>{b.icon}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="container mx-auto px-6 py-16">
        <div className="mb-10">
          <h2 className="text-2xl font-display font-bold text-white mb-2">Mission Modules</h2>
          <p className="text-white/50">Complete modules in order to unlock the next. Each module builds on the last.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {MODULES.map((module, i) => {
            const unlocked = isModuleUnlocked(module.id);
            const completed = isModuleCompleted(module.id);
            const colors = accentColors[module.accentColor];
            const progress = state.modules[module.id];
            const activitiesTotal = module.activities.length;
            const activitiesDone = progress?.activitiesCompleted.length ?? 0;
            const pct = activitiesTotal > 0 ? (activitiesDone / activitiesTotal) * 100 : 0;

            return (
              <motion.div
                key={module.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
              >
                {unlocked ? (
                  <Link href={`/module/${module.id}`}>
                    <div className={`card-panel p-6 cursor-pointer transition-all duration-150 ${colors.border} ${colors.glow} ${completed ? "border-opacity-60" : ""}`}>
                      <ModuleCard module={module} completed={completed} pct={pct} activitiesDone={activitiesDone} activitiesTotal={activitiesTotal} colors={colors} />
                    </div>
                  </Link>
                ) : (
                  <div className={`card-panel p-6 opacity-50 cursor-not-allowed ${colors.border}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-3xl">{module.icon}</div>
                      <Lock className="w-5 h-5 text-white/30" />
                    </div>
                    <div className="text-xs font-mono-custom text-white/30 uppercase tracking-wider mb-1">Module {module.id}</div>
                    <h3 className="text-lg font-display font-semibold text-white/50 mb-1">{module.title}</h3>
                    <p className="text-sm text-white/30">Complete Module {module.id - 1} to unlock</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Badges Section */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-2xl font-display font-bold text-white mb-2">Achievement Badges</h2>
          <p className="text-white/50 mb-8">Earn badges by completing modules and mastering key skills.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {state.badges.map(badge => (
              <div key={badge.id} className={`card-panel p-4 text-center transition-all ${badge.earned ? "border-amber-500/40" : "opacity-40"}`}>
                <div className={`text-4xl mb-3 ${badge.earned ? "" : "grayscale"}`}>{badge.icon}</div>
                <div className={`text-sm font-display font-semibold mb-1 ${badge.earned ? "text-white" : "text-white/50"}`}>{badge.name}</div>
                <div className="text-xs text-white/40">{badge.description}</div>
                {badge.earned && <div className="mt-2 text-xs font-mono-custom text-amber-400">EARNED</div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ModuleCard({ module, completed, pct, activitiesDone, activitiesTotal, colors }: {
  module: import("@/lib/moduleData").Module;
  completed: boolean;
  pct: number;
  activitiesDone: number;
  activitiesTotal: number;
  colors: typeof accentColors["teal"];
}) {
  return (
    <>
      <div className="flex items-start justify-between mb-4">
        <div className="text-3xl">{module.icon}</div>
        {completed ? (
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
        ) : (
          <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 transition-colors" />
        )}
      </div>
      <div className={`text-xs font-mono-custom uppercase tracking-wider mb-1 ${colors.icon}`}>Module {module.id}</div>
      <h3 className="text-lg font-display font-semibold text-white mb-1">{module.title}</h3>
      <p className="text-sm text-white/50 mb-4 leading-relaxed">{module.subtitle}</p>
      <div className="flex items-center justify-between text-xs text-white/40 mb-2">
        <span className="font-mono-custom">{activitiesDone}/{activitiesTotal} activities</span>
        <span className="font-mono-custom">+{module.xpReward} XP</span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${colors.progress}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex items-center gap-3 mt-3 text-xs text-white/30">
        <span>{module.estimatedMinutes} min</span>
        <span>·</span>
        <span>{module.activities.length} activities</span>
      </div>
    </>
  );
}
