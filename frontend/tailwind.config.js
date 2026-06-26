/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        luxury: {
          gold: '#d4af37',
          brass: '#c5a880',
          dark: '#0f0f10',
          charcoal: '#1c1c1e',
          slate: '#1e293b',
          cream: '#fdfbf7',
          ivory: '#faf9f6'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
