import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dkblue: "#004681",
        pastel: "#9BA9D0",
        ltblue: "#D5E8F2",
        snow: "#F6F5FA",
      },
    },
  },
  plugins: [],
} satisfies Config;
