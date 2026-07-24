"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

interface ConfettiOverlayProps {
  show: boolean;
}

export function ConfettiOverlay({ show }: ConfettiOverlayProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (show) {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      <ReactConfetti
        width={dimensions.width}
        height={dimensions.height}
        recycle={false}
        numberOfPieces={400}
        colors={["#3b82f6", "#a855f7", "#22c55e", "#f59e0b", "#ef4444", "#ec4899"]}
      />
    </div>
  );
}
