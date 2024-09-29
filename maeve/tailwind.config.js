/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'libre': ['LibreBodoni', 'serif'],
      'times': ['Times', 'serif']
    },
    extend: {
      boxShadow: {
        'glow': '0 0 25px #FEF9FB',
        'pink-glow': '0 0 25px #D6CEE0',
      },
      colors: {
        'plat-white': '#FEF9FB',
        'plat-blue': '#D5DCE8',
        'dark-plat-blue': '#ABBACA',
        'plat-pink': '#D6CEE0',
        'dark': '#1E1E1E'
      },
      keyframes: {
        glow: {
          '0%, 100%': { textShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)' },
          '50%': { textShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 30px rgba(255, 255, 255, 0.8)' },
        },
      },
      animation: {
        glow: 'glow 1.5s infinite',
      },
    },
  },
  plugins: [
    require('tailwindcss-animated')
  ],
}

