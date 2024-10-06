import { createTheme } from "@mui/material/styles";
import "@fontsource/poppins";

const generalComponentStyles = {
  MuiCssBaseline: {
    styleOverrides: {
      "*": {
        fontFamily: "Poppins, Arial, sans-serif",
      },
    },
  },
};

export const lightTheme = createTheme({
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
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
