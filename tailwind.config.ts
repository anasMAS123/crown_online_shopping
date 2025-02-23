import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#EBE5C2",
          light: "#F8F3D9",
          dark: "#B9B28A",
        },
        secondary: {
          DEFAULT: "#504B38",
        },
      },
      keyframes: {
        "custom-bounce": {
          "0%,100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-10px)" },
        },
      },
      animation: {
        bounceCustom: "custom-bounce 1s infinite ease-in-out",
      },
      fontFamily: {
        lato: "var(--font-lato)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
