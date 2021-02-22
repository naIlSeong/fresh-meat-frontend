import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { Header } from "../components/header";

type IParams = {
  username: string;
};

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(24),
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  subtitle: {
    paddingTop: theme.spacing(6),
    paddingBottom: theme.spacing(2),
  },
  productList: {
    // Deleted
    // backgroundColor: "red",
    padding: 0,
    minHeight: theme.spacing(20),
  },
  productItems: {
    // backgroundColor: "blue",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  noProduct: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: theme.spacing(20),
  },
}));

export const UserDetail = () => {
  const { username } = useParams<IParams>();
  const classes = useStyles();

  // TODO : Delete
  const loading = false;
  const empty = false;

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Fresh Meat - ${username}`}</title>
      </Helmet>
      <Header title="Profile" />
      <main>
        <Container maxWidth="md">
          {loading ? (
            <Container className={classes.loading}>
              <CircularProgress size={24} color="secondary" />
            </Container>
          ) : (
            <Container maxWidth="xs" className={classes.mainContent}>
              <Typography variant="h4">{`${username}'s products`}</Typography>

              {/* In Progress */}
              <Typography variant="h5" className={classes.subtitle}>
                In progress
              </Typography>
              <Container className={classes.productList}>
                {empty ? (
                  <Container className={classes.noProduct}>
                    <Typography variant="h3">Oops!</Typography>
                    <Typography variant="subtitle1">
                      There is no product in progress 🦴
                    </Typography>
                  </Container>
                ) : (
                  <Container className={classes.productItems}>
                    <Typography variant="subtitle1">Air Pods</Typography>
                    <Typography variant="subtitle1">03m 32s</Typography>
                  </Container>
                )}
              </Container>

              {/* Waiting */}
              <Typography variant="h5" className={classes.subtitle}>
                Waiting for auction
              </Typography>
              <Container className={classes.productList}>
                {empty ? (
                  <Container className={classes.noProduct}>
                    <Typography variant="h3">Oops!</Typography>
                    <Typography variant="subtitle1">
                      There is no product waiting for auction 🦴
                    </Typography>
                  </Container>
                ) : (
                  <Container className={classes.productItems}>
                    <Typography variant="subtitle1">Air Pods</Typography>
                    <Typography variant="subtitle1">03m 32s</Typography>
                  </Container>
                )}
              </Container>
            </Container>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
};
