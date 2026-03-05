/**
 * Design Tokens for IHATEFLYINGBUGS Team Site
 * Based on warm, tactile, editorial design direction
 */

export const colors = {
  // Primary Palette - Warm & Natural
  parchment: '#F2EDE0',
  moss: '#3D6B47',
  earth: '#6B4F2A',
  forest: '#2C3A28',

  // Accent Colors - Energy & Warmth
  amber: '#D4824A',
  terracotta: '#C87854',
  sage: '#A5B5A3',

  // Semantic Colors
  background: '#F2EDE0',
  foreground: '#2C3A28',
  muted: '#A5B5A3',
  accent: '#D4824A',
} as const;

export const typography = {
  // Font Families (will be loaded via next/font)
  fontSerif: 'var(--font-serif)', // Fraunces Variable
  fontSans: 'var(--font-sans)',   // Space Grotesk
  fontMono: 'var(--font-mono)',   // JetBrains Mono

  // Font Sizes - Editorial Scale
  sizes: {
    xs: '0.75rem',    // 12px
    sm: '0.875rem',   // 14px
    base: '1rem',     // 16px
    lg: '1.125rem',   // 18px
    xl: '1.25rem',    // 20px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    '4xl': '2.5rem',  // 40px
    '5xl': '3rem',    // 48px
    '6xl': '4rem',    // 64px
    '7xl': '4.5rem',  // 72px
    '8xl': '5rem',    // 80px
  },

  // Line Heights
  leading: {
    none: '1',
    tight: '1.2',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
  },

  // Letter Spacing
  tracking: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },

  // Font Weights
  weights: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
} as const;

export const spacing = {
  // Editorial Spacing Scale (generous)
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
  40: '10rem',    // 160px
  48: '12rem',    // 192px
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(44, 58, 40, 0.05)',
  base: '0 4px 6px -1px rgba(44, 58, 40, 0.1)',
  md: '0 4px 24px rgba(44, 58, 40, 0.08)',
  lg: '0 10px 40px -3px rgba(44, 58, 40, 0.12)',
  xl: '0 20px 60px -10px rgba(44, 58, 40, 0.15)',
  none: 'none',
} as const;

export const transitions = {
  // Durations
  fast: '150ms',
  base: '300ms',
  slow: '500ms',
  slower: '800ms',

  // Easings - Natural, organic feel
  easeOut: 'cubic-bezier(0.33, 1, 0.68, 1)',
  easeIn: 'cubic-bezier(0.32, 0, 0.67, 0)',
  easeInOut: 'cubic-bezier(0.65, 0, 0.35, 1)',
  spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)', // Slight bounce
} as const;

export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modal: 40,
  popover: 50,
  tooltip: 60,
} as const;

// Halftone-specific tokens
export const halftone = {
  // Dot sizes for different contexts
  dotSizes: {
    xs: { min: 1, max: 3 },
    sm: { min: 2, max: 5 },
    md: { min: 4, max: 8 },
    lg: { min: 6, max: 12 },
    xl: { min: 8, max: 16 },
  },

  // Density for depth perception
  density: {
    sparse: 0.3,
    normal: 0.5,
    dense: 0.7,
    veryDense: 0.9,
  },

  // Shapes available
  shapes: {
    circle: '●',
    square: '■',
    triangle: '▲',
    diamond: '◆',
  },
} as const;

// Grid system
export const grid = {
  columns: 12,
  gutter: '2rem',    // 32px
  margin: '1.5rem',  // 24px

  // Container max-widths
  container: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

export const radius = {
  none: '0',
  sm: '0.125rem',   // 2px
  base: '0.25rem',  // 4px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  full: '9999px',
} as const;
