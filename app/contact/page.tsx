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
      <Header />

      <main>
        <section ref={heroRef} className="min-h-[60vh] flex flex-col justify-end section-padding">
          <div className="container-full">
            <div className="flex items-center gap-4 mb-8">
              <Crosshair className="text-muted-foreground" />
              <span className="mono text-xs text-muted-foreground">CONTACT</span>
            </div>

            <m.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="display-large"
            >
              LET'S BUILD<br />SOMETHING<br />TOGETHER
            </m.h1>
          </div>
        </section>

        <section ref={contentRef} className="section-padding border-t border-border">
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
                      href="mailto:hello@demetriosrockas.com"
                      className="heading-lg hover:text-muted-foreground transition-colors block"
                    >
                      HELLO@DEMETRIOSROCKAS.COM
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
                    Currently accepting new projects for Q1 2026.
                  </p>
                  <p className="body-lg text-muted-foreground">
                    I'm always interested in hearing about new projects, especially 
                    ambitious ones. Whether you're a startup looking to build your 
                    first product or an established company seeking to push creative 
                    boundaries, I'd love to hear from you.
                  </p>
                  <p className="body-lg text-muted-foreground">
                    The best way to reach me is via email. I typically respond 
                    within 24-48 hours.
                  </p>
                </div>

                <div className="border-t border-border pt-8">
                  <span className="mono text-xs text-muted-foreground mb-4 block">[ PREFER A QUICK CHAT? ]</span>
                  <p className="body-md text-muted-foreground">
                    Feel free to connect with me on LinkedIn for a more casual conversation 
                    or to see what I've been working on lately.
                  </p>
                </div>
              </m.div>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "#d4ff00", color: "#0a0a0a" }}>
          <div className="container-full text-center">
            <Crosshair className="mx-auto mb-8 opacity-40" />
            <h2 className="display-medium mb-8">SAY HELLO</h2>
            <a
              href="mailto:hello@demetriosrockas.com"
              className="inline-block"
            >
              <span className="heading-xl hover:opacity-60 transition-opacity">
                HELLO@DEMETRIOSROCKAS.COM
              </span>
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
