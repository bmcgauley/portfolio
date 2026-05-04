/** @type {import('tailwindcss').Config} */
// NOTE: This project uses Tailwind v4. The canonical theme is defined
// in src/app/globals.css via @theme. This config exists for tooling
// that still reads tailwind.config.js (editor plugins, etc.) and to
// extend non-color theme values.
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Brand surfaces
        bone: "var(--bone)",
        vellum: "var(--vellum)",
        parchment: "var(--parchment)",
        // Brand inks
        ink: {
          DEFAULT: "var(--ink)",
          soft: "var(--ink-soft)",
          muted: "var(--ink-muted)",
        },
        // Brand accents
        crimson: {
          DEFAULT: "var(--crimson)",
          deep: "var(--crimson-deep)",
        },
        gold: {
          DEFAULT: "var(--gold)",
          shadow: "var(--gold-shadow)",
        },
        // shadcn semantic aliases
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      fontFamily: {
        display: ['"trajan-pro-3"', "Cinzel", '"Times New Roman"', "Georgia", "serif"],
        serif: ["var(--font-cormorant)", "Garamond", "Georgia", "serif"],
        sans: ["var(--font-cormorant)", "Garamond", "Georgia", "serif"],
        mono: ["var(--font-jetbrains-mono)", '"Courier New"', "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
