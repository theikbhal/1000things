"use client";

import { useState, useCallback, useMemo } from "react";
import type { CellData, CellType, GridConfig } from "@/lib/types";
import { generateDummyCell } from "@/lib/dummyData";
import { GRID_PRESETS } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

export function useGrid() {
  const [config, setConfig] = useState<GridConfig>({
    id: "default",
    name: "My 1000 Things",
    rows: 25,
    cols: 40,
    defaultType: "checkbox",
    cellSize: "sm",
  });

  const [cells, setCells] = useState<Record<string, CellData>>({});
  const [selectedCellIds, setSelectedCellIds] = useState<Set<string>>(new Set());
  const [view, setView] = useState<"grid" | "calendar">("grid");
  const [showSettings, setShowSettings] = useState(false);

  const totalCells = useMemo(() => config.rows * config.cols, [config.rows, config.cols]);
  const filledCells = useMemo(() => Object.keys(cells).length, [cells]);

  const getCellKey = useCallback((row: number, col: number) => `${row}-${col}`, []);

  const getCell = useCallback(
    (row: number, col: number): CellData | undefined => {
      return cells[getCellKey(row, col)];
    },
    [cells, getCellKey]
  );

  const updateCell = useCallback(
    (row: number, col: number, data: Partial<CellData>) => {
      const key = getCellKey(row, col);
      setCells((prev) => ({
        ...prev,
        [key]: { ...prev[key], ...data } as CellData,
      }));
    },
    [getCellKey]
  );

  const setCellType = useCallback(
    (row: number, col: number, type: CellType) => {
      const key = getCellKey(row, col);
      const index = row * config.cols + col;
      setCells((prev) => ({
        ...prev,
        [key]: generateDummyCell(type, index),
      }));
    },
    [getCellKey, config.cols]
  );

  const toggleSelect = useCallback((cellId: string) => {
    setSelectedCellIds((prev) => {
      const next = new Set(prev);
      if (next.has(cellId)) next.delete(cellId);
      else next.add(cellId);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    const all = new Set<string>();
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        all.add(getCellKey(r, c));
      }
    }
    setSelectedCellIds(all);
  }, [config.rows, config.cols, getCellKey]);

  const deselectAll = useCallback(() => {
    setSelectedCellIds(new Set());
  }, []);

  const selectRow = useCallback(
    (row: number) => {
      const ids = new Set<string>();
      for (let c = 0; c < config.cols; c++) ids.add(getCellKey(row, c));
      setSelectedCellIds(ids);
    },
    [config.cols, getCellKey]
  );

  const selectColumn = useCallback(
    (col: number) => {
      const ids = new Set<string>();
      for (let r = 0; r < config.rows; r++) ids.add(getCellKey(r, col));
      setSelectedCellIds(ids);
    },
    [config.rows, getCellKey]
  );

  const bulkSetType = useCallback(
    (type: CellType) => {
      setCells((prev) => {
        const next = { ...prev };
        selectedCellIds.forEach((key) => {
          const [r, c] = key.split("-").map(Number);
          const index = r * config.cols + c;
          next[key] = generateDummyCell(type, index);
        });
        return next;
      });
    },
    [selectedCellIds, config.cols]
  );

  const bulkUpdateFromText = useCallback(
    (text: string) => {
      const lines = text.split("\n").filter(Boolean);
      const ids = Array.from(selectedCellIds);
      setCells((prev) => {
        const next = { ...prev };
        ids.forEach((key, i) => {
          const val = lines[i % lines.length];
          const existing = next[key];
          if (existing) {
            next[key] = { ...existing, value: val };
          }
        });
        return next;
      });
    },
    [selectedCellIds]
  );

  const resetCells = useCallback(() => {
    setCells({});
    setSelectedCellIds(new Set());
  }, []);

  const fillWithDummy = useCallback(() => {
    const newCells: Record<string, CellData> = {};
    for (let r = 0; r < config.rows; r++) {
      for (let c = 0; c < config.cols; c++) {
        const index = r * config.cols + c;
        const type =
          index < 100
            ? "checkbox"
            : index < 300
              ? "counter"
              : index < 500
                ? "text"
                : index < 700
                  ? "youtube-short"
                  : "instagram-profile";
        const key = getCellKey(r, c);
        newCells[key] = generateDummyCell(type as CellType, index);
      }
    }
    setCells(newCells);
    setSelectedCellIds(new Set());
  }, [config.rows, config.cols, getCellKey]);

  const exportData = useCallback(() => {
    const data = [];
    for (let r = 0; r < config.rows; r++) {
      const row = [];
      for (let c = 0; c < config.cols; c++) {
        const cell = cells[getCellKey(r, c)];
        row.push(cell ? { ...cell } : null);
      }
      data.push(row);
    }
    const blob = new Blob([JSON.stringify({ config, data }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${config.name.replace(/\s+/g, "_")}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [cells, config, getCellKey]);

  const exportSelected = useCallback(() => {
    const exportData: Record<string, CellData> = {};
    selectedCellIds.forEach((key) => {
      if (cells[key]) exportData[key] = cells[key];
    });
    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `selected_cells.json`;
    a.click();
    URL.revokeObjectURL(url);
  }, [cells, selectedCellIds]);

  const importData = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target?.result as string);
          if (json.config) setConfig((prev) => ({ ...prev, ...json.config }));
          if (json.data) {
            const imported: Record<string, CellData> = {};
            json.data.forEach((row: (CellData | null)[], r: number) => {
              row.forEach((cell: CellData | null, c: number) => {
                if (cell) imported[getCellKey(r, c)] = cell;
              });
            });
            setCells(imported);
          }
        } catch {
          alert("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    },
    [getCellKey]
  );

  const importText = useCallback(
    (text: string, type: CellType = "text") => {
      const lines = text.split("\n").filter(Boolean);
      let idx = 0;
      setCells((prev) => {
        const next = { ...prev };
        for (let r = 0; r < config.rows && idx < lines.length; r++) {
          for (let c = 0; c < config.cols && idx < lines.length; c++) {
            const key = getCellKey(r, c);
            next[key] = {
              id: key,
              type,
              value: lines[idx],
            };
            idx++;
          }
        }
        return next;
      });
    },
    [config.rows, config.cols, getCellKey]
  );

  const syncToSupabase = useCallback(async () => {
    if (!supabase) return false;
    try {
      const { error } = await supabase.from("things").upsert(
        Object.entries(cells).map(([key, cell]) => {
          const [row, col] = key.split("-").map(Number);
          return {
            grid_id: config.id,
            row_idx: row,
            col_idx: col,
            type: cell.type,
            value: cell.value,
            label: cell.label || null,
            checked: cell.checked || null,
            count: cell.count || null,
            metadata: cell.metadata || null,
          };
        }),
        { onConflict: "grid_id, row_idx, col_idx" }
      );
      if (error) throw error;
      return true;
    } catch {
      return false;
    }
  }, [cells, config.id]);

  const loadFromSupabase = useCallback(async () => {
    if (!supabase) return false;
    try {
      const { data, error } = await supabase
        .from("things")
        .select("*")
        .eq("grid_id", config.id);
      if (error) throw error;
      if (data) {
        const loaded: Record<string, CellData> = {};
        data.forEach((item) => {
          const key = getCellKey(item.row_idx, item.col_idx);
          loaded[key] = {
            id: key,
            type: item.type,
            value: item.value || "",
            label: item.label || undefined,
            checked: item.checked || undefined,
            count: item.count || undefined,
            metadata: item.metadata || undefined,
          };
        });
        setCells(loaded);
      }
      return true;
    } catch {
      return false;
    }
  }, [config.id, getCellKey]);

  return {
    config,
    setConfig,
    cells,
    setCells,
    selectedCellIds,
    view,
    setView,
    showSettings,
    setShowSettings,
    totalCells,
    filledCells,
    getCell,
    getCellKey,
    updateCell,
    setCellType,
    toggleSelect,
    selectAll,
    deselectAll,
    selectRow,
    selectColumn,
    bulkSetType,
    bulkUpdateFromText,
    resetCells,
    fillWithDummy,
    exportData,
    exportSelected,
    importData,
    importText,
    syncToSupabase,
    loadFromSupabase,
  };
}
