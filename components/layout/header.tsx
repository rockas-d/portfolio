"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";

const navItems = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const HEADER_HEIGHT = 73;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerTop, setHeaderTop] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    setHeaderTop(window.innerHeight - HEADER_HEIGHT);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const heroBottom = window.innerHeight - HEADER_HEIGHT;
    const newTop = Math.max(0, heroBottom - latest);
    setHeaderTop(newTop);
    setIsSticky(latest >= heroBottom);
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <>
      <header 
        className={`fixed left-0 right-0 z-50 ${
          isSticky 
            ? "bg-background border-b border-border" 
            : "border-t border-border"
        }`}
        style={{ top: headerTop }}
      >
        <div className="container-full py-6 flex items-center justify-between">
          <Link href="/" className="font-bold text-sm tracking-tight">
            DEMETRIOS ROCKAS
          </Link>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="mono text-xs tracking-wider hover:opacity-60 transition-opacity"
          >
            [ MENU ]
          </button>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background"
          >
            <div className="container-full py-6 flex justify-between items-center">
              <Link
                href="/"
                onClick={() => setIsMenuOpen(false)}
                className="font-bold text-sm tracking-tight"
              >
                DEMETRIOS ROCKAS
              </Link>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="mono text-xs tracking-wider hover:opacity-60 transition-opacity"
              >
                [ CLOSE ]
              </button>
            </div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-12 left-0 container-full flex gap-8 mono text-xs text-muted-foreground"
            >
              <a
                href="https://github.com/rockas-d"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                GITHUB
              </a>
              <a
                href="https://linkedin.com/in/demetriosrockas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                LINKEDIN
              </a>
            </m.div>

            <div className="absolute bottom-12 right-0 container-full flex flex-col items-end">
              <nav className="text-right">
                <ul className="space-y-2">
                  {navItems.map((item, index) => (
                    <m.li
                      key={item.href}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="block py-2 display-huge relative group"
                      >
                        <span className="absolute inset-0 bg-foreground scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />
                        <span className="relative mix-blend-difference">{item.label}</span>
                      </Link>
                    </m.li>
                  ))}
                </ul>
              </nav>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
