/**
 * Brand tokens — brianmcgauley.com  ·  v1.0  ·  May 2026
 * Canonical definitions live in src/app/globals.css (@theme block).
 * This file mirrors them in JS form for any tooling or programmatic
 * access (e.g. dynamic style injection). Do not import for styling
 * purposes — use Tailwind utilities (`bg-bone`, `text-crimson-deep`,
 * etc.) instead.
 */

export const themeColors = {
  surfaces: {
    bone: "#ECE4D0",
    vellum: "#F7F3E8",
    parchment: "#E2D8BF",
  },
  inks: {
    ink: "#0C0A0A",
    inkSoft: "#3A3636",
    inkMuted: "#7A6F66",
  },
  accents: {
    crimsonDeep: "#7A0C18",
    crimson: "#D01729",
    gold: "#C9A24A",
    goldShadow: "#6B4F14",
  },
  semantic: {
    background: "#ECE4D0",
    foreground: "#0C0A0A",
    primary: "#7A0C18",
    secondary: "#C9A24A",
    accent: "#D01729",
    success: "#6B7F3F",
    error: "#D01729",
    warning: "#C9A24A",
  },
} as const;

export const typography = {
  fontFamily: {
    display: '"trajan-pro-3", "Cinzel", "Times New Roman", Georgia, serif',
    serif: 'var(--font-cormorant), Garamond, Georgia, serif',
    mono: 'var(--font-jetbrains-mono), "Courier New", monospace',
  },
  fontSizes: {
    "display-1": "3rem",
    "display-2": "2.25rem",
    h1: "1.75rem",
    h2: "1.375rem",
    h3: "1.125rem",
    "body-lg": "1.25rem",
    body: "1.125rem",
    caption: "0.875rem",
    "mono-label": "0.6875rem",
  },
} as const;

export const borderRadius = {
  none: "0",
  sharp: "2px",
  default: "4px",
} as const;

export const shadows = {
  card: "0 2px 8px rgba(122,79,20,0.08)",
  cardHover: "0 4px 16px rgba(122,79,20,0.12)",
} as const;
