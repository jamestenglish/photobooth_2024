import type { Config } from "tailwindcss";
import { COLORS } from "./app/constants/colors";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // colors: {
      //   dkblue: "#004681",
      //   pastel: "#9BA9D0",
      //   ltblue: "#D5E8F2",
      //   snow: "#F6F5FA",
      // },
      colors: {
        dkblue: COLORS.PRIMARY,
        pastel: COLORS.PASTEL,
        ltblue: COLORS.SECONDARY,
        snow: COLORS.BG,
        error: COLORS.ERROR,
      },
    },
  },
  plugins: [],
} satisfies Config;
