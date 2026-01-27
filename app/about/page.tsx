"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { CustomCursor, MouseTracker, Crosshair, ClientMarquee } from "@/components/ui";

const skills = [
  { category: "Development", items: ["React", "Next.js", "TypeScript", "Node.js", "Python", "PostgreSQL"] },
  { category: "Design", items: ["Figma", "Motion Design", "UI/UX", "Prototyping"] },
  { category: "Tools", items: ["Git", "Docker", "AWS", "Vercel", "GraphQL", "REST APIs"] },
];

const experience = [
  {
    role: "Creative Developer",
    company: "Freelance",
    period: "2022 — Present",
    description: "Building digital experiences for brands and startups.",
  },
  {
    role: "Frontend Developer",
    company: "Tech Company",
    period: "2020 — 2022",
    description: "Led frontend development for enterprise applications.",
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const bioRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLElement>(null);
  
  const isHeroInView = useInView(heroRef, { once: true });
  const isBioInView = useInView(bioRef, { once: true, margin: "-100px" });
  const isSkillsInView = useInView(skillsRef, { once: true, margin: "-100px" });

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
              <span className="mono text-xs text-muted-foreground">ABOUT ME</span>
            </div>

            <m.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="display-large"
            >
              CREATIVE<br />DEVELOPER<br />& DESIGNER
            </m.h1>
          </div>
        </section>

        <section ref={bioRef} className="section-padding border-t border-border">
          <div className="container-full">
            <div className="grid-asymmetric items-start">
              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={isBioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <Image
                  src="/me/me1.webp"
                  alt="Demetrios Rockas"
                  width={600}
                  height={800}
                  className="w-full h-auto"
                />
                <Crosshair className="absolute -top-2 -left-2 text-muted-foreground" />
                <Crosshair className="absolute -top-2 -right-2 text-muted-foreground" />
              </m.div>

              <m.div
                initial={{ opacity: 0, y: 30 }}
                animate={isBioInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="mono text-xs text-muted-foreground mb-8 block">[ BIO ]</span>
                
                <div className="space-y-6 mb-12">
                  <p className="heading-lg">
                    I'm Demetrios Rockas, a creative developer based in Seattle, WA.
                  </p>
                  <p className="body-lg text-muted-foreground">
                    I specialize in crafting digital experiences where design and code intersect. 
                    With a focus on motion, interaction, and visual aesthetics, I build websites 
                    and applications that feel alive and memorable.
                  </p>
                  <p className="body-lg text-muted-foreground">
                    My approach combines technical expertise with creative vision, ensuring every 
                    project not only functions flawlessly but also tells a compelling story through 
                    thoughtful design and purposeful interactions.
                  </p>
                  <p className="body-lg text-muted-foreground">
                    When I'm not coding, you can find me exploring new technologies, contributing 
                    to open-source projects, or seeking inspiration in architecture and contemporary art.
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 mono text-xs hover:text-muted-foreground transition-colors"
                >
                  <span>GET IN TOUCH</span>
                  <span>→</span>
                </Link>
              </m.div>
            </div>
          </div>
        </section>

        <ClientMarquee />

        <section ref={skillsRef} className="section-padding border-t border-border">
          <div className="container-full">
            <div className="flex items-center gap-4 mb-12">
              <Crosshair className="text-muted-foreground" />
              <span className="mono text-xs text-muted-foreground">SKILLS & TOOLS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {skills.map((skillGroup, groupIndex) => (
                <m.div
                  key={skillGroup.category}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: groupIndex * 0.1 }}
                >
                  <h3 className="heading-md mb-6">{skillGroup.category}</h3>
                  <ul className="space-y-3">
                    {skillGroup.items.map((skill) => (
                      <li key={skill} className="mono text-sm text-muted-foreground">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding border-t border-border">
          <div className="container-full">
            <div className="flex items-center gap-4 mb-12">
              <Crosshair className="text-muted-foreground" />
              <span className="mono text-xs text-muted-foreground">EXPERIENCE</span>
            </div>

            <div className="space-y-0">
              {experience.map((job, index) => (
                <m.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isSkillsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="border-t border-border py-8 grid grid-cols-1 lg:grid-cols-4 gap-4"
                >
                  <div>
                    <span className="mono text-xs text-muted-foreground">{job.period}</span>
                  </div>
                  <div>
                    <h3 className="heading-md">{job.role}</h3>
                  </div>
                  <div>
                    <span className="body-md text-muted-foreground">{job.company}</span>
                  </div>
                  <div>
                    <p className="body-sm text-muted-foreground">{job.description}</p>
                  </div>
                </m.div>
              ))}
              <div className="border-t border-border" />
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "#d4ff00", color: "#0a0a0a" }}>
          <div className="container-full text-center">
            <h2 className="display-medium mb-8">LET'S WORK TOGETHER</h2>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 mono text-sm hover:opacity-60 transition-opacity"
            >
              <span>START A PROJECT</span>
              <span>→</span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
