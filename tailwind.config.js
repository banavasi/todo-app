/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      darkMode: ["selector", '[data-theme="dark"]'],
    },
  },
  plugins: [require("daisyui")],
};
