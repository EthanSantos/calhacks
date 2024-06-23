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
        red: '#E53A38',
        gray: '#322C26',
        white: '#EFE8DB',
        black: '#272019'
      },
      keyframes: {
        underline: {
          '0%': {width: '0%'},
          '100%': {width: '100%'},
        },
      },
    },
  },
  plugins: [],
}

