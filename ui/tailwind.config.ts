import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  plugins: [animate],
  prefix: "",
  tailwindFunctions: ["clsx"],
  theme: {
    extend: {
      animation: {
        ripple: "ripple 3s cubic-bezier(0.075, 0.82, 0.165, 1) infinite",
        "ripple-delay":
          "ripple 3s cubic-bezier(0.075, 0.82, 0.165, 1) 0.5s infinite",
      },
      keyframes: {
        ripple: {
          "0%": { opacity: "1", transform: "scale(0)" },
          "20%": { opacity: "1" },
          "100%": { opacity: "0", transform: "scale(1.5)" },
        },
      },
    },
  },
};

export default config;
