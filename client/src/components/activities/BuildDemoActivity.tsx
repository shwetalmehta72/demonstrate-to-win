import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, Zap, ChevronRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import type { Activity } from "@/lib/moduleData";

interface BuildData {
  scenario: string;
  template: Array<{ id: string; label: string; placeholder: string; hint: string; example: string }>;
}

export default function BuildDemoActivity({ activity, moduleId, onComplete }: { activity: Activity; moduleId: number; onComplete: () => void }) {
  const data = activity.data as unknown as BuildData;
  if (!data?.template?.length) return <div className="p-6 text-white/40 text-sm font-mono-custom">// ACTIVITY DATA UNAVAILABLE</div>;
  const { completeActivity, isActivityCompleted } = useGame();
  const alreadyDone = isActivityCompleted(moduleId, activity.id);
  const [values, setValues] = useState<Record<string, string>>({});
  const [showExamples, setShowExamples] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);

  const allFilled = data.template.every(t => (values[t.id] ?? "").trim().length > 20);

  function handleSubmit() {
    setSubmitted(true);
    if (!alreadyDone) completeActivity(moduleId, activity.id, activity.xp);
  }

  if (submitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl">
        <div className="card-panel p-6 mb-6 border-emerald-500/30">
          <div className="text-xs font-mono-custom text-emerald-400 uppercase tracking-wider mb-3">Your Opening Tell</div>
          <div className="space-y-4">
            {data.template.map(t => (
              <div key={t.id}>
                <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">{t.label}</div>
                <p className="text-white/85 leading-relaxed italic">"{values[t.id]}"</p>
              </div>
            ))}
          </div>
        </div>
        <div className="card-panel p-5 mb-6 border-teal-500/20">
          <div className="text-xs font-mono-custom text-teal-400 uppercase tracking-wider mb-3">Expert Example for Comparison</div>
          <div className="space-y-3">
            {data.template.map(t => (
              <div key={t.id}>
                <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1">{t.label}</div>
                <p className="text-white/65 text-sm leading-relaxed">{t.example}</p>
              </div>
            ))}
          </div>
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
      <div className="card-panel p-5 mb-6 border-amber-500/20">
        <div className="text-xs font-mono-custom text-amber-400 uppercase tracking-wider mb-2">Your Scenario</div>
        <p className="text-white/80 leading-relaxed">{data.scenario}</p>
      </div>

      <div className="space-y-5 mb-6">
        {data.template.map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card-panel p-5 border-white/10">
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm font-display font-semibold text-white">{t.label}</div>
              <button
                onClick={() => setShowExamples(prev => ({ ...prev, [t.id]: !prev[t.id] }))}
                className="flex items-center gap-1 text-xs text-teal-400/70 hover:text-teal-400 transition-colors"
              >
                {showExamples[t.id] ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                {showExamples[t.id] ? "Hide" : "Show"} example
              </button>
            </div>
            <div className="flex items-start gap-2 mb-3">
              <Lightbulb className="w-3.5 h-3.5 text-amber-400/70 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/40 leading-relaxed">{t.hint}</p>
            </div>
            {showExamples[t.id] && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="bg-teal-500/5 border border-teal-500/20 rounded p-3 mb-3">
                <p className="text-teal-300/80 text-xs leading-relaxed italic">{t.example}</p>
              </motion.div>
            )}
            <textarea
              value={values[t.id] ?? ""}
              onChange={e => setValues(prev => ({ ...prev, [t.id]: e.target.value }))}
              placeholder={t.placeholder}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded p-3 text-white/80 text-sm placeholder-white/25 resize-none focus:outline-none focus:border-teal-500/50 focus:bg-teal-500/5 transition-all"
            />
            <div className="text-xs text-white/25 mt-1 font-mono-custom">{(values[t.id] ?? "").length} chars</div>
          </motion.div>
        ))}
      </div>

      <Button onClick={handleSubmit} disabled={!allFilled} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold disabled:opacity-40">
        Submit My Opening Tell <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
      {!allFilled && <p className="text-xs text-white/30 mt-2">Fill in all sections (at least 20 characters each) to submit.</p>}
    </div>
  );
}
