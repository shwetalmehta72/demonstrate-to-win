import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import type { Activity } from "@/lib/moduleData";

interface ScenarioData {
  scenarios: Array<{
    id: string;
    setup: string;
    options: Array<{ id: string; text: string; quality: "excellent" | "good" | "poor"; feedback: string }>;
  }>;
}

const qualityConfig = {
  excellent: { label: "Excellent Response", color: "text-emerald-400", border: "border-emerald-500/40", bg: "bg-emerald-500/5", badge: "bg-emerald-500/20 text-emerald-400" },
  good: { label: "Good Response", color: "text-teal-400", border: "border-teal-500/40", bg: "bg-teal-500/5", badge: "bg-teal-500/20 text-teal-400" },
  poor: { label: "Avoid This", color: "text-red-400", border: "border-red-500/40", bg: "bg-red-500/5", badge: "bg-red-500/20 text-red-400" },
};

export default function ScenarioActivity({ activity, moduleId, onComplete }: { activity: Activity; moduleId: number; onComplete: () => void }) {
  const data = activity.data as unknown as ScenarioData;
  if (!data?.scenarios?.length) return <div className="p-6 text-white/40 text-sm font-mono-custom">// ACTIVITY DATA UNAVAILABLE</div>;
  const { completeActivity, isActivityCompleted } = useGame();
  const alreadyDone = isActivityCompleted(moduleId, activity.id);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [allDone, setAllDone] = useState(false);

  const scenario = data.scenarios[currentScenario];
  const selected = selectedOption ? scenario.options.find(o => o.id === selectedOption) : null;

  function handleSelect(optId: string) {
    if (selectedOption) return;
    setSelectedOption(optId);
  }

  function handleNext() {
    if (currentScenario < data.scenarios.length - 1) {
      setCurrentScenario(c => c + 1);
      setSelectedOption(null);
    } else {
      setAllDone(true);
      if (!alreadyDone) completeActivity(moduleId, activity.id, activity.xp);
    }
  }

  if (allDone) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-panel p-8 text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">Scenarios Complete!</h3>
        <p className="text-white/60 mb-4">You've worked through all {data.scenarios.length} scenario{data.scenarios.length > 1 ? "s" : ""}.</p>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="w-4 h-4 text-teal-400" />
          <span className="font-mono-custom text-teal-400">+{activity.xp} XP {alreadyDone ? "(already earned)" : "earned!"}</span>
        </div>
        <Button onClick={onComplete} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold">Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl">
      {data.scenarios.length > 1 && (
        <div className="flex items-center gap-2 mb-4">
          {data.scenarios.map((_, i) => <div key={i} className={`h-1.5 rounded-full transition-all ${i === currentScenario ? "w-8 bg-teal-400" : i < currentScenario ? "w-4 bg-emerald-400" : "w-4 bg-white/20"}`} />)}
          <span className="text-xs font-mono-custom text-white/40 ml-1">{currentScenario + 1}/{data.scenarios.length}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={currentScenario} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          <div className="card-panel p-5 mb-5 border-amber-500/20">
            <div className="text-xs font-mono-custom text-amber-400 uppercase tracking-wider mb-2">Scenario</div>
            <p className="text-white/85 leading-relaxed">{scenario.setup}</p>
          </div>

          <div className="space-y-3 mb-5">
            {scenario.options.map(opt => {
              const cfg = qualityConfig[opt.quality];
              const isSelected = selectedOption === opt.id;
              const revealed = selectedOption !== null;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className={`w-full card-panel p-4 text-left transition-all duration-150 ${revealed ? `${cfg.border} ${cfg.bg}` : "border-white/10 hover:border-white/25"} ${!revealed ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full border flex-shrink-0 mt-0.5 ${revealed ? `border-current ${cfg.color}` : "border-white/30"} flex items-center justify-center`}>
                      {isSelected && <div className="w-2.5 h-2.5 rounded-full bg-current" />}
                    </div>
                    <div className="flex-1">
                      <p className="text-white/80 text-sm leading-relaxed mb-2">{opt.text}</p>
                      {revealed && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                          <div className={`inline-flex items-center gap-1 text-xs font-mono-custom px-2 py-0.5 rounded-full mb-2 ${cfg.badge}`}>{cfg.label}</div>
                          <p className="text-white/60 text-xs leading-relaxed">{opt.feedback}</p>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {selectedOption && (
            <Button onClick={handleNext} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold">
              {currentScenario < data.scenarios.length - 1 ? "Next Scenario" : "Complete"} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
