import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ExternalLink, Star, Zap } from "lucide-react";
import { useGame } from "@/contexts/GameContext";

// Style: Mission Control dark theme — library as "intelligence briefings"
const BOOKS = [
  {
    id: 1,
    title: "Demonstrate to Win",
    author: "Robert Riefstahl",
    year: "2009",
    category: "Core Curriculum",
    badge: "REQUIRED",
    badgeColor: "teal",
    icon: "🏆",
    tagline: "The foundational text for this entire training program.",
    keyFrameworks: [
      "Tell-Show-Tell — the universal demo structure",
      "Bridge Building — current state to future state",
      "Demo Crime Files — 10 critical mistakes to avoid",
      "Limbic Opening — emotional hook before any product",
      "Value Close — strategic benefit delivery at the end",
      "Discovery Process — 3 questions that build the bridge",
      "Audience Management — reading and adapting to the room",
    ],
    whyRead: "This is the bible of software demonstrations. Every framework in Modules 1-7 comes directly from this book. If you only read one book on your SE journey, this is it.",
    bestFor: "All new Sales Engineers — read before your first customer demo.",
    aiApplication: "Riefstahl's principles were written for enterprise software but apply perfectly to AI. The Tell-Show-Tell structure is even more critical for AI demos because buyers need context before they can appreciate AI capabilities.",
    moduleLinks: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: 2,
    title: "The Six Habits of Highly Effective Sales Engineers",
    author: "Chris White",
    year: "2019",
    category: "SE Fundamentals",
    badge: "HIGHLY RECOMMENDED",
    badgeColor: "amber",
    icon: "⚡",
    tagline: "The operating system for the SE role.",
    keyFrameworks: [
      "Partner — own the technical win, not just the demo",
      "Probe — discovery as a continuous discipline",
      "Prepare — obsessive readiness before every engagement",
      "Practice — deliberate rehearsal of weak spots",
      "Perform — presence, composure, and adaptability",
      "Perfect — post-demo reflection and continuous improvement",
    ],
    whyRead: "White's research on what separates top-performing SEs from average ones is eye-opening. The six habits framework gives you a complete self-assessment and improvement system for your entire career.",
    bestFor: "SEs in their first 6 months who want a structured approach to professional development.",
    aiApplication: "The 'Probe' habit is especially critical in AI sales — you need to understand not just business pain, but data readiness, governance requirements, and change management capacity.",
    moduleLinks: [8],
  },
  {
    id: 3,
    title: "The Challenger Sale",
    author: "Matthew Dixon & Brent Adamson",
    year: "2011",
    category: "Sales Strategy",
    badge: "HIGHLY RECOMMENDED",
    badgeColor: "amber",
    icon: "⚔️",
    tagline: "Teach, tailor, and take control of the sale.",
    keyFrameworks: [
      "Teach — lead with commercial insight, not product features",
      "Tailor — adapt the message to each stakeholder's priorities",
      "Take Control — create constructive tension to drive urgency",
      "The 5 Seller Profiles — Challenger outperforms in complex sales",
      "Reframe — challenge the prospect's current assumptions",
    ],
    whyRead: "The Challenger Sale's research-backed finding that relationship-building alone doesn't win complex deals is a paradigm shift. For AI sales, where buyers need to be educated before they can buy, the Challenger approach is essential.",
    bestFor: "SEs who want to move from order-takers to strategic advisors.",
    aiApplication: "AI is the perfect domain for Challenger selling. Most buyers don't know what's possible — a Challenger SE teaches them, creating urgency that no relationship could.",
    moduleLinks: [9],
  },
  {
    id: 4,
    title: "MEDDPICC",
    author: "Jack Napoli & Dick Dunkel (orig. MEDDIC)",
    year: "1996 / updated",
    category: "Deal Qualification",
    badge: "ESSENTIAL",
    badgeColor: "purple",
    icon: "🎖️",
    tagline: "Never waste a demo on an unqualified deal.",
    keyFrameworks: [
      "Metrics — quantify the business impact in dollars",
      "Economic Buyer — identify and engage the budget owner",
      "Decision Criteria — understand the evaluation scorecard",
      "Decision Process — map the path to a signed contract",
      "Implicate Pain — make the cost of inaction undeniable",
      "Champion — build and enable your internal advocate",
      "Competition — know who else is in the deal",
    ],
    whyRead: "MEDDPICC is the gold standard for qualifying complex B2B deals. It prevents 'demo theater' — impressive demos that never convert because the deal was never properly qualified.",
    bestFor: "SEs working on enterprise deals with 6+ month sales cycles.",
    aiApplication: "AI deals are especially prone to unqualified demos. AI budgets are often unallocated, decision processes involve data governance committees, and champions need technical credibility. MEDDPICC discipline is what separates AI SEs who win from those who just demo.",
    moduleLinks: [10],
  },
  {
    id: 5,
    title: "SPIN Selling",
    author: "Neil Rackham",
    year: "1988",
    category: "Discovery",
    badge: "CLASSIC",
    badgeColor: "emerald",
    icon: "🔄",
    tagline: "Ask better questions. Win more deals.",
    keyFrameworks: [
      "Situation — understand the current state and context",
      "Problem — surface the pain and inefficiencies",
      "Implication — expand the pain to show full business impact",
      "Need-Payoff — let the prospect articulate the value themselves",
      "The research basis — 35,000 sales calls analyzed",
    ],
    whyRead: "Rackham's research-backed framework for discovery questioning is still the gold standard 35+ years later. The insight that Implication questions are the biggest differentiator between top and average performers is transformative.",
    bestFor: "SEs who want to improve their discovery conversations and reduce the 'feature dump' tendency.",
    aiApplication: "SPIN is transformative for AI discovery. AI buyers often don't know what they need — SPIN questions guide them from 'we have a data problem' to 'we need an AI solution that does X' in their own words.",
    moduleLinks: [11],
  },
  {
    id: 6,
    title: "Great Demo!",
    author: "Peter Cohan",
    year: "2003 / 3rd ed. 2021",
    category: "Demo Technique",
    badge: "RECOMMENDED",
    badgeColor: "teal",
    icon: "🎬",
    tagline: "Do it then show it — the 'Situation Slide' methodology.",
    keyFrameworks: [
      "Do It Then Show It — start with the outcome, work backwards",
      "The Situation Slide — one slide that captures the prospect's world",
      "Illustration — show the specific deliverable the prospect will use",
      "Technical Proof — the underlying capability that makes it work",
      "Reduce demo length — less is always more in complex demos",
    ],
    whyRead: "Cohan's 'Do It Then Show It' methodology is a powerful complement to Tell-Show-Tell. Starting with the end result (the deliverable) before showing how it's created is especially effective for AI demos where the output is more compelling than the process.",
    bestFor: "SEs who want a second framework for structuring demos, especially for executive audiences.",
    aiApplication: "For AI demos, show the AI-generated insight or recommendation first, then walk back through how the AI produced it. This 'outcome-first' approach makes AI feel immediately valuable rather than technically complex.",
    moduleLinks: [],
  },
  {
    id: 7,
    title: "Mastering Technical Sales",
    author: "John Care & Aron Bohlig",
    year: "2002 / 3rd ed. 2014",
    category: "SE Fundamentals",
    badge: "RECOMMENDED",
    badgeColor: "teal",
    icon: "🔧",
    tagline: "The comprehensive handbook for the SE profession.",
    keyFrameworks: [
      "The SE role definition — technical win vs. commercial win",
      "Discovery and qualification for technical evaluations",
      "POC/POV management — structuring proof of value",
      "Demo crime files (parallel to Riefstahl)",
      "Remote demonstration best practices",
      "Building and managing SE teams",
    ],
    whyRead: "Care and Bohlig provide the most comprehensive treatment of the SE profession. While Riefstahl focuses on demos and White focuses on habits, this book covers the full SE lifecycle from discovery through POC to close.",
    bestFor: "SEs who want a comprehensive reference for every stage of the technical sales process.",
    aiApplication: "The POC/POV management frameworks are especially relevant for AI deals, where proof of value often requires custom model training or data integration work.",
    moduleLinks: [],
  },
  {
    id: 8,
    title: "The Trusted Advisor",
    author: "David Maister, Charles Green & Robert Galford",
    year: "2000",
    category: "Relationship & Credibility",
    badge: "RECOMMENDED",
    badgeColor: "emerald",
    icon: "🤝",
    tagline: "Build the credibility that makes prospects buy from you, not just your product.",
    keyFrameworks: [
      "The Trust Equation: (Credibility + Reliability + Intimacy) / Self-Orientation",
      "The Trust Spectrum — from service provider to trusted advisor",
      "Listening skills for technical professionals",
      "Giving advice vs. selling solutions",
      "Long-term relationship building in complex sales",
    ],
    whyRead: "The Trust Equation is one of the most useful frameworks in all of sales. For SEs, who often have more technical credibility than commercial credibility, this book shows how to build the full trust profile that turns a demo into a long-term relationship.",
    bestFor: "SEs who want to move from 'demo resource' to 'trusted technical advisor' in their accounts.",
    aiApplication: "In AI sales, trust is everything. Buyers are making significant bets on AI technology. The SE who becomes a trusted advisor — not just a demo resource — is the one who wins the deal and keeps the account.",
    moduleLinks: [],
  },
];

