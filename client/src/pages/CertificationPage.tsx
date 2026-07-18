import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, CheckCircle2, Lock, Zap, Star, Shield, ChevronRight } from "lucide-react";
import { useGame, LEVEL_THRESHOLDS } from "@/contexts/GameContext";
import { ALL_MODULES } from "@/lib/moduleData";

// Style: Mission Control — certification as "mission debrief and commendation"
export default function CertificationPage() {
  const { state, isModuleCompleted } = useGame();
  const completedCount = ALL_MODULES.filter(m => isModuleCompleted(m.id)).length;
  const core7Done = [1,2,3,4,5,6,7].every(id => isModuleCompleted(id));
  const all11Done = ALL_MODULES.every(m => isModuleCompleted(m.id));
  const earnedBadges = state.badges.filter(b => b.earned);
  const currentLevelXP = LEVEL_THRESHOLDS[state.level - 1] ?? 0;
  const nextLevelXP = LEVEL_THRESHOLDS[state.level] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  const levelProgress = nextLevelXP > currentLevelXP ? ((state.xp - currentLevelXP) / (nextLevelXP - currentLevelXP)) * 100 : 100;

  const today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "var(--font-body)" }}>
      {/* Top Nav */}
      <div className="border-b border-white/5 bg-white/2 sticky top-0 z-10 backdrop-blur-sm">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"><ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">Dashboard</span></Link>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-mono-custom text-white/70 uppercase tracking-wider">Certification</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono-custom text-xs text-white">{state.xp} XP</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-8 py-10">
        {/* Progress Overview */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
          <div className="text-xs font-mono-custom text-amber-400 uppercase tracking-widest mb-2">// MISSION DEBRIEF</div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Your Certification Status</h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            Track your progress through the AI SE training program. Complete all 7 core modules to earn the AI SE Proficient completion record. Complete all 11 modules for Methodology Master status. These are internal training completion records, not externally accredited certifications.
          </p>
        </motion.div>

        {/* Operator Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="card-panel p-4 text-center">
            <div className="text-2xl font-display font-bold text-teal-400 mb-1">{state.xp}</div>
            <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider">Total XP</div>
          </div>
          <div className="card-panel p-4 text-center">
            <div className="text-2xl font-display font-bold text-white mb-1">{state.level}</div>
            <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider">Level</div>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-teal-500 rounded-full" style={{ width: `${levelProgress}%` }} />
            </div>
          </div>
          <div className="card-panel p-4 text-center">
            <div className="text-2xl font-display font-bold text-white mb-1">{completedCount}<span className="text-white/30 text-lg">/{ALL_MODULES.length}</span></div>
            <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider">Modules Done</div>
          </div>
          <div className="card-panel p-4 text-center">
            <div className="text-2xl font-display font-bold text-amber-400 mb-1">{earnedBadges.length}</div>
            <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider">Badges Earned</div>
          </div>
        </div>

        {/* Certification Cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          {/* Core Certification */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className={`card-panel overflow-hidden ${core7Done ? "border-amber-500/40" : "border-white/10"}`}
          >
            {core7Done ? (
              <>
                {/* Certificate */}
                <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-transparent p-6 border-b border-amber-500/20">
                  <div className="text-xs font-mono-custom text-amber-400 uppercase tracking-widest mb-4">// CERTIFICATE OF COMPLETION</div>
                  <div className="text-center py-4">
                    <div className="text-5xl mb-3">🏆</div>
                    <div className="text-xs font-mono-custom text-white/40 uppercase tracking-widest mb-2">This certifies that</div>
                    <div className="text-xl font-display font-bold text-white mb-1">AI Sales Engineer</div>
                    <div className="text-xs font-mono-custom text-amber-400 mb-4">has successfully completed</div>
                    <div className="text-lg font-display font-semibold text-white mb-1">Demonstrate to Win</div>
                    <div className="text-sm text-white/50 mb-4">Core AI SE Demo Methodology</div>
                    <div className="flex items-center justify-center gap-4 text-xs font-mono-custom text-white/30">
                      <span>7 Modules</span>
                      <span>·</span>
                      <span>{[1,2,3,4,5,6,7].reduce((acc, id) => {
                        const mod = ALL_MODULES.find(m => m.id === id);
                        return acc + (mod?.xpReward ?? 0);
                      }, 0)} XP</span>
                      <span>·</span>
                      <span>{today}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono-custom text-emerald-400 uppercase tracking-wider">Earned</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-custom text-amber-400">
                    <Star className="w-3.5 h-3.5" />
                    <span>AI SE CERTIFIED</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded border border-white/20 bg-white/5 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white/30" />
                  </div>
                  <div>
                    <div className="text-xs font-mono-custom text-white/30 uppercase tracking-wider">Locked</div>
                    <div className="text-white font-display font-semibold">AI SE Certified</div>
                  </div>
                </div>
                <p className="text-sm text-white/50 mb-5">Complete all 7 core modules to earn the AI SE Proficient completion record.</p>
                <div className="space-y-2 mb-5">
                  {[1,2,3,4,5,6,7].map(id => {
                    const mod = ALL_MODULES.find(m => m.id === id);
                    const done = isModuleCompleted(id);
                    return (
                      <div key={id} className="flex items-center gap-3">
                        {done
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          : <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" />
                        }
                        <span className={`text-xs font-mono-custom ${done ? "text-emerald-400" : "text-white/40"}`}>
                          MOD-{String(id).padStart(2, "0")} {mod?.title}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full transition-all" style={{ width: `${([1,2,3,4,5,6,7].filter(id => isModuleCompleted(id)).length / 7) * 100}%` }} />
                </div>
                <div className="text-xs font-mono-custom text-white/30 mt-1.5">{[1,2,3,4,5,6,7].filter(id => isModuleCompleted(id)).length}/7 modules complete</div>
              </div>
            )}
          </motion.div>

          {/* Methodology Master */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className={`card-panel overflow-hidden ${all11Done ? "border-purple-500/40" : "border-white/10"}`}
          >
            {all11Done ? (
              <>
                <div className="bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent p-6 border-b border-purple-500/20">
                  <div className="text-xs font-mono-custom text-purple-400 uppercase tracking-widest mb-4">// ELITE CERTIFICATION</div>
                  <div className="text-center py-4">
                    <div className="text-5xl mb-3">🌟</div>
                    <div className="text-xs font-mono-custom text-white/40 uppercase tracking-widest mb-2">This certifies that</div>
                    <div className="text-xl font-display font-bold text-white mb-1">AI Sales Engineer</div>
                    <div className="text-xs font-mono-custom text-purple-400 mb-4">has mastered</div>
                    <div className="text-lg font-display font-semibold text-white mb-1">Methodology Master</div>
                    <div className="text-sm text-white/50 mb-4">Complete AI SE Methodology Stack</div>
                    <div className="flex items-center justify-center gap-4 text-xs font-mono-custom text-white/30">
                      <span>11 Modules</span>
                      <span>·</span>
                      <span>{ALL_MODULES.reduce((acc, m) => acc + m.xpReward, 0)} XP</span>
                      <span>·</span>
                      <span>{today}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-mono-custom text-emerald-400 uppercase tracking-wider">Earned</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono-custom text-purple-400">
                    <Star className="w-3.5 h-3.5" />
                    <span>METHODOLOGY MASTER</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded border border-white/20 bg-white/5 flex items-center justify-center">
                    <Lock className="w-5 h-5 text-white/30" />
                  </div>
                  <div>
                    <div className="text-xs font-mono-custom text-white/30 uppercase tracking-wider">Locked</div>
                    <div className="text-white font-display font-semibold">Methodology Master</div>
                  </div>
                </div>
                <p className="text-sm text-white/50 mb-5">Complete all 11 modules — including all 4 bonus methodology modules — to earn elite Methodology Master status.</p>
                <div className="space-y-2 mb-5">
                  {ALL_MODULES.map(mod => {
                    const done = isModuleCompleted(mod.id);
                    const isBonus = mod.id >= 8;
                    return (
                      <div key={mod.id} className="flex items-center gap-3">
                        {done
                          ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                          : <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" />
                        }
                        <span className={`text-xs font-mono-custom ${done ? "text-emerald-400" : "text-white/40"}`}>
                          MOD-{String(mod.id).padStart(2, "0")} {mod.title}
                        </span>
                        {isBonus && <span className="text-xs font-mono-custom text-purple-400/60 ml-auto">BONUS</span>}
                      </div>
                    );
                  })}
                </div>
                <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full transition-all" style={{ width: `${(completedCount / ALL_MODULES.length) * 100}%` }} />
                </div>
                <div className="text-xs font-mono-custom text-white/30 mt-1.5">{completedCount}/{ALL_MODULES.length} modules complete</div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Badges Section */}
        <div className="mb-10">
          <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-4">Achievement Badges</div>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {state.badges.map(badge => (
              <div key={badge.id} className={`card-panel p-3 text-center transition-all ${badge.earned ? "border-amber-500/30" : "opacity-30"}`}>
                <div className={`text-2xl mb-1.5 ${badge.earned ? "" : "grayscale"}`}>{badge.icon}</div>
                <div className={`text-xs font-display font-semibold leading-tight ${badge.earned ? "text-white" : "text-white/50"}`}>{badge.name}</div>
                {badge.earned && <div className="text-xs font-mono-custom text-amber-400 mt-1">EARNED</div>}
              </div>
            ))}
          </div>
        </div>

        {/* Next Steps */}
        {!core7Done && (
          <div className="card-panel p-6 border-teal-500/20">
            <div className="flex items-start gap-4">
              <Shield className="w-6 h-6 text-teal-400 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-white font-display font-semibold mb-2">Continue Your Mission</h3>
                <p className="text-white/55 text-sm mb-4">Complete the remaining core modules to earn your AI SE Proficient completion record.</p>
                {[1,2,3,4,5,6,7].filter(id => !isModuleCompleted(id)).slice(0, 3).map(id => {
                  const mod = ALL_MODULES.find(m => m.id === id);
                  return (
                    <Link key={id} href={`/module/${id}`}>
                      <div className="flex items-center gap-3 p-3 rounded border border-white/10 hover:border-teal-500/30 hover:bg-white/3 transition-all cursor-pointer mb-2">
                        <span className="text-lg">{mod?.icon}</span>
                        <div>
                          <div className="text-xs font-mono-custom text-teal-400">MOD-{String(id).padStart(2, "0")}</div>
                          <div className="text-sm text-white font-medium">{mod?.title}</div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/30 ml-auto" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

