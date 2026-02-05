"use client";

import { useRef } from "react";
import { useParams, notFound } from "next/navigation";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { CustomCursor, MouseTracker, Crosshair } from "@/components/ui";

interface Project {
  slug: string;
  title: string;
  category: string;
  year: string;
  image: string | null;
  href: string;
  stack: string[];
  description: string;
  challenge: string;
  solution: string;
  results?: string;
  isExternal?: boolean;
}

const projects: Record<string, Project> = {
  luris: {
    slug: "luris",
    title: "Luris AI",
    category: "AI Platform for Law Firms",
    year: "TBD",
    image: "/work/luris.png",
    href: "https://luris.ai",
    stack: [
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Python",
      "vLLM",
      "PostgreSQL",
      "REST API",
    ],
    description:
      "An AI-powered platform designed to streamline legal research and document analysis for law firms of all sizes.",
    challenge:
      "Law firms spend countless hours on repetitive research tasks and document review. The existing tools were either too expensive or too complex for smaller practices.",
    solution:
      "Built a conversational AI interface that lets lawyers query case law, analyze contracts, and draft documents using natural language. The backend uses vLLM for fast inference and a custom RAG pipeline for accurate legal citations.",
    results: "Currently in development, launching soon.",
    isExternal: true,
  },
  mural: {
    slug: "mural",
    title: "Mural Studios",
    category: "Production Studio Website",
    year: "2026",
    image: "/work/mural.png",
    href: "https://muralstudios.co",
    stack: ["TypeScript", "Next.js", "Tailwind", "PostgreSQL"],
    description:
      "A bold, cinematic website for a Seattle-based video production studio specializing in commercials, music videos, and documentary work.",
    challenge:
      "Mural needed a site that matched the quality of their video work — something that felt cinematic and immersive, not like a typical agency template.",
    solution:
      "Designed and built a video-forward experience with full-bleed backgrounds, smooth transitions, and a dark aesthetic that lets their work take center stage. Integrated a custom CMS for easy project updates.",
    results:
      "The new site better represents their brand and has improved client inquiries.",
    isExternal: true,
  },
  xascale: {
    slug: "xascale",
    title: "XAScale",
    category: "Creative Direction, AI Hardware",
    year: "2025",
    image: "/work/xascale.png",
    href: "https://xascale.ai",
    stack: ["TypeScript", "Next.js", "Tailwind"],
    description:
      "Brand identity and web presence for an AI hardware startup building next-generation inference accelerators.",
    challenge:
      "XAScale needed to stand out in a crowded AI hardware market while communicating complex technical concepts to both engineers and investors.",
    solution:
      "Developed a visual identity that balances technical credibility with approachability. The website uses clean typography and subtle animations to explain their technology without overwhelming visitors.",
    isExternal: true,
  },
  vertex: {
    slug: "vertex",
    title: "Vertex",
    category: "Math Visualization Tool",
    year: "2026",
    image: "/work/vertex.png",
    href: "https://vertex.cafe",
    stack: ["TypeScript", "Three.js", "WebGL", "GLSL Shaders"],
    isExternal: true,
    description:
      "A WebGL-powered sandbox for exploring mathematics visually — from matrix transformations and Fourier decomposition to parametric surfaces and strange attractors. Part educational tool, part creative playground, built for anyone who learns by seeing.",
    challenge:
      "Mathematical intuition lives in three dimensions, but most people learn from static textbook diagrams and abstract notation. The gap between understanding an equation and feeling what it does — watching a matrix shear space, seeing an integral accumulate volume, tracing the chaos of a Lorenz attractor — is where most learners get lost.",
    solution:
      "Built a real-time 3D environment where users write equations and watch geometry respond instantly. The core is a live editor: type a parametric function, see a Möbius strip unfold; adjust matrix values, watch basis vectors rotate and stretch. Custom GLSL shaders handle smooth rendering at 60fps while keeping the interface responsive — even when plotting fractals with millions of iterations or trailing particles through chaotic systems. Educational presets cover linear algebra fundamentals (eigenvalues, transformations, projections) and calculus concepts (tangent planes, surface integrals), while an open playground mode lets users explore their own equations or dive into the aesthetic side: fractal zooms, strange attractors, procedural surfaces.",
    results:
      "Used as both a teaching aid for linear algebra and calculus courses and a creative tool for generating mathematical art — proving that rigor and beauty aren't mutually exclusive.",
  },
  forma: {
    slug: "forma",
    title: "Forma",
    category: "Design System & Component Library",
    year: "2025",
    image: "/work/forma.png",
    href: "/work/forma",
    stack: ["TypeScript", "React", "Motion", "Radix UI", "Storybook"],
    description:
      "A CLI-first design system that treats motion as foundational, not decorative. Run `npx forma add` to scaffold accessible components with built-in animation orchestration — own the code, customize everything.",
    challenge:
      "Design systems treat animation as an afterthought — a sprinkle of fade-ins added during polish phase. The result? Inconsistent motion, jarring transitions, and teams reinventing enter/exit/hover states for every component. Meanwhile, CLI-based approaches like shadcn/ui proved developers want ownership over their component code, not black-box dependencies.",
    solution:
      "Forma combines the copy-paste ownership model with animation-first architecture. Every component includes composable motion presets (enter, exit, hover, focus, loading states) that automatically orchestrate with siblings. The CLI scaffolds fully accessible React components into your project — you own the code, modify freely, and the motion primitives stay in sync. Built on Radix primitives for accessibility, Motion for animations, and a token system that separates timing/easing from visual styles.",
    results:
      "A personal toolkit that I use across client projects — proving that motion and accessibility can be baked in from the start, not bolted on later.",
  },
  pulse: {
    slug: "pulse",
    title: "Pulse",
    category: "Analytics Dashboard Concept",
    year: "2024",
    image: "/work/pulse.png",
    href: "/work/pulse",
    stack: ["TypeScript", "Next.js", "D3.js", "Framer Motion"],
    description:
      "A real-time analytics dashboard that surfaces insights before data — using progressive disclosure and cinematic data visualization to make complex metrics feel intuitive, not overwhelming.",
    challenge:
      "Most dashboards are built for data, not decisions. They present walls of charts and expect users to find the story themselves. The result: executives glance at top-line numbers and ignore everything else, while the insights that matter get buried three clicks deep. Dashboards shouldn't require a data science degree to understand.",
    solution:
      "Pulse inverts the traditional dashboard hierarchy. An insight engine analyzes streaming data and surfaces anomalies, trends, and opportunities as narrative cards — 'Revenue up 23% vs. last Tuesday, driven by mobile traffic from the product launch.' Tapping a card reveals the trend visualization; tapping again exposes the granular data. Every chart animates with purpose using D3.js and Framer Motion, making real-time WebSocket updates feel fluid rather than jarring. The dark interface with luminous accent glows keeps focus on the data that matters.",
    results:
      "A concept exploring how analytics can tell stories instead of just displaying numbers — designed to reduce time-to-insight from minutes to seconds.",
  },
  portfolio: {
    slug: "portfolio",
    title: "Portfolio",
    category: "Personal Website",
    year: "2026",
    image: "/work/portfolio.png",
    href: "/",
    stack: ["TypeScript", "Next.js", "Three.js", "Tailwind", "Motion"],
    description:
      "A bold, immersive portfolio website built to showcase creative development work — featuring WebGL effects, smooth animations, and massive typography inspired by award-winning studios.",
    challenge:
      "Most developer portfolios look the same — minimal grids, safe typography, forgettable. Standing out requires something that feels crafted, not templated, while still being fast and accessible.",
    solution:
      "Built a custom Next.js site with a WebGL morphing blob as the centerpiece, smooth Lenis scrolling, and a custom cursor system. Every interaction is intentional — from the sticky header reveal to the parallax services section. The design system uses massive display typography and a dark theme with a single accent color for maximum impact.",
    results:
      "A portfolio that practices what it preaches — demonstrating creative development skills through the site itself, not just describing them.",
  },
};

