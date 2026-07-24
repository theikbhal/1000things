"use client";

import { useState } from "react";
import {
  Settings, HelpCircle, CalendarDays, LayoutGrid,
  Flame, Award, Zap, Building2, Crown, Sprout
} from "lucide-react";
import { Level } from "@/lib/types";

const levelIcons: Record<string, React.ReactNode> = {
  Sprout: <Sprout size={16} />,
  Award: <Award size={16} />,
  Zap: <Zap size={16} />,
  Building2: <Building2 size={16} />,
  Crown: <Crown size={16} />,
  Flame: <Flame size={16} />,
};

interface HeaderProps {
  gridName: string;
  level: Level;
  progress: number;
  filledCells: number;
  totalCells: number;
  view: "grid" | "calendar";
  onViewChange: (view: "grid" | "calendar") => void;
  onOpenSettings: () => void;
}

export function Header({
  gridName,
  level,
  progress,
  filledCells,
  totalCells,
  view,
  onViewChange,
  onOpenSettings,
}: HeaderProps) {
  const [showLevelInfo, setShowLevelInfo] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {gridName}
          </h1>
          <span className="text-xs text-zinc-400">
            {filledCells}/{totalCells}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowLevelInfo(!showLevelInfo)}
            className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all hover:scale-105"
            style={{ backgroundColor: level.color + "20", color: level.color }}
          >
            {levelIcons[level.icon] || <Award size={14} />}
            <span>{level.name}</span>
            <div
              className="absolute bottom-0 left-1 right-1 h-0.5 rounded-full bg-zinc-200 dark:bg-zinc-700 overflow-hidden"
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${progress * 100}%`, backgroundColor: level.color }}
              />
            </div>
          </button>

          <div className="flex bg-zinc-100 dark:bg-zinc-800 rounded-xl p-0.5">
            <button
              onClick={() => onViewChange("grid")}
              className={`p-1.5 rounded-lg transition-colors ${
                view === "grid"
                  ? "bg-white dark:bg-zinc-700 shadow-sm"
                  : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => onViewChange("calendar")}
              className={`p-1.5 rounded-lg transition-colors ${
                view === "calendar"
                  ? "bg-white dark:bg-zinc-700 shadow-sm"
                  : "hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              <CalendarDays size={16} />
            </button>
          </div>

          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <Settings size={16} />
          </button>

          <a
            href="/help"
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <HelpCircle size={16} />
          </a>
        </div>
      </div>

      {showLevelInfo && (
        <div className="absolute top-full right-4 mt-1 z-50 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-3 w-56">
          <div className="text-xs font-semibold text-zinc-500 mb-2 uppercase tracking-wider">
            Levels
          </div>
          {[
            { num: 0, name: "Starter (0)", color: "#6b7280" },
            { num: 1, name: "Collector (100)", color: "#22c55e" },
            { num: 2, name: "Curator (300)", color: "#3b82f6" },
            { num: 3, name: "Architect (500)", color: "#a855f7" },
            { num: 4, name: "Master (700)", color: "#f59e0b" },
            { num: 5, name: "Legend (1000)", color: "#ef4444" },
          ].map((l) => (
            <div
              key={l.num}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs"
              style={{
                backgroundColor: level.number >= l.num ? l.color + "15" : "transparent",
                color: level.number >= l.num ? l.color : "#999",
              }}
            >
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: l.color }} />
              {l.name}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
