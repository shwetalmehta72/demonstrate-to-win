import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Zap, Printer } from "lucide-react";
import { ClipboardList, ChevronRight } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

// Style: Mission Control — field notes as "quick reference intel cards"
const CHEAT_SHEETS = [
  {
    id: "tst",
    title: "Tell-Show-Tell",
    source: "Demonstrate to Win — Riefstahl",
    color: "teal",
    icon: "🎯",
    sections: [
      {
        label: "The Structure",
        items: [
          "OPENING TELL: Set context, acknowledge pain, preview benefit (30-60 sec)",
          "THE SHOW: Demonstrate the feature — maximum 5 minutes",
          "CLOSING TELL: Deliver business benefits using 'So you can...' language",
        ],
      },
      {
        label: "Opening Tell Formula",
        items: [
          "1. Reference their specific pain from discovery",
          "2. State exactly what you're about to show",
          "3. Preview the benefit — create curiosity",
          "Example: 'Based on your 4-hour manual review process, I want to show you how our AI flags anomalies automatically — so your team can focus on resolution, not detection.'",
        ],
      },
      {
        label: "Closing Tell Formula",
        items: [
          "Individual contributor: 'So you can [daily task benefit]'",
          "Manager: 'So your team can [team-level benefit]'",
          "Executive: 'So the business can [strategic benefit]'",
          "Always use specific numbers from discovery",
        ],
      },
      {
        label: "AI SE Tips",
        items: [
          "Never show AI output without an Opening Tell — it looks like magic, not a solution",
          "Keep AI demos under 5 min per topic — complexity kills deals",
          "Use 'golden path' pre-loaded data for predictable demos",
        ],
      },
    ],
  },
  {
    id: "bridge",
    title: "Bridge Building",
    source: "Demonstrate to Win — Riefstahl",
    color: "emerald",
    icon: "🌉",
    sections: [
      {
        label: "The Bridge Formula",
        items: [
          "CURRENT STATE: Their painful today (use their exact words)",
          "THE BRIDGE: Your solution as the path across",
          "FUTURE STATE: Their compelling tomorrow (quantified)",
          "BRIDGE SUPPORTS: Address fears, risks, and objections",
        ],
      },
      {
        label: "3 Discovery Questions",
        items: [
          "1. 'How is [process] handled currently?' → Current State",
          "2. 'How would you like to do it?' → Future State",
          "3. 'What would be the impact?' → Business Value",
          "These 3 questions give you everything you need for the demo",
        ],
      },
      {
        label: "AI Bridge Fears to Address",
        items: [
          "'Will it replace my team?' → Reframe as AI assistant, not replacement",
          "'What if the AI is wrong?' → Show human-in-the-loop controls",
          "'How long to implement?' → Show time-to-value, not total roadmap",
          "'What about our data?' → Address governance and security proactively",
        ],
      },
    ],
  },
  {
    id: "crimes",
    title: "Demo Crime Files",
    source: "Demonstrate to Win — Riefstahl",
    color: "red",
    icon: "🔍",
    sections: [
      {
        label: "The 10 Demo Crimes",
        items: [
          "1. THE DUMP — showing everything instead of what matters",
          "2. SO WHAT? — showing features without connecting to benefits",
          "3. LOST IN SPACE — no agenda, no structure, no direction",
          "4. WRONG AUDIENCE — demo not tailored to who's in the room",
          "5. TECH OVERLOAD — too much technical depth for the audience",
          "6. FEATURE CREEP — adding 'just one more thing' past the time limit",
          "7. LIVE DEMO ROULETTE — demoing unstable features without a backup",
          "8. SPEED DEMON — clicking too fast for the audience to follow",
          "9. MONOLOGUE — talking at the audience instead of with them",
          "10. WEAK CLOSE — ending with 'any questions?' instead of a Value Close",
        ],
      },
      {
        label: "AI-Specific Demo Crimes",
        items: [
          "MAGIC BOX — showing AI output without explaining the input or logic",
          "ACCURACY THEATER — quoting model accuracy stats without context",
          "LATENCY SURPRISE — live API calls that take 10+ seconds with no warning",
          "DATA MISMATCH — using generic demo data that doesn't match the prospect's world",
        ],
      },
    ],
  },
  {
    id: "limbic",
    title: "Limbic Opening & Value Close",
    source: "Demonstrate to Win — Riefstahl",
    color: "amber",
    icon: "💎",
    sections: [
      {
        label: "Limbic Opening Formula",
        items: [
          "1. THE HOOK: Provocative question or surprising statistic",
          "2. THE PROBLEM: Their specific business problem in their language",
          "3. THE STAKES: What happens if this isn't solved (cost of inaction)",
          "4. THE TRANSITION: 'Today I want to show you...' (no product yet)",
          "Rule: No screens for the first 60-90 seconds",
        ],
      },
      {
        label: "Value Close Formula",
        items: [
          "Step 1: Recap the 3 most important things you showed",
          "Step 2: Connect each to a specific business outcome",
          "Step 3: Walk up the value pyramid (operational → strategic)",
          "Step 4: Quantify the impact using their numbers",
          "Step 5: Ask a forward-looking question to advance the sale",
        ],
      },
      {
        label: "Value Pyramid",
        items: [
          "Level 1 — Individual: 'Your analyst saves 3 hours per report'",
          "Level 2 — Team: 'Your team closes books 3 days faster'",
          "Level 3 — Department: 'Finance gets accurate data before board meetings'",
          "Level 4 — Strategic: 'Leadership moves from reactive to proactive'",
        ],
      },
    ],
  },
  {
    id: "meddpicc",
    title: "MEDDPICC Quick Reference",
    source: "MEDDPICC Framework",
    color: "purple",
    icon: "🎖️",
    sections: [
      {
        label: "The 7 Elements",
        items: [
          "M — METRICS: What is the quantified business impact?",
          "E — ECONOMIC BUYER: Who has final budget authority?",
          "D — DECISION CRITERIA: What are the evaluation requirements?",
          "D — DECISION PROCESS: What is the path to a signed contract?",
          "P — IMPLICATE PAIN: What is the cost of inaction?",
          "I — CHAMPION: Who is selling for you internally?",
          "C — COMPETITION: Who else is in the deal?",
        ],
      },
      {
        label: "Champion vs. Coach",
        items: [
          "COACH: Gives you information, shares org charts, tells you who to call",
          "CHAMPION: Advocates for you internally, has credibility with the EB, has a personal stake in the outcome",
          "Test: Ask your champion to set up the EB meeting. A coach can't; a champion will.",
        ],
      },
      {
        label: "AI Deal Red Flags",
        items: [
          "No Metrics defined → 'Impressive demo' but no urgency to buy",
          "Economic Buyer not engaged → Deal stalls at champion level",
          "No Champion → You're selling to an evaluator, not a buyer",
          "Internal build in competition → Reframe to build vs. buy economics",
        ],
      },
    ],
  },
  {
    id: "spin",
    title: "SPIN Selling Questions",
    source: "SPIN Selling — Neil Rackham",
    color: "emerald",
    icon: "🔄",
    sections: [
      {
        label: "The 4 Question Types",
        items: [
          "S — SITUATION: Understand the current state and context",
          "P — PROBLEM: Surface the pain and inefficiencies",
          "I — IMPLICATION: Expand the pain to show full business impact",
          "N — NEED-PAYOFF: Let the prospect articulate the value themselves",
        ],
      },
      {
        label: "AI Discovery SPIN Examples",
        items: [
          "S: 'How many analysts process your monthly reports today?'",
          "P: 'Where does your current data pipeline break down most often?'",
          "I: 'When that pipeline fails, what decisions get delayed? What's the downstream cost?'",
          "N: 'If you could get that report in 30 minutes instead of 3 days, how would that change your ability to respond to market changes?'",
        ],
      },
      {
        label: "Key Insight",
        items: [
          "Implication questions are the biggest differentiator between top and average performers",
          "Need-Payoff questions let the prospect sell themselves — their words are more credible than yours",
          "Use SPIN before every demo — it writes the demo narrative for you",
        ],
      },
    ],
  },
  {
    id: "six-habits",
    title: "The Six Habits",
    source: "Six Habits of Highly Effective SEs — Chris White",
    color: "teal",
    icon: "⚡",
    sections: [
      {
        label: "The Six Habits",
        items: [
          "1. PARTNER: Own the technical win. Require discovery before every demo.",
          "2. PROBE: Deep discovery is non-negotiable. Understand current state, desired state, and business impact.",
          "3. PREPARE: Test everything the day before. Never the morning of.",
          "4. PRACTICE: Drill your weak spots deliberately, not just full run-throughs.",
          "5. PERFORM: Composure, presence, and adaptability under pressure.",
          "6. PERFECT: Post-demo reflection. What worked? What didn't? What will you change?",
        ],
      },
      {
        label: "Pre-Demo Checklist",
        items: [
          "✓ 15-min AE pre-call: discovery findings, stakeholder map, demo objectives",
          "✓ Demo environment tested (day before)",
          "✓ Data loaded and verified",
          "✓ Limbic Opening rehearsed",
          "✓ Backup slides prepared",
          "✓ Screen share and audio tested",
        ],
      },
    ],
  },
  {
    id: "challenger",
    title: "Challenger SE Framework",
    source: "The Challenger Sale — Dixon & Adamson",
    color: "amber",
    icon: "⚔️",
    sections: [
      {
        label: "Teach-Tailor-Take Control",
        items: [
          "TEACH: Lead with commercial insight that reframes how they think about their problem",
          "TAILOR: Adapt the same demo to each stakeholder's specific priorities",
          "TAKE CONTROL: Create constructive tension — challenge the status quo respectfully",
        ],
      },
      {
        label: "Challenger Opening Formula",
        items: [
          "1. Commercial Insight: 'Companies in your industry are losing X% to Y problem...'",
          "2. The Reframe: 'The ones using AI are now doing Z differently...'",
          "3. Bridge to Demo: 'Today I want to show you what that looks like for your team.'",
          "Rule: Lead with their world, not your product.",
        ],
      },
      {
        label: "Constructive Tension Phrases",
        items: [
          "'Most teams think they need X, but our data shows the real bottleneck is Y.'",
          "'You mentioned you're happy with your current process — let me show you what you might be missing.'",
          "'The companies that moved to AI 18 months ago are now Y% ahead of those that didn't.'",
        ],
      },
    ],
  },
];

