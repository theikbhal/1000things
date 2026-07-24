"use client";

import { useState } from "react";
import { CellData, CellType } from "@/lib/types";
import {
  FileText, Link2, Hash, CheckSquare, Image,
  Film, Music, Camera,
  MessageCircle, Pin, Video, Type,
  GripHorizontal
} from "lucide-react";
import { CELL_SIZE_MAP } from "@/lib/constants";

const typeIcons: Record<CellType, React.ReactNode> = {
  text: <FileText size={14} />,
  link: <Link2 size={14} />,
  counter: <Hash size={14} />,
  checkbox: <CheckSquare size={14} />,
  image: <Image size={14} />,
  youtube: <Film size={14} />,
  "youtube-short": <Film size={14} />,
  "instagram-reel": <Music size={14} />,
  "instagram-profile": <Camera size={14} />,
  twitter: <MessageCircle size={14} />,
  pinterest: <Pin size={14} />,
  video: <Video size={14} />,
  input: <Type size={14} />,
};

const typeColors: Record<CellType, string> = {
  text: "bg-blue-100 text-blue-700 border-blue-200",
  link: "bg-purple-100 text-purple-700 border-purple-200",
  counter: "bg-amber-100 text-amber-700 border-amber-200",
  checkbox: "bg-green-100 text-green-700 border-green-200",
  image: "bg-pink-100 text-pink-700 border-pink-200",
  youtube: "bg-red-100 text-red-700 border-red-200",
  "youtube-short": "bg-rose-100 text-rose-700 border-rose-200",
  "instagram-reel": "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
  "instagram-profile": "bg-violet-100 text-violet-700 border-violet-200",
  twitter: "bg-sky-100 text-sky-700 border-sky-200",
  pinterest: "bg-orange-100 text-orange-700 border-orange-200",
  video: "bg-indigo-100 text-indigo-700 border-indigo-200",
  input: "bg-teal-100 text-teal-700 border-teal-200",
};

interface CellCardProps {
  cell?: CellData;
  row: number;
  col: number;
  isSelected: boolean;
  size: "sm" | "md" | "lg" | "xl";
  onClick: () => void;
  onTypeChange: (type: CellType) => void;
}

export function CellCard({ cell, row, col, isSelected, size, onClick, onTypeChange }: CellCardProps) {
  const [editing, setEditing] = useState(false);
  const [inputValue, setInputValue] = useState(cell?.value || "");

  const sizeClasses = CELL_SIZE_MAP[size];
  const isFilled = !!cell;

  const handleDoubleClick = () => {
    setEditing(true);
    setInputValue(cell?.value || "");
  };

  const handleInputBlur = () => {
    setEditing(false);
    if (cell && inputValue !== cell.value) {
    }
  };

  const renderContent = () => {
    if (!cell) {
      return (
        <div className="flex items-center justify-center w-full h-full text-zinc-300">
          <GripHorizontal size={16} />
        </div>
      );
    }

    if (editing && (cell.type === "text" || cell.type === "input")) {
      return (
        <input
          className="w-full h-full bg-transparent text-center text-xs outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={handleInputBlur}
          autoFocus
        />
      );
    }

    switch (cell.type) {
      case "checkbox":
        return (
          <div className="flex items-center justify-center w-full h-full">
            <CheckSquare
              size={20}
              className={cell.checked ? "text-green-500" : "text-zinc-300"}
            />
          </div>
        );

      case "counter":
        return (
          <div className="flex items-center justify-center w-full h-full">
            <span className="text-lg font-bold text-amber-600">{cell.count || 0}</span>
          </div>
        );

      case "image":
        return cell.value ? (
          <div className="w-full h-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={cell.value}
              alt={cell.label || ""}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23ccc'><rect width='24' height='24'/></svg>";
              }}
            />
          </div>
        ) : (
          <Image size={20} className="text-zinc-300" />
        );

      case "youtube":
      case "youtube-short":
      case "video":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full gap-1">
            <Film size={20} className="text-red-500" />
            {cell.label && <span className="text-[10px] truncate max-w-full px-1">{cell.label}</span>}
          </div>
        );

      case "instagram-reel":
      case "instagram-profile":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full gap-1">
            <Camera size={20} className="text-fuchsia-500" />
            {cell.label && <span className="text-[10px] truncate max-w-full px-1">{cell.label}</span>}
          </div>
        );

      case "twitter":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full gap-1">
            <MessageCircle size={20} className="text-sky-500" />
            {cell.label && <span className="text-[10px] truncate max-w-full px-1">{cell.label}</span>}
          </div>
        );

      case "pinterest":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full gap-1">
            <Pin size={20} className="text-orange-500" />
            {cell.label && <span className="text-[10px] truncate max-w-full px-1">{cell.label}</span>}
          </div>
        );

      case "link":
        return (
          <div className="flex flex-col items-center justify-center w-full h-full gap-1 p-1">
            <Link2 size={16} className="text-purple-500" />
            {cell.label && <span className="text-[10px] truncate max-w-full">{cell.label}</span>}
          </div>
        );

      case "text":
      case "input":
      default:
        return (
          <div className="flex items-center justify-center w-full h-full p-1">
            <span className="text-[10px] leading-tight text-center line-clamp-3">
              {cell.value || "..."}
            </span>
          </div>
        );
    }
  };

  return (
    <div
      className={`
        ${sizeClasses}
        border-2 rounded-lg cursor-pointer select-none
        transition-all duration-150 ease-in-out
        flex flex-col items-center justify-center
        relative overflow-hidden group
        ${isFilled ? typeColors[cell!.type] : "bg-zinc-50 border-zinc-200 text-zinc-400"}
        ${isSelected ? "ring-2 ring-blue-500 ring-offset-1 scale-105 shadow-lg" : "hover:border-zinc-400 hover:shadow-md"}
      `}
      onClick={onClick}
      onDoubleClick={handleDoubleClick}
    >
      {cell && (
        <div className="absolute top-0.5 right-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-[9px] bg-white/80 rounded px-1 shadow-sm">
            {typeIcons[cell.type]}
          </div>
        </div>
      )}
      <div className="w-full h-full flex items-center justify-center">
        {renderContent()}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
}
