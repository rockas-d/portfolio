"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { Header, Footer } from "@/components/layout";
import { CustomCursor, MouseTracker, Crosshair } from "@/components/ui";

const projects = [
  {
    id: "01",
    title: "Luris AI",
    category: "AI Platform for Law Firms",
    year: "TBD",
    image: "/work/luris.png",
    href: "/work/luris",
    stack: [
      "TypeScript",
      "Next.js",
      "Tailwind",
      "Python",
      "vLLM",
      "PostgreSQL",
      "REST API",
    ],
  },
  {
    id: "02",
    title: "Vertex",
    category: "Math Visualization Tool",
    year: "2026",
    image: "/work/vertex.png",
    href: "/work/vertex",
    stack: ["TypeScript", "Three.js", "WebGL", "GLSL Shaders"],
  },
  {
    id: "03",
    title: "Mural Studios",
    category: "Production Studio Website",
    year: "2026",
    image: "/work/mural.png",
    href: "/work/mural",
    stack: ["TypeScript", "Next.js", "Tailwind", "PostgreSQL"],
  },
  {
    id: "04",
    title: "Forma",
    category: "Design System & Component Library",
    year: "2025",
    image: "/work/forma.png",
    href: "/work/forma",
    stack: ["TypeScript", "React", "Motion", "Radix UI", "Storybook"],
  },
  {
    id: "05",
    title: "XAScale",
    category: "Creative Direction, AI Hardware",
    year: "2025",
    image: "/work/xascale.png",
    href: "/work/xascale",
    stack: ["TypeScript", "Next.js", "Tailwind"],
  },
  {
    id: "06",
    title: "Pulse",
    category: "Analytics Dashboard Concept",
    year: "2024",
    image: "/work/pulse.png",
    href: "/work/pulse",
    stack: ["TypeScript", "Next.js", "D3.js", "Framer Motion"],
  },
  {
    id: "07",
    title: "Portfolio",
    category: "Personal Website",
    year: "2026",
    image: "/work/portfolio.png",
    href: "/work/portfolio",
    stack: ["TypeScript", "Next.js", "Three.js", "Tailwind", "Motion"],
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={project.href} className="group block">
        <div className="relative aspect-16/10 bg-muted mb-6 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="mono text-xs text-muted-foreground">
                [ IMAGE ]
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="heading-lg mb-2 group-hover:text-muted-foreground transition-colors">
              {project.title}
            </h3>
            <p className="mono text-xs text-muted-foreground">
              {project.category}
            </p>
            {project.stack && (
              <p className="mono text-xs text-muted-foreground/60 mt-2">
                {project.stack.join(" · ")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <span className="mono text-xs text-muted-foreground whitespace-nowrap">
              {project.year}
            </span>
            <span className="mono text-xs text-muted-foreground whitespace-nowrap">
              [ {project.id} ]
            </span>
          </div>
        </div>
      </Link>
    </m.div>
  );
}

export default function WorkPage() {
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

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
                  SELECTED WORK
                </span>
              </div>

              <m.h1
                initial={{ opacity: 0, y: 40 }}
                animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="display-large mb-32 md:mb-0"
              >
                PROJECTS &<br />
                CASE STUDIES
              </m.h1>
            </div>
          </section>

          <section className="section-padding">
            <div className="container-full">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
                {projects.map((project, index) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
}
