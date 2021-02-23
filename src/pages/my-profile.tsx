import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { gql, useLazyQuery } from "@apollo/client";
import { userDetail, userDetailVariables } from "../__generated__/userDetail";
import { USER_DETAIL } from "./user-detail";
import { useMe } from "../hooks/use-me";
import Countdown from "react-countdown";
import { myProfile } from "../__generated__/myProfile";

interface IRenderer {
  minutes: number;
  seconds: number;
  completed: boolean;
}

const MY_PROFILE = gql`
  query myProfile {
    myProfile {
      ok
      error
      uploadedProduct {
        id
        productName
        bidPrice
        progress
      }
      inProgressProduct {
        id
        productName
        bidPrice
        remainingTime
      }
      closedProduct {
        id
        productName
        bidPrice
      }
      paidProduct {
        id
        productName
        bidPrice
      }
      completedProduct {
        id
        productName
        bidPrice
      }
    }
  }
`;

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
    padding: 0,
  },
  waitingItems: {
    display: "flex",
    padding: 0,
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
  const { data } = useMe();

  const [
    userDetailQuery,
    { data: userDetailOutput, loading: userDetailLoading },
  ] = useLazyQuery<userDetail, userDetailVariables>(USER_DETAIL);

  const [
    myProfileQuery,
    { data: myProfileOutput, loading: myProfileLoading },
  ] = useLazyQuery<myProfile>(MY_PROFILE);

  useEffect(() => {
    if (!data) {
      history.push("/");
    }
    if (data) {
      userDetailQuery({
        variables: {
          input: {
            userId: data.me.id,
          },
        },
      });
      myProfileQuery();
    }
  }, [data, history, userDetailQuery, myProfileQuery]);

  const renderer = ({ minutes, seconds, completed }: IRenderer) => {
    if (completed) {
      // Render a completed state
      return (
        <span style={{ color: "#f44336", fontSize: "14px" }}>Finished!</span>
      );
    } else {
      // Render a countdown
      return (
        <span style={{ color: "#ff7961", fontSize: "14px" }}>
          {minutes < 10 ? `0${minutes}m` : `${minutes}m`}{" "}
          {seconds < 10 ? `0${seconds}s` : `${seconds}s`}
        </span>
      );
    }
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Fresh Meat - ${data?.me.username}`}</title>
      </Helmet>
      <main>
        <Container maxWidth="md">
          {userDetailLoading || myProfileLoading ? (
            <Container className={classes.loading}>
              <CircularProgress size={24} color="secondary" />
            </Container>
          ) : (
            <Container maxWidth="xs" className={classes.mainContent}>
              <Typography variant="h4">{`${data?.me.username}'s products`}</Typography>

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

              {tab === true &&
              userDetailOutput?.userDetail.inProgress &&
              userDetailOutput.userDetail.waiting &&
              myProfileOutput?.myProfile.uploadedProduct ? (
                <>
                  {/* In Progress */}
                  <Typography variant="h5" className={classes.subtitle}>
                    In progress
                  </Typography>
                  <Container className={classes.productList}>
                    {userDetailOutput.userDetail.inProgress.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product in progress 🦴
                        </Typography>
                      </Container>
                    ) : (
                      userDetailOutput.userDetail.inProgress.map((product) => (
                        <Container className={classes.productItems}>
                          <Container className={classes.inProgressItems}>
                            <Typography
                              variant="subtitle1"
                              onClick={() => {
                                history.push(`/product/${product.id}`);
                                window.scrollTo(0, 0);
                              }}
                              className={classes.productTitle}
                            >
                              {product.productName}
                            </Typography>
                            <Typography variant="subtitle1">
                              ∙ {product.bidPrice}₩
                            </Typography>
                          </Container>
                          <Typography
                            variant="subtitle1"
                            className={classes.countdown}
                          >
                            <Countdown
                              date={product.remainingTime}
                              renderer={renderer}
                            />
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
                    {userDetailOutput.userDetail.waiting.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product waiting for auction 🦴
                        </Typography>
                      </Container>
                    ) : (
                      userDetailOutput.userDetail.waiting.map((product) => (
                        <Container className={classes.waitingItems}>
                          <Typography
                            variant="subtitle1"
                            onClick={() => {
                              history.push(`/product/${product.id}`);
                              window.scrollTo(0, 0);
                            }}
                            className={classes.productTitle}
                          >
                            {product.productName}
                          </Typography>
                          <Typography variant="subtitle1">
                            ∙ {product.startPrice}₩
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
                    {myProfileOutput.myProfile.uploadedProduct.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product finished 🦴
                        </Typography>
                      </Container>
                    ) : (
                      myProfileOutput.myProfile.uploadedProduct.map(
                        (product) => (
                          <Container className={classes.waitingItems}>
                            <Typography
                              variant="subtitle1"
                              onClick={() => {
                                history.push(`/product/${product.id}`);
                                window.scrollTo(0, 0);
                              }}
                              className={classes.productTitle}
                            >
                              {product.productName}
                            </Typography>
                            <Typography variant="subtitle1">
                              ∙ {product.bidPrice}₩
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              className={classes.productProgress}
                            >
                              ∙ {product.progress}
                            </Typography>
                          </Container>
                        )
                      )
                    )}
                  </Container>
                </>
              ) : (
                <>{/* TODO */}</>
              )}
              {tab === false &&
              myProfileOutput?.myProfile.inProgressProduct &&
              myProfileOutput.myProfile.closedProduct &&
              myProfileOutput.myProfile.paidProduct &&
              myProfileOutput.myProfile.completedProduct ? (
                <>
                  {/* InProgress */}
                  <Typography variant="h5" className={classes.subtitle}>
                    InProgress
                  </Typography>
                  <Container className={classes.productList}>
                    {myProfileOutput.myProfile.inProgressProduct.length ===
                    0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product in progress 🦴
                        </Typography>
                      </Container>
                    ) : (
                      myProfileOutput.myProfile.inProgressProduct.map(
                        (product) => (
                          <Container className={classes.productItems}>
                            <Container className={classes.inProgressItems}>
                              <Typography
                                variant="subtitle1"
                                onClick={() => {
                                  history.push(`/product/${product.id}`);
                                  window.scrollTo(0, 0);
                                }}
                                className={classes.productTitle}
                              >
                                {product.productName}
                              </Typography>
                              <Typography variant="subtitle1">
                                ∙ {product.bidPrice}₩
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
                        )
                      )
                    )}
                  </Container>

                  {/* Closed */}
                  <Typography variant="h5" className={classes.subtitle}>
                    Closed
                  </Typography>
                  <Container className={classes.productList}>
                    {myProfileOutput.myProfile.closedProduct.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product closed 🦴
                        </Typography>
                      </Container>
                    ) : (
                      myProfileOutput.myProfile.closedProduct.map((product) => (
                        <Container className={classes.waitingItems}>
                          <Typography
                            variant="subtitle1"
                            onClick={() => {
                              history.push(`/product/${product.id}`);
                              window.scrollTo(0, 0);
                            }}
                            className={classes.productTitle}
                          >
                            {product.productName}
                          </Typography>
                          <Typography variant="subtitle1">
                            ∙ {product.bidPrice}₩
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
                    {myProfileOutput.myProfile.paidProduct.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product waiting for payment 🦴
                        </Typography>
                      </Container>
                    ) : (
                      myProfileOutput.myProfile.paidProduct.map((product) => (
                        <Container className={classes.waitingItems}>
                          <Typography
                            variant="subtitle1"
                            onClick={() => {
                              history.push(`/product/${product.id}`);
                              window.scrollTo(0, 0);
                            }}
                            className={classes.productTitle}
                          >
                            {product.productName}
                          </Typography>
                          <Typography variant="subtitle1">
                            ∙ {product.bidPrice}₩
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
                    {myProfileOutput.myProfile.completedProduct.length === 0 ? (
                      <Container className={classes.noProduct}>
                        <Typography variant="overline">
                          There is no product completed 🦴
                        </Typography>
                      </Container>
                    ) : (
                      myProfileOutput.myProfile.completedProduct.map(
                        (product) => (
                          <Container className={classes.waitingItems}>
                            <Typography
                              variant="subtitle1"
                              onClick={() => {
                                history.push(`/product/${product.id}`);
                                window.scrollTo(0, 0);
                              }}
                              className={classes.productTitle}
                            >
                              {product.productName}
                            </Typography>
                            <Typography variant="subtitle1">
                              ∙ {product.bidPrice}₩
                            </Typography>
                          </Container>
                        )
                      )
                    )}
                  </Container>
                </>
              ) : (
                <>{/* TODO */}</>
              )}
            </Container>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
};
