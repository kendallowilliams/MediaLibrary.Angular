const colors = require('tailwindcss/colors');

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
      'primary': {
        hover: colors.blue[500],
        active: colors.blue[700],
        focus: colors.blue[200],
        DEFAULT: colors.blue[600],
        dark: colors.blue[400]
      },
      'secondary': {
        hover: colors.gray[500],
        active: colors.gray[700],
        focus: colors.gray[200],
        DEFAULT: colors.gray[600],
        dark: colors.gray[400]
      },
      'success': {
        hover: colors.green[500],
        active: colors.green[700],
        focus: colors.green[200],
        DEFAULT: colors.green[600],
        dark: colors.green[400]
      },
      'info': {
        hover: colors.sky[200],
        active: colors.sky[800],
        focus: colors.sky[200],
        DEFAULT: colors.sky[500],
        dark: colors.sky[200]
      },
      'warning': {
        hover: colors.yellow[200],
        active: colors.yellow[800],
        focus: colors.yellow[200],
        DEFAULT: colors.yellow[500],
        dark: colors.yellow[200]
      },
      'danger': {
        hover: colors.red[200],
        active: colors.red[800],
        focus: colors.red[200],
        DEFAULT: colors.red[500],
        dark: colors.red[200]
      },
      'light': {
        DEFAULT: colors.neutral[100]
      },
      'dark': {
        DEFAULT: colors.neutral[900]
      },
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
