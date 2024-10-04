/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'reck': ['Reckless', 'san-serif'],
        'smono': ['Space Mono', 'monospace']
      }
    },
  },
  plugins: [],
}