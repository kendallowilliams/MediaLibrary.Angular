const colors = require('tailwindcss/colors');

delete colors['lightBlue'];
delete colors['warmGray'];
delete colors['trueGray'];
delete colors['coolGray'];
delete colors['blueGray'];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'libs/ml-*/src/**/*.{html,ts}',
    'apps/ml-*/src/**/*.{html,ts}'
  ],
  darkMode: 'class',
  presets: [require('./libs/ml-ui/tailwind.config')],
  theme: {
    extend: {
      height: {
        'footer': '25px'
      }
    },
  },
  plugins: [],
}
