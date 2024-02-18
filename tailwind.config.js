// eslint-disable-next-line no-undef

// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'media',
  theme: {
    fontFamily: {
      sans: ['Lexend Deca', ...defaultTheme.fontFamily.sans],
      serif: ['Manrope', 'serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        main: '#030304',
        secondary: '#1E1E1D',
        'dark-grey': '#565D6DFF',
        'darker-grey': '#292939',
        'pop-pink': '#FDC1E1FF',
        'pop-yellow': '#F4F824',
        'light-gray': '#6D6D6C',
        'dark-green': '#085D48',
        'pastel-green': '#AED999',
        'pastel-purple': '#8F8FEF',
        light: '#cecfcc',
        'base-100': '#EAE9E8',
        info: '#bae6fd',
        success: '#bbf7d0',
        warning: '#fde68a',
        error: '#fda4af',
        'date-heading': '#313130',
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
        card: '0px -4px 16px -8px rgba(0,0,0,0.4)',
      },
      animation: {
        'meteor-effect': 'meteor 5s linear infinite',
      },
      keyframes: {
        meteor: {
          '0%': { transform: 'rotate(215deg) translateX(0)', opacity: 1 },
          '70%': { opacity: 1 },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: 0,
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
