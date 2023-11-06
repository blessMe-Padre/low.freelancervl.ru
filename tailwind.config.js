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
      'main-black': 'rgba(0, 0, 0, 0.90)',
      'default-black': '#000000',
      'blue': '#5278DA',
      'blue-light': '#203D8A',
    },

    container: {
      padding: '20px',
      center: true
    },
    extend: {}
  },
  plugins: [],
}

