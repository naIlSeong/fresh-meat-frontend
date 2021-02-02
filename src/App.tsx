import React from "react";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "./apollo";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { darkTheme, lightTheme } from "./config";
import { LoggedInRouter } from "./router/logged-in-router";
import { LoggedOutRouter } from "./router/logged-out-router";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const [light, setLight] = React.useState(false);

  return (
    <MuiThemeProvider theme={light ? lightTheme : darkTheme}>
      <CssBaseline />
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </MuiThemeProvider>
  );
}

export default App;
