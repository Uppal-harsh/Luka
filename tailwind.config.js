/** @type {import('tailwindcss').Config} */
module.exports = {
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
          violet: "#7C3AED",
          "violet-bright": "#A855F7",
          cyan: "#06B6D4"
        },
        surface: "rgba(255, 255, 255, 0.04)"
      },
      boxShadow: {
        "glow-violet": "0 0 30px rgba(124, 58, 237, 0.3)",
        "glow-cyan": "0 0 30px rgba(6, 182, 212, 0.3)",
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
