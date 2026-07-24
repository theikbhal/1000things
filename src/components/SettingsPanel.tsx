"use client";

import { GridConfig } from "@/lib/types";
import { CellType, CELL_TYPE_OPTIONS } from "@/lib/types";
import { GRID_PRESETS } from "@/lib/constants";
import { X, Maximize2, Minimize2 } from "lucide-react";

interface SettingsPanelProps {
  open: boolean;
  config: GridConfig;
  onClose: () => void;
  onUpdateConfig: (config: GridConfig) => void;
}

export function SettingsPanel({ open, config, onClose, onUpdateConfig }: SettingsPanelProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 max-w-lg w-full mx-4 max-h-[80vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
            Grid Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Grid Name
            </label>
            <input
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={config.name}
              onChange={(e) => onUpdateConfig({ ...config, name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Rows
              </label>
              <input
                type="number"
                min={1}
                max={100}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={config.rows}
                onChange={(e) =>
                  onUpdateConfig({ ...config, rows: Math.max(1, Number(e.target.value)) })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
                Columns
              </label>
              <input
                type="number"
                min={1}
                max={100}
                className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={config.cols}
                onChange={(e) =>
                  onUpdateConfig({ ...config, cols: Math.max(1, Number(e.target.value)) })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Preset Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {GRID_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  onClick={() =>
                    onUpdateConfig({
                      ...config,
                      rows: preset.rows,
                      cols: preset.cols,
                    })
                  }
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                    config.rows === preset.rows && config.cols === preset.cols
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-1">
              Default Cell Type
            </label>
            <select
              className="w-full px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={config.defaultType}
              onChange={(e) =>
                onUpdateConfig({ ...config, defaultType: e.target.value as CellType })
              }
            >
              {CELL_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2">
              Cell Size
            </label>
            <div className="flex gap-2">
              {(["sm", "md", "lg", "xl"] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => onUpdateConfig({ ...config, cellSize: size })}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-medium border transition-colors ${
                    config.cellSize === size
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                  }`}
                >
                  {size === "xl" ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
                  {size.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 text-xs text-zinc-400 text-center">
            Total cells: {config.rows * config.cols}
          </div>
        </div>
      </div>
    </div>
  );
}
