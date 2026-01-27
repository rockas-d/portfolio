"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Crosshair, ClientMarquee } from "@/components/ui";

export function AboutPreview() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <>
      <ClientMarquee />

      <section ref={ref} className="section-padding-lg border-t border-border">
        <div className="container-full">
          <div className="flex items-center gap-4 mb-4">
            <span className="mono text-xs text-muted-foreground">ABOUT</span>
            <Crosshair className="text-muted-foreground" />
          </div>

          <div className="grid-asymmetric-reverse items-start">
            <div className="relative">
              <Image
                src="/me/me.png"
                alt="Demetrios Rockas"
                width={600}
                height={800}
                className="w-full h-auto object-cover"
              />
              <Crosshair className="absolute -top-2 -left-2 text-muted-foreground" />
              <Crosshair className="absolute -top-2 -right-2 text-muted-foreground" />
            </div>

            <m.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:pt-24"
            >
              <h2 className="display-medium mb-8">
                CREATIVE
                <br />
                DEVELOPER
                <br />& DESIGNER.
              </h2>

              <div className="space-y-6 mb-10">
                <p className="body-lg text-muted-foreground">
                  I&apos;m Demetrios Rockas, a creative developer based in
                  Seattle. I craft digital experiences where design and code
                  intersect.
                </p>
                <p className="body-lg text-muted-foreground">
                  With a focus on motion, interaction, and visual aesthetics, I
                  build websites and applications that feel alive and memorable.
                </p>
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 mono text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>MORE ABOUT ME</span>
                <span>→</span>
              </Link>
            </m.div>
          </div>
        </div>
      </section>
    </>
  );
}
