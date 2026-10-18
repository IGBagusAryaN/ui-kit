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
        // Menghapus border-color dari utility 'transition' bawaan
        'DEFAULT': 'color, background-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
        // Menghapus border-color dari utility 'transition-colors' bawaan
        'colors': 'color, background-color, fill, stroke',
      }
    },
  },
  plugins: [],
};
