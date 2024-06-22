/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        yellow: '#E7D9BE',
        blue: '#74DBE2',
        red: '#E53A38'
      },
      keyframes: {
        underline: {
          '0%': {width: '0%'},
          '100%': {width: '100%'},
        },
      },
      animation: {
        underline: 'underline 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
}

