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
        shell: {
          bg: "#fff6ed",
          ink: "#24313c",
          mute: "#5f6f7c",
          line: "#dfd2c3",
          soft: "#f9ede0"
        },
        accent: {
          50: "#fff0dd",
          100: "#ffe2bf",
          300: "#f7b77b",
          400: "#ef9d58",
          500: "#dc7c38",
          800: "#8d4b18"
        }
      },
      fontFamily: {
        "serif-display": ['"Iowan Old Style"', '"Palatino Linotype"', '"Book Antiqua"', "Palatino", "serif"]
      },
      boxShadow: {
        panel: "0 20px 45px rgba(70, 43, 19, 0.10)"
      }
    }
  },
  plugins: []
};

export default config;
