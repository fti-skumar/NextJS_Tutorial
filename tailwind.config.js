// tailwind.config.js
const {heroui} = require("@heroui/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./app/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/components/(button|ripple|spinner).js",
  ],
  theme: {
    extend: {
      keyframes: {
        testa: {
          "0%": { opacity: "0", width: '50%' },
          "100%": { opacity: "1", width: '50%' },
        },
      },
      animation: {
        fadeInt: "testa 0.5s ease-in-out forwards 1s",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};