/** @type {import('tailwindcss').Config} */
module.exports = {

  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // SEMANTIC COLORS (The Magic Part)
        // usage: 'bg-background' or 'text-text-primary'
        background: "rgb(var(--color-background) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",

        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        },

        // BRAND PALETTE
        nexus: {
          primary: "rgb(var(--color-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-secondary) / <alpha-value>)",
          accent: "#06b6d4",    // Cyan
          success: "#10b981",   // Emerald
          warning: "#f59e0b",   // Amber
          danger: "rgb(var(--color-danger) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
}