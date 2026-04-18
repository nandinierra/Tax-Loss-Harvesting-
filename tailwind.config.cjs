/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#0B1121',
          card: '#1E293B',
          text: '#F8FAFC',
        },
        light: {
          bg: '#F3F4F6',
          card: '#FFFFFF',
          text: '#1E293B',
        }
      },
      backgroundImage: {
        'blue-gradient': 'linear-gradient(135deg, #2563EB 0%, #1D4ED8 100%)',
      }
    },
  },
  plugins: [],
}
