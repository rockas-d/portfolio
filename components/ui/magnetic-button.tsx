"use client";

import { useRef, useState } from "react";
import * as m from "motion/react-m";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  as?: "button" | "a";
  href?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.382,
  onClick,
  as = "button",
  href,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = as === "a" ? m.a : m.button;

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      <Component
        href={href}
        onClick={onClick}
        animate={{ x: position.x, y: position.y }}
        transition={{
          type: "spring",
          stiffness: 161.8,
          damping: 16.18,
          mass: 0.1,
        }}
        className={cn(
          "relative inline-flex items-center justify-center",
          "px-phi-xl py-phi-md font-mono text-phi-sm uppercase tracking-wider",
          "border border-border rounded-full",
          "bg-transparent hover:bg-foreground hover:text-background",
          "transition-colors",
          className
        )}
        style={{ transitionDuration: "0.382s" }}
      >
        {children}
      </Component>
    </div>
  );
}

interface MagneticIconButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
}

export function MagneticIconButton({
  children,
  className,
  strength = 0.382,
  onClick,
}: MagneticIconButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = (clientX - left - width / 2) * strength;
    const y = (clientY - top - height / 2) * strength;

    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      className="relative inline-block"
    >
      <m.button
        onClick={onClick}
        animate={{ x: position.x, y: position.y }}
        transition={{
          type: "spring",
          stiffness: 161.8,
          damping: 16.18,
          mass: 0.1,
        }}
        className={cn(
          "relative inline-flex items-center justify-center",
          "w-phi-2xl h-phi-2xl rounded-full",
          "border border-border",
          "bg-transparent hover:bg-foreground hover:text-background",
          "transition-colors",
          className
        )}
        style={{
          width: "var(--space-phi-2xl)",
          height: "var(--space-phi-2xl)",
          transitionDuration: "0.382s",
        }}
      >
        {children}
      </m.button>
    </div>
  );
}
