import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { NotFound } from "../components/not-found";
import { EditAccount } from "../pages/edit-account";
import { Home } from "../pages/home";
import { DeleteAccount } from "../pages/delete-account";
import { UserDetail } from "../pages/user-detail";
import { MyProfile } from "../pages/my-profile";
import { ProductDetail } from "../pages/product-detail";

export const LoggedInRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/edit-account" exact>
          <Header title="Edit Account" />
          <EditAccount />
        </Route>
        <Route path="/delete-account" exact>
          <Header title="Delete Account" />
          <DeleteAccount />
        </Route>
        <Route path="/my-profile" exact>
          <MyProfile />
        </Route>
        <Route path="/user/:id" exact>
          <UserDetail />
        </Route>
        <Route path="/product/:id" exact>
          <ProductDetail />
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
