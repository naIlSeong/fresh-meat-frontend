import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "../components/header";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(24),
  },
  buttonContainer: {
    paddingTop: theme.spacing(4),
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
    padding: 0,
    minHeight: theme.spacing(20),
  },
  noProduct: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: theme.spacing(20),
  },
  productItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    padding: 0,
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  },
  waitingItems: {
    display: "flex",
    // marginTop: theme.spacing(1),
    // marginBottom: theme.spacing(1),
    padding: 0,
    // paddingTop: theme.spacing(1),
    // paddingBottom: theme.spacing(1),
  },
  inProgressItems: {
    display: "flex",
    padding: 0,
  },
  productTitle: {
    marginRight: "4px",
    textDecoration: "none",
    cursor: "pointer",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  productProgress: {
    marginLeft: "4px",
  },
  countdown: {
    minWidth: theme.spacing(8),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
}));

export const MyProfile = () => {
  const classes = useStyles();
  const history = useHistory();
  const [tab, setTab] = useState(true);

  // TODO : Delete
  const loading = false;
  const products = [
    { id: 1, productName: "xxx", price: 1234, progress: "Closed" },
    { id: 2, productName: "ooo", price: 4321, progress: "Paid" },
  ];

  return (
    <React.Fragment>
      <Helmet>
        <title>Fresh Meat - username</title>
      </Helmet>
      <Header title="User name" />
      <main>
        <Container maxWidth="md">
          {loading ? (
            <Container className={classes.loading}>
              <CircularProgress size={24} color="secondary" />
            </Container>
          ) : (
            <Container maxWidth="xs" className={classes.mainContent}>
              <Typography variant="h4">username's product</Typography>

              {/* Tab */}
              <Grid
                container
                spacing={2}
                justify="center"
                className={classes.buttonContainer}
              >
                <Grid item>
                  <Button
                    variant={tab ? "contained" : "outlined"}
                    color="secondary"
                    style={{ minWidth: "130px" }}
                    onClick={() => setTab(true)}
                  >
                    Uploaded
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                    variant={tab ? "outlined" : "contained"}
                    color="secondary"
                    style={{ minWidth: "130px" }}
                    onClick={() => setTab(false)}
                  >
                    Bidded
                  </Button>
                </Grid>
              </Grid>

              {tab === true ? (
                <>
                  {/* In Progress */}
                  <Typography variant="h5" className={classes.subtitle}>
                    In progress
                  </Typography>
                  <Container className={classes.productList}>
                    {products.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product in progress 🦴
                        </Typography>
                      </Container>
                    ) : (
                      products.map((product) => (
                        <Container className={classes.productItems}>
                          <Container className={classes.inProgressItems}>
                            <Typography
                              variant="subtitle1"
                              onClick={() => {
                                history.push(`/product/${product.id}`);
                              }}
                              className={classes.productTitle}
                            >
                              {product.productName}
                            </Typography>
                            <Typography variant="subtitle1">
                              ∙ {product.price}₩
                            </Typography>
                          </Container>
                          <Typography
                            variant="subtitle1"
                            className={classes.countdown}
                          >
                            3333
                            {/* <Countdown
                              date={product.remainingTime}
                              renderer={renderer}
                            /> */}
                          </Typography>
                        </Container>
                      ))
                    )}
                  </Container>

                  {/* Waiting  */}
                  <Typography variant="h5" className={classes.subtitle}>
                    Waiting for auction
                  </Typography>
                  <Container className={classes.productList}>
                    {products.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product waiting for auction 🦴
                        </Typography>
                      </Container>
                    ) : (
                      products.map((product) => (
                        <Container className={classes.waitingItems}>
                          <Typography
                            variant="subtitle1"
                            onClick={() => {
                              history.push(`/product/${product.id}`);
                            }}
                            className={classes.productTitle}
                          >
                            {product.productName}
                          </Typography>
                          <Typography variant="subtitle1">
                            ∙ {product.price}₩
                          </Typography>
                        </Container>
                      ))
                    )}
                  </Container>

                  {/* Finished */}
                  <Typography variant="h5" className={classes.subtitle}>
                    Finished
                  </Typography>
                  <Container className={classes.productList}>
                    {products.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product finished 🦴
                        </Typography>
                      </Container>
                    ) : (
                      products.map((product) => (
                        <Container className={classes.waitingItems}>
                          <Typography
                            variant="subtitle1"
                            onClick={() => {
                              history.push(`/product/${product.id}`);
                            }}
                            className={classes.productTitle}
                          >
                            {product.productName}
                          </Typography>
                          <Typography variant="subtitle1">
                            ∙ {product.price}₩
                          </Typography>
                          <Typography
                            variant="subtitle1"
                            className={classes.productProgress}
                          >
                            ∙ {product.progress}
                          </Typography>
                        </Container>
                      ))
                    )}
                  </Container>
                </>
              ) : (
                <>
                  {/* InProgress */}
                  <Typography variant="h5" className={classes.subtitle}>
                    InProgress
                  </Typography>
                  <Container className={classes.productList}>
                    {products.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product in progress 🦴
                        </Typography>
                      </Container>
                    ) : (
                      products.map((product) => (
                        <Container className={classes.productItems}>
                          <Container className={classes.inProgressItems}>
                            <Typography
                              variant="subtitle1"
                              onClick={() => {
                                history.push(`/product/${product.id}`);
                              }}
                              className={classes.productTitle}
                            >
                              {product.productName}
                            </Typography>
                            <Typography variant="subtitle1">
                              ∙ {product.price}₩
                            </Typography>
                          </Container>
                          <Typography
                            variant="subtitle1"
                            className={classes.countdown}
                          >
                            3333
                            {/* <Countdown
                                  date={product.remainingTime}
                                  renderer={renderer}
                                /> */}
                          </Typography>
                        </Container>
                      ))
                    )}
                  </Container>

                  {/* Closed */}
                  <Typography variant="h5" className={classes.subtitle}>
                    Closed
                  </Typography>
                  <Container className={classes.productList}>
                    {products.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product closed 🦴
                        </Typography>
                      </Container>
                    ) : (
                      products.map((product) => (
                        <Container className={classes.waitingItems}>
                          <Typography
                            variant="subtitle1"
                            onClick={() => {
                              history.push(`/product/${product.id}`);
                            }}
                            className={classes.productTitle}
                          >
                            {product.productName}
                          </Typography>
                          <Typography variant="subtitle1">
                            ∙ {product.price}₩
                          </Typography>
                        </Container>
                      ))
                    )}
                  </Container>

                  {/* Paid */}
                  <Typography variant="h5" className={classes.subtitle}>
                    Paid
                  </Typography>
                  <Container className={classes.productList}>
                    {products.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product waiting for payment 🦴
                        </Typography>
                      </Container>
                    ) : (
                      products.map((product) => (
                        <Container className={classes.waitingItems}>
                          <Typography
                            variant="subtitle1"
                            onClick={() => {
                              history.push(`/product/${product.id}`);
                            }}
                            className={classes.productTitle}
                          >
                            {product.productName}
                          </Typography>
                          <Typography variant="subtitle1">
                            ∙ {product.price}₩
                          </Typography>
                        </Container>
                      ))
                    )}
                  </Container>

                  {/* Completed */}
                  <Typography variant="h5" className={classes.subtitle}>
                    Completed
                  </Typography>
                  <Container className={classes.productList}>
                    {products.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product completed 🦴
                        </Typography>
                      </Container>
                    ) : (
                      products.map((product) => (
                        <Container className={classes.waitingItems}>
                          <Typography
                            variant="subtitle1"
                            onClick={() => {
                              history.push(`/product/${product.id}`);
                            }}
                            className={classes.productTitle}
                          >
                            {product.productName}
                          </Typography>
                          <Typography variant="subtitle1">
                            ∙ {product.price}₩
                          </Typography>
                        </Container>
                      ))
                    )}
                  </Container>
                </>
              )}
            </Container>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
};
