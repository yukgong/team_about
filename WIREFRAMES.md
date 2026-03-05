# IHATEFLYINGBUGS Team Site - Wireframes

## Design Philosophy
- **Concept**: Educational ecosystem as organic growth
- **Visual Language**: Halftone + geometric shapes + nature motifs
- **Tone**: Warm, tactile, technically sophisticated
- **Target**: Developer/Designer hiring with edtech platform showcase

---

## 1. HERO SECTION: The Forest

### Layout Specs
```
┌──────────────────────────────────────────────────────────┐
│  Logo (top-left, 24px)                                   │
│                                                           │
│                                                           │
│         [Halftone Forest Illustration]                   │
│              60vh height                                  │
│                                                           │
│                                                           │
│    We grow                                                │
│    education,         ← 72px/80px serif                   │
│    naturally          ← Line height: 0.95                 │
│                                                           │
│                                                           │
│                              Scroll to explore ↓          │
└──────────────────────────────────────────────────────────┘
```

### Visual Elements
- **Background**: Parchment (#F2EDE0)
- **Halftone Forest**:
  - Composed of geometric shapes (●○▲△■□)
  - Moss green (#3D6B47) + Earth brown (#6B4F2A)
  - Density variation for depth (foreground = larger dots, background = smaller)
  - Covers approx 50% of viewport

### Interactions
1. **On Load**:
   - Halftone dots fade in sequentially (0.8s duration)
   - Stagger animation: top-to-bottom

2. **Mouse Movement**:
   - Cursor proximity increases halftone density within 100px radius
   - Creates "light spotlight" effect
   - Smooth transition (0.3s ease-out)

3. **Scroll**:
   - Parallax: Forest moves back at 0.5x scroll speed
   - Headline fades out at 0.8x scroll speed
   - Scroll hint disappears after 50px scroll

### Typography
- **Headline**:
  - Font: Fraunces variable (weight 400)
  - Size: 72px (mobile: 40px)
  - Color: Forest (#2C3A28)
  - Letter-spacing: -0.02em

- **Logo**:
  - Font: Space Grotesk
  - Size: 16px
  - Weight: 500

### Components Needed
- `<HalftoneCanvas />` - WebGL/Canvas-based halftone renderer
- `<ParallaxContainer />` - Scroll-driven animation wrapper
- `<MouseReactive />` - Mouse position tracker

---

## 2. PHILOSOPHY SECTION: Mountain Layers

### Layout Specs
```
┌──────────────────────────────────────────────────────────┐
│                                                           │
│  ▁▁▁▁▁▁▁▁▁▁ Mountain Layer 3 (lightest) ▁▁▁▁▁▁▁▁▁       │
│    ▃▃▃▃▃▃▃▃▃ Mountain Layer 2 (mid) ▃▃▃▃▃▃▃▃            │
│      ▅▅▅▅▅▅▅ Mountain Layer 1 (dark) ▅▅▅▅▅▅             │
│                                                           │
│              Technology begins                            │
│              and ends with people     ← Center-aligned    │
│                                                           │
│              우리는 교육 플랫폼을 만들지만,                    │
│              결국 사람의 성장을 만듭니다.                      │
│                                                           │
│              Education for humans,                        │
│              powered by technology.                       │
│                                                           │
└──────────────────────────────────────────────────────────┘
```

### Visual Elements
- **3 Mountain Layers**:
  - Layer 1 (front): Moss (#3D6B47), dot size 8-12px
  - Layer 2 (mid): Sage (#A5B5A3), dot size 5-8px
  - Layer 3 (back): Sage at 40% opacity, dot size 3-5px
  - All halftone style with geometric shapes

### Interactions
1. **Scroll Parallax**:
   - Layer 1: moves at 0.6x scroll speed
   - Layer 2: moves at 0.4x scroll speed
   - Layer 3: moves at 0.2x scroll speed
   - Text: fixed position (creates depth)

2. **Fade In**:
   - Each text line fades in sequentially on scroll into view
   - Stagger delay: 200ms between lines

### Typography
- **Headline**:
  - Font: Fraunces variable (weight 500)
  - Size: 48px (mobile: 32px)
  - Line height: 1.2

- **Body Copy**:
  - Font: Space Grotesk
  - Size: 18px (mobile: 16px)
  - Line height: 1.6
  - Max-width: 600px (center-aligned)

### Components Needed
- `<ParallaxLayers />` - Multi-layer parallax system
- `<HalftoneShape shape="mountain" />` - SVG path-based halftone
- `<ScrollFadeIn />` - Intersection Observer-based fade

---

## 3. ECOSYSTEM SECTION: Product Garden

### Layout Specs
```
┌──────────────────────────────────────────────────────────┐
│  Our Ecosystem                            ← Left-aligned │
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ [Halftone]  │  │ [Halftone]  │  │ [Halftone]  │     │
│  │   Plant 1   │  │   Plant 2   │  │   Plant 3   │     │
│  │             │  │             │  │             │     │
│  │ Global LMS  │  │ 온라인 과외    │  │ [Product]   │     │
│  │             │  │             │  │             │     │
│  │ For schools │  │ For students│  │ For ___     │     │
│  │ worldwide   │  │ in Korea    │  │             │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
│                                                           │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │
│  │ [Product 4] │  │ [Product 5] │  │ Coming soon │     │
│  └─────────────┘  └─────────────┘  └─────────────┘     │
└──────────────────────────────────────────────────────────┘
```

### Card Specs (each)
- **Dimensions**: 360px × 480px
- **Grid**: 3 columns (desktop), 1 column (mobile)
- **Gap**: 32px

### Visual Elements
- **Default State**:
  - Halftone illustration (full opacity)
  - Each product has unique botanical motif:
    - Global LMS: Connected tree network
    - 온라인 과외: Two plants facing each other
    - Other products: TBD based on product nature
  - White card background
  - Subtle shadow: 0 4px 24px rgba(44, 58, 40, 0.08)

- **Hover State**:
  - Halftone dissolves (opacity: 0.2, 0.5s ease)
  - Product screenshot/video fades in behind
  - Card lifts: translateY(-8px)
  - "Learn more →" CTA appears

### Interactions
1. **Hover**:
   - Halftone transition: opacity 1 → 0.2
   - Image/video reveal from behind
   - Border color: Moss (#3D6B47)
   - CTA button slides up from bottom

2. **Click**:
   - Navigate to product detail page (future)
   - Or open modal with more info

### Typography
- **Product Name**:
  - Font: Fraunces (weight 600)
  - Size: 24px
  - Color: Forest (#2C3A28)

- **Description**:
  - Font: Space Grotesk
  - Size: 16px
  - Color: Forest at 70%
  - Max 2 lines

### Components Needed
- `<ProductCard />` - Card with hover effects
- `<HalftoneOverlay />` - Dissolving halftone layer
- `<GridMasonry />` - Responsive grid layout

---

## 4. HOW WE BUILD SECTION: Root System

### Layout Specs
```
┌──────────────────────────────────────────────────────────┐
│  How We Build                                             │
│                                                           │
│  ════════════════ Ground Line ════════════════            │
│                                                           │
│         [Halftone Root Network]                           │
│           /    |    \    |    \                           │
│         /      |      \  |      \                         │
│       ●        ●        ●●        ●                       │
│     React   Next.js  Python   AI/ML  Design              │
│                                                           │
│  ┌──────────────────┐  ┌──────────────────┐             │
│  │  Our Stack       │  │  Our Process     │             │
│  │  • Frontend      │  │  • Research      │             │
│  │  • Backend       │  │  • Prototype     │             │
│  │  • AI/ML         │  │  • Test          │             │
│  │  • DevOps        │  │  • Iterate       │             │
│  └──────────────────┘  └──────────────────┘             │
└──────────────────────────────────────────────────────────┘
```

### Visual Elements
- **Root Network**:
  - Animated line drawing (SVG path animation)
  - Halftone style: Lines composed of small dots/dashes
  - Color: Earth (#6B4F2A)
  - Each root connects to tech stack icon

- **Tech Stack Icons**:
  - Simple geometric shapes (circles, triangles, squares)
  - Halftone fill pattern
  - Labeled underneath

### Interactions
1. **On Scroll Into View**:
   - Roots draw from top to bottom (2s duration)
   - Each root finishes with icon appearing
   - Stagger: 0.1s delay between roots

2. **Hover on Icon**:
   - Icon scales 1.1x
   - Shows tooltip with tech details
   - Corresponding root line highlights (thicker + brighter)

### Typography
- **Section Title**: 48px Fraunces
- **Stack Labels**: 14px Space Grotesk, uppercase, letter-spacing: 0.05em
- **Body Lists**: 16px Space Grotesk

### Components Needed
- `<AnimatedPath />` - SVG path drawing animation
- `<TechIcon />` - Interactive tech stack icons
- `<HalftonePattern />` - SVG pattern definition

---

## 5. PEOPLE SECTION: Growing Team

### Layout Specs
```
┌──────────────────────────────────────────────────────────┐
│  Growing Team                                             │
│                                                           │
│  Current team                                             │
│  ●  ●  ●  ●  ●  ●  ●  ●   ← Halftone avatars             │
│                                                           │
│  Open positions                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │   [Outline]  │  │   [Outline]  │  │   [Outline]  │  │
│  │              │  │              │  │              │  │
│  │   Frontend   │  │   Product    │  │  Full-stack  │  │
│  │   Developer  │  │   Designer   │  │   Engineer   │  │
│  │              │  │              │  │              │  │
│  │  Apply now → │  │  Apply now → │  │  Apply now → │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                           │
│  "We need builders who care about people,                │
│   designers who code, engineers who design,              │
│   learners who teach."                                   │
│                                                           │
│              [Plant a seed with us →]                    │
│                  ← Large CTA button                      │
└──────────────────────────────────────────────────────────┘
```

### Visual Elements
- **Team Members**:
  - Halftone circular portraits (120px diameter)
  - B&W photos with halftone overlay
  - Horizontal scrollable on mobile

- **Open Position Cards**:
  - Outline of human figure (halftone dots on edges only)
  - "Empty space" visual metaphor
  - Dimensions: 280px × 400px
  - Dotted border in Moss color

### Interactions
1. **Team Member Hover**:
   - Halftone dissolves to show photo
   - Name appears below
   - Subtle scale animation

2. **Position Card Hover**:
   - Fill animation: halftone dots fill from edges to center
   - Border solidifies
   - "Apply now" button color changes

3. **CTA Button**:
   - Primary action button
   - Background: Moss (#3D6B47)
   - Hover: Amber (#D4824A)
   - Large: 200px × 56px

### Typography
- **Section Title**: 48px Fraunces
- **Role Title**: 20px Fraunces (weight 600)
- **Quote**: 24px Space Grotesk, italic
- **CTA**: 18px Space Grotesk (weight 500)

### Components Needed
- `<TeamMember />` - Halftone portrait component
- `<PositionCard />` - Open role card with fill animation
- `<CTAButton />` - Primary action button

---

## 6. FOOTER

### Layout Specs
```
┌──────────────────────────────────────────────────────────┐
│  IHATEFLYINGBUGS                                         │
│                                                           │
│  hello@ihateflyingbugs.com                               │
│  Seoul, Korea                                             │
│                                                           │
│  GitHub  •  LinkedIn  •  Medium                          │
│                                                           │
│  © 2026 IHATEFLYINGBUGS                                  │
│  We grow education, naturally.                            │
└──────────────────────────────────────────────────────────┘
```

### Visual Elements
- **Border Top**: 1px solid Forest at 10% opacity
- **Background**: Parchment (#F2EDE0)
- **Padding**: 64px vertical, 32px horizontal

### Typography
- **Company Name**: 16px Space Grotesk (weight 600)
- **Links**: 14px Space Grotesk
- **Copyright**: 12px Space Grotesk (70% opacity)
- **Tagline**: 12px Space Grotesk, color: Moss

### Interactions
- Link hover: Color changes to Moss (#3D6B47)
- Underline appears on hover

---

## Global Interactions

### Scroll Progress Indicator
- Thin line at top of page
- Color: Moss (#3D6B47)
- Fills 0-100% as user scrolls

### Grid Overlay (Dev Mode)
- Toggle-able isometric grid
- Very low opacity (5%)
- Helps maintain editorial layout

### Cursor
- Custom cursor with halftone dot trail (optional)
- Only on desktop
- Follows mouse with slight delay

---

## Responsive Breakpoints

```
Mobile:   < 768px
Tablet:   768px - 1024px
Desktop:  > 1024px
Wide:     > 1440px
```

### Key Adjustments
- **Mobile**:
  - Single column layouts
  - Reduce halftone complexity for performance
  - Simplified interactions (no hover states)
  - Headline size: 40px → 32px

- **Tablet**:
  - 2 column grid for products
  - Maintain most interactions

- **Desktop**:
  - Full 3 column grid
  - All interactions enabled
  - Larger halftone canvases

---

## Performance Considerations

### Halftone Optimization
1. **Canvas vs SVG**:
   - Use Canvas for large, animated halftones (Hero, Mountains)
   - Use SVG for static or simple halftones (Icons, Cards)

2. **Lazy Loading**:
   - Load halftone effects only when section enters viewport
   - Use Intersection Observer

3. **Reduce on Mobile**:
   - Lower dot density on mobile devices
   - Disable mouse-tracking interactions
   - Use static images for some halftone elements

### Image Strategy
- Product screenshots: WebP format, lazy loaded
- Halftone backgrounds: Preload critical ones
- Team photos: Progressive JPEG

---

## Next Steps for Development

1. **Phase 1: Structure** ✓
   - [x] Next.js setup
   - [x] Basic sections layout
   - [x] Typography system

2. **Phase 2: Design Tokens** (Current)
   - [ ] Finalize color palette
   - [ ] Set up font loading
   - [ ] Create spacing/sizing tokens

3. **Phase 3: Halftone System**
   - [ ] Fork & customize halftone-simulator
   - [ ] Build React component wrapper
   - [ ] Create shape presets (tree, mountain, botanical)

4. **Phase 4: Section Components**
   - [ ] Build each section progressively
   - [ ] Add interactions
   - [ ] Polish animations

5. **Phase 5: Content & Polish**
   - [ ] Final copy
   - [ ] Performance optimization
   - [ ] Cross-browser testing
