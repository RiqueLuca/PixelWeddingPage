import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Warm, romantic JRPG palette
        night: {
          DEFAULT: "#1a1033", // deep night blue/purple
          deep: "#0d0820",
          soft: "#2a1b4d",
        },
        rose: {
          soft: "#f4b8c8",
          DEFAULT: "#e87a9a",
          deep: "#c65478",
        },
        gold: {
          soft: "#ffe6a8",
          DEFAULT: "#f5c451",
          deep: "#d49a2a",
        },
        cream: {
          DEFAULT: "#fff4e0",
          deep: "#f5e3c0",
        },
        ember: "#ff9d6c", // warm light glow
        dusk: "#6b4a8a",
      },
      fontFamily: {
        pixel: ["var(--font-pixel)", "monospace"],
        body: ["var(--font-body)", "monospace"],
      },
      boxShadow: {
        pixel: "4px 4px 0 0 rgba(13, 8, 32, 0.6)",
        "pixel-sm": "2px 2px 0 0 rgba(13, 8, 32, 0.6)",
        glow: "0 0 24px 4px rgba(245, 196, 81, 0.35)",
      },
      keyframes: {
        "bob": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "twinkle": {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        "flicker": {
          "0%, 100%": { opacity: "1" },
          "45%": { opacity: "0.85" },
          "50%": { opacity: "0.55" },
          "55%": { opacity: "0.9" },
        },
        "blink": {
          "0%, 90%, 100%": { opacity: "1" },
          "95%": { opacity: "0" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
      },
      animation: {
        bob: "bob 1.6s steps(4, end) infinite",
        "float-slow": "float-slow 6s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        flicker: "flicker 4s ease-in-out infinite",
        blink: "blink 1.1s steps(1, end) infinite",
        shimmer: "shimmer 3.5s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
