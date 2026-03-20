import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        applus: {
          blue: "#0a70eb",
          text: "#3a414a",
          border: "#8a96a3",
          panel: "#ffffff",
          muted: "#eef2f7",
          accent: "#f3c340"
        }
      },
      boxShadow: {
        panel: "0 4px 18px rgba(0, 0, 0, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;

