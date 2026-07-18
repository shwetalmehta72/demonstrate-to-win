import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import type { Activity } from "@/lib/moduleData";

interface FillData {
  corrections: Array<{
    id: string;
    crime: string;
    criminal_statement: string;
    prompt: string;
    hint: string;
    example_correction: string;
  }>;
}

export default function FillBlankActivity({ activity, moduleId, onComplete }: { activity: Activity; moduleId: number; onComplete: () => void }) {
  const data = activity.data as unknown as FillData;
  const { completeActivity, isActivityCompleted } = useGame();
  const alreadyDone = isActivityCompleted(moduleId, activity.id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [showExamples, setShowExamples] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const allFilled = data.corrections.every(c => (values[c.id] ?? "").trim().length > 20);

  function handleSubmit() {
    setSubmitted(true);
    if (!alreadyDone) completeActivity(moduleId, activity.id, activity.xp);
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl">
        <div className="space-y-5 mb-6">
          {data.corrections.map(c => (
            <div key={c.id} className="card-panel p-5">
              <div className="text-xs font-mono-custom text-amber-400 uppercase tracking-wider mb-2">Crime: {c.crime}</div>
              <div className="bg-red-500/5 border border-red-500/20 rounded p-3 mb-3">
                <div className="text-xs text-red-400/70 mb-1">Criminal Statement:</div>
                <p className="text-red-300/80 text-sm italic">{c.criminal_statement}</p>
              </div>
              <div className="bg-emerald-500/5 border border-emerald-500/20 rounded p-3 mb-3">
                <div className="text-xs text-emerald-400/70 mb-1">Your Correction:</div>
                <p className="text-emerald-300/80 text-sm italic">"{values[c.id]}"</p>
              </div>
              <div className="bg-teal-500/5 border border-teal-500/20 rounded p-3">
                <div className="text-xs text-teal-400/70 mb-1">Expert Example:</div>
                <p className="text-teal-300/80 text-sm italic">{c.example_correction}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2"><Zap className="w-4 h-4 text-teal-400" /><span className="font-mono-custom text-teal-400 text-sm">+{activity.xp} XP {alreadyDone ? "(already earned)" : "earned!"}</span></div>
          <Button onClick={onComplete} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold ml-auto">Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="space-y-6 mb-6">
        {data.corrections.map((c, i) => (
          <motion.div key={c.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card-panel p-5">
            <div className="text-xs font-mono-custom text-amber-400 uppercase tracking-wider mb-3">Crime: {c.crime}</div>
            <div className="bg-red-500/5 border border-red-500/20 rounded p-3 mb-4">
              <div className="text-xs text-red-400/70 mb-1">Criminal Statement (Don't say this):</div>
              <p className="text-red-300/80 text-sm italic">{c.criminal_statement}</p>
            </div>
            <p className="text-white/80 text-sm mb-3 font-medium">{c.prompt}</p>
            <div className="flex items-start gap-2 mb-3">
              <span className="text-xs text-white/40">Hint: {c.hint}</span>
            </div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-white/40">Your corrected statement:</span>
              <button onClick={() => setShowExamples(prev => ({ ...prev, [c.id]: !prev[c.id] }))} className="flex items-center gap-1 text-xs text-teal-400/70 hover:text-teal-400 transition-colors">
                {showExamples[c.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showExamples[c.id] ? "Hide" : "Show"} example
              </button>
            </div>
            {showExamples[c.id] && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-teal-500/5 border border-teal-500/20 rounded p-3 mb-3">
                <p className="text-teal-300/80 text-xs italic">{c.example_correction}</p>
              </motion.div>
            )}
            <textarea
              value={values[c.id] ?? ""}
              onChange={e => setValues(prev => ({ ...prev, [c.id]: e.target.value }))}
              placeholder="Write your corrected, value-focused version of this statement..."
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded p-3 text-white/80 text-sm placeholder-white/25 resize-none focus:outline-none focus:border-teal-500/50 transition-all"
            />
          </motion.div>
        ))}
      </div>
      <Button onClick={handleSubmit} disabled={!allFilled} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold disabled:opacity-40">
        Submit Corrections <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}

