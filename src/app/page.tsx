"use client";

import { useEffect, useCallback } from "react";
import { Toaster, toast } from "sonner";
import { useGrid } from "@/hooks/useGrid";
import { useGamification } from "@/hooks/useGamification";
import { Header } from "@/components/Header";
import { GridView } from "@/components/GridView";
import { CalendarView } from "@/components/CalendarView";
import { BulkToolbar } from "@/components/BulkToolbar";
import { SettingsPanel } from "@/components/SettingsPanel";
import { ConfettiOverlay } from "@/components/ConfettiOverlay";
import { Onboarding } from "@/components/Onboarding";
import { Cloud, Sparkles, ArrowUp } from "lucide-react";

export default function Home() {
  const grid = useGrid();
  const game = useGamification(grid.filledCells);

  useEffect(() => {
    if (grid.filledCells > 0) {
      const leveledUp = game.checkLevelUp();
      if (leveledUp) {
        toast(`${game.currentLevel.name} Level Reached!`, {
          description: `You filled ${grid.filledCells} cells!`,
          icon: "🏆",
          duration: 4000,
        });
      }
    }
  }, [grid.filledCells, game.currentLevel.name]);

  const handleFillDummy = useCallback(() => {
    grid.fillWithDummy();
    toast.success("Demo data loaded!", { description: "Cells populated with sample content" });
  }, [grid]);

  const handleReset = useCallback(() => {
    grid.resetCells();
    toast.info("Grid reset", { description: "All cells cleared" });
  }, [grid]);

  const handleExport = useCallback(() => {
    grid.exportData();
    toast.success("Exported!", { description: "Grid data downloaded" });
  }, [grid]);

  const handleExportSelected = useCallback(() => {
    grid.exportSelected();
    toast.success("Selected cells exported!");
  }, [grid]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: "12px",
            background: "white",
            border: "1px solid #e4e4e7",
          },
        }}
      />

      <ConfettiOverlay show={game.showConfetti} />

      <Onboarding onComplete={() => {}} />

      <Header
        gridName={grid.config.name}
        level={game.currentLevel}
        progress={game.progress}
        filledCells={grid.filledCells}
        totalCells={grid.totalCells}
        view={grid.view}
        onViewChange={grid.setView}
        onOpenSettings={() => grid.setShowSettings(true)}
      />

      <main className="flex-1">
        <div className="px-4 pb-2">
          <BulkToolbar
            selectedCount={grid.selectedCellIds.size}
            totalCells={grid.totalCells}
            filledCells={grid.filledCells}
            onSelectAll={grid.selectAll}
            onDeselectAll={grid.deselectAll}
            onBulkSetType={grid.bulkSetType}
            onBulkUpdateFromText={grid.bulkUpdateFromText}
            onReset={handleReset}
            onFillDummy={handleFillDummy}
            onExport={handleExport}
            onExportSelected={handleExportSelected}
            onImport={grid.importData}
            onImportText={grid.importText}
          />
        </div>

        {grid.view === "grid" ? (
          <GridView
            config={grid.config}
            cells={grid.cells}
            selectedCellIds={grid.selectedCellIds}
            getCell={grid.getCell}
            getCellKey={grid.getCellKey}
            setCellType={grid.setCellType}
            toggleSelect={grid.toggleSelect}
            updateCell={grid.updateCell}
          />
        ) : (
          <CalendarView
            cells={grid.cells}
            onSwitchToGrid={() => grid.setView("grid")}
          />
        )}
      </main>

      <SettingsPanel
        open={grid.showSettings}
        config={grid.config}
        onClose={() => grid.setShowSettings(false)}
        onUpdateConfig={grid.setConfig}
      />

      <footer className="border-t border-zinc-200 dark:border-zinc-800 py-3 px-4 text-center text-xs text-zinc-400">
        1000 Things — Collect, Organize, Level Up
      </footer>
    </div>
  );
}
