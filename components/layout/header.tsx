"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import * as m from "motion/react-m";
import { AnimatePresence, useScroll, useMotionValueEvent } from "motion/react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const HEADER_HEIGHT = 73;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [headerTop, setHeaderTop] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const [anchorBottom, setAnchorBottom] = useState(0);
  const { scrollY } = useScroll();

  const getAnchorBottom = useCallback(() => {
    const anchor = document.querySelector("[data-header-anchor]");
    if (anchor) {
      return (
        anchor.getBoundingClientRect().bottom + window.scrollY - HEADER_HEIGHT
      );
    }
    return window.innerHeight - HEADER_HEIGHT;
  }, []);

  useEffect(() => {
    const bottom = getAnchorBottom();
    setAnchorBottom(bottom);
    setHeaderTop(bottom);
  }, [getAnchorBottom]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const newTop = Math.max(0, anchorBottom - latest);
    setHeaderTop(newTop);
    setIsSticky(latest >= anchorBottom);
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
        className={`fixed left-0 right-0 z-50 border-t border-b border-border ${
          isSticky ? "bg-background" : ""
        }`}
        style={{ top: headerTop }}
      >
        <div className="container-full pt-6 pb-8 md:py-6 flex items-center justify-between">
          <Link href="/" className="font-bold text-sm tracking-tight">
            ROCKAS.DEV
          </Link>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="mono text-xs md:text-base tracking-wider hover:opacity-60 transition-opacity"
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
                ROCKAS.DEV
              </Link>

              <button
                onClick={() => setIsMenuOpen(false)}
                className="mono text-xs md:text-base tracking-wider hover:opacity-60 transition-opacity"
              >
                [ CLOSE ]
              </button>
            </div>

            <m.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="hidden lg:flex absolute bottom-12 left-0 container-full gap-8 mono text-xs text-muted-foreground"
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
                        className="block py-2 display-large relative group"
                      >
                        <span className="absolute inset-0 bg-accent scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-300" />
                        <span className="relative group-hover:text-accent-foreground transition-colors">
                          {item.label}
                        </span>
                      </Link>
                    </m.li>
                  ))}
                </ul>

                <m.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="lg:hidden flex justify-end gap-6 mt-8 mono text-xs text-muted-foreground"
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
              </nav>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
