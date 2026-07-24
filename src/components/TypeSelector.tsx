"use client";

import { CellType } from "@/lib/types";
import { CELL_TYPE_OPTIONS } from "@/lib/types";
import { X } from "lucide-react";

interface TypeSelectorProps {
  open: boolean;
  onClose: () => void;
  onSelect: (type: CellType) => void;
}

export function TypeSelector({ open, onClose, onSelect }: TypeSelectorProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-zinc-800 dark:text-zinc-100">
            Change Cell Type
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {CELL_TYPE_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSelect(opt.value);
                onClose();
              }}
              className="flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500 transition-all hover:shadow-md text-sm font-medium"
              style={{ borderColor: opt.color, color: opt.color }}
            >
              <span
                className="w-3 h-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: opt.color }}
              />
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
