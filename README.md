# IHATEFLYINGBUGS Team Site

> We grow education, naturally

## Overview

A warm, tactile, editorially-designed team website for IHATEFLYINGBUGS, an edtech R&D company. The site showcases our educational platform ecosystem and serves as a hiring platform for developers and designers.

## Design Philosophy

- **Visual Language**: Halftone geometric illustrations + nature motifs
- **Color Palette**: Warm earth tones (parchment, moss, earth, forest)
- **Typography**: Editorial style with Fraunces serif + Space Grotesk sans
- **Interactions**: Experimental and interactive (mouse tracking, parallax, generative elements)
- **Tone**: Technology rooted in humanity

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Fonts**: next/font (Fraunces, Space Grotesk, JetBrains Mono)

### Backend (Future)
- FastAPI (Python)
- Node.js

## Project Structure

```
team_site/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Homepage
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── sections/         # Page sections
│   ├── halftone/         # Halftone-related components
│   └── ui/               # Reusable UI components
├── lib/                   # Utilities and config
│   ├── design-tokens.ts  # Design system tokens
│   └── fonts.ts          # Font configuration
└── public/               # Static assets

```

## Getting Started

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Design System

See [WIREFRAMES.md](./WIREFRAMES.md) for detailed wireframes and component specs.

### Color Palette

```typescript
parchment: #F2EDE0  // Background
moss: #3D6B47       // Primary
earth: #6B4F2A      // Secondary
forest: #2C3A28     // Text
amber: #D4824A      // Accent
terracotta: #C87854 // Accent
sage: #A5B5A3       // Muted
```

### Typography Scale

- **Display**: 72px/80px Fraunces (Hero headlines)
- **H1**: 48px Fraunces
- **H2**: 32px Fraunces
- **Body**: 16px/18px Space Grotesk
- **Code**: JetBrains Mono

### Spacing

Editorial spacing with generous whitespace:
- Section padding: 8rem - 12rem
- Grid gutter: 2rem
- Component gap: 1.5rem - 2rem

## Key Sections

1. **Hero: The Forest** - Halftone forest with growth metaphor
2. **Philosophy: Mountain Layers** - Parallax mountains with manifesto
3. **Ecosystem: Product Garden** - Service showcase with botanical halftones
4. **How We Build: Root System** - Tech stack visualization
5. **People: Growing Team** - Team culture + open positions
6. **Footer: Connect** - Contact information

## Development Roadmap

- [x] Phase 1: Project setup & structure
- [x] Phase 2: Design tokens & typography
- [ ] Phase 3: Halftone system (fork halftone-simulator)
- [ ] Phase 4: Section components
- [ ] Phase 5: Interactions & animations
- [ ] Phase 6: Content & polish

## Performance

- Server-side rendering (SSR) for initial load
- Lazy loading for heavy halftone effects
- Optimized images (WebP, progressive JPEG)
- Canvas-based halftones for complex animations
- SVG for static/simple halftone elements

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Progressive enhancement for older browsers
- Graceful degradation for halftone effects

## License

© 2026 IHATEFLYINGBUGS. All rights reserved.

---

**We grow education, naturally.**
