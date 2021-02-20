import React from "react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import {
  ThemeProvider,
  unstable_createMuiStrictModeTheme,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { LoggedInRouter } from "./router/logged-in-router";
import { LoggedOutRouter } from "./router/logged-out-router";
import { theme } from "./config";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const updatedTheme = unstable_createMuiStrictModeTheme(theme);

  return (
    <ThemeProvider theme={updatedTheme}>
      <CssBaseline />
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </ThemeProvider>
  );
}

export default App;
