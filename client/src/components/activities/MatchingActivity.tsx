import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Zap, ChevronRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import type { Activity } from "@/lib/moduleData";

interface MatchData {
  pairs: Array<{ id: string; current: string; future: string }>;
}

export default function MatchingActivity({ activity, moduleId, onComplete }: { activity: Activity; moduleId: number; onComplete: () => void }) {
  const data = activity.data as unknown as MatchData;
  const { completeActivity, isActivityCompleted } = useGame();
  const alreadyDone = isActivityCompleted(moduleId, activity.id);
  const [shuffledRight] = useState(() => [...data.pairs].sort(() => Math.random() - 0.5));
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  function handleLeftClick(id: string) {
    if (checked) return;
    setSelectedLeft(prev => prev === id ? null : id);
  }

  function handleRightClick(rightId: string) {
    if (checked || !selectedLeft) return;
    setMatches(prev => {
      const newMatches = { ...prev };
      // Remove any existing match for this right item
      Object.keys(newMatches).forEach(k => { if (newMatches[k] === rightId) delete newMatches[k]; });
      newMatches[selectedLeft] = rightId;
      return newMatches;
    });
    setSelectedLeft(null);
  }

  function handleCheck() {
    const allCorrect = data.pairs.every(p => matches[p.id] === p.id);
    setChecked(true);
    if (allCorrect && !alreadyDone) completeActivity(moduleId, activity.id, activity.xp);
  }

  function handleReset() {
    setMatches({});
    setSelectedLeft(null);
    setChecked(false);
  }

  const allMatched = data.pairs.every(p => matches[p.id]);
  const allCorrect = checked && data.pairs.every(p => matches[p.id] === p.id);
  const correctCount = checked ? data.pairs.filter(p => matches[p.id] === p.id).length : 0;

  return (
    <div className="max-w-4xl">
      <div className="card-panel p-4 mb-6 border-white/10">
        <p className="text-white/50 text-sm">Click a left-side card to select it, then click the matching right-side card to connect them.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Left column */}
        <div className="space-y-2">
          <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-3">Current State (Pain)</div>
          {data.pairs.map(pair => {
            const isSelected = selectedLeft === pair.id;
            const isMatched = !!matches[pair.id];
            const isCorrect = checked && matches[pair.id] === pair.id;
            const isWrong = checked && matches[pair.id] && matches[pair.id] !== pair.id;
            return (
              <button
                key={pair.id}
                onClick={() => handleLeftClick(pair.id)}
                className={`w-full card-panel p-3 text-left text-sm transition-all duration-150 ${isSelected ? "border-teal-500/60 bg-teal-500/10" : isCorrect ? "border-emerald-500/60 bg-emerald-500/5" : isWrong ? "border-red-500/60 bg-red-500/5" : isMatched ? "border-amber-500/40" : "border-white/10 hover:border-white/25"}`}
              >
                <div className="flex items-start gap-2">
                  {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                  <span className="text-white/80 leading-relaxed">{pair.current}</span>
                </div>
              </button>
            );
          })}
        </div>
        {/* Right column */}
        <div className="space-y-2">
          <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-3">Future State (AI Benefit)</div>
          {shuffledRight.map(pair => {
            const matchedBy = Object.entries(matches).find(([, v]) => v === pair.id)?.[0];
            const isCorrect = checked && matchedBy === pair.id;
            const isWrong = checked && matchedBy && matchedBy !== pair.id;
            return (
              <button
                key={pair.id}
                onClick={() => handleRightClick(pair.id)}
                className={`w-full card-panel p-3 text-left text-sm transition-all duration-150 ${selectedLeft ? "hover:border-teal-500/50 hover:bg-teal-500/5 cursor-pointer" : "cursor-default"} ${isCorrect ? "border-emerald-500/60 bg-emerald-500/5" : isWrong ? "border-red-500/60 bg-red-500/5" : matchedBy ? "border-amber-500/40" : "border-white/10"}`}
              >
                <div className="flex items-start gap-2">
                  {isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
                  <span className="text-white/80 leading-relaxed">{pair.future}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {checked && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`card-panel p-4 mb-4 ${allCorrect ? "border-emerald-500/40" : "border-amber-500/40"}`}>
          <div className={`text-sm font-semibold mb-1 ${allCorrect ? "text-emerald-400" : "text-amber-400"}`}>
            {allCorrect ? `✓ Perfect! All ${data.pairs.length} pairs matched correctly.` : `${correctCount}/${data.pairs.length} correct. Try fixing the incorrect ones.`}
          </div>
          {allCorrect && <div className="flex items-center gap-2 mt-2"><Zap className="w-4 h-4 text-teal-400" /><span className="text-teal-400 font-mono-custom text-sm">+{activity.xp} XP {alreadyDone ? "(already earned)" : "earned!"}</span></div>}
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button onClick={handleCheck} disabled={!allMatched} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold disabled:opacity-40">Check Matches</Button>
        <Button variant="outline" onClick={handleReset} className="border-white/20 text-white/60 hover:text-white"><RotateCcw className="w-4 h-4 mr-2" />Reset</Button>
        {allCorrect && <Button onClick={onComplete} variant="outline" className="border-emerald-500/40 text-emerald-400 ml-auto">Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>}
      </div>
    </div>
  );
}
