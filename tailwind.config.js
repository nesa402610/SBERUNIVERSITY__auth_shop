/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'xs': '320px',
      'sm': '576px',
      'md': '960px',
      'lg': '1440px',
    }
  },
  plugins: [],
};