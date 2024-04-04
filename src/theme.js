import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.800',
        color: 'whiteAlpha.900',
      },
      a: {
        color: 'teal.300',
        _hover: {
          textDecoration: 'none',
        },
        padding: '0.2rem 0.4rem', // Add padding to make the border radius visible
        borderRadius: '0.375rem', // This is equivalent to 'md'. You can adjust this value.
        border: '1px solid transparent', // Optional: add a border. Set to transparent or any color.
      },
    },
  },
});

export default theme;
