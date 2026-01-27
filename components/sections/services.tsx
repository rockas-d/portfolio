"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";

interface Capability {
  id: string;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    id: "01",
    title: "I Build the Whole Thing",
    description: "Frontend, backend, database, deployment — I don't throw it over a wall to someone else.",
  },
  {
    id: "02",
    title: "AI That Actually Works",
    description: "Not chatbots slapped onto landing pages. Real AI products that solve real problems.",
  },
  {
    id: "03",
    title: "Pixels That Move Right",
    description: "The scroll that feels like butter. The details that make something feel alive.",
  },
  {
    id: "04",
    title: "Math Meets Art",
    description: "Shaders, generative systems, visualizations. The web is a canvas.",
  },
];

function CapabilityPanel({ capability, index }: { capability: Capability; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`min-h-screen flex items-center sticky top-0 overflow-hidden ${
        isEven ? "bg-[#0a0a0a] text-[#fafafa]" : "bg-[#fc5858] text-[#0a0a0a]"
      }`}
    >
      <m.div
        initial={{ opacity: 0, x: isEven ? -100 : 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isEven ? -100 : 100 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className={`absolute ${isEven ? "-left-8 lg:-left-16" : "-right-8 lg:-right-16"} top-1/2 -translate-y-1/2 pointer-events-none select-none`}
      >
        <span 
          className={`font-black text-[40vw] leading-none ${
            isEven ? "text-[#ffffff08]" : "text-[#0a0a0a10]"
          }`}
        >
          {capability.id}
        </span>
      </m.div>

      <div className="container-full w-full py-24 relative z-10">
        <div className={`flex flex-col ${isEven ? "items-start" : "items-end text-right"}`}>
          <m.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className={`mono text-xs mb-6 ${isEven ? "text-[#737373]" : "text-[#0a0a0a]/50"}`}
          >
            [ {capability.id} / 04 ]
          </m.div>

          <m.h2
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="display-large mb-8 max-w-4xl"
          >
            {capability.title}
          </m.h2>

          <m.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`h-px w-32 mb-8 ${isEven ? "bg-[#333] origin-left" : "bg-[#0a0a0a]/30 origin-right"}`}
          />

          <m.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className={`body-lg max-w-xl ${isEven ? "text-[#999]" : "text-[#0a0a0a]/70"}`}
          >
            {capability.description}
          </m.p>
        </div>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section className="relative">
      {capabilities.map((capability, index) => (
        <CapabilityPanel key={capability.id} capability={capability} index={index} />
      ))}
    </section>
  );
}
