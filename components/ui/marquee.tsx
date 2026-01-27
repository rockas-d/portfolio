"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  pauseOnHover?: boolean;
  repeat?: number;
}

export function Marquee({
  children,
  className,
  speed = 30,
  direction = "left",
  pauseOnHover = true,
  repeat = 4,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className={cn("group flex overflow-hidden", className)}
      style={{ "--duration": `${speed}s` } as React.CSSProperties}
    >
      {Array.from({ length: repeat }).map((_, i) => (
        <m.div
          key={i}
          className={cn(
            "flex shrink-0 items-center gap-phi-xl",
            direction === "left"
              ? "animate-marquee-left"
              : "animate-marquee-right",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{
            animationDuration: `${speed}s`,
          }}
        >
          {children}
        </m.div>
      ))}
    </div>
  );
}

interface MarqueeTextProps {
  text: string;
  className?: string;
  speed?: number;
  direction?: "left" | "right";
  separator?: string;
  repeat?: number;
}

export function MarqueeText({
  text,
  className,
  speed = 30,
  direction = "left",
  separator = "•",
  repeat = 6,
}: MarqueeTextProps) {
  return (
    <Marquee
      className={className}
      speed={speed}
      direction={direction}
      repeat={repeat}
    >
      <span className="flex items-center gap-phi-xl text-nowrap">
        <span>{text}</span>
        <span className="text-muted-foreground">{separator}</span>
      </span>
    </Marquee>
  );
}
