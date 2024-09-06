import { createTheme } from "@mui/material/styles";
const generalComponentStyles = {};

declare module "@mui/material/styles" {
  interface Palette {
    roleModelBg: Palette["primary"];
  }
  interface PaletteOptions {
    roleModelBg?: PaletteOptions["primary"];
  }
}

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
    roleModelBg: {
      main: "linear-gradient(180deg, #009AC7 0%, #00467F 100%)",
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
