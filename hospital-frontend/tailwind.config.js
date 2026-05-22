/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        glass: 'rgba(255, 255, 255, 0.1)',
        'glass-dark': 'rgba(15, 23, 42, 0.6)',
      },
      boxShadow: {
        'neu-flat': '6px 6px 12px #d1d5db, -6px -6px 12px #ffffff',
        'neu-pressed': 'inset 4px 4px 8px #d1d5db, inset -4px -4px 8px #ffffff',
        'neu-dark': '6px 6px 12px #1e293b, -6px -6px 12px #334155',
        'neu-dark-pressed': 'inset 4px 4px 8px #1e293b, inset -4px -4px 8px #334155',
      }
    },
  },
  plugins: [],
}