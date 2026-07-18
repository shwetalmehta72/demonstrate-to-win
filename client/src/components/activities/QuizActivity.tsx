import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import type { Activity } from "@/lib/moduleData";

interface QuizData {
  questions: Array<{
    id: string;
    question: string;
    options: string[];
    correct: number;
    explanation: string;
  }>;
}

export default function QuizActivity({ activity, moduleId, onComplete }: { activity: Activity; moduleId: number; onComplete: () => void }) {
  const data = activity.data as unknown as QuizData;
  const { completeActivity, isActivityCompleted } = useGame();
  const alreadyDone = isActivityCompleted(moduleId, activity.id);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<Record<number, number>>({});
  const [showResult, setShowResult] = useState(false);

  const q = data.questions[current];
  const isCorrect = selected === q.correct;
  const totalCorrect = Object.entries(answered).filter(([i, a]) => data.questions[parseInt(i)].correct === a).length;

  function handleSelect(idx: number) {
    if (selected !== null) return;
    setSelected(idx);
    setAnswered(prev => ({ ...prev, [current]: idx }));
  }

  function handleNext() {
    if (current < data.questions.length - 1) {
      setCurrent(c => c + 1);
      setSelected(answered[current + 1] ?? null);
    } else {
      setShowResult(true);
      if (!alreadyDone) completeActivity(moduleId, activity.id, activity.xp);
    }
  }

  if (showResult) {
    const pct = Math.round((totalCorrect / data.questions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card-panel p-8 text-center">
        <div className="text-5xl mb-4">{pct >= 75 ? "🎯" : "📚"}</div>
        <h3 className="text-2xl font-display font-bold text-white mb-2">{pct >= 75 ? "Excellent Work!" : "Keep Practicing"}</h3>
        <p className="text-white/60 mb-4">{totalCorrect}/{data.questions.length} correct — {pct}%</p>
        <div className="flex items-center justify-center gap-2 mb-6">
          <Zap className="w-4 h-4 text-teal-400" />
          <span className="font-mono-custom text-teal-400">+{activity.xp} XP {alreadyDone ? "(already earned)" : "earned!"}</span>
        </div>
        <Button onClick={onComplete} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold">
          Continue <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex gap-1">
          {data.questions.map((_, i) => (
            <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === current ? "w-8 bg-teal-400" : answered[i] !== undefined ? "w-4 bg-emerald-400" : "w-4 bg-white/20"}`} />
          ))}
        </div>
        <span className="text-xs font-mono-custom text-white/40">{current + 1}/{data.questions.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={current} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
          <div className="card-panel p-6 mb-4">
            <p className="text-white text-lg leading-relaxed font-display font-medium">{q.question}</p>
          </div>
          <div className="space-y-3 mb-6">
            {q.options.map((opt, idx) => {
              let cls = "card-panel p-4 cursor-pointer transition-all duration-150 text-left w-full border ";
              if (selected === null) cls += "border-white/10 hover:border-teal-500/50 hover:bg-teal-500/5";
              else if (idx === q.correct) cls += "border-emerald-500/60 bg-emerald-500/10 correct-flash";
              else if (idx === selected && idx !== q.correct) cls += "border-red-500/60 bg-red-500/10 shake";
              else cls += "border-white/5 opacity-50";
              return (
                <button key={idx} className={cls} onClick={() => handleSelect(idx)}>
                  <div className="flex items-start gap-3">
                    <div className={`w-6 h-6 rounded-full border flex-shrink-0 flex items-center justify-center text-xs font-mono-custom mt-0.5 ${selected !== null && idx === q.correct ? "border-emerald-400 bg-emerald-500/20 text-emerald-400" : selected === idx && idx !== q.correct ? "border-red-400 bg-red-500/20 text-red-400" : "border-white/30 text-white/50"}`}>
                      {selected !== null && idx === q.correct ? <CheckCircle2 className="w-4 h-4" /> : selected === idx && idx !== q.correct ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + idx)}
                    </div>
                    <span className="text-white/80 text-sm leading-relaxed">{opt}</span>
                  </div>
                </button>
              );
            })}
          </div>
          {selected !== null && (
            <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`card-panel p-4 mb-4 ${isCorrect ? "border-emerald-500/30" : "border-red-500/30"}`}>
              <div className={`text-xs font-mono-custom uppercase tracking-wider mb-2 ${isCorrect ? "text-emerald-400" : "text-red-400"}`}>
                {isCorrect ? "✓ Correct!" : "✗ Not quite"}
              </div>
              <p className="text-white/70 text-sm leading-relaxed">{q.explanation}</p>
            </motion.div>
          )}
          {selected !== null && (
            <Button onClick={handleNext} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold">
              {current < data.questions.length - 1 ? "Next Question" : "See Results"} <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
