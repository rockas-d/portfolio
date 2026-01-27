"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import {
  CustomCursor,
  MouseTracker,
  Crosshair,
  ClientMarquee,
} from "@/components/ui";

const skills = [
  {
    category: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Three.js", "Tailwind", "Motion"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL", "REST APIs"],
  },
  {
    category: "Design & Tools",
    items: ["Figma", "Git", "Docker", "AWS", "Vercel", "Linux"],
  },
];

const experience = [
  {
    role: "Creative Developer",
    company: "Independent",
    period: "2023 — Present",
    description:
      "Working with startups and studios on web, branding, and product.",
  },
  {
    role: "Developer & Designer",
    company: "Various Projects",
    period: "2021 — 2023",
    description:
      "Shipped sites and apps for clients across different industries.",
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
      <div className="relative z-10 bg-background mb-200">
        <Header />

        <main>
          <section
            ref={heroRef}
            data-header-anchor
            className="min-h-[60vh] flex flex-col justify-end section-padding"
          >
            <div className="container-full">
              <div className="flex items-center gap-4 mb-8">
                <Crosshair className="text-muted-foreground" />
                <span className="mono text-xs text-muted-foreground">
                  ABOUT ME
                </span>
              </div>

              <m.h1
                initial={{ opacity: 0, y: 40 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="display-large mb-32 md:mb-0"
              >
                CREATIVE
                <br />
                DEVELOPER
                <br />& DESIGNER
              </m.h1>
            </div>
          </section>

          <section ref={bioRef} className="section-padding">
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
                  <span className="mono text-xs text-muted-foreground mb-8 block">
                    [ BIO ]
                  </span>

                  <div className="space-y-6 mb-12">
                    <p className="heading-lg">
                      I&apos;m Demetrios; a developer and designer based in
                      Seattle.
                    </p>
                    <p className="body-lg text-muted-foreground">
                      I build things end-to-end, from the database and APIs all
                      the way to the pixels on screen. I like understanding the
                      full picture, not just one slice of it.
                    </p>
                    <p className="body-lg text-muted-foreground">
                      I&apos;ve worked with AI startups, production studios, and
                      everything in between. Whether it&apos;s a brand new
                      product or breathing life into an existing one, I care
                      about making things that look great and work even better.
                    </p>
                    <p className="body-lg text-muted-foreground">
                      When I&apos;m not pushing pixels or arguing with
                      TypeScript, you&apos;ll probably find me exploring the
                      city, messing with new tech, or hunting for good coffee.
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

          <section
            ref={skillsRef}
            className="section-padding border-t border-border"
          >
            <div className="container-full">
              <div className="flex items-center gap-4 mb-12">
                <Crosshair className="text-muted-foreground" />
                <span className="mono text-xs text-muted-foreground">
                  SKILLS & TOOLS
                </span>
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
                        <li
                          key={skill}
                          className="mono text-sm text-muted-foreground"
                        >
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
                <span className="mono text-xs text-muted-foreground">
                  EXPERIENCE
                </span>
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
                      <span className="mono text-xs text-muted-foreground">
                        {job.period}
                      </span>
                    </div>
                    <div>
                      <h3 className="heading-md">{job.role}</h3>
                    </div>
                    <div>
                      <span className="body-md text-muted-foreground">
                        {job.company}
                      </span>
                    </div>
                    <div>
                      <p className="body-sm text-muted-foreground">
                        {job.description}
                      </p>
                    </div>
                  </m.div>
                ))}
                <div className="border-t border-border" />
              </div>
            </div>
          </section>

          <section className="section-padding border-t border-border">
            <div className="container-full">
              <div className="flex items-center gap-4 mb-12">
                <Crosshair className="text-muted-foreground" />
                <span className="mono text-xs text-muted-foreground">
                  EDUCATION
                </span>
              </div>

              <div className="grid-asymmetric items-start">
                <div>
                  <h3 className="heading-lg mb-4">
                    Mathematics & Computer Science
                  </h3>
                  <p className="mono text-sm text-muted-foreground">
                    B.S. Degree
                  </p>
                </div>
                <div>
                  <p className="body-lg text-muted-foreground">
                    Studied the fundamentals.. algorithms, data structures,
                    calculus, linear algebra, all that good stuff. Turns out a
                    math background is surprisingly useful when you&apos;re
                    building animations and working with 3D graphics.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
