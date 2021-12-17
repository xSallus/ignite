import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { mode, createBreakpoints } from '@chakra-ui/theme-tools'

const breakpoints = createBreakpoints({
  sm: '320px',
  md: '768px',
  lg: '960px',
  xl: '1200px',
  '2xl': '1440px'
})

const colors = {
  highlight: {
    full: "#FFBA08",
    half: "rgba(255,186,8,0.5)",
  },
  headings: {
    light: "#F5F8FA",
    dark: "#47585B",
  },
  info: {
    light: "#DADADA",
    dark: "#999999",
    half: "rgba(153,153,153,0.5)",
  },
  white: "#fff",
  blue: {
    500: "#0a314f",
    700: "#000d1e",
  },
  black: {
    full: "#000",
    half: "rgba(0,0,0,0.48)"
  },
};

const styles = {
  global: (props:any) => ({
    "body": {
      fontFamily: 'Poppins, sans-serif',
      bg:  mode("headings.light", "headings.dark")(props),
      color:  mode("headings.dark", "headings.light")(props),
      overflowX: 'hidden',
    },
  }),
};

const theme = extendTheme({ colors, styles, breakpoints });

export { ChakraProvider, theme };
