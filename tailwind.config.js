/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./playground/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      transitionProperty: {

        'DEFAULT': 'color, background-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',

        'colors': 'color, background-color, fill, stroke',
      }
    },
  },
  plugins: [],
};
