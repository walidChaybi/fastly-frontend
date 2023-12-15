/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F96167",
        secondary: "#FCE77D",
      },
    },
  },
  plugins: [],
};
