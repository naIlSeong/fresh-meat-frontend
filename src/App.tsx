import React from "react";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { LoggedInRouter } from "./router/logged-in-router";
import { theme } from "./config";

function App() {
  const updatedTheme = unstable_createMuiStrictModeTheme(theme);

  return (
    <ThemeProvider theme={updatedTheme}>
      <CssBaseline />
      <LoggedInRouter />
    </ThemeProvider>
  );
}

export default App;