const colorMap: Record<string, { border: string; label: string; dot: string }> = {
  teal: { border: "border-teal-500/25", label: "text-teal-400", dot: "bg-teal-400" },
  emerald: { border: "border-emerald-500/25", label: "text-emerald-400", dot: "bg-emerald-400" },
  amber: { border: "border-amber-500/25", label: "text-amber-400", dot: "bg-amber-400" },
  purple: { border: "border-purple-500/25", label: "text-purple-400", dot: "bg-purple-400" },
  red: { border: "border-red-500/25", label: "text-red-400", dot: "bg-red-400" },
};

export default function FieldNotesPage() {
  const { state } = useGame();

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "var(--font-body)" }}>
      {/* Top Nav */}
      <div className="border-b border-white/5 bg-white/2 sticky top-0 z-10 backdrop-blur-sm">
        <div className="px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/"><button className="flex items-center gap-2 text-white/50 hover:text-white transition-colors text-sm"><ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">Dashboard</span></button></Link>
            <div className="w-px h-4 bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-amber-400" />
              <span className="text-sm font-mono-custom text-white/70 uppercase tracking-wider">Field Notes</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-xs font-mono-custom uppercase tracking-wider"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
              <Zap className="w-3.5 h-3.5 text-teal-400" />
              <span className="font-mono-custom text-xs text-white">{state.xp} XP</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
          <div className="text-xs font-mono-custom text-amber-400 uppercase tracking-widest mb-2">// FIELD NOTES</div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">Quick Reference Cheat Sheets</h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            Every key framework from all 11 modules, condensed for fast lookup. Bookmark this page and review before your next customer demo.
          </p>
        </motion.div>

        {/* Cheat Sheet Grid */}
        {/* Pre-Demo Checklist CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.35 }}
          className="mb-8"
        >
          <Link href="/pre-demo-checklist">
            <div className="card-panel border-teal-500/40 bg-teal-500/5 hover:bg-teal-500/10 transition-colors cursor-pointer group p-5 flex items-center gap-5">
              <div className="w-12 h-12 rounded border border-teal-500/30 bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                <ClipboardList className="w-6 h-6 text-teal-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-mono-custom text-teal-400 uppercase tracking-widest mb-1">// INTERACTIVE TOOL</div>
                <h3 className="text-base font-display font-bold text-white mb-0.5">Pre-Demo Checklist</h3>
                <p className="text-sm text-white/50 leading-relaxed">
                  Interactive pre-flight checklist for your next customer demo. Covers Discovery, Golden Path, Technical Environment, Audience, MEDDPICC, and Day-Of execution. Progress saves automatically.
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-teal-400/50 group-hover:text-teal-400 transition-colors flex-shrink-0" />
            </div>
          </Link>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-5">
          {CHEAT_SHEETS.map((sheet, i) => {
            const colors = colorMap[sheet.color] || colorMap.teal;
            return (
              <motion.div
                key={sheet.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04, duration: 0.4 }}
                className={`card-panel ${colors.border}`}
              >
                {/* Sheet Header */}
                <div className="p-4 border-b border-white/5 flex items-center gap-3">
                  <span className="text-xl">{sheet.icon}</span>
                  <div>
                    <h3 className={`text-sm font-display font-bold text-white`}>{sheet.title}</h3>
                    <div className={`text-xs font-mono-custom ${colors.label} opacity-70`}>{sheet.source}</div>
                  </div>
                </div>

                {/* Sheet Body */}
                <div className="p-4 space-y-4">
                  {sheet.sections.map((section, si) => (
                    <div key={si}>
                      <div className={`text-xs font-mono-custom uppercase tracking-wider mb-2 ${colors.label}`}>{section.label}</div>
                      <ul className="space-y-1.5">
                        {section.items.map((item, ii) => (
                          <li key={ii} className="flex items-start gap-2 text-xs text-white/65 leading-relaxed">
                            <div className={`w-1 h-1 rounded-full ${colors.dot} mt-1.5 flex-shrink-0`} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-10 text-center">
          <p className="text-white/30 text-xs font-mono-custom uppercase tracking-wider mb-4">
            Demonstrate to Win · AI SE Training Program · Field Notes v1.0
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/pre-demo-checklist">
              <button className="inline-flex items-center gap-2 border border-teal-500/40 text-teal-400 hover:bg-teal-500/10 text-sm px-5 py-2.5 rounded transition-colors">
                <ClipboardList className="w-4 h-4" /> Pre-Demo Checklist
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
