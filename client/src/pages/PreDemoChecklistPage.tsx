import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, CheckSquare, Square, RotateCcw, Download, Zap, ChevronDown, ChevronUp, AlertTriangle, CheckCircle2, ClipboardList } from "lucide-react";
import { useGame } from "@/contexts/GameContext";
import { toast } from "sonner";

// Style: Mission Control — checklist as "pre-flight ops checklist" with section-by-section sign-off
// Data persists to localStorage so SEs can save progress between sessions

const STORAGE_KEY = "dtw_predemo_checklist";

interface CheckItem {
  id: string;
  text: string;
  tip?: string;
  critical?: boolean;
}

interface Section {
  id: string;
  title: string;
  icon: string;
  color: "teal" | "amber" | "emerald" | "purple" | "red";
  source: string;
  items: CheckItem[];
}

const SECTIONS: Section[] = [
  {
    id: "discovery",
    title: "Discovery Intelligence",
    icon: "🧭",
    color: "teal",
    source: "Module 4 — The Discovery Process",
    items: [
      { id: "d1", text: "I know their current state — what process/tool they use today", critical: true },
      { id: "d2", text: "I know their desired state — what 'good' looks like for them", critical: true },
      { id: "d3", text: "I know the quantified business impact — hours saved, cost, risk", critical: true, tip: "Use their numbers, not yours. 'You mentioned 4 hours per analyst per week' beats 'our AI saves time.'" },
      { id: "d4", text: "I know who is in the room and their role (IC, Manager, Executive)", critical: true },
      { id: "d5", text: "I know the top 2-3 pain points to address in this demo" },
      { id: "d6", text: "I know the evaluation criteria — what they're scoring us on" },
      { id: "d7", text: "I know the competition — who else they're evaluating", tip: "If MEDDPICC-qualified: Competition field is filled in." },
      { id: "d8", text: "I have a Champion who has briefed me on internal dynamics" },
      { id: "d9", text: "I know the timeline — when they want to make a decision" },
    ],
  },
  {
    id: "golden-path",
    title: "Golden Path & Demo Script",
    icon: "🎯",
    color: "amber",
    source: "Module 1 — Tell-Show-Tell + Module 6 — Demo Preparation",
    items: [
      { id: "gp1", text: "I have defined the Golden Path — the exact 3-5 features I will show", critical: true, tip: "Never improvise. The Golden Path is pre-loaded, pre-tested, and never deviates." },
      { id: "gp2", text: "Each feature has a Tell-Show-Tell structure written out", critical: true },
      { id: "gp3", text: "Opening Tell is written and rehearsed — references their specific pain", critical: true, tip: "Formula: 'Based on [their pain from discovery], I want to show you [feature] so you can [business benefit].'" },
      { id: "gp4", text: "Closing Tell (Value Close) is scripted — walks up the value pyramid" },
      { id: "gp5", text: "Demo is under 45 minutes total (including Q&A buffer)" },
      { id: "gp6", text: "Limbic Opening is prepared — hook, problem, stakes, transition", tip: "No product for the first 60-90 seconds. Start with their world." },
      { id: "gp7", text: "I have a 'so what' for every single feature I plan to show" },
      { id: "gp8", text: "I have identified 2-3 'wow moments' — AI capabilities that will surprise them" },
    ],
  },
  {
    id: "environment",
    title: "Technical Environment",
    icon: "⚙️",
    color: "emerald",
    source: "Module 6 — Demo Preparation + Six Habits: Prepare",
    items: [
      { id: "e1", text: "Demo environment is tested — logged in, data loaded, no errors", critical: true },
      { id: "e2", text: "Golden path data is pre-loaded and realistic (not generic test data)", critical: true, tip: "Use data that mirrors their industry. 'Acme Corp' data kills credibility." },
      { id: "e3", text: "Screen resolution and font size are readable for screen share" },
      { id: "e4", text: "Notifications are silenced / Do Not Disturb is on" },
      { id: "e5", text: "Browser tabs are clean — only demo-relevant tabs open" },
      { id: "e6", text: "Backup plan exists if live demo fails (recording, screenshots, slides)" },
      { id: "e7", text: "Audio and video are tested — camera on, background is professional" },
      { id: "e8", text: "AI model latency is acceptable — no 10+ second waits in the golden path", tip: "Pre-run the AI queries to warm the cache. Latency Surprise is a Demo Crime." },
      { id: "e9", text: "API keys / credentials are valid and not expiring during the demo" },
    ],
  },
  {
    id: "audience",
    title: "Audience Management",
    icon: "👥",
    color: "purple",
    source: "Module 5 — Audience Management + Challenger SE: Tailor",
    items: [
      { id: "a1", text: "I know who the economic buyer is — and if they'll be in the room" },
      { id: "a2", text: "I have a tailored message for each stakeholder type present", tip: "IC cares about daily workflow. Manager cares about team productivity. Executive cares about strategic impact." },
      { id: "a3", text: "I have a plan for handling the skeptic or technical challenger" },
      { id: "a4", text: "I know how to re-engage a distracted audience (question technique)" },
      { id: "a5", text: "I have 3 engagement questions ready to keep the audience active" },
      { id: "a6", text: "I know how to handle 'can you show me X?' without derailing the demo", tip: "Parking lot technique: 'Great question — let me finish this flow and I'll show you exactly that.'" },
    ],
  },
  {
    id: "meddpicc",
    title: "MEDDPICC Qualification",
    icon: "🎖️",
    color: "amber",
    source: "Module 10 — MEDDPICC Mastery",
    items: [
      { id: "m1", text: "Metrics — I can state the quantified business impact in their numbers" },
      { id: "m2", text: "Economic Buyer — identified and either in the room or briefed" },
      { id: "m3", text: "Decision Criteria — I know what they're evaluating and how we score" },
      { id: "m4", text: "Decision Process — I know the steps from demo to signed contract" },
      { id: "m5", text: "Implicate Pain — I can articulate the cost of inaction" },
      { id: "m6", text: "Champion — I have an internal advocate who wants us to win" },
      { id: "m7", text: "Competition — I know who else is in the evaluation" },
    ],
  },
  {
    id: "day-of",
    title: "Day-Of Execution",
    icon: "🚀",
    color: "teal",
    source: "Six Habits: Perform + Prepare",
    items: [
      { id: "do1", text: "Join 10 minutes early — test screen share, audio, camera", critical: true },
      { id: "do2", text: "Have a notepad ready to capture questions and objections" },
      { id: "do3", text: "Confirm attendees at the start — who's in the room vs. expected" },
      { id: "do4", text: "Re-confirm the agenda and time available before starting" },
      { id: "do5", text: "Ask a warm-up question to get them talking before showing anything", tip: "Example: 'Before I dive in — has anything changed since we last spoke?'" },
      { id: "do6", text: "I will NOT show anything before the Opening Tell", critical: true },
      { id: "do7", text: "I have a strong close planned — not 'any questions?'" },
      { id: "do8", text: "I know the next step I'm asking for at the end of this demo", critical: true, tip: "Value Close formula: Recap → Connect to outcomes → Walk the value pyramid → Quantify → Ask for next step." },
    ],
  },
];

