import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, RotateCcw, Zap, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGame } from "@/contexts/GameContext";
import type { Activity } from "@/lib/moduleData";

interface DragData {
  items: Array<{ id: string; text: string; phase: string }>;
  correctOrder: string[];
  phases: Array<{ id: string; label: string; color: string; description: string }>;
}

const phaseColors: Record<string, string> = {
  teal: "border-teal-500/40 bg-teal-500/10 text-teal-400",
  amber: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  emerald: "border-emerald-500/40 bg-emerald-500/10 text-emerald-400",
  red: "border-red-500/40 bg-red-500/10 text-red-400",
  critical: "border-red-500/40 bg-red-500/10 text-red-400",
  important: "border-amber-500/40 bg-amber-500/10 text-amber-400",
  contingency: "border-teal-500/40 bg-teal-500/10 text-teal-400",
};

export default function DragDropActivity({ activity, moduleId, onComplete }: { activity: Activity; moduleId: number; onComplete: () => void }) {
  const data = activity.data as unknown as DragData;
  const { completeActivity, isActivityCompleted } = useGame();
  const alreadyDone = isActivityCompleted(moduleId, activity.id);
  const [order, setOrder] = useState<string[]>(() => [...data.items.map(i => i.id)].sort(() => Math.random() - 0.5));
  const [checked, setChecked] = useState(false);
  const [correct, setCorrect] = useState(false);
  const dragItem = useRef<number | null>(null);
  const dragOver = useRef<number | null>(null);

  function handleDragStart(idx: number) { dragItem.current = idx; }
  function handleDragEnter(idx: number) { dragOver.current = idx; }
  function handleDrop() {
    if (dragItem.current === null || dragOver.current === null) return;
    const newOrder = [...order];
    const [moved] = newOrder.splice(dragItem.current, 1);
    newOrder.splice(dragOver.current, 0, moved);
    setOrder(newOrder);
    dragItem.current = null;
    dragOver.current = null;
    setChecked(false);
  }

  function handleCheck() {
    const isCorrect = JSON.stringify(order) === JSON.stringify(data.correctOrder);
    setCorrect(isCorrect);
    setChecked(true);
    if (isCorrect && !alreadyDone) completeActivity(moduleId, activity.id, activity.xp);
  }

  function handleReset() {
    setOrder([...data.items.map(i => i.id)].sort(() => Math.random() - 0.5));
    setChecked(false);
  }

  const getItem = (id: string) => data.items.find(i => i.id === id)!;
  const getPhase = (phaseId: string) => data.phases.find(p => p.id === phaseId);

  return (
    <div className="max-w-2xl">
      <div className="card-panel p-4 mb-6 border-white/10">
        <p className="text-white/50 text-sm">Drag the cards to arrange them in the correct order. Each card belongs to a specific phase.</p>
      </div>

      {/* Phase Legend */}
      <div className="flex flex-wrap gap-2 mb-6">
        {data.phases.map(p => (
          <div key={p.id} className={`inline-flex items-center gap-2 border rounded-full px-3 py-1 text-xs font-mono-custom ${phaseColors[p.color] || "border-white/20 text-white/50"}`}>
            <span className="font-semibold">{p.label}</span>
            <span className="opacity-70">— {p.description}</span>
          </div>
        ))}
      </div>

      <div className="space-y-2 mb-6">
        {order.map((id, idx) => {
          const item = getItem(id);
          const phase = getPhase(item.phase);
          const isCorrectPos = checked && data.correctOrder[idx] === id;
          const isWrongPos = checked && data.correctOrder[idx] !== id;
          return (
            <motion.div
              key={id}
              layout
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragEnter={() => handleDragEnter(idx)}
              onDragEnd={handleDrop}
              onDragOver={e => e.preventDefault()}
              className={`card-panel p-4 cursor-grab active:cursor-grabbing select-none transition-all duration-150 ${isCorrectPos ? "border-emerald-500/60 bg-emerald-500/5" : isWrongPos ? "border-red-500/60 bg-red-500/5" : "border-white/10 hover:border-white/20"}`}
            >
              <div className="flex items-start gap-3">
                <div className="flex flex-col items-center gap-1 pt-1">
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                  <div className="w-1 h-1 rounded-full bg-white/30" />
                </div>
                <div className="flex-1">
                  {phase && <div className={`text-xs font-mono-custom uppercase tracking-wider mb-1 ${phaseColors[phase.color]?.split(" ").pop() || "text-white/50"}`}>{phase.label}</div>}
                  <p className="text-white/80 text-sm leading-relaxed">{item.text}</p>
                </div>
                {isCorrectPos && <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />}
              </div>
            </motion.div>
          );
        })}
      </div>

      {checked && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`card-panel p-4 mb-4 ${correct ? "border-emerald-500/40" : "border-red-500/40"}`}>
          <div className={`text-sm font-semibold mb-1 ${correct ? "text-emerald-400" : "text-red-400"}`}>
            {correct ? "✓ Perfect order! Well done." : "✗ Not quite right. Try rearranging the cards."}
          </div>
          {correct && <div className="flex items-center gap-2 mt-2"><Zap className="w-4 h-4 text-teal-400" /><span className="text-teal-400 font-mono-custom text-sm">+{activity.xp} XP {alreadyDone ? "(already earned)" : "earned!"}</span></div>}
        </motion.div>
      )}

      <div className="flex gap-3">
        <Button onClick={handleCheck} className="bg-teal-500 hover:bg-teal-400 text-black font-semibold">Check Order</Button>
        <Button variant="outline" onClick={handleReset} className="border-white/20 text-white/60 hover:text-white"><RotateCcw className="w-4 h-4 mr-2" />Reset</Button>
        {correct && <Button onClick={onComplete} variant="outline" className="border-emerald-500/40 text-emerald-400 ml-auto">Continue <ChevronRight className="w-4 h-4 ml-1" /></Button>}
      </div>
    </div>
  );
}
