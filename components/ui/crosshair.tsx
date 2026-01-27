"use client";

import { cn } from "@/lib/utils";

interface CrosshairProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Crosshair({ className, size = "md" }: CrosshairProps) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div className="absolute top-1/2 left-0 right-0 h-px bg-current" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-current" />
    </div>
  );
}

export function CrosshairMarker({ className }: { className?: string }) {
  return (
    <div className={cn("text-muted-foreground", className)}>
      <Crosshair size="md" />
    </div>
  );
}
