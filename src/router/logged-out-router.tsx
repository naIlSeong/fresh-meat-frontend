import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { Footer } from "../components/footer";
import { NotFound } from "../components/not-found";
import { Login } from "../pages/login";
import { Signup } from "../pages/signup";

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/signup" exact>
          <Signup />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
