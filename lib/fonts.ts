/**
 * Font Configuration
 * Using next/font for optimal loading and performance
 *
 * Korean Editorial Design Approach:
 * - Display (EN): Fraunces - Editorial serif for impact
 * - Body (KR): Noto Serif KR - Popular Korean serif for editorial design
 * - Sans (KR): Noto Sans KR - Clean sans for UI elements
 * - Code: JetBrains Mono - For developer-focused content
 */

import { Fraunces, JetBrains_Mono, Noto_Serif_KR, Noto_Sans_KR } from 'next/font/google';

// Display: Fraunces Variable - For English display headlines
export const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Serif: Noto Serif KR - For Korean body text and headlines
// Popular among editorial designers, excellent readability
export const notoSerifKR = Noto_Serif_KR({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Sans: Noto Sans KR - For Korean UI elements and labels
export const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

// Mono: JetBrains Mono - For code snippets
export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});
