import type { CellType } from "./types";

export const GRID_PRESETS = [
  { label: "Tiny (5x5)", rows: 5, cols: 5 },
  { label: "Small (10x10)", rows: 10, cols: 10 },
  { label: "Medium (10x20)", rows: 10, cols: 20 },
  { label: "Large (20x20)", rows: 20, cols: 20 },
  { label: "XL (20x50)", rows: 20, cols: 50 },
  { label: "1000 (25x40)", rows: 25, cols: 40 },
];

export const CELL_SIZE_MAP = {
  sm: "w-16 h-16",
  md: "w-24 h-24",
  lg: "w-32 h-32",
  xl: "w-48 h-48",
};

export const CELL_SIZE_VALUES = {
  sm: 64,
  md: 96,
  lg: 128,
  xl: 192,
};

export const DEFAULT_TYPES_FOR_FILL: CellType[] = [
  "checkbox",
  "counter",
  "text",
  "youtube-short",
  "instagram-profile",
  "twitter",
  "pinterest",
  "link",
  "image",
  "input",
];
