/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
  ],
  theme: {
    screens: {
      'sm': '768px',
      'md': '1024px',
      'lg': '1280px',
      'xl': '1440px',
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'orange': '#ec6633',
      // ---------------------------------
      'main-black': '#202020',
      'default-black': '#000000',
      'orange': '#FA842B',
      'blue-light': '#203D8A',
      'bg-blue': 'blue'
    },

    container: {
      padding: '20px',
      center: true
    },
    extend: {}
  },
  plugins: [],
}

