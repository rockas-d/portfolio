"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useScroll, useTransform } from "motion/react";

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      <m.div style={{ y, opacity }} className="px-4 md:px-8">
        <m.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h1 className="display-huge text-muted-foreground/30">CREATIVE</h1>
          <h1 className="display-huge">DEVELOPER</h1>
        </m.div>
      </m.div>
    </section>
  );
}
