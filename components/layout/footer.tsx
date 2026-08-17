"use client";

import Link from "next/link";
import { Crosshair } from "@/components/ui";

const internalLinks = [
  { href: "/", label: "HOME" },
  { href: "/about", label: "ABOUT" },
  { href: "/work", label: "PROJECTS" },
  { href: "/contact", label: "CONTACT" },
];

const externalLinks = [
  { href: "https://github.com/rockas-d", label: "GITHUB" },
  { href: "https://linkedin.com/in/demetriosrockas", label: "LINKEDIN" },
];

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0" style={{ background: "#fc5858", color: "#0a0a0a" }}>
      <div className="px-4 md:px-8 py-8 md:py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 lg:gap-16">
          <div className="flex flex-col gap-6 md:gap-10">
            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-3">FIND ME</p>
              <address className="not-italic mono text-xl md:text-2xl">
                SEATTLE, WA
              </address>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-3">INTERNAL</p>
              <ul className="space-y-2">
                {internalLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="mono text-xl md:text-2xl hover:opacity-60 transition-opacity"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs uppercase tracking-widest opacity-60 mb-3">EXTERNAL</p>
              <ul className="space-y-2">
                {externalLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mono text-xl md:text-2xl hover:opacity-60 transition-opacity"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-right">
            <a
              href="mailto:demetrios@rockas.dev"
              className="inline-block max-w-full"
            >
              <h2 className="font-black uppercase leading-none tracking-tight mb-2 md:mb-4 text-[clamp(1.25rem,5vw,2rem)] sm:text-[clamp(1.5rem,6vw,3rem)] md:text-[clamp(2rem,7vw,5rem)] lg:text-[clamp(2.5rem,8vw,8rem)] xl:text-[clamp(3rem,9vw,10rem)]">DEMETRIOS@</h2>
              <span className="font-extrabold uppercase leading-none tracking-tight text-[clamp(1rem,4vw,1.5rem)] sm:text-[clamp(1.25rem,5vw,2rem)] md:text-[clamp(1.5rem,5.5vw,3.5rem)] lg:text-[clamp(2rem,6.5vw,6rem)] xl:text-[clamp(2.5rem,7vw,8rem)] block">ROCKAS.DEV</span>
            </a>

            <div className="mt-8">
              <p className="heading-lg">LET&apos;S BUILD</p>
              <p className="heading-lg">TOGETHER</p>
            </div>
          </div>
        </div>

        <div className="mt-8 md:mt-16 pt-6 md:pt-8 border-t border-[#0a0a0a]/20 flex justify-between items-center">
          <Crosshair />
          <p className="mono text-xs opacity-60">
            © {new Date().getFullYear()} DEMETRIOS ROCKAS
          </p>
        </div>
      </div>
    </footer>
  );
}
