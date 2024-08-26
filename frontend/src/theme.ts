import { createTheme } from "@mui/material";
const generalComponentStyles = {};

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "#FFF",
    },
    primary: {
      main: "#4F2D7F",
    },
    secondary: {
      main: "#00467F",
    },
  },
  components: {
    ...generalComponentStyles,
  },
});

// idk if we need this, but we might if we have time for dark mode lol
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000",
    },
    primary: {
      main: "#4F2D7F",
    },
    secondary: {
      main: "#00467F",
    },
  },
  components: {
    ...generalComponentStyles,
  },
});
