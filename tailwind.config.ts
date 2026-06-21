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
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
        scroll: "scroll 40s linear infinite",
        "scroll-reverse": "scroll 40s linear infinite reverse",
        "gradient-xy": "gradientXY 15s ease infinite",
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
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        gradientXY: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
