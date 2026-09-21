import { useGame, LEVEL_THRESHOLDS } from "@/contexts/GameContext";
import { useUser } from "@/contexts/UserContext";
import { MODULES, BONUS_MODULES, ALL_MODULES } from "@/lib/moduleData";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Trophy, Zap, Star, Lock, CheckCircle2, ChevronRight, BookOpen, Target, Shield, FileText, Menu, X, User } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import DailyChallenge from "@/components/DailyChallenge";

// Style: Mission Control dark theme — home as "mission command center"
// Colors: teal (primary), amber (accent), emerald (success), red (danger), purple (bonus)

const accentColors = {
  teal: { border: "border-teal-500/30", glow: "hover:border-teal-500/60 hover:shadow-[0_0_20px_oklch(0.72_0.18_195/0.2)]", badge: "bg-teal-500/10 text-teal-400 border-teal-500/30", icon: "text-teal-400", progress: "bg-teal-500" },
  amber: { border: "border-amber-500/30", glow: "hover:border-amber-500/60 hover:shadow-[0_0_20px_oklch(0.72_0.19_55/0.2)]", badge: "bg-amber-500/10 text-amber-400 border-amber-500/30", icon: "text-amber-400", progress: "bg-amber-500" },
  emerald: { border: "border-emerald-500/30", glow: "hover:border-emerald-500/60 hover:shadow-[0_0_20px_oklch(0.72_0.17_145/0.2)]", badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30", icon: "text-emerald-400", progress: "bg-emerald-500" },
  red: { border: "border-red-500/30", glow: "hover:border-red-500/60 hover:shadow-[0_0_20px_oklch(0.65_0.22_25/0.2)]", badge: "bg-red-500/10 text-red-400 border-red-500/30", icon: "text-red-400", progress: "bg-red-500" },
  purple: { border: "border-purple-500/30", glow: "hover:border-purple-500/60 hover:shadow-[0_0_20px_oklch(0.6_0.15_280/0.2)]", badge: "bg-purple-500/10 text-purple-400 border-purple-500/30", icon: "text-purple-400", progress: "bg-purple-500" },
};

export default function Home() {
  const { state, isModuleCompleted, isModuleUnlocked } = useGame();
  const { profile } = useUser();
  const currentLevelXP = LEVEL_THRESHOLDS[state.level - 1] ?? 0;
  const nextLevelXP = LEVEL_THRESHOLDS[state.level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const levelProgress = nextLevelXP > currentLevelXP ? ((state.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100;
  const completedModules = ALL_MODULES.filter(m => isModuleCompleted(m.id)).length;
  const earnedBadges = state.badges.filter(b => b.earned).length;
  // Derived from the curriculum so the headline can never drift from the data.
  const totalActivities = ALL_MODULES.reduce((n, m) => n + m.activities.length, 0);
  const core7Done = [1,2,3,4,5,6,7].every(id => isModuleCompleted(id));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
        <div className="relative container mx-auto px-4 md:px-6 pt-14 pb-20">
          {/* Nav */}
          <nav className="flex items-center justify-between mb-12 md:mb-16">
            <div className="flex items-center gap-2.5">
              <img src="/manus-storage/logo-icon_d2dd919d.png" alt="Logo" className="w-8 h-8 md:w-9 md:h-9 object-contain" />
              <div>
                <div className="text-xs font-mono-custom text-teal-400 tracking-widest uppercase leading-none">Mission Briefing</div>
                <div className="text-sm font-display font-semibold text-white leading-tight">Demonstrate to Win</div>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-2">
              <Link href="/field-notes">
                <button className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-xs font-mono-custom uppercase tracking-wider px-3 py-2 rounded hover:bg-white/5">
                  <FileText className="w-3.5 h-3.5" />Field Notes
                </button>
              </Link>
              <Link href="/pre-demo-checklist">
                <button className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-xs font-mono-custom uppercase tracking-wider px-3 py-2 rounded hover:bg-white/5">
                  <ClipboardList className="w-3.5 h-3.5" />Checklist
                </button>
              </Link>
              <Link href="/library">
                <button className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-xs font-mono-custom uppercase tracking-wider px-3 py-2 rounded hover:bg-white/5">
                  <BookOpen className="w-3.5 h-3.5" />Library
                </button>
              </Link>
              <Link href="/certification">
                <button className="flex items-center gap-1.5 text-white/50 hover:text-white/80 transition-colors text-xs font-mono-custom uppercase tracking-wider px-3 py-2 rounded hover:bg-white/5">
                  <Trophy className="w-3.5 h-3.5" />Certification
                </button>
              </Link>
              <div className="w-px h-4 bg-white/10 mx-1" />
              {profile.name && (
                <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                  <User className="w-3.5 h-3.5 text-teal-400" />
                  <span className="font-mono-custom text-xs text-white font-medium max-w-[80px] truncate">{profile.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Zap className="w-3.5 h-3.5 text-teal-400" />
                <span className="font-mono-custom text-xs text-white font-medium">{state.xp} XP</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
                <Star className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-mono-custom text-xs text-white font-medium">Lvl {state.level}</span>
              </div>
            </div>

            {/* Mobile Nav */}
            <div className="flex md:hidden items-center gap-2">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-full px-2.5 py-1.5">
                <Zap className="w-3 h-3 text-teal-400" />
                <span className="font-mono-custom text-xs text-white">{state.xp} XP</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute top-[72px] left-4 right-4 z-50 card-panel p-3 border-white/20 md:hidden"
            >
              {[
                { href: "/field-notes", icon: <FileText className="w-4 h-4" />, label: "Field Notes" },
                { href: "/pre-demo-checklist", icon: <ClipboardList className="w-4 h-4" />, label: "Pre-Demo Checklist" },
                { href: "/library", icon: <BookOpen className="w-4 h-4" />, label: "Library" },
                { href: "/certification", icon: <Trophy className="w-4 h-4" />, label: "Certification" },
              ].map(item => (
                <Link key={item.href} href={item.href}>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex items-center gap-3 px-3 py-2.5 text-white/70 hover:text-white hover:bg-white/5 rounded transition-colors text-sm"
                  >
                    {item.icon}
                    <span className="font-mono-custom uppercase tracking-wider text-xs">{item.label}</span>
                  </button>
                </Link>
              ))}
              <div className="border-t border-white/10 mt-2 pt-2 px-3 flex items-center justify-between">
                <span className="text-xs font-mono-custom text-white/40">Level {state.level}</span>
                <div className="flex items-center gap-1.5">
                  <Star className="w-3 h-3 text-amber-400" />
                  <span className="text-xs font-mono-custom text-amber-400">{earnedBadges} badges</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 bg-teal-500/10 border border-teal-500/30 rounded-full px-3 py-1.5 mb-5">
              <div className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
              <span className="text-xs font-mono-custom text-teal-400 tracking-wider uppercase">AI Sales Engineer Training Program</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white leading-tight mb-4">
              Your Demo is Either<br />
              <span className="text-teal-400">a Bridge or a Wall.</span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-2xl mb-7 leading-relaxed">
              Master the complete methodology from Robert Riefstahl's <em>Demonstrating to Win!</em> — adapted for the world of complex AI solutions. {`11 modules. ${totalActivities} interactive challenges. Two certifications.`}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" /><span>11 Modules</span></div>
              <div className="flex items-center gap-2"><Target className="w-4 h-4" /><span>{totalActivities} Activities</span></div>
              <div className="flex items-center gap-2"><Trophy className="w-4 h-4" /><span>12 Badges</span></div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4" /><span>2 Certifications</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-y border-white/5 bg-white/2">
        <div className="container mx-auto px-4 md:px-6 py-4 md:py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div>
              <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">Total XP</div>
              <div className="text-xl md:text-2xl font-display font-bold text-teal-400">{state.xp}</div>
            </div>
            <div>
              <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">Level</div>
              <div className="flex items-center gap-2 md:gap-3">
                <div className="text-xl md:text-2xl font-display font-bold text-white">{state.level}</div>
                <div className="flex-1">
                  <Progress value={levelProgress} className="h-1.5 bg-white/10" />
                  <div className="text-xs text-white/30 mt-0.5 font-mono-custom">{state.xp}/{nextLevelXP}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">Modules Complete</div>
              <div className="text-xl md:text-2xl font-display font-bold text-white">{completedModules}<span className="text-white/30 text-base md:text-lg">/{ALL_MODULES.length}</span></div>
            </div>
            <div>
              <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">Badges Earned</div>
              <div className="flex items-center gap-2">
                <div className="text-xl md:text-2xl font-display font-bold text-amber-400">{earnedBadges}</div>
                <div className="flex gap-0.5">
                  {state.badges.slice(0, 5).map(b => (
                    <span key={b.id} className={`text-sm md:text-base ${b.earned ? "opacity-100" : "opacity-20 grayscale"}`}>{b.icon}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Core Modules Grid */}
      <div className="container mx-auto px-4 md:px-6 pt-8 pb-4">
        <DailyChallenge />
      </div>
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="mb-8 md:mb-10">
          <div className="text-xs font-mono-custom text-teal-400 uppercase tracking-widest mb-2">// CORE CURRICULUM</div>
          <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Mission Modules</h2>
          <p className="text-white/50 text-sm md:text-base">Complete modules in order to unlock the next. Based on Riefstahl's <em>Demonstrating to Win!</em>.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
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
                transition={{ duration: 0.4, delay: i * 0.05, ease: [0.23, 1, 0.32, 1] }}
              >
                {unlocked ? (
                  <Link href={`/module/${module.id}`}>
                    <div className={`card-panel p-5 md:p-6 cursor-pointer transition-all duration-150 ${colors.border} ${colors.glow} ${completed ? "border-opacity-60" : ""}`}>
                      <ModuleCard module={module} completed={completed} pct={pct} activitiesDone={activitiesDone} activitiesTotal={activitiesTotal} colors={colors} />
                    </div>
                  </Link>
                ) : (
                  <div className={`card-panel p-5 md:p-6 opacity-50 cursor-not-allowed ${colors.border}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-2xl md:text-3xl">{module.icon}</div>
                      <Lock className="w-4 h-4 md:w-5 md:h-5 text-white/30" />
                    </div>
                    <div className="text-xs font-mono-custom text-white/30 uppercase tracking-wider mb-1">Module {module.id}</div>
                    <h3 className="text-base md:text-lg font-display font-semibold text-white/50 mb-1">{module.title}</h3>
                    <p className="text-xs md:text-sm text-white/30">Complete Module {module.id - 1} to unlock</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bonus Modules — unlocked after Module 7 */}
      <div className="border-t border-white/5 bg-white/1">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="mb-8 md:mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="text-xs font-mono-custom text-purple-400 uppercase tracking-widest">// BONUS CURRICULUM</div>
              <div className="text-xs font-mono-custom bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full px-2.5 py-0.5">
                {core7Done ? "UNLOCKED" : "Requires Module 7"}
              </div>
            </div>
            <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Expanded Methodology Stack</h2>
            <p className="text-white/50 text-sm md:text-base">
              Four additional modules drawing from the best SE and sales methodologies — The Six Habits, The Challenger Sale, MEDDPICC, and SPIN Selling.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            {BONUS_MODULES.map((module, i) => {
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
                  transition={{ duration: 0.4, delay: i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                >
                  {unlocked ? (
                    <Link href={`/module/${module.id}`}>
                      <div className={`card-panel p-5 md:p-6 cursor-pointer transition-all duration-150 ${colors.border} ${colors.glow} ${completed ? "border-opacity-60" : ""}`}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-xs font-mono-custom bg-purple-500/10 border border-purple-500/30 text-purple-400 rounded-full px-2 py-0.5">BONUS</span>
                        </div>
                        <ModuleCard module={module} completed={completed} pct={pct} activitiesDone={activitiesDone} activitiesTotal={activitiesTotal} colors={colors} />
                      </div>
                    </Link>
                  ) : (
                    <div className={`card-panel p-5 md:p-6 opacity-40 cursor-not-allowed border-purple-500/20`}>
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <span className="text-xs font-mono-custom bg-purple-500/10 border border-purple-500/20 text-purple-400/60 rounded-full px-2 py-0.5 block mb-2">BONUS</span>
                          <div className="text-2xl md:text-3xl">{module.icon}</div>
                        </div>
                        <Lock className="w-4 h-4 md:w-5 md:h-5 text-white/20" />
                      </div>
                      <div className="text-xs font-mono-custom text-white/30 uppercase tracking-wider mb-1">Module {module.id}</div>
                      <h3 className="text-base md:text-lg font-display font-semibold text-white/40 mb-1">{module.title}</h3>
                      <p className="text-xs md:text-sm text-white/25">Complete all 7 core modules to unlock</p>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Access: Library, Field Notes, Certification */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="text-xs font-mono-custom text-white/40 uppercase tracking-widest mb-6">// RESOURCES</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                href: "/field-notes",
                icon: <FileText className="w-6 h-6 text-amber-400" />,
                label: "Field Notes",
                desc: "Quick-reference cheat sheets for every framework. Print before your next demo.",
                color: "border-amber-500/20 hover:border-amber-500/40",
              },
              {
                href: "/library",
                icon: <BookOpen className="w-6 h-6 text-teal-400" />,
                label: "Intelligence Library",
                desc: "8 books and methodologies with key frameworks, AI applications, and module connections.",
                color: "border-teal-500/20 hover:border-teal-500/40",
              },
              {
                href: "/certification",
                icon: <Trophy className="w-6 h-6 text-amber-400" />,
                label: "Certification",
                desc: "Track your progress toward AI SE Certified and Methodology Master credentials.",
                color: "border-amber-500/20 hover:border-amber-500/40",
              },
            ].map(item => (
              <Link key={item.href} href={item.href}>
                <div className={`card-panel p-5 md:p-6 cursor-pointer transition-all duration-150 hover:bg-white/3 ${item.color}`}>
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="text-base font-display font-semibold text-white mb-1.5">{item.label}</h3>
                  <p className="text-xs md:text-sm text-white/50 leading-relaxed">{item.desc}</p>
                  <div className="flex items-center gap-1.5 mt-4 text-xs font-mono-custom text-white/30 hover:text-white/60 transition-colors">
                    <span>Open</span><ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <h2 className="text-xl md:text-2xl font-display font-bold text-white mb-2">Achievement Badges</h2>
          <p className="text-white/50 mb-6 md:mb-8 text-sm md:text-base">Earn badges by completing modules and mastering key skills.</p>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {state.badges.map(badge => (
              <div key={badge.id} className={`card-panel p-3 text-center transition-all ${badge.earned ? "border-amber-500/40" : "opacity-40"}`}>
                <div className={`text-2xl md:text-3xl mb-2 ${badge.earned ? "" : "grayscale"}`}>{badge.icon}</div>
                <div className={`text-xs font-display font-semibold mb-0.5 leading-tight ${badge.earned ? "text-white" : "text-white/50"}`}>{badge.name}</div>
                <div className="text-xs text-white/30 hidden md:block leading-tight">{badge.description}</div>
                {badge.earned && <div className="mt-1.5 text-xs font-mono-custom text-amber-400">EARNED</div>}
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
      <div className="flex items-start justify-between mb-3 md:mb-4">
        <div className="text-2xl md:text-3xl">{module.icon}</div>
        {completed ? (
          <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
        ) : (
          <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/30 group-hover:text-white/60 transition-colors" />
        )}
      </div>
      <div className={`text-xs font-mono-custom uppercase tracking-wider mb-1 ${colors.icon}`}>Module {module.id}</div>
      <h3 className="text-base md:text-lg font-display font-semibold text-white mb-1">{module.title}</h3>
      <p className="text-xs md:text-sm text-white/50 mb-3 md:mb-4 leading-relaxed">{module.subtitle}</p>
      <div className="flex items-center justify-between text-xs text-white/40 mb-2">
        <span className="font-mono-custom">{activitiesDone}/{activitiesTotal} activities</span>
        <span className="font-mono-custom">+{module.xpReward} XP</span>
      </div>
      <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-500 ${colors.progress}`} style={{ width: `${pct}%` }} />
      </div>
      <div className="flex items-center gap-3 mt-2.5 text-xs text-white/30">
        <span>{module.estimatedMinutes} min</span>
        <span>·</span>
        <span>{module.activities.length} activities</span>
      </div>
    </>
  );
}
