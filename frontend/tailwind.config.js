/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        pr: {
          50: "#edfdfe",
          100: "#d2f7fb",
          200: "#aaedf7",
          300: "#6fdff1",
          400: "#2dc7e3",
          500: "#11a9c8",
          600: "#1187a9",
          700: "#156d89",
          800: "#1a5970",
          900: "#1a4a5f",
          950: "#0b3141",
          999: "#081622",
        },
      },
    },
  },
  plugins: [],
};
