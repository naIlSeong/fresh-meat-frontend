import { createMuiTheme } from "@material-ui/core/styles";

export const theme = createMuiTheme({
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
