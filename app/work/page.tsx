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
    title: "Project Alpha",
    category: "Web Development",
    year: "2024",
    image: null,
    href: "/work/project-alpha",
  },
  {
    id: "02",
    title: "Brand Evolution",
    category: "Creative Direction",
    year: "2024",
    image: null,
    href: "/work/brand-evolution",
  },
  {
    id: "03",
    title: "Digital Experience",
    category: "Frontend Development",
    year: "2023",
    image: null,
    href: "/work/digital-experience",
  },
  {
    id: "04",
    title: "Motion Study",
    category: "Motion & Interaction",
    year: "2023",
    image: null,
    href: "/work/motion-study",
  },
];

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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
        <div className="relative aspect-[16/10] bg-muted mb-6 overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="mono text-xs text-muted-foreground">[ IMAGE ]</span>
            </div>
          )}
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="heading-lg mb-2 group-hover:text-muted-foreground transition-colors">
              {project.title}
            </h3>
            <p className="mono text-xs text-muted-foreground">{project.category}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="mono text-xs text-muted-foreground">{project.year}</span>
            <span className="mono text-xs text-muted-foreground">[ {project.id} ]</span>
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
      <Header />

      <main>
        <section ref={heroRef} className="min-h-[60vh] flex flex-col justify-end section-padding">
          <div className="container-full">
            <div className="flex items-center gap-4 mb-8">
              <Crosshair className="text-muted-foreground" />
              <span className="mono text-xs text-muted-foreground">SELECTED WORK</span>
            </div>

            <m.h1
              initial={{ opacity: 0, y: 40 }}
              animate={isHeroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="display-large"
            >
              PROJECTS &<br />CASE STUDIES
            </m.h1>
          </div>
        </section>

        <section className="section-padding border-t border-border">
          <div className="container-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-16">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
