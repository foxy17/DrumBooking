// eslint-disable-next-line no-undef

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Lexend Deca', ...defaultTheme.fontFamily.sans],
      serif: ['Manrope', 'serif'],
    },
    extend: {
      colors: {
        main: '#111827',
        darkPurple: '#473e61',
        light: '#cecfcc',
        'base-100': '#EAEAE8',
        info: '#bae6fd',
        success: '#bbf7d0',
        warning: '#fde68a',
        error: '#fda4af',
      },
      borderRadius: {
        xs: '0.125rem',
        s: '0.1875rem',
        m: '0.25rem',
        l: '0.375rem',
        xl: '0.5rem',
        '100-percent': '100%',
      },
      boxShadow: {
        xs: '0px 0px 1px rgba(23, 26, 31, 0.07), 0px 0px 2px rgba(23, 26, 31, 0.12)',
        s: '0px 2px 5px rgba(23, 26, 31, 0.09), 0px 0px 2px rgba(23, 26, 31, 0.12)',
        m: '0px 4px 9px rgba(23, 26, 31, 0.11), 0px 0px 2px rgba(23, 26, 31, 0.12)',
        l: '0px 8px 17px rgba(23, 26, 31, 0.15), 0px 0px 2px rgba(23, 26, 31, 0.12)',
        xl: '0px 17px 35px rgba(23, 26, 31, 0.24), 0px 0px 2px rgba(23, 26, 31, 0.12)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
