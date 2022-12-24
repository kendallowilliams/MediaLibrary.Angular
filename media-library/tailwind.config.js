const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'libs/ml-*/src/**/*.{html,ts}',
    'apps/ml-*/src/**/*.{html,ts}'
  ],
  darkMode: 'class',
  presets: [require('./libs/ml-ui/tailwind.config')],
  theme: {
    colors: {
      transparent: 'transparent',
      primary: '#007bff',
      secondary: '#6c757d',
      success: '#28a745',
      info: '#17a2b8',
      warning: '#ffc107',
      danger: '#dc3545',
      light: '#f8f9fa',
      dark: '#343a40',
      ...colors
    },
    extend: {
      height: {
        'footer': '25px'
      }
    },
  },
  plugins: [],
}
