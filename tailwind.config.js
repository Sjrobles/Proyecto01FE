/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Cabinet Grotesk', 'system-ui', 'sans-serif'],
        body: ['Satoshi', 'system-ui', 'sans-serif'],
      },
      colors: {
        surface: {
          DEFAULT: '#f9f8f5',
          2: '#fbfbf9',
          offset: '#f3f0ec',
          dynamic: '#e6e4df',
        },
        primary: {
          DEFAULT: '#01696f',
          hover: '#0c4e54',
          active: '#0f3638',
          highlight: '#cedcd8',
        },
        dark: {
          bg: '#171614',
          surface: '#1c1b19',
          surface2: '#201f1d',
          border: '#393836',
          text: '#cdccca',
          muted: '#797876',
          primary: '#4f98a3',
        }
      },
    },
  },
  plugins: [],
}
