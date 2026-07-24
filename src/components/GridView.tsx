"use client";

import { useRef, useEffect, useCallback, useMemo } from "react";
import { CellCard } from "./CellCard";
import { CellData, CellType, GridConfig } from "@/lib/types";

interface GridViewProps {
  config: GridConfig;
  cells: Record<string, CellData>;
  selectedCellIds: Set<string>;
  getCell: (row: number, col: number) => CellData | undefined;
  getCellKey: (row: number, col: number) => string;
  setCellType: (row: number, col: number, type: CellType) => void;
  toggleSelect: (cellId: string) => void;
  updateCell: (row: number, col: number, data: Partial<CellData>) => void;
}

export function GridView({
  config,
  cells,
  selectedCellIds,
  getCell,
  getCellKey,
  setCellType,
  toggleSelect,
  updateCell,
}: GridViewProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  const handleClick = useCallback(
    (row: number, col: number) => {
      toggleSelect(getCellKey(row, col));
    },
    [toggleSelect, getCellKey]
  );

  const rows = useMemo(() => {
    const r: { row: number; cells: { col: number; key: string; cell?: CellData; isSelected: boolean }[] }[] = [];
    for (let row = 0; row < config.rows; row++) {
      const rowCells = [];
      for (let col = 0; col < config.cols; col++) {
        const key = getCellKey(row, col);
        rowCells.push({
          col,
          key,
          cell: getCell(row, col),
          isSelected: selectedCellIds.has(key),
        });
      }
      r.push({ row, cells: rowCells });
    }
    return r;
  }, [config.rows, config.cols, getCell, getCellKey, selectedCellIds]);

  if (config.rows === 0 || config.cols === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-zinc-400">
        Configure your grid in Settings
      </div>
    );
  }

  return (
    <div
      ref={gridRef}
      className="p-4 overflow-auto"
      style={{ maxHeight: "calc(100vh - 120px)" }}
    >
      <div
        className="grid gap-1.5"
        style={{
          gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
        }}
      >
        {rows.map((row) =>
          row.cells.map(({ col, key, cell, isSelected }) => (
            <CellCard
              key={key}
              cell={cell}
              row={row.row}
              col={col}
              isSelected={isSelected}
              size={config.cellSize}
              onClick={() => handleClick(row.row, col)}
              onTypeChange={(type) => setCellType(row.row, col, type)}
            />
          ))
        )}
      </div>
    </div>
  );
}
