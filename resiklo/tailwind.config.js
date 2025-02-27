/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        darthmouth: '#1D6742',
        malachite: '#48E27B',
        jet: '#2E2E2E',
        facebook:'#3B579D',
        mint: '#3ACD83'
      },
      backgroundImage: {
        'gradient-dartmouth-mint': 'linear-gradient(to right, #1D6742, #3ACD83)',
      },
      fontFamily: {
        'montserrat-regular': ['MontserratRegular', 'sans-serif'],
        'montserrat-bold': ['MontserratBold', 'sans-serif'],
        'montserrat-bold-italic': ['MontserratBoldItalic', 'sans-serif'],
        'montserrat-extra-bold': ['MontserratExtraBold', 'sans-serif'],
        'montserrat-extra-bold-italic': ['MontserratExtraBoldItalic', 'sans-serif'],
        'montserrat-italic': ['MontserratItalic', 'sans-serif'],
        'montserrat-medium': ['MontserratMedium', 'sans-serif'],
        'montserrat-medium-italic': ['MontserratMediumItalic', 'sans-serif'],
        'montserrat-semi-bold': ['MontserratSemiBold', 'sans-serif'],
        'montserrat-semi-bold-italic': ['MontserratSemiBoldItalic', 'sans-serif'],
        'montserrat-thin': ['MontserratThin', 'sans-serif'],
        'montserrat-thin-italic': ['MontserratThinItalic', 'sans-serif'],

        'roboto-regular': ['RobotoRegular', 'sans-serif'],
        'roboto-black': ['RobotoBlack', 'sans-serif'],
        'roboto-black-italic': ['RobotoBlackItalic', 'sans-serif'],
        'roboto-bold': ['RobotoBold', 'sans-serif'],
        'roboto-bold-italic': ['RobotoBoldItalic', 'sans-serif'],
        'roboto-italic': ['RobotoItalic', 'sans-serif'],
        'roboto-light': ['RobotoLight', 'sans-serif'],
        'roboto-light-italic': ['RobotoLightItalic', 'sans-serif'],
        'roboto-medium': ['RobotoMedium', 'sans-serif'],
        'roboto-medium-italic': ['RobotoMediumItalic', 'sans-serif'],
        'roboto-semi-bold': ['RobotoSemiBold', 'sans-serif'],
        'roboto-semi-bold-italic': ['RobotoSemiBoldItalic', 'sans-serif'],
        'roboto-thin': ['RobotoThin', 'sans-serif'],
        'roboto-thin-italic': ['RobotoThinItalic', 'sans-serif'],

        'zain-regular': ['ZainRegular', 'sans-serif'],
        'zain-bold': ['ZainBold', 'sans-serif'],
        'zain-italic': ['ZainItalic', 'sans-serif'],
        'zain-light': ['ZainLight', 'sans-serif'],
        'zain-light-italic': ['ZainLightItalic', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
