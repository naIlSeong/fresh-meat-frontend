import { createMuiTheme } from "@material-ui/core/styles";

export const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    secondary: {
      light: "#4c8c4a",
      main: "#1b5e20",
      dark: "#003300",
      contrastText: "#ffffff",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          fontSize: "14px",
        },
      },
    },
  },
});

export const lightTheme = createMuiTheme({
  palette: {
    primary: {
      light: "#ffffff",
      main: "#fafafa",
      dark: "#c7c7c7",
      contrastText: "#000000",
    },
    secondary: {
      light: "#4c8c4a",
      main: "#1b5e20",
      dark: "#003300",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fafafa",
    },
    text: {
      primary: "#000000",
    },
  },
  overrides: {
    MuiCssBaseline: {
      "@global": {
        body: {
          fontSize: "14px",
        },
      },
    },
  },
});
