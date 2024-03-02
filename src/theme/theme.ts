import { extendTheme } from '@chakra-ui/react';
import { colors } from 'theme/colors';
import '@fontsource/lexend-deca';
import '@fontsource/manrope';

const theme = extendTheme({
  fonts: {
    heading: `'Lexend Deca', sans-serif`,
    body: `'Manrope', sans-serif`,
  },
  colors,
});

export default theme;
