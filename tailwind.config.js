/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        parchment: "#f4e4bc",
        ink: "#3e2723",
        gold: "#c5a059",
        "wax-red": "#8b0000",
      },
      fontFamily: {
        magic: ["Cinzel", "serif"],
        serif: ["EB Garamond", "serif"],
        script: ["Pinyon Script", "cursive"],
      },
    },
  },
  plugins: [],
}
