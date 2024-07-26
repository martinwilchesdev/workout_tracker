/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  theme: {
    extend: {
      colors: {
        'at-light-green': '#44ba9f',
        'at-green': '#286d5d',
        'light-grey': '#f1f1f1'
      }
    },
    fontFamily: {
      Poppins: ['Poppins', 'sans-serif']
    },
    flex: {
      '1': '1 1 0%',
      '2': '2 2 0%'
    },
    container: {
      center: true,
      screens: {
        'sm': '640px',
        'lg': '1124px',
        'xl': '1124px',
        '2xl': '1124px'
      }
    }
  },
  plugins: [],
}

