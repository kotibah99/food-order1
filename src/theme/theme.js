import {
  extendTheme,
  theme as base,
  withDefaultVariant,
  withDefaultColorScheme,
} from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const inputSelectStyles = {
  variants: {
    filled: {
      field: {
        _focus: {
          borderColor: 'brand.500',
          backgroundColor: 'white',
        },
      },
    },
  },
};

const brandRing = {
  _focus: {
    ring: 2,
    ringColor: 'brand.500',
  },
};

const breakpoints = {
  sm: '320px',
  md: '768px',
  lg: '905px',
  xl: '1200px',
  '2xl': '1536px',
};

const theme = extendTheme(
  {
    breakpoints,
    colors: {
      brand: {
        50: '#FEF7E6',
        100: '#FCE8BA',
        200: '#FBD98E',
        300: '#F9CA62',
        400: '#F7BB36',
        500: '#F5AC0A',
        600: '#C48A08',
        700: '#936706',
        800: '#624504',
        900: '#312202',
      },
      secondary: {
        50: '#EAEDFB',
        100: '#C4CEF3',
        200: '#9EAEEB',
        300: '#788FE3',
        400: '#516FDB',
        500: '#2B4FD4',
        600: '#2340A9',
        700: '#1A307F',
        800: '#112055',
        900: '#09102A',
      },
    },
    fonts: {
      heading: `Cairo, ${base.fonts?.heading}`,
      body: `Inter, ${base.fonts?.body}`,
    },

    components: {
      Button: {
        variants: {
          brand: props => ({
            ...brandRing,
            color: mode('gray.900', 'gray.800')(props),
            backgroundColor: mode('brand.400', 'brand.200')(props),

            _hover: {
              backgroundColor: mode('brand.500', 'brand.300')(props),
            },

            _active: {
              backgroundColor: mode('brand.600', 'brand.400')(props),
            },
          }),
        },
      },
      Input: { ...inputSelectStyles },
      Select: { ...inputSelectStyles },
      Checkbox: {
        baseStyle: {
          control: {
            borderRadius: 'md',
            ...brandRing,
          },
        },
      },
      Radio: {
        baseStyle: {
          control: {
            borderRadius: 'md',
            ...brandRing,
          },
        },
      },
    },
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
    components: ['Checkbox', 'IconButton'],
  }),
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'Select'],
  })
);

export default theme;
