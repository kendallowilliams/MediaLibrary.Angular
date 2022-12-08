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
      primary: colors.blue,
      secondary: colors.gray['600'],
      success: colors.green,
      info: colors.cyan,
      warning: colors.yellow,
      danger: colors.red,
      light: colors.gray['100'],
      dark: colors.gray['900']
    },
    extend: {
      height: {
        'footer': '25px'
      }
    },
  },
  plugins: [],
}
