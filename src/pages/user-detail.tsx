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

type IParams = {
  id: string;
};

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
                        <Typography
                          variant="subtitle1"
                          onClick={() => {
                            history.push(`/product/${product.id}`);
                          }}
                        >
                          {product.productName} ∙ {product.bidPrice}₩
                        </Typography>
                        {/* TODO */}
                        <Typography variant="subtitle1">03m 32s</Typography>
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
                      <Container className={classes.productItems}>
                        <Typography
                          variant="subtitle1"
                          onClick={() => {
                            history.push(`/product/${product.id}`);
                          }}
                        >
                          {product.productName} ∙ {product.startPrice}₩
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
