"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import Link from "next/link";
import { Crosshair } from "@/components/ui";

interface Service {
  id: string;
  title: string;
}

const services: Service[] = [
  { id: "01", title: "Experience Strategy & Design" },
  { id: "02", title: "Frontend Development" },
  { id: "03", title: "Creative Direction" },
  { id: "04", title: "Motion & Interaction" },
  { id: "05", title: "Technical Consulting" },
];

function ServiceItem({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-t border-border"
    >
      <div className="relative py-6 flex items-center justify-between group cursor-default transition-colors duration-300">
        <div className="absolute inset-0 -inset-y-4 bg-[#d4ff00] scale-y-0 group-hover:scale-y-100 origin-center transition-transform duration-300" />
        <h3 className="relative heading-lg group-hover:text-muted-foreground transition-colors">
          {service.title}
        </h3>
        <span className="relative mono text-xs text-muted-foreground">
          [ {service.id} ]
        </span>
      </div>
    </m.div>
  );
}

export function Services() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding bg-[#f5f5f5] text-[#0a0a0a]">
      <div className="container-full">
        <div className="grid-asymmetric">
          <div>
            <m.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="sticky top-32"
            >
              <div className="flex items-center gap-4 mb-4">
                <Crosshair className="text-[#737373]" />
                <span className="mono text-xs text-[#737373]">[ 02 ]</span>
              </div>
              <h2 className="text-sm font-medium tracking-wider uppercase mb-8">
                CAPABILITIES
              </h2>

              <div className="aspect-square max-w-xs bg-[#0a0a0a] flex items-center justify-center">
                <span className="mono text-xs text-[#fafafa]">[ IMAGE ]</span>
              </div>
            </m.div>
          </div>

          <div>
            <div className="mb-8">
              {services.map((service, index) => (
                <ServiceItem key={service.id} service={service} index={index} />
              ))}
              <div className="border-t border-[#d4d4d4]" />
            </div>

            <m.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 mono text-xs text-[#737373] hover:text-[#0a0a0a] transition-colors"
              >
                <span>START A PROJECT</span>
                <span>→</span>
              </Link>
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
}
