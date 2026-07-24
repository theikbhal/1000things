"use client";

import Link from "next/link";
import {
  ArrowLeft, Grid3X3, CalendarDays, Settings,
  Download, Upload, Sparkles, Trophy, HelpCircle
} from "lucide-react";

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors mb-6"
        >
          <ArrowLeft size={14} /> Back to Grid
        </Link>

        <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          1000 Things Help
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">
          Everything you need to know about collecting, organizing, and leveling up.
        </p>

        <div className="space-y-8">
          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
              <Grid3X3 size={18} /> Grid Basics
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <p><strong>Cells</strong> are the building blocks. Each cell holds one piece of content.</p>
              <p><strong>Click</strong> a cell to select it. <strong>Double-click</strong> text/input cells to edit.</p>
              <p>Use <strong>Shift+Click</strong> or <strong>Ctrl+Click</strong> to multi-select cells.</p>
              <p>Change grid size in <strong>Settings</strong> — presets available from 5x5 to 25x40 (1000 cells).</p>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
              <Sparkles size={18} /> Cell Types
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { type: "Text", desc: "Short notes and ideas", color: "bg-blue-100 text-blue-700" },
                { type: "Link", desc: "URLs with optional labels", color: "bg-purple-100 text-purple-700" },
                { type: "Counter", desc: "Numeric counter", color: "bg-amber-100 text-amber-700" },
                { type: "Checkbox", desc: "Check/uncheck items", color: "bg-green-100 text-green-700" },
                { type: "Image", desc: "Display images from URLs", color: "bg-pink-100 text-pink-700" },
                { type: "YouTube", desc: "YouTube video links", color: "bg-red-100 text-red-700" },
                { type: "YT Short", desc: "YouTube Shorts links", color: "bg-rose-100 text-rose-700" },
                { type: "IG Reel", desc: "Instagram Reel links", color: "bg-fuchsia-100 text-fuchsia-700" },
                { type: "IG Profile", desc: "Instagram profile links", color: "bg-violet-100 text-violet-700" },
                { type: "Twitter/X", desc: "Tweet/Profile links", color: "bg-sky-100 text-sky-700" },
                { type: "Pinterest", desc: "Pin/Board links", color: "bg-orange-100 text-orange-700" },
                { type: "Input", desc: "Editable text field", color: "bg-teal-100 text-teal-700" },
              ].map((item) => (
                <div
                  key={item.type}
                  className={`rounded-xl p-3 border border-zinc-200 dark:border-zinc-700 ${item.color} bg-opacity-50`}
                >
                  <div className="font-semibold text-xs">{item.type}</div>
                  <div className="text-[10px] opacity-75 mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
              <Download size={18} /> Bulk Operations
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <p><strong>Select All / None</strong> — toggle entire grid selection.</p>
              <p><strong>Type</strong> — change the cell type of all selected cells at once.</p>
              <p><strong>Fill</strong> — paste text (one line per cell) into selected cells.</p>
              <p><strong>Demo</strong> — fill grid with sample data (checkbox → counter → text → YT Short → IG at 100/300/500/700/1000 thresholds).</p>
              <p><strong>Reset</strong> — clear all cells.</p>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
              <Upload size={18} /> Import & Export
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <p><strong>Export All</strong> — download entire grid as JSON (includes config + cell data).</p>
              <p><strong>Export Selected</strong> — download only selected cells as JSON.</p>
              <p><strong>Import JSON</strong> — upload a previously exported grid file.</p>
              <p><strong>Import Lines</strong> — paste text (one per line) to fill cells sequentially.</p>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
              <Trophy size={18} /> Levels & Gamification
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <p>Fill cells to progress through levels:</p>
              <div className="space-y-1.5">
                {[
                  { l: "Starter", c: "0 cells", color: "#6b7280" },
                  { l: "Collector", c: "100 cells", color: "#22c55e" },
                  { l: "Curator", c: "300 cells", color: "#3b82f6" },
                  { l: "Architect", c: "500 cells", color: "#a855f7" },
                  { l: "Master", c: "700 cells", color: "#f59e0b" },
                  { l: "Legend", c: "1000 cells", color: "#ef4444" },
                ].map((l) => (
                  <div key={l.l} className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: l.color }} />
                    <span className="font-medium">{l.l}</span>
                    <span className="text-zinc-400">— {l.c}</span>
                  </div>
                ))}
              </div>
              <p className="mt-2">Celebrate with confetti when you level up! 🎉</p>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
              <CalendarDays size={18} /> Calendar View
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 text-sm text-zinc-600 dark:text-zinc-400">
              <p>Switch to Calendar view to see your cells organized by date. Each dot represents a cell type — green for checkbox, amber for counter, blue for text, purple for others.</p>
            </div>
          </section>

          <section>
            <h2 className="flex items-center gap-2 text-lg font-semibold text-zinc-800 dark:text-zinc-100 mb-3">
              <Settings size={18} /> Tips & Tricks
            </h2>
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 p-4 space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <p>• Use <strong>preset sizes</strong> in Settings to quickly switch between common grid dimensions.</p>
              <p>• The <strong>Demo</strong> button fills cells with meaningful types at milestone thresholds.</p>
              <p>• Export your grid regularly as a backup.</p>
              <p>• Change individual cell types by selecting and using the Type selector.</p>
              <p>• Dark mode is always on for that premium feel.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
