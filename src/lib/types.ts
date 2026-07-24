export type CellType =
  | "text"
  | "link"
  | "counter"
  | "checkbox"
  | "image"
  | "youtube"
  | "youtube-short"
  | "instagram-reel"
  | "instagram-profile"
  | "twitter"
  | "pinterest"
  | "video"
  | "input";

export interface CellData {
  id: string;
  type: CellType;
  value: string;
  label?: string;
  checked?: boolean;
  count?: number;
  metadata?: Record<string, string>;
}

export interface GridCell {
  cell: CellData;
  row: number;
  col: number;
}

export interface GridConfig {
  id: string;
  name: string;
  rows: number;
  cols: number;
  defaultType: CellType;
  cellSize: "sm" | "md" | "lg" | "xl";
}

export interface Level {
  number: number;
  name: string;
  minCells: number;
  color: string;
  icon: string;
}

export const LEVELS: Level[] = [
  { number: 0, name: "Starter", minCells: 0, color: "#6b7280", icon: "Sprout" },
  { number: 1, name: "Collector", minCells: 100, color: "#22c55e", icon: "Award" },
  { number: 2, name: "Curator", minCells: 300, color: "#3b82f6", icon: "Zap" },
  { number: 3, name: "Architect", minCells: 500, color: "#a855f7", icon: "Building2" },
  { number: 4, name: "Master", minCells: 700, color: "#f59e0b", icon: "Crown" },
  { number: 5, name: "Legend", minCells: 1000, color: "#ef4444", icon: "Flame" },
];

export const CELL_TYPE_OPTIONS: { value: CellType; label: string; color: string }[] = [
  { value: "text", label: "Text", color: "#3b82f6" },
  { value: "link", label: "Link", color: "#8b5cf6" },
  { value: "counter", label: "Counter", color: "#f59e0b" },
  { value: "checkbox", label: "Checkbox", color: "#22c55e" },
  { value: "image", label: "Image", color: "#ec4899" },
  { value: "youtube", label: "YouTube Video", color: "#ef4444" },
  { value: "youtube-short", label: "YouTube Short", color: "#dc2626" },
  { value: "instagram-reel", label: "Instagram Reel", color: "#e1306c" },
  { value: "instagram-profile", label: "Instagram Profile", color: "#c13584" },
  { value: "twitter", label: "Twitter/X", color: "#1da1f2" },
  { value: "pinterest", label: "Pinterest", color: "#e60023" },
  { value: "video", label: "Video", color: "#6366f1" },
  { value: "input", label: "Input", color: "#14b8a6" },
];
