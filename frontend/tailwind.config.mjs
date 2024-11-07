/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "scrollbar-thumb": "#888",
        "scrollbar-track": "#f1f1f1",
        "scrollbar-thumb-hover": "#555",
      },
      fontFamily: {
        acumin: ['"Acumin Pro","mono"'],
        geist: ['"Geist"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
