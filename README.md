# Demetrios Rockas — Portfolio

An Awwwards-style portfolio website built with Next.js 16, featuring immersive animations, WebGL effects, and a bold typographic design system.

![Next.js](https://img.shields.io/badge/Next.js-16.1.5-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=flat-square&logo=tailwind-css)
![Three.js](https://img.shields.io/badge/Three.js-r182-black?style=flat-square&logo=three.js)

## Features

### Design System
- **Massive Typography** — Display sizes up to 20vw for high-impact headlines
- **Dark Theme** — `#0a0a0a` background with `#fafafa` foreground
- **Lime Accent** — `#d4ff00` accent color for CTAs and highlights
- **Geist Font** — Clean, modern typeface optimized for web

### Interactive Elements
- **Custom Crosshair Cursor** — Full-screen crosshair lines that follow the cursor
  - Inverted L-shaped corners appear on button hover
  - "SHOOT ME AN EMAIL" tooltip on mailto links
  - `mix-blend-difference` for automatic color inversion
- **WebGL Morphing Blob** — Organic icosahedron with simplex noise displacement
  - Mouse-reactive ripple effects
  - Lime color splashes on interaction
  - Multi-light shading with fresnel and rim lighting
- **Magnetic Buttons** — Subtle magnetic pull effect on hover
- **Smooth Scrolling** — Lenis for buttery smooth scroll experience

### Pages
| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero with blob, services, about preview, featured work |
| Work | `/work` | Project grid with hover effects |
| About | `/about` | Bio, skills, experience timeline |
| Contact | `/contact` | Contact info with lime CTA section |

### Layout Components
- **Sticky Header** — Starts at hero bottom, sticks to viewport top on scroll
- **Full-Screen Menu** — Overlay menu with massive typography links
- **Lime Footer** — High-contrast footer with email CTA

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Animation | Motion (Framer Motion), GSAP |
| 3D Graphics | Three.js, React Three Fiber, Drei |
| Smooth Scroll | Lenis |
| Forms | React Hook Form, Zod |
| UI Primitives | Radix UI |

## Project Structure

```
├── app/
│   ├── page.tsx              # Home page
│   ├── layout.tsx            # Root layout with providers
│   ├── globals.css           # Design system & utilities
│   ├── about/page.tsx        # About page
│   ├── work/page.tsx         # Work/projects page
│   └── contact/page.tsx      # Contact page
├── components/
│   ├── ui/                   # Reusable UI components
│   │   ├── custom-cursor.tsx # Crosshair cursor system
│   │   ├── blob.tsx          # WebGL morphing blob
│   │   ├── hero-blob.tsx     # Blob wrapper for hero
│   │   ├── marquee.tsx       # Infinite scroll marquee
│   │   ├── crosshair.tsx     # Static crosshair icon
│   │   └── ...
│   ├── sections/             # Page sections
│   │   ├── hero.tsx
│   │   ├── services.tsx
│   │   ├── about-preview.tsx
│   │   └── featured-work.tsx
│   ├── layout/               # Layout components
│   │   ├── header.tsx
│   │   └── footer.tsx
│   └── providers/            # Context providers
│       ├── lenis-provider.tsx
│       ├── motion-provider.tsx
│       └── providers.tsx
├── lib/
│   ├── utils.ts              # Utility functions (cn)
│   └── gsap.ts               # GSAP configuration
└── public/
    └── me/                   # Personal photos
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/rockas-d/portfolio.git
cd portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with Turbopack |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |

## Customization

### Personal Information

Update your details in the following files:

1. **Contact Info** — `components/layout/footer.tsx`
   ```tsx
   const externalLinks = [
     { href: "https://github.com/YOUR_USERNAME", label: "GITHUB" },
     { href: "https://linkedin.com/in/YOUR_PROFILE", label: "LINKEDIN" },
   ];
   ```

2. **Email** — Search for `hello@demetriosrockas.com` and replace globally

3. **Location** — Update "SEATTLE, WA" in footer and contact page

4. **Photos** — Replace images in `public/me/`

### Colors

Edit CSS variables in `app/globals.css`:

```css
:root {
  --background: #0a0a0a;      /* Main background */
  --foreground: #fafafa;      /* Main text */
  --accent: #d4ff00;          /* Lime accent */
  --muted-foreground: #737373; /* Secondary text */
  --border: #262626;          /* Border color */
}
```

### Typography

Adjust display sizes in `app/globals.css`:

```css
.display-huge {
  font-size: clamp(3rem, 20vw, 25rem);
}

.display-large {
  font-size: clamp(2.5rem, 10vw, 9rem);
}

.display-medium {
  font-size: clamp(2rem, 6vw, 5rem);
}
```

### Blob Appearance

Modify the WebGL blob in `components/ui/blob.tsx`:
- `noiseScale` — Displacement intensity
- `noiseSpeed` — Animation speed
- `mouseInfluence` — Reactivity to cursor
- `accentColor` — Splash color on interaction

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/rockas-d/portfolio)

### Other Platforms

```bash
# Build for production
npm run build

# The output is in .next/
# Deploy using your platform's Node.js adapter
```

**Environment Requirements:**
- Node.js 18+ runtime
- No environment variables required for basic deployment

## Browser Support

- Chrome 90+
- Firefox 90+
- Safari 15+
- Edge 90+

WebGL required for blob effects. Gracefully degrades on unsupported browsers.

## Performance

- Static page generation for all routes
- Optimized font loading with `next/font`
- Image optimization with `next/image`
- Code splitting per route
- Turbopack for fast development builds

## License

MIT
