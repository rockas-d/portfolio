"use client";

import { useRef } from "react";
import Link from "next/link";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import { Crosshair } from "@/components/ui";

interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  href: string;
  image: string;
}

const projects: Project[] = [
  {
    id: "01",
    title: "Project Alpha",
    category: "Web Development",
    year: "2024",
    href: "/work/project-alpha",
    image: "/images/project-1.jpg",
  },
  {
    id: "02",
    title: "Project Beta",
    category: "Design & Development",
    year: "2024",
    href: "/work/project-beta",
    image: "/images/project-2.jpg",
  },
  {
    id: "03",
    title: "Project Gamma",
    category: "Creative Direction",
    year: "2023",
    href: "/work/project-gamma",
    image: "/images/project-3.jpg",
  },
];

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <m.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
    >
      <Link href={project.href} className="group block">
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${isEven ? "" : "lg:direction-rtl"}`}>
          <div className={`relative aspect-[4/3] bg-muted overflow-hidden ${isEven ? "lg:order-1" : "lg:order-2"}`}>
            <div className="absolute inset-0 bg-muted flex items-center justify-center">
              <span className="mono text-xs text-muted-foreground">[ IMAGE ]</span>
            </div>
            <m.div
              className="absolute inset-0 bg-accent/10"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              style={{ transformOrigin: isEven ? "left" : "right" }}
            />
          </div>

          <div className={`${isEven ? "lg:order-2" : "lg:order-1"} ${isEven ? "" : "lg:text-right"}`}>
            <div className={`flex items-center gap-4 mb-4 ${isEven ? "" : "lg:justify-end"}`}>
              <span className="mono text-xs text-muted-foreground">[ {project.id} ]</span>
              <div className="rule flex-1 max-w-24" />
              <span className="mono text-xs text-muted-foreground">{project.year}</span>
            </div>

            <h3 className="display-medium mb-4 group-hover:text-muted-foreground transition-colors">
              {project.title}
            </h3>

            <p className="body-md text-muted-foreground mb-6">{project.category}</p>

            <div className={`flex items-center gap-3 ${isEven ? "" : "lg:justify-end"}`}>
              <span className="mono text-xs group-hover:text-accent transition-colors">
                VIEW PROJECT
              </span>
              <span className="text-muted-foreground group-hover:text-accent transition-colors">→</span>
            </div>
          </div>
        </div>
      </Link>
    </m.div>
  );
}

export function FeaturedWork() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="section-padding border-t border-border">
      <div className="container-full">
        <div className="flex items-start justify-between mb-16">
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <Crosshair className="text-muted-foreground" />
              <span className="mono text-xs text-muted-foreground">[ 01 ]</span>
            </div>
            <h2 className="display-large">SELECTED</h2>
            <h2 className="display-large text-muted-foreground/30">WORK</h2>
          </m.div>

          <m.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="hidden lg:block"
          >
            <Link
              href="/work"
              className="mono text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              [ ALL PROJECTS ]
            </Link>
          </m.div>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </div>

        <m.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="lg:hidden mt-12"
        >
          <Link
            href="/work"
            className="mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            [ ALL PROJECTS ] →
          </Link>
        </m.div>
      </div>
    </section>
  );
}
