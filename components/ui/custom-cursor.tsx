"use client";

import { useEffect, useState, useCallback } from "react";
import * as m from "motion/react-m";

interface HoverTarget {
  x: number;
  y: number;
  width: number;
  height: number;
}

type CursorMode = "default" | "button" | "email";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [hoverTarget, setHoverTarget] = useState<HoverTarget | null>(null);
  const [cursorMode, setCursorMode] = useState<CursorMode>("default");

  const isMailtoLink = useCallback((element: Element | null): boolean => {
    if (!element) return false;
    const anchor = element.closest("a");
    const href = anchor?.getAttribute("href") || element.getAttribute("href");
    return href?.startsWith("mailto:") || false;
  }, []);

  const getInteractiveParent = useCallback((element: Element | null): Element | null => {
    if (!element) return null;
    
    const clickable = element.closest("a, button, [role='button']");
    if (clickable) return clickable;
    
    let current: Element | null = element;
    while (current) {
      const hasPointer = window.getComputedStyle(current).cursor === "pointer";
      if (hasPointer && !current.closest("a, button, [role='button']")) {
        return current;
      }
      current = current.parentElement;
    }
    return null;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      const target = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = getInteractiveParent(target);
      
      if (interactive) {
        const isEmail = isMailtoLink(interactive);
        
        if (isEmail) {
          setCursorMode("email");
          setHoverTarget(null);
        } else {
          setCursorMode("button");
          const rect = interactive.getBoundingClientRect();
          setHoverTarget({
            x: rect.left,
            y: rect.top,
            width: rect.width,
            height: rect.height,
          });
        }
      } else {
        setCursorMode("default");
        setHoverTarget(null);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setHoverTarget(null);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [getInteractiveParent, isMailtoLink]);

  const springConfig = {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.5,
  };

  const centerX = hoverTarget ? hoverTarget.x + hoverTarget.width / 2 : position.x;
  const centerY = hoverTarget ? hoverTarget.y + hoverTarget.height / 2 : position.y;
  
  const cornerSize = 12;

  const emailBoxWidth = 180;
  const emailBoxHeight = 44;

  return (
    <>
      <div
        className="fixed inset-0 z-[9999] pointer-events-none hidden lg:block mix-blend-difference"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.2s" }}
      >
        <m.div
          className="absolute top-0 w-px bg-white/30"
          animate={{ 
            x: centerX,
            height: hoverTarget ? hoverTarget.y : "100%",
          }}
          transition={springConfig}
        />
        <m.div
          className="absolute bottom-0 w-px bg-white/30"
          animate={{ 
            x: centerX,
            height: hoverTarget ? `calc(100vh - ${hoverTarget.y + hoverTarget.height}px)` : 0,
          }}
          transition={springConfig}
        />
        <m.div
          className="absolute left-0 h-px bg-white/30"
          animate={{ 
            y: centerY,
            width: hoverTarget ? hoverTarget.x : "100%",
          }}
          transition={springConfig}
        />
        <m.div
          className="absolute right-0 h-px bg-white/30"
          animate={{ 
            y: centerY,
            width: hoverTarget ? `calc(100vw - ${hoverTarget.x + hoverTarget.width}px)` : 0,
          }}
          transition={springConfig}
        />

        <m.div
          className="absolute w-3 h-3 border-b border-r border-white"
          animate={{
            x: hoverTarget ? hoverTarget.x - 12 : position.x,
            y: hoverTarget ? hoverTarget.y - 12 : position.y,
            opacity: hoverTarget ? 1 : 0,
          }}
          transition={springConfig}
        />
        <m.div
          className="absolute w-3 h-3 border-b border-l border-white"
          animate={{
            x: hoverTarget ? hoverTarget.x + hoverTarget.width : position.x,
            y: hoverTarget ? hoverTarget.y - 12 : position.y,
            opacity: hoverTarget ? 1 : 0,
          }}
          transition={springConfig}
        />
        <m.div
          className="absolute w-3 h-3 border-t border-r border-white"
          animate={{
            x: hoverTarget ? hoverTarget.x - 12 : position.x,
            y: hoverTarget ? hoverTarget.y + hoverTarget.height : position.y,
            opacity: hoverTarget ? 1 : 0,
          }}
          transition={springConfig}
        />
        <m.div
          className="absolute w-3 h-3 border-t border-l border-white"
          animate={{
            x: hoverTarget ? hoverTarget.x + hoverTarget.width : position.x,
            y: hoverTarget ? hoverTarget.y + hoverTarget.height : position.y,
            opacity: hoverTarget ? 1 : 0,
          }}
          transition={springConfig}
        />

        <m.div
          className="absolute"
          animate={{
            x: position.x - 20,
            y: position.y - 20,
            opacity: cursorMode === "default" ? 1 : 0,
          }}
          transition={springConfig}
        >
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <line x1="20" y1="4" x2="20" y2="36" stroke="white" strokeWidth="1" />
            <line x1="4" y1="20" x2="36" y2="20" stroke="white" strokeWidth="1" />
          </svg>
        </m.div>
      </div>

      <m.div
        className="fixed z-[9999] pointer-events-none hidden lg:flex items-center justify-center whitespace-nowrap font-medium text-sm"
        style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.2s" }}
        animate={{
          x: position.x - (cursorMode === "email" ? emailBoxWidth / 2 : 20),
          y: position.y - (cursorMode === "email" ? emailBoxHeight / 2 : 20),
          width: cursorMode === "email" ? emailBoxWidth : 40,
          height: cursorMode === "email" ? emailBoxHeight : 40,
          opacity: cursorMode === "email" ? 1 : 0,
        }}
        transition={springConfig}
      >
        <div className="absolute inset-0 bg-[#0a0a0a]" />
        <div className="absolute -top-3 -left-3 w-3 h-3 border-b border-r border-white mix-blend-difference" />
        <div className="absolute -top-3 -right-3 w-3 h-3 border-b border-l border-white mix-blend-difference" />
        <div className="absolute -bottom-3 -left-3 w-3 h-3 border-t border-r border-white mix-blend-difference" />
        <div className="absolute -bottom-3 -right-3 w-3 h-3 border-t border-l border-white mix-blend-difference" />
        <span className="relative text-white mix-blend-difference">
          {cursorMode === "email" && "SHOOT ME AN EMAIL"}
        </span>
      </m.div>
    </>
  );
}
