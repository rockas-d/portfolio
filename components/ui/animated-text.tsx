"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

export function AnimatedText({
  text,
  className = "",
  delay = 0,
  once = true,
  as: Component = "div",
}: AnimatedTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    hidden: {
      opacity: 0,
      y: 50,
      rotateX: -90,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <m.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
    >
      <Component className="flex flex-wrap">
        {words.map((word, index) => (
          <span key={index} className="mr-[0.25em] overflow-hidden">
            <m.span className="inline-block" variants={child}>
              {word}
            </m.span>
          </span>
        ))}
      </Component>
    </m.div>
  );
}

interface AnimatedLettersProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
}

export function AnimatedLetters({
  text,
  className = "",
  delay = 0,
  staggerDelay = 0.03,
  once = true,
}: AnimatedLettersProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const letters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  const child = {
    hidden: {
      opacity: 0,
      y: "100%",
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <m.div
      ref={ref}
      className={`overflow-hidden ${className}`}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      aria-label={text}
    >
      <span className="inline-flex">
        {letters.map((letter, index) => (
          <span key={index} className="overflow-hidden">
            <m.span
              className="inline-block"
              variants={child}
              style={{ whiteSpace: letter === " " ? "pre" : "normal" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </m.span>
          </span>
        ))}
      </span>
    </m.div>
  );
}
