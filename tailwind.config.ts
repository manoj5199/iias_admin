import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "hero-1": "hero_1 30s linear infinite",
        "hero-2": "hero_2 30s linear infinite",
        "hero-3": "hero_3 30s linear infinite",
        "abstract-1": "abstract_1 30s linear infinite",
        "abstract-2": "abstract_2 30s linear infinite",
        "abstract-3": "abstract_3 30s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
