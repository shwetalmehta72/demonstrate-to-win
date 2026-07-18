import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, CheckCircle2, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import type { Activity } from "@/lib/moduleData";

interface CrimeData {
  transcript: Array<{
    id: string;
    text: string;
    crime: { id: string; name: string; description: string } | null;
  }>;
}

export default function CrimeDetectiveActivity({ activity, moduleId, onComplete }: { activity: Activity; moduleId: number; onComplete: () => void }) {
  const data = activity.data as unknown as CrimeData;
  const { completeActivity, isActivityCompleted } = useGame();
  const alreadyDone = isActivityCompleted(moduleId, activity.id);
  const [found, setFound] = useState<Set<string>>(new Set());
  const [revealed, setRevealed] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const criminalStatements = data.transcript.filter(s => s.crime !== null);
  const foundAll = found.size === criminalStatements.length;

  function handleClick(id: string) {
    const stmt = data.transcript.find(s => s.id === id);
    if (!stmt) return;
    if (stmt.crime) {
      setFound(prev => new Set(Array.from(prev).concat([id])));
      setRevealed(id);
    } else {
      setRevealed(id);
    }
  }

  function handleFinish() {
    setDone(true);
    if (!alreadyDone) completeActivity(moduleId, activity.id, activity.xp);
  }

  if (done) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-panel p-8 text-center">
        <div className="text-5xl mb-4">🔍</div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">Case Closed!</h3>
        <p className="text-white/60 mb-4">You identified {found.size}/{criminalStatements.length} demo crimes.</p>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="w-4 h-4 text-teal-400" />
          <span className="font-mono-custom text-teal-400">+{activity.xp} XP {alreadyDone ? "(already earned)" : "earned!"}</span>
        </div>
        <Button onClick={onComplete} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold">Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl">
      <div className="card-panel p-4 mb-4 border-amber-500/20">
        <div className="flex items-center gap-2 mb-1">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-mono-custom text-amber-400 uppercase tracking-wider">Demo Detective Mode</span>
        </div>
        <p className="text-white/60 text-sm">Click on any statement where you spot a Demo Crime. There are {criminalStatements.length} crimes hidden in this transcript. Found: {found.size}/{criminalStatements.length}</p>
      </div>

      <div className="space-y-2 mb-6">
        {data.transcript.map(stmt => {
          const isFound = found.has(stmt.id);
          const isRevealed = revealed === stmt.id;
          const hasCrime = stmt.crime !== null;
          return (
            <div key={stmt.id}>
              <button
                onClick={() => handleClick(stmt.id)}
                className={`w-full text-left card-panel p-4 transition-all duration-150 ${isFound ? "border-amber-500/50 bg-amber-500/5" : "border-white/10 hover:border-white/25 hover:bg-white/2"}`}
              >
                <div className="flex items-start gap-3">
                  {isFound && <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />}
                  <p className={`text-sm leading-relaxed ${isFound ? "text-amber-200" : "text-white/75"}`}>{stmt.text}</p>
                </div>
              </button>
              <AnimatePresence>
                {isRevealed && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                    <div className={`p-4 rounded-b-lg border-x border-b ${hasCrime ? "border-amber-500/30 bg-amber-500/5" : "border-white/10 bg-white/2"}`}>
                      {hasCrime ? (
                        <>
                          <div className="flex items-center gap-2 mb-2">
                            <AlertTriangle className="w-4 h-4 text-amber-400" />
                            <span className="text-sm font-display font-semibold text-amber-400">Crime: {stmt.crime!.name}</span>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400 ml-auto" />
                          </div>
                          <p className="text-white/65 text-sm leading-relaxed">{stmt.crime!.description}</p>
                        </>
                      ) : (
                        <p className="text-white/50 text-sm">No crime here — this statement is clean.</p>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <div className="text-sm text-white/50 font-mono-custom">{found.size}/{criminalStatements.length} crimes found</div>
        <Button onClick={handleFinish} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold ml-auto">
          {foundAll ? "Complete Case" : "Submit Findings"} <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </div>
    </div>
  );
}
