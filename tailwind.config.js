/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ],
        display: [
          "Satoshi",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif"
        ]
      },
      colors: {
        background: "var(--background)",
        section: "var(--section)",
        card: "var(--card)",
        border: "var(--border)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        brandBlue: "var(--brand-blue)",
        accentCyan: "var(--accent-cyan)",
        accentPurple: "var(--accent-purple)",
        success: "var(--success)",
        ink: "var(--background)",
        panel: "var(--card)",
        cyanGlow: "var(--accent-cyan)",
        mintGlow: "var(--success)",
        roseGlow: "var(--accent-purple)",
        goldGlow: "var(--brand-blue)"
      },
      boxShadow: {
        neon: "var(--shadow-soft)",
        card: "var(--shadow-card)"
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "spin-slow": "spin 16s linear infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -18px, 0)" }
        }
      }
    }
  },
  plugins: []
};
