/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"]
      },
      colors: {
        brand: {
          gold: "rgb(var(--brand-accent-rgb) / <alpha-value>)",
          navy: "#262933",
          gray: "#585858",
          black: "#000000",
          white: "#FFFFFF"
        },
        surface: "rgba(255, 255, 255, 0.04)"
      },
      boxShadow: {
        "glow-gold": "0 0 28px rgba(204, 170, 75, 0.28)",
        "glow-gray": "0 0 24px rgba(88, 88, 88, 0.22)",
        card: "0 4px 24px rgba(0,0,0,0.4)"
      },
      animation: {
        shimmer: "shimmer 2.5s linear infinite",
        float: "float 4s ease-in-out infinite",
        "pulse-slow": "pulse 3s ease-in-out infinite"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" }
        }
      }
    }
  },
  plugins: []
};
