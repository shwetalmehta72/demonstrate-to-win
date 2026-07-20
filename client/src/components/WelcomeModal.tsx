/**
 * WelcomeModal — shown once on first visit to let the learner set a display name.
 * Fully optional: "Skip" dismisses it and marks hasSeenWelcome = true.
 * Stores name per device UUID via UserContext.
 */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { ChevronRight, X, User } from "lucide-react";

export default function WelcomeModal() {
  const { profile, setName, markWelcomeSeen } = useUser();
  const [inputValue, setInputValue] = useState("");
  const [visible, setVisible] = useState(!profile.hasSeenWelcome);

  if (!visible) return null;

  const handleSubmit = () => {
    if (inputValue.trim()) {
      setName(inputValue.trim());
    } else {
      markWelcomeSeen();
    }
    setVisible(false);
  };

  const handleSkip = () => {
    markWelcomeSeen();
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", damping: 28, stiffness: 320 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md card-panel border-teal-500/30 p-6 md:p-8 relative" style={{ fontFamily: "var(--font-body)" }}>
              {/* Close */}
              <button
                onClick={handleSkip}
                className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
                aria-label="Skip"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded border border-teal-500/30 bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-teal-400" />
                </div>
                <div>
                  <div className="text-xs font-mono-custom text-teal-400 uppercase tracking-widest">New Operator Detected</div>
                  <div className="text-lg font-display font-bold text-white">Welcome to DTW Training</div>
                </div>
              </div>

              <p className="text-white/55 text-sm leading-relaxed mb-6">
                Your progress, XP, and badges are automatically saved to this device — no account needed.
                What should we call you?
              </p>

              {/* Name input */}
              <div className="mb-5">
                <label className="text-xs font-mono-custom text-white/40 uppercase tracking-wider block mb-2">
                  Your Name <span className="text-white/20">(optional)</span>
                </label>
                <input
                  type="text"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  placeholder="e.g. Alex Chen"
                  maxLength={32}
                  autoFocus
                  className="w-full bg-white/5 border border-white/10 rounded px-3 py-2.5 text-white placeholder-white/20 text-sm focus:outline-none focus:border-teal-500/50 focus:ring-1 focus:ring-teal-500/30 transition-colors"
                />
              </div>

              {/* Device ID display */}
              <div className="bg-white/3 border border-white/5 rounded px-3 py-2 mb-6">
                <div className="text-xs font-mono-custom text-white/25">Device ID: {profile.deviceId}</div>
                <div className="text-xs text-white/30 mt-0.5">Your progress is tied to this browser. Clearing cookies will reset it.</div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={handleSubmit}
                  className="flex-1 bg-teal-500 hover:bg-teal-400 text-black font-semibold"
                >
                  {inputValue.trim() ? "Start Training" : "Start as Guest"}
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSkip}
                  className="border-white/15 text-white/50 hover:text-white"
                >
                  Skip
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
