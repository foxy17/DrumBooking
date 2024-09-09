// eslint-disable-next-line no-undef
import { colors } from './src/theme/colors';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: ['media', 'class'],
  theme: {
    fontFamily: {
      sans: ['Lexend Deca', ...defaultTheme.fontFamily.sans],
      serif: ['Manrope', 'serif'],
      roboto: ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        ...colors,
      },
      borderRadius: {
        xs: '0.125rem',
        s: '0.1875rem',
        m: '0.25rem',
        l: '0.375rem',
        xl: '0.5rem',
        '100-percent': '100%',
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      boxShadow: {
        card: '0px -4px 16px -8px rgba(0,0,0,0.4)',
      },
      animation: {
        'meteor-effect': 'meteor 5s linear infinite',
      },
      keyframes: {
        meteor: {
          '0%': {
            transform: 'rotate(215deg) translateX(0)',
            opacity: '1',
          },
          '70%': {
            opacity: '1',
          },
          '100%': {
            transform: 'rotate(215deg) translateX(-500px)',
            opacity: '0',
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
};
