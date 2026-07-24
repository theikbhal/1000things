"use client";

import { useState, useMemo } from "react";
import {
  format, startOfMonth, endOfMonth, startOfWeek, endOfWeek,
  addDays, addMonths, subMonths, isSameMonth, isSameDay, parseISO
} from "date-fns";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";
import { CellData } from "@/lib/types";

interface CalendarViewProps {
  cells: Record<string, CellData>;
  onSwitchToGrid: () => void;
}

export function CalendarView({ cells, onSwitchToGrid }: CalendarViewProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const calStart = startOfWeek(monthStart);
  const calEnd = endOfWeek(monthEnd);

  const weeks = useMemo(() => {
    const w: Date[][] = [];
    let day = calStart;
    while (day <= calEnd) {
      const week: Date[] = [];
      for (let i = 0; i < 7; i++) {
        week.push(day);
        day = addDays(day, 1);
      }
      w.push(week);
    }
    return w;
  }, [calStart, calEnd]);

  const cellsForDay = useMemo(() => {
    const map: Record<string, CellData[]> = {};
    Object.values(cells).forEach((cell) => {
      const dateKey = format(new Date(), "yyyy-MM-dd");
      if (!map[dateKey]) map[dateKey] = [];
      map[dateKey].push(cell);
    });
    return map;
  }, [cells]);

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onSwitchToGrid}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          <CalendarDays size={14} /> Grid View
        </button>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-100 min-w-[160px] text-center">
            {format(currentMonth, "MMMM yyyy")}
          </h3>
          <button
            onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
            className="p-1.5 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div
            key={day}
            className="text-center text-xs font-semibold text-zinc-500 py-2"
          >
            {day}
          </div>
        ))}
        {weeks.map((week, wi) =>
          week.map((day, di) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayCells = cellsForDay[dateKey] || [];
            const isCurrent = isSameMonth(day, currentMonth);
            const isToday = isSameDay(day, new Date());

            return (
              <div
                key={`${wi}-${di}`}
                className={`
                  min-h-[80px] p-1.5 rounded-lg border transition-colors
                  ${isCurrent ? "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-700" : "bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800"}
                  ${isToday ? "ring-2 ring-blue-500" : ""}
                `}
              >
                <div className="text-xs font-medium text-zinc-500 mb-1">
                  {format(day, "d")}
                </div>
                <div className="flex flex-wrap gap-0.5">
                  {dayCells.slice(0, 4).map((cell, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{
                        backgroundColor:
                          cell.type === "checkbox"
                            ? "#22c55e"
                            : cell.type === "counter"
                              ? "#f59e0b"
                              : cell.type === "text"
                                ? "#3b82f6"
                                : "#a855f7",
                      }}
                    />
                  ))}
                  {dayCells.length > 4 && (
                    <span className="text-[9px] text-zinc-400">+{dayCells.length - 4}</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
