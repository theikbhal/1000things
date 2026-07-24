"use client";

import { useState, useMemo, useCallback } from "react";
import { LEVELS } from "@/lib/types";

export function useGamification(filledCells: number) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [lastLevel, setLastLevel] = useState(0);

  const currentLevel = useMemo(() => {
    let level = LEVELS[0];
    for (const l of LEVELS) {
      if (filledCells >= l.minCells) level = l;
    }
    return level;
  }, [filledCells]);

  const nextLevel = useMemo(() => {
    for (let i = 0; i < LEVELS.length - 1; i++) {
      if (filledCells < LEVELS[i + 1].minCells) return LEVELS[i + 1];
    }
    return LEVELS[LEVELS.length - 1];
  }, [filledCells]);

  const progress = useMemo(() => {
    const current = currentLevel.minCells;
    const next = nextLevel.minCells;
    if (next === current) return 1;
    return (filledCells - current) / (next - current);
  }, [filledCells, currentLevel, nextLevel]);

  const checkLevelUp = useCallback(() => {
    if (currentLevel.number > lastLevel) {
      setLastLevel(currentLevel.number);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 4000);
      return true;
    }
    return false;
  }, [currentLevel.number, lastLevel]);

  return {
    currentLevel,
    nextLevel,
    progress,
    showConfetti,
    checkLevelUp,
  };
}
