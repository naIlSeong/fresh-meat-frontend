import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      light: "#484848",
      main: "#212121",
      dark: "#000000",
      contrastText: "#ffffff",
    },
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
          fontSize: "12px",
          minHeight: "100vh",
          backgroundColor: "#212121",
        },
      },
    },
  },
});
