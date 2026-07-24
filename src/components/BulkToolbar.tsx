"use client";

import { useState } from "react";
import { CellType, CELL_TYPE_OPTIONS } from "@/lib/types";
import {
  Grid3X3, Download, Upload, Type, Trash2,
  Sparkles, Columns3, Rows3, PenLine,
  Database, CheckSquare
} from "lucide-react";

interface BulkToolbarProps {
  selectedCount: number;
  totalCells: number;
  filledCells: number;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onBulkSetType: (type: CellType) => void;
  onBulkUpdateFromText: (text: string) => void;
  onReset: () => void;
  onFillDummy: () => void;
  onExport: () => void;
  onExportSelected: () => void;
  onImport: (file: File) => void;
  onImportText: (text: string) => void;
}

export function BulkToolbar({
  selectedCount,
  totalCells,
  filledCells,
  onSelectAll,
  onDeselectAll,
  onBulkSetType,
  onBulkUpdateFromText,
  onReset,
  onFillDummy,
  onExport,
  onExportSelected,
  onImport,
  onImportText,
}: BulkToolbarProps) {
  const [showImportExport, setShowImportExport] = useState(false);
  const [showBulkType, setShowBulkType] = useState(false);
  const [showTextFill, setShowTextFill] = useState(false);
  const [textInput, setTextInput] = useState("");

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImport(file);
      e.target.value = "";
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-1.5 text-sm font-medium text-zinc-600 dark:text-zinc-400 mr-2">
        <CheckSquare size={16} />
        <span>{selectedCount} / {totalCells}</span>
      </div>

      <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />

      <button
        onClick={onSelectAll}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        <Grid3X3 size={14} /> All
      </button>
      <button
        onClick={onDeselectAll}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
      >
        <Trash2 size={14} /> None
      </button>

      <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />

      <div className="relative">
        <button
          onClick={() => setShowBulkType(!showBulkType)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
        >
          <Columns3 size={14} /> Type
        </button>
        {showBulkType && (
          <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-2 w-48 grid grid-cols-2 gap-1">
            {CELL_TYPE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  onBulkSetType(opt.value);
                  setShowBulkType(false);
                }}
                className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                style={{ color: opt.color }}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: opt.color }} />
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setShowTextFill(!showTextFill)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
        >
          <PenLine size={14} /> Fill
        </button>
        {showTextFill && (
          <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-3 w-72">
            <textarea
              className="w-full h-24 p-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="One entry per line..."
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => {
                  onBulkUpdateFromText(textInput);
                  setShowTextFill(false);
                  setTextInput("");
                }}
                className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
              >
                Apply
              </button>
              <button
                onClick={() => onImportText(textInput)}
                className="flex-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
              >
                Import All
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />

      <div className="relative">
        <button
          onClick={() => setShowImportExport(!showImportExport)}
          className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
        >
          <Database size={14} /> Data
        </button>
        {showImportExport && (
          <div className="absolute top-full left-0 mt-1 z-50 bg-white dark:bg-zinc-900 rounded-xl shadow-xl border border-zinc-200 dark:border-zinc-700 p-3 w-48 flex flex-col gap-1.5">
            <button
              onClick={() => { onExport(); setShowImportExport(false); }}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Download size={14} /> Export All
            </button>
            <button
              onClick={() => { onExportSelected(); setShowImportExport(false); }}
              className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <Download size={14} /> Export Selected
            </button>
            <label className="flex items-center gap-2 px-3 py-2 text-xs rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer">
              <Upload size={14} /> Import JSON
              <input type="file" accept=".json" onChange={handleFileImport} className="hidden" />
            </label>
          </div>
        )}
      </div>

      <div className="w-px h-6 bg-zinc-200 dark:bg-zinc-700" />

      <button
        onClick={onFillDummy}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
      >
        <Sparkles size={14} /> Demo
      </button>
      <button
        onClick={onReset}
        className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
      >
        <Trash2 size={14} /> Reset
      </button>

      <div className="ml-auto text-xs text-zinc-400">
        {filledCells}/{totalCells} filled
      </div>
    </div>
  );
}
