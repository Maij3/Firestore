// 1. Import the extendTheme function
import { extendTheme, ChakraProvider } from "@chakra-ui/react";

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    primary: '#E6E18F',
    secondary: '#FFFAE2',
    accent: '#92977e',
  },
};

export const theme = extendTheme({ colors });