const colorMap = {
  teal:    { border: "border-teal-500/30",    label: "text-teal-400",    bg: "bg-teal-500/8",    dot: "bg-teal-400",    badge: "bg-teal-500/10 border-teal-500/30 text-teal-400" },
  amber:   { border: "border-amber-500/30",   label: "text-amber-400",   bg: "bg-amber-500/8",   dot: "bg-amber-400",   badge: "bg-amber-500/10 border-amber-500/30 text-amber-400" },
  emerald: { border: "border-emerald-500/30", label: "text-emerald-400", bg: "bg-emerald-500/8", dot: "bg-emerald-400", badge: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" },
  purple:  { border: "border-purple-500/30",  label: "text-purple-400",  bg: "bg-purple-500/8",  dot: "bg-purple-400",  badge: "bg-purple-500/10 border-purple-500/30 text-purple-400" },
  red:     { border: "border-red-500/30",     label: "text-red-400",     bg: "bg-red-500/8",     dot: "bg-red-400",     badge: "bg-red-500/10 border-red-500/30 text-red-400" },
};

type CheckedState = Record<string, boolean>;

export default function PreDemoChecklistPage() {
  const { state } = useGame();
  const [checked, setChecked] = useState<CheckedState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
  const [demoName, setDemoName] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY + "_name") || ""; } catch { return ""; }
  });

  // Persist to localStorage whenever checked state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {}
  }, [checked]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY + "_name", demoName);
    } catch {}
  }, [demoName]);

  function toggle(id: string) {
    setChecked(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleSection(id: string) {
    setCollapsedSections(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function resetAll() {
    setChecked({});
    toast.success("Checklist reset — ready for your next demo.");
  }

  function resetSection(sectionId: string) {
    const section = SECTIONS.find(s => s.id === sectionId);
    if (!section) return;
    setChecked(prev => {
      const next = { ...prev };
      section.items.forEach(item => { delete next[item.id]; });
      return next;
    });
  }

  // Stats
  const allItems = SECTIONS.flatMap(s => s.items);
  const criticalItems = allItems.filter(i => i.critical);
  const totalChecked = allItems.filter(i => checked[i.id]).length;
  const criticalChecked = criticalItems.filter(i => checked[i.id]).length;
  const totalPct = Math.round((totalChecked / allItems.length) * 100);
  const criticalPct = Math.round((criticalChecked / criticalItems.length) * 100);
  const isReadyToDemo = criticalChecked === criticalItems.length;

  function getSectionStats(section: Section) {
    const total = section.items.length;
    const done = section.items.filter(i => checked[i.id]).length;
    return { total, done, pct: Math.round((done / total) * 100) };
  }

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "var(--font-body)" }}>
      {/* Top Nav */}
      <div className="border-b border-white/5 bg-white/2 sticky top-0 z-10 backdrop-blur-sm print:hidden">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="/field-notes">
              <button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Field Notes</span>
              </button>
            </Link>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <ClipboardList className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-mono-custom text-white/70 uppercase tracking-wider">Pre-Demo Checklist</span>
            </div>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-xs font-mono-custom uppercase tracking-wider"
            >
              <Download className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={resetAll}
              className="flex items-center gap-2 text-white/40 hover:text-red-400 transition-colors text-xs font-mono-custom uppercase tracking-wider"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-mono-custom text-xs text-white">{state.xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8 md:py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-8">
          <div className="text-xs font-mono-custom text-teal-400 uppercase tracking-widest mb-2">// PRE-DEMO CHECKLIST</div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Pre-Flight Ops Checklist</h1>
          <p className="text-white/55 text-base md:text-lg max-w-2xl leading-relaxed">
            Complete this checklist before every customer demo. Based on the Six Habits "Prepare" framework and the Demo Preparation module. Progress is saved automatically.
          </p>
        </motion.div>

        {/* Demo Name Input */}
        <div className="card-panel p-4 mb-6 border-white/10">
          <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-2">Demo / Account Name (optional)</div>
          <input
            type="text"
            value={demoName}
            onChange={e => setDemoName(e.target.value)}
            placeholder="e.g., Acme Corp — Q3 Platform Demo"
            className="w-full bg-transparent text-white placeholder-white/25 text-sm font-mono-custom border-none outline-none"
          />
        </div>

        {/* Status Dashboard */}
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mb-8">
          <div className={`card-panel p-5 md:p-6 ${isReadyToDemo ? "border-emerald-500/40" : criticalPct > 50 ? "border-amber-500/30" : "border-red-500/20"}`}>
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <div className={`text-xs font-mono-custom uppercase tracking-widest mb-1 ${isReadyToDemo ? "text-emerald-400" : criticalPct > 50 ? "text-amber-400" : "text-red-400"}`}>
                  {isReadyToDemo ? "// DEMO READY" : criticalPct > 50 ? "// ALMOST READY" : "// NOT READY"}
                </div>
                <div className="text-lg font-display font-bold text-white">
                  {isReadyToDemo
                    ? "All critical items cleared. You're ready to demo."
                    : `${criticalItems.length - criticalChecked} critical item${criticalItems.length - criticalChecked !== 1 ? "s" : ""} remaining.`}
                </div>
              </div>
              {isReadyToDemo
                ? <CheckCircle2 className="w-8 h-8 text-emerald-400 flex-shrink-0" />
                : <AlertTriangle className={`w-8 h-8 flex-shrink-0 ${criticalPct > 50 ? "text-amber-400" : "text-red-400"}`} />}
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono-custom text-white/40 uppercase tracking-wider">Overall</span>
                  <span className="text-xs font-mono-custom text-white/60">{totalChecked}/{allItems.length}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full transition-all duration-500" style={{ width: `${totalPct}%` }} />
                </div>
                <div className="text-xs font-mono-custom text-white/30 mt-1">{totalPct}% complete</div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-mono-custom text-red-400/70 uppercase tracking-wider">Critical Items</span>
                  <span className="text-xs font-mono-custom text-white/60">{criticalChecked}/{criticalItems.length}</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-500 ${isReadyToDemo ? "bg-emerald-500" : "bg-red-500"}`} style={{ width: `${criticalPct}%` }} />
                </div>
                <div className={`text-xs font-mono-custom mt-1 ${isReadyToDemo ? "text-emerald-400" : "text-red-400/60"}`}>{criticalPct}% cleared</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="space-y-4">
          {SECTIONS.map((section, si) => {
            const colors = colorMap[section.color];
            const { total, done, pct } = getSectionStats(section);
            const sectionDone = done === total;
            const collapsed = collapsedSections[section.id];

            return (
              <motion.div
                key={section.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: si * 0.05, duration: 0.35 }}
                className={`card-panel ${sectionDone ? "border-emerald-500/30" : colors.border}`}
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 md:p-5 flex items-center gap-3 text-left hover:bg-white/2 transition-colors rounded-t"
                >
                  <span className="text-xl flex-shrink-0">{section.icon}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-sm md:text-base font-display font-bold text-white">{section.title}</h3>
                      {sectionDone && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                    </div>
                    <div className={`text-xs font-mono-custom ${colors.label} opacity-60`}>{section.source}</div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <div className={`text-xs font-mono-custom font-semibold ${sectionDone ? "text-emerald-400" : colors.label}`}>{done}/{total}</div>
                      <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden mt-1">
                        <div className={`h-full rounded-full transition-all duration-500 ${sectionDone ? "bg-emerald-500" : colors.dot.replace("bg-", "bg-")}`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                    {collapsed ? <ChevronDown className="w-4 h-4 text-white/30" /> : <ChevronUp className="w-4 h-4 text-white/30" />}
                  </div>
                </button>

                {/* Section Items */}
                {!collapsed && (
                  <div className="border-t border-white/5">
                    <div className="divide-y divide-white/3">
                      {section.items.map((item) => {
                        const isChecked = !!checked[item.id];
                        return (
                          <motion.div
                            key={item.id}
                            layout
                            className={`px-4 md:px-5 py-3 flex items-start gap-3 cursor-pointer group transition-colors hover:bg-white/2 ${isChecked ? "bg-white/1" : ""}`}
                            onClick={() => toggle(item.id)}
                          >
                            <div className="flex-shrink-0 mt-0.5">
                              {isChecked
                                ? <CheckSquare className={`w-4 h-4 ${colors.label}`} />
                                : <Square className="w-4 h-4 text-white/25 group-hover:text-white/50 transition-colors" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start gap-2">
                                <span className={`text-sm leading-relaxed transition-colors ${isChecked ? "text-white/40 line-through" : "text-white/80"}`}>
                                  {item.text}
                                </span>
                                {item.critical && !isChecked && (
                                  <span className="flex-shrink-0 text-xs font-mono-custom bg-red-500/10 border border-red-500/30 text-red-400 rounded-full px-1.5 py-0.5 mt-0.5">CRITICAL</span>
                                )}
                              </div>
                              {item.tip && !isChecked && (
                                <p className="text-xs text-white/35 mt-1 leading-relaxed italic">{item.tip}</p>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                    {/* Section reset */}
                    <div className="px-4 md:px-5 py-3 border-t border-white/5 flex items-center justify-between">
                      <span className={`text-xs font-mono-custom ${sectionDone ? "text-emerald-400" : "text-white/30"}`}>
                        {sectionDone ? "Section complete ✓" : `${total - done} items remaining`}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); resetSection(section.id); }}
                        className="text-xs font-mono-custom text-white/20 hover:text-white/50 transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset section
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center print:hidden">
          <p className="text-white/25 text-xs font-mono-custom uppercase tracking-wider mb-4">
            Demonstrate to Win · AI SE Training Program · Pre-Demo Checklist v1.0
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/field-notes">
              <button className="inline-flex items-center gap-2 border border-white/20 text-white/50 hover:text-white text-sm px-5 py-2.5 rounded transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Field Notes
              </button>
            </Link>
            <Link href="/">
              <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold text-sm px-5 py-2.5 rounded transition-colors">
                Back to Training
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
