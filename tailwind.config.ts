import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm editorial color palette
        parchment: "#F2EDE0",
        moss: "#3D6B47",
        earth: "#6B4F2A",
        forest: "#2C3A28",
        amber: "#D4824A",
        terracotta: "#C87854",
        sage: "#A5B5A3",

        // Tech-inspired colors from references
        'electric-blue': "#4169E1",
        'neon-green': "#00FF41",
        'deep-blue': "#1E3A8A",
        'light-blue': "#93C5FD",
        'dark': "#0F172A",
      },
      fontFamily: {
        display: ["var(--font-display)"], // Fraunces for English display
        serif: ["var(--font-serif)"],     // Noto Serif KR for Korean body
        sans: ["var(--font-sans)"],       // Noto Sans KR for UI
        mono: ["var(--font-mono)"],       // JetBrains Mono for code
      },
    },
  },
  plugins: [],
};

export default config;
