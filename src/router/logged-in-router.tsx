import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NotFound } from "../components/not-found";
import { Home } from "../pages/home";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Header title="Fresh Meat" />
          <Home />
        </Route>
        <Route>
          <Header title="Not Found" />
          <NotFound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
