import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NotFound } from "../components/not-found";
import { EditAccount } from "../pages/edit-account";
import { Home } from "../pages/home";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/edit-account" exact>
          <Header title="Edit Account" />
          <EditAccount />
        </Route>
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
