import React from "react";
import { gql, useQuery } from "@apollo/client";
import { me } from "../__generated__/me";
import { Helmet } from "react-helmet-async";
import { Container } from "@material-ui/core";

const ME = gql`
  query me {
    me {
      username
    }
  }
`;

export const Home = () => {
  const { data, loading } = useQuery<me>(ME);
  console.log(loading, data);

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Fresh Meat</title>
      </Helmet>
      <div>Home</div>
      {/* <div>{!loading && data?.me.username}</div> */}
    </Container>
  );
};
