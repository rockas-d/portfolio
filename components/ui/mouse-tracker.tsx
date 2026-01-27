"use client";

import { useEffect, useState } from "react";

export function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed top-8 right-80 z-40 hidden lg:flex items-center gap-6 mono text-xs text-muted-foreground">
      <span>X : {position.x.toString().padStart(4, " ")}</span>
      <span>Y : {position.y.toString().padStart(4, " ")}</span>
    </div>
  );
}
