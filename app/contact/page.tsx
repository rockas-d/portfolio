"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import { Header, Footer } from "@/components/layout";
import { CustomCursor, MouseTracker, Crosshair } from "@/components/ui";

const socials = [
  { label: "GITHUB", href: "https://github.com/rockas-d" },
  { label: "LINKEDIN", href: "https://linkedin.com/in/demetriosrockas" },
];

export default function ContactPage() {
  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(contentRef, { once: true, margin: "-100px" });

  return (
    <>
      <CustomCursor />
      <MouseTracker />
      <div className="relative z-10 bg-background mb-[800px]">
        <Header />

        <main>
        <section ref={heroRef} data-header-anchor className="min-h-[60vh] flex flex-col justify-end section-padding">
          <div className="container-full">
            <div className="flex items-center gap-4 mb-8">
              <Crosshair className="text-muted-foreground" />
              <span className="mono text-xs text-muted-foreground">CONTACT</span>
            </div>

            <m.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="display-large mb-32 md:mb-0"
            >
              LET'S BUILD<br />SOMETHING<br />TOGETHER
            </m.h1>
          </div>
        </section>

        <section ref={contentRef} className="section-padding">
          <div className="container-full">
            <div className="grid-asymmetric items-start">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="space-y-12">
                  <div>
                    <span className="mono text-xs text-muted-foreground mb-4 block">[ EMAIL ]</span>
                    <a
                      href="mailto:demetrios@rockas.dev"
                      className="heading-lg hover:text-muted-foreground transition-colors block"
                    >
                      DEMETRIOS@ROCKAS.DEV
                    </a>
                  </div>

                  <div>
                    <span className="mono text-xs text-muted-foreground mb-4 block">[ LOCATION ]</span>
                    <address className="not-italic heading-md">
                      SEATTLE, WA
                    </address>
                  </div>

                  <div>
                    <span className="mono text-xs text-muted-foreground mb-4 block">[ SOCIALS ]</span>
                    <ul className="space-y-3">
                      {socials.map((social) => (
                        <li key={social.label}>
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mono text-lg hover:text-muted-foreground transition-colors"
                          >
                            {social.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="mono text-xs text-muted-foreground mb-8 block">[ AVAILABILITY ]</span>

                <div className="space-y-6 mb-12">
                  <p className="heading-lg">
                    Currently heads down at Luris.
                  </p>
                  <p className="body-lg text-muted-foreground">
                    I'm working full-time on building Luris AI, so I'm not taking on 
                    new freelance projects at the moment. That said, I'm always happy 
                    to chat — whether it's about a potential collaboration down the road, 
                    interesting ideas, or just to connect.
                  </p>
                  <p className="body-lg text-muted-foreground">
                    Drop me an email and I'll get back to you when I can.
                  </p>
                </div>

                <div className="border-t border-border pt-8">
                  <span className="mono text-xs text-muted-foreground mb-4 block">[ LET'S CONNECT ]</span>
                  <p className="body-md text-muted-foreground">
                    Find me on LinkedIn or GitHub to see what I'm up to. 
                    Always down to talk tech, design, or whatever's on your mind.
                  </p>
                </div>
              </m.div>
            </div>
          </div>
        </section>

      </main>
      </div>

      <Footer />
    </>
  );
}
