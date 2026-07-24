"use client";

import { useState } from "react";
import { X, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

const steps = [
  {
    title: "Welcome to 1000 Things!",
    description: "Your ultimate collection tracker. Collect anything — ideas, links, videos, images, counters, and more.",
    icon: "🎯",
  },
  {
    title: "Grid Cells",
    description: "Each cell can hold different types of content. Click a cell to select it. Double-click to edit text/input cells.",
    icon: "🔲",
  },
  {
    title: "Bulk Operations",
    description: "Select multiple cells with the toolbar. Change types in bulk, fill from text, or export/import your data.",
    icon: "⚡",
  },
  {
    title: "Levels & Progress",
    description: "Fill cells to level up! Starter (0) → Collector (100) → Curator (300) → Architect (500) → Master (700) → Legend (1000). Hit 1000 to complete!",
    icon: "🏆",
  },
  {
    title: "Views & Settings",
    description: "Switch between Grid and Calendar views. Customize grid size, cell size, and default types in Settings.",
    icon: "⚙️",
  },
];

interface OnboardingProps {
  onComplete: () => void;
}

export function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("onboarding-dismissed") === "true";
    }
    return false;
  });

  if (dismissed) return null;

  const handleDismiss = () => {
    setDismissed(true);
    localStorage.setItem("onboarding-dismissed", "true");
    onComplete();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 max-w-sm w-full mx-4 animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-start mb-4">
          <span className="text-3xl">{steps[step].icon}</span>
          <button
            onClick={handleDismiss}
            className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 mb-2">
          {steps[step].title}
        </h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-6 leading-relaxed">
          {steps[step].description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex gap-1.5">
            {steps.map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === step ? "bg-blue-500" : "bg-zinc-300 dark:bg-zinc-600"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            {step > 0 && (
              <button
                onClick={() => setStep(step - 1)}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                <ArrowLeft size={14} /> Back
              </button>
            )}
            {step < steps.length - 1 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="flex items-center gap-1 px-4 py-1.5 text-xs font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Next <ArrowRight size={14} />
              </button>
            ) : (
              <button
                onClick={handleDismiss}
                className="flex items-center gap-1 px-4 py-1.5 text-xs font-medium rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:opacity-90 transition-colors"
              >
                <Sparkles size={14} /> Get Started!
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
