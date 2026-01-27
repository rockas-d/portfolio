# AGENTS.md — AI Agent Guidelines

This document provides context for AI agents working on this codebase.

## Project Overview

**Type:** Personal portfolio website
**Owner:** Demetrios Rockas
**Style:** Awwwards-inspired, dark theme, massive typography, WebGL effects
**Inspiration:** [Studio Dialect](https://studiodialect.com)

## Tech Stack

| Layer | Technology | Version |
|-------|------------|---------|
| Framework | Next.js (App Router) | 16.1.5 |
| Runtime | React | 19 |
| Language | TypeScript | 5 |
| Styling | Tailwind CSS | 4 |
| Animation | Motion (Framer Motion) | 12 |
| Animation | GSAP | 3.14 |
| 3D | Three.js + React Three Fiber | r182 |
| Scroll | Lenis | 1.3 |
| UI | Radix UI | latest |

## Architecture

### Directory Structure

```
app/                    # Next.js App Router pages
├── page.tsx           # Home (/)
├── layout.tsx         # Root layout
├── globals.css        # Design system
├── about/page.tsx     # About (/about)
├── work/page.tsx      # Work (/work)
└── contact/page.tsx   # Contact (/contact)

components/
├── ui/                # Atomic UI components
├── sections/          # Page section components
├── layout/            # Header, Footer
└── providers/         # Context providers

lib/                   # Utilities
public/me/             # Personal photos
```

### Component Hierarchy

```
RootLayout
└── Providers (Lenis + Motion)
    └── Page
        ├── CustomCursor (global)
        ├── MouseTracker (global)
        ├── Header
        ├── main
        │   └── Sections...
        └── Footer
```

## Design System

### Colors (CSS Variables)

| Variable | Value | Usage |
|----------|-------|-------|
| `--background` | `#0a0a0a` | Page background |
| `--foreground` | `#fafafa` | Primary text |
| `--accent` | `#d4ff00` | Lime highlights, CTAs |
| `--accent-foreground` | `#0a0a0a` | Text on accent |
| `--muted-foreground` | `#737373` | Secondary text |
| `--border` | `#262626` | Borders, dividers |

### Typography Classes

| Class | Size | Usage |
|-------|------|-------|
| `.display-huge` | `clamp(3rem, 20vw, 25rem)` | Hero headlines, menu links |
| `.display-large` | `clamp(2.5rem, 10vw, 9rem)` | Page titles |
| `.display-medium` | `clamp(2rem, 6vw, 5rem)` | Section titles |
| `.heading-xl` | `clamp(1.5rem, 4vw, 3rem)` | Large headings |
| `.heading-lg` | `clamp(1.25rem, 2.5vw, 2rem)` | Subheadings |
| `.heading-md` | `clamp(1rem, 1.5vw, 1.25rem)` | Small headings |
| `.body-lg` | `clamp(1rem, 1.25vw, 1.25rem)` | Large body text |
| `.body-md` | `1rem` | Default body |
| `.body-sm` | `0.875rem` | Small text |
| `.mono` | Geist Mono | Code, labels |

### Layout Classes

| Class | Description |
|-------|-------------|
| `.container-full` | Max-width container with responsive padding |
| `.section-padding` | Vertical section padding |
| `.grid-asymmetric` | 1fr / 1.5fr grid (mobile: stacked) |
| `.grid-asymmetric-reverse` | 1.5fr / 1fr grid |

## Code Patterns

### Page Template

Every page follows this structure:

```tsx
"use client";

import { useRef } from "react";
import * as m from "motion/react-m";
import { useInView } from "motion/react";
import { Header, Footer } from "@/components/layout";
import { CustomCursor, MouseTracker, Crosshair } from "@/components/ui";

export default function PageName() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true });

  return (
    <>
      <CustomCursor />
      <MouseTracker />
      <Header />
      <main>
        {/* Sections */}
      </main>
      <Footer />
    </>
  );
}
```

### Animation Pattern

Use Motion (Framer Motion) with `useInView`:

```tsx
import * as m from "motion/react-m";
import { useInView } from "motion/react";

const ref = useRef<HTMLElement>(null);
const isInView = useInView(ref, { once: true, margin: "-100px" });

<m.div
  ref={ref}
  initial={{ opacity: 0, y: 40 }}
  animate={isInView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.8 }}
>
  Content
</m.div>
```

### Section Header Pattern

```tsx
<div className="flex items-center gap-4 mb-8">
  <Crosshair className="text-muted-foreground" />
  <span className="mono text-xs text-muted-foreground">SECTION LABEL</span>
</div>
```

### Lime Accent Section

```tsx
<section className="section-padding" style={{ background: "#d4ff00", color: "#0a0a0a" }}>
  <div className="container-full">
    {/* Content */}
  </div>
</section>
```

### Link Hover Pattern

```tsx
<Link
  href="/path"
  className="mono text-xs hover:text-muted-foreground transition-colors"
>
  LINK TEXT
</Link>
```

## Component Guidelines

### CustomCursor (`components/ui/custom-cursor.tsx`)

The custom cursor system provides:
- Full-screen crosshair lines following cursor
- Button hover: Lines split, inverted L corners appear OUTSIDE the element
- Email hover: Dark box with "SHOOT ME AN EMAIL" text
- All hover elements use `mix-blend-difference`

**Important:** The cursor detects `mailto:` links automatically for email hover state.

### Blob (`components/ui/blob.tsx`)

WebGL morphing blob with:
- Multi-octave simplex noise for organic deformation
- Mouse interaction via raycasting (proper camera unprojection)
- Lime (#d4ff00) color splashes on mouse proximity
- Multi-light setup with fresnel and rim lighting

**Props:**
- `noiseScale`: Displacement intensity
- `noiseSpeed`: Animation speed  
- `mouseInfluence`: Cursor reactivity

### Header (`components/layout/header.tsx`)

Sticky header behavior:
1. Starts positioned at bottom of hero section
2. Becomes fixed at viewport top after scrolling past hero
3. Contains full-screen menu overlay

### Footer (`components/layout/footer.tsx`)

Lime background with:
- Left: Location, internal links, external links
- Right: Large email CTA ("HELLO@" + "DEMETRIOSROCKAS.COM")

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | kebab-case | `custom-cursor.tsx` |
| Pages | `page.tsx` in route folder | `app/about/page.tsx` |
| Utilities | kebab-case | `lib/utils.ts` |
| Index exports | `index.ts` | `components/ui/index.ts` |

## Import Conventions

Use path aliases:

```tsx
// Good
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

// Avoid
import { Button } from "../../../components/ui";
```

## State Management

- **No global state library** — Use React Context for shared state
- **Animation state** — Handled by Motion/GSAP internally
- **Scroll state** — Managed by Lenis provider
- **Cursor state** — Local state in CustomCursor component

## Performance Considerations

1. **Images**: Use `next/image` with proper width/height
2. **Animations**: Use `will-change` sparingly, prefer `transform` and `opacity`
3. **Three.js**: Dispose geometries and materials on unmount
4. **Fonts**: Already optimized via `next/font`

## Testing

No test suite configured. When adding tests:
- Use Vitest for unit tests
- Use Playwright for E2E tests
- Focus on critical user flows

## Common Tasks

### Adding a New Page

1. Create `app/[route]/page.tsx`
2. Follow the page template pattern above
3. Add link to header menu in `components/layout/header.tsx`
4. Add link to footer in `components/layout/footer.tsx`

### Adding a New Section

1. Create component in `components/sections/`
2. Export from `components/sections/index.ts`
3. Import and use in page

### Adding a New UI Component

1. Create in `components/ui/`
2. Export from `components/ui/index.ts`
3. Follow existing patterns (motion animations, className props)

### Modifying the Cursor

Edit `components/ui/custom-cursor.tsx`:
- `hoveredElement` state controls hover detection
- `emailHovered` state for mailto links
- Corner positioning is calculated based on element bounds

## Contact Info Locations

When updating personal info, check these files:

| Info | Files |
|------|-------|
| Email | `footer.tsx`, `contact/page.tsx`, `about/page.tsx` |
| Location | `footer.tsx`, `contact/page.tsx` |
| GitHub | `footer.tsx`, `contact/page.tsx` |
| LinkedIn | `footer.tsx`, `contact/page.tsx` |
| Name | `header.tsx`, `footer.tsx`, `about/page.tsx` |

## Known Patterns to Preserve

1. **Cursor corners are OUTSIDE the hovered element** — Not inside
2. **Lime sections use inline styles** — `style={{ background: "#d4ff00" }}`
3. **All pages have CustomCursor + MouseTracker** — Required for cursor system
4. **Motion import** — Use `import * as m from "motion/react-m"`
5. **Uppercase text** — Headlines and labels use uppercase via CSS or manually

## Anti-Patterns to Avoid

1. **Don't use CSS-in-JS** — Use Tailwind classes
2. **Don't add global state libraries** — Keep it simple with Context
3. **Don't modify cursor without understanding the corner math**
4. **Don't use `framer-motion` import** — Use `motion` package instead
5. **Don't skip Header/Footer/Cursor on pages** — All pages need them
