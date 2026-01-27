"use client";

import { cn } from "@/lib/utils";

const items = [
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "PYTHON",
  "POSTGRESQL",
  "REST",
  "GRAPHQL",
  "NODE.JS",
  "DOCKER",
  "AWS",
  "TAILWIND",
  "FIGMA",
];

interface ClientMarqueeProps {
  className?: string;
  speed?: number;
}

export function ClientMarquee({ className, speed = 30 }: ClientMarqueeProps) {
  return (
    <div className={cn("overflow-hidden py-8 border-y border-border", className)}>
      <div
        className="flex animate-marquee-left"
        style={{ "--duration": `${speed}s` } as React.CSSProperties}
      >
        {[...Array(4)].map((_, i) => (
          <div key={i} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span
                key={`${item}-${i}`}
                className="mx-12 text-2xl md:text-3xl font-bold tracking-tight text-muted-foreground/50 hover:text-foreground transition-colors cursor-default"
              >
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
