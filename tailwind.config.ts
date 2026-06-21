import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#00d4ff",
        "accent-purple": "#a855f7",
        dark: "#0a0a1a",
        card: "#1a1a2e",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.6s ease-out",
        glow: "glow 3s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 212, 255, 0.1)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 212, 255, 0.3)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
