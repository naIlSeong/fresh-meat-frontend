import { gql, useLazyQuery } from "@apollo/client";
import {
  CircularProgress,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import { Header } from "../components/header";
import { userDetail, userDetailVariables } from "../__generated__/userDetail";
import Countdown from "react-countdown";

type IParams = {
  id: string;
};

interface IRenderer {
  minutes: number;
  seconds: number;
  completed: boolean;
}

const USER_DETAIL = gql`
  query userDetail($input: UserDetailDto!) {
    userDetail(input: $input) {
      ok
      error
      user {
        id
        username
      }
      inProgress {
        id
        productName
        bidPrice
        remainingTime
      }
      waiting {
        id
        productName
        startPrice
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
  productLoading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: theme.spacing(20),
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
  productItems: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  waitingItems: {
    display: "flex",
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: 0,
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
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
  countdown: {
    minWidth: theme.spacing(8),
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
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
  const { id } = useParams<IParams>();
  const classes = useStyles();
  const history = useHistory();

  const [userDetailQuery, { data, loading }] = useLazyQuery<
    userDetail,
    userDetailVariables
  >(USER_DETAIL, {
    variables: {
      input: {
        userId: +id,
      },
    },
  });

  useEffect(() => {
    if (!id) {
      history.push("/");
    }
    userDetailQuery();
  }, [userDetailQuery, history, id]);

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
        <title>{`Fresh Meat - ${data?.userDetail.user?.username}`}</title>
      </Helmet>
      <Header title="Profile" />
      <main>
        <Container maxWidth="md">
          {loading && !data ? (
            <Container className={classes.loading}>
              <CircularProgress size={24} color="secondary" />
            </Container>
          ) : (
            <Container maxWidth="xs" className={classes.mainContent}>
              <Typography variant="h4">{`${data?.userDetail.user?.username}'s products`}</Typography>

              {/* In Progress */}
              <Typography variant="h5" className={classes.subtitle}>
                In progress
              </Typography>
              <Container className={classes.productList}>
                {!loading && data?.userDetail.inProgress ? (
                  data.userDetail.inProgress.length === 0 ? (
                    <Container className={classes.noProduct}>
                      <Typography variant="h3">Oops!</Typography>
                      <Typography variant="subtitle1">
                        There is no product in progress 🦴
                      </Typography>
                    </Container>
                  ) : (
                    data.userDetail.inProgress.map((product) => (
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
                  )
                ) : (
                  <Container className={classes.productLoading}>
                    <CircularProgress size={24} color="secondary" />
                  </Container>
                )}
              </Container>

              {/* Waiting */}
              <Typography variant="h5" className={classes.subtitle}>
                Waiting for auction
              </Typography>
              <Container className={classes.productList}>
                {!loading && data?.userDetail.waiting ? (
                  data.userDetail.waiting.length === 0 ? (
                    <Container className={classes.noProduct}>
                      <Typography variant="h3">Oops!</Typography>
                      <Typography variant="subtitle1">
                        There is no product waiting for auction 🦴
                      </Typography>
                    </Container>
                  ) : (
                    data.userDetail.waiting.map((product) => (
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
                          ∙ {product.startPrice}₩
                        </Typography>
                      </Container>
                    ))
                  )
                ) : (
                  <Container className={classes.productLoading}>
                    <CircularProgress size={24} color="secondary" />
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
