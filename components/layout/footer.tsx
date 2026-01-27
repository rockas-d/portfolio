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
    <footer style={{ background: "#d4ff00", color: "#0a0a0a" }}>
      <div className="px-4 md:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-16">
          <div className="flex flex-col gap-10">
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
              href="mailto:hello@demetriosrockas.com"
              className="inline-block"
            >
              <h2 className="display-huge mb-8">HELLO@</h2>
              <span className="display-large block">DEMETRIOSROCKAS.COM</span>
            </a>

            <div className="mt-8">
              <p className="heading-lg">LET&apos;S BUILD</p>
              <p className="heading-lg">TOGETHER</p>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-[#0a0a0a]/20 flex justify-between items-center">
          <Crosshair />
          <p className="mono text-xs opacity-60">
            © {new Date().getFullYear()} DEMETRIOS ROCKAS
          </p>
        </div>
      </div>
    </footer>
  );
}