const badgeColors: Record<string, string> = {
  teal: "bg-teal-500/10 text-teal-400 border-teal-500/30",
  amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
  purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
  red: "bg-red-500/10 text-red-400 border-red-500/30",
};

export default function LibraryPage() {
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
              <BookOpen className="w-4 h-4 text-teal-400" />
              <span className="text-sm font-mono-custom text-white/70 uppercase tracking-wider">Intelligence Library</span>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
            <Zap className="w-3.5 h-3.5 text-teal-400" />
            <span className="font-mono-custom text-xs text-white">{state.xp} XP</span>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 md:px-8 py-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="mb-10">
          <div className="text-xs font-mono-custom text-teal-400 uppercase tracking-widest mb-2">// INTELLIGENCE LIBRARY</div>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-3">The SE Reading List</h1>
          <p className="text-white/55 text-lg max-w-2xl leading-relaxed">
            Every book and methodology behind this training program, with key frameworks, AI applications, and module connections. Build your knowledge stack deliberately.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[
            { label: "Books Covered", value: "8", color: "text-teal-400" },
            { label: "Frameworks", value: "40+", color: "text-amber-400" },
            { label: "Training Modules", value: "11", color: "text-emerald-400" },
          ].map(s => (
            <div key={s.label} className="card-panel p-4 text-center">
              <div className={`text-2xl font-display font-bold ${s.color} mb-1`}>{s.value}</div>
              <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Book Cards */}
        <div className="space-y-5">
          {BOOKS.map((book, i) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="card-panel overflow-hidden"
            >
              {/* Card Header */}
              <div className="p-5 md:p-6 border-b border-white/5">
                <div className="flex items-start gap-4">
                  <div className="text-3xl flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white/5 rounded border border-white/10">
                    {book.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className={`text-xs font-mono-custom border rounded-full px-2.5 py-0.5 ${badgeColors[book.badgeColor]}`}>{book.badge}</span>
                      <span className="text-xs font-mono-custom text-white/30 uppercase tracking-wider">{book.category}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-display font-bold text-white leading-tight">{book.title}</h3>
                    <div className="text-sm text-white/50 mt-0.5">{book.author} · {book.year}</div>
                    <p className="text-sm text-white/60 mt-2 italic">{book.tagline}</p>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 md:p-6 grid md:grid-cols-2 gap-6">
                {/* Key Frameworks */}
                <div>
                  <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-3">Key Frameworks</div>
                  <ul className="space-y-2">
                    {book.keyFrameworks.map((f, fi) => (
                      <li key={fi} className="flex items-start gap-2 text-sm text-white/70">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal-400/60 mt-1.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Why Read + AI Application */}
                <div className="space-y-4">
                  <div>
                    <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-2">Why Read It</div>
                    <p className="text-sm text-white/65 leading-relaxed">{book.whyRead}</p>
                  </div>
                  <div className="card-panel p-3 border-amber-500/20">
                    <div className="text-xs font-mono-custom text-amber-400 uppercase tracking-wider mb-1.5">AI SE Application</div>
                    <p className="text-xs text-white/60 leading-relaxed">{book.aiApplication}</p>
                  </div>
                  <div>
                    <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-1.5">Best For</div>
                    <p className="text-xs text-white/50">{book.bestFor}</p>
                  </div>
                  {book.moduleLinks.length > 0 && (
                    <div>
                      <div className="text-xs font-mono-custom text-white/40 uppercase tracking-wider mb-2">Training Modules</div>
                      <div className="flex flex-wrap gap-2">
                        {book.moduleLinks.map(mid => (
                          <Link key={mid} href={`/module/${mid}`}>
                            <span className="text-xs font-mono-custom bg-teal-500/10 border border-teal-500/30 text-teal-400 rounded px-2 py-1 hover:bg-teal-500/20 transition-colors cursor-pointer">
                              MOD-{String(mid).padStart(2, "0")}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 card-panel p-6 border-teal-500/20 text-center">
          <Star className="w-8 h-8 text-amber-400 mx-auto mb-3" />
          <h3 className="text-lg font-display font-bold text-white mb-2">Reading Builds Reps</h3>
          <p className="text-white/55 text-sm max-w-lg mx-auto mb-4">
            The best SEs read continuously. Each book above adds a new lens to how you see customer problems and structure your demos. Start with the required reading, then work through the recommended list.
          </p>
          <Link href="/">
            <button className="inline-flex items-center gap-2 bg-teal-500 hover:bg-teal-400 text-black font-semibold text-sm px-5 py-2.5 rounded transition-colors">
              <ExternalLink className="w-4 h-4" /> Back to Training
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
