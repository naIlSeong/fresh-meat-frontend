import React from "react";
import { Helmet } from "react-helmet-async";
import { Container } from "@material-ui/core";
import { useMe } from "../hooks/use-me";

export const Home = () => {
  const { data, loading } = useMe();

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Fresh Meat</title>
      </Helmet>
      <div>Home</div>
      <div>{!loading && data?.me.username}</div>
    </Container>
  );
};
