import React from "react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { LoggedInRouter } from "./router/logged-in-router";
import { LoggedOutRouter } from "./router/logged-out-router";
import { theme } from "./config";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </MuiThemeProvider>
  );
}

export default App;