export default function CaseStudyPage() {
  const params = useParams();
  const slug = params.slug as string;
  const project = projects[slug];

  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLElement>(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isContentInView = useInView(contentRef, {
    once: true,
    margin: "-100px",
  });

  if (!project) {
    notFound();
  }

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
                  {project.category.toUpperCase()}
                </span>
              </div>

              <m.h1
                initial={{ opacity: 0, y: 40 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="display-large mb-8"
              >
                {project.title.toUpperCase()}
              </m.h1>

              <m.div
                initial={{ opacity: 0 }}
                animate={isHeroInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-6 mono text-xs text-muted-foreground mb-32 md:mb-0"
              >
                <span>[ {project.year} ]</span>
              </m.div>
            </div>
          </section>

          {project.image && (
            <section>
              <div className="container-full py-12">
                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative aspect-video bg-black overflow-hidden"
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </m.div>
              </div>
            </section>
          )}

          <section
            ref={contentRef}
            className="section-padding border-t border-border"
          >
            <div className="container-full">
              <div className="max-w-3xl">
                {project.isExternal && (
                  <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                  >
                    <a
                      href={project.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mono text-xs bg-accent text-accent-foreground px-4 py-2 hover:opacity-80 transition-opacity"
                    >
                      <span>VISIT SITE</span>
                      <span>→</span>
                    </a>
                  </m.div>
                )}

                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: project.isExternal ? 0.1 : 0 }}
                  className="mb-16"
                >
                  <span className="mono text-xs text-muted-foreground mb-4 block">
                    [ OVERVIEW ]
                  </span>
                  <p className="heading-lg">{project.description}</p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-16"
                >
                  <span className="mono text-xs text-muted-foreground mb-4 block">
                    [ STACK ]
                  </span>
                  <p className="body-lg text-muted-foreground">
                    {project.stack.join(" · ")}
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-16"
                >
                  <span className="mono text-xs text-muted-foreground mb-4 block">
                    [ THE CHALLENGE ]
                  </span>
                  <p className="body-lg text-muted-foreground">
                    {project.challenge}
                  </p>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-16"
                >
                  <span className="mono text-xs text-muted-foreground mb-4 block">
                    [ THE SOLUTION ]
                  </span>
                  <p className="body-lg text-muted-foreground">
                    {project.solution}
                  </p>
                </m.div>

                {project.results && (
                  <m.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={isContentInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mb-16"
                  >
                    <span className="mono text-xs text-muted-foreground mb-4 block">
                      [ RESULTS ]
                    </span>
                    <p className="body-lg text-muted-foreground">
                      {project.results}
                    </p>
                  </m.div>
                )}

              </div>
            </div>
          </section>

          <section className="section-padding border-t border-border">
            <div className="container-full">
              <div className="flex items-center justify-between">
                <Link
                  href="/work"
                  className="inline-flex items-center gap-2 mono text-xs hover:text-muted-foreground transition-colors"
                >
                  <span>←</span>
                  <span>ALL PROJECTS</span>
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
