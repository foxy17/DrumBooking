import { defineStyle, defineStyleConfig } from '@chakra-ui/react';

const primary = defineStyle({
  background: 'white',
  color: 'neutral.900',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '22px',
  _hover: {
    background: 'neutral.300',
    color: 'neutral.900',
  },
  _active: {
    background: 'neutral.400',
    color: 'neutral.900',
  },
});

const purple = defineStyle({
  background: 'pastel-purple.500',
  color: 'white',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '22px',
  _hover: {
    background: 'pastel-purple.550',
    color: 'white',
  },
  _active: {
    background: 'pastel-purple.600',
    color: 'white',
  },
});

const danger = defineStyle({
  background: 'danger.600',
  color: 'white',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '22px',
  _hover: {
    background: 'danger.550',
    color: 'white',
  },
  _active: {
    background: 'danger.600',
    color: 'white',
  },
});

const success = defineStyle({
  background: 'success.600',
  color: 'white',
  fontWeight: 'normal',
  fontSize: '14px',
  lineHeight: '22px',
  _hover: {
    background: 'success.550',
    color: 'white',
  },
  _active: {
    background: 'success.600',
    color: 'white',
  },
});

export const buttonTheme = defineStyleConfig({
  variants: { primary, purple, danger },
});
