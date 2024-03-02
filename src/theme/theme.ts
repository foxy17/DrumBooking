import { extendTheme } from '@chakra-ui/react';
import '@fontsource/lexend-deca';
import '@fontsource/manrope';

export const colors = {
  main: '#030304',
  secondary: '#1E1E1D',
  'dark-grey': '#565D6DFF',
  'darker-grey': '#292939',
  'pop-pink': '#FDC1E1FF',
  'pop-yellow': '#FCBA28',
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
};
const theme = extendTheme({
  fonts: {
    heading: `'Lexend Deca', sans-serif`,
    body: `'Manrope', sans-serif`,
  },
  colors,
});

export default theme;
