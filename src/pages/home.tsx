import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CircularProgress from "@material-ui/core/CircularProgress";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { gql, useLazyQuery } from "@apollo/client";
import {
  getWaitingProducts,
  getWaitingProductsVariables,
} from "../__generated__/getWaitingProducts";
import {
  getInProgressProducts,
  getInProgressProductsVariables,
} from "../__generated__/getInProgressProducts";

const GET_IN_PROGRESS_PRODUCTS = gql`
  query getInProgressProducts($input: GetAllProductsDto!) {
    getInProgressProducts(input: $input) {
      ok
      error
      maxPage
      products {
        id
        productName
        description
        bidPrice
        remainingTime
        pictures {
          url
        }
      }
    }
  }
`;

const GET_WAITING_PRODUCTS = gql`
  query getWaitingProducts($input: GetAllProductsDto!) {
    getWaitingProducts(input: $input) {
      ok
      error
      maxPage
      products {
        id
        productName
        description
        startPrice
        remainingTime
        pictures {
          url
        }
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  progressButton: {
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  page: {
    paddingTop: theme.spacing(4),
  },
  pageNumber: {
    backgroundColor: theme.palette.secondary.main,
    width: "40px",
    height: "40px",
    fontSize: "large",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(24),
  },
  noContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(20),
  },
}));

export const Home = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(true);
  const [inProgressPage, setInProgressPage] = useState(1);
  const [waitingPage, setWaitingPage] = useState(1);

  const [
    updateInProgressProducts,
    { data: inProgressProducts, loading: inProgressProductsLoading },
  ] = useLazyQuery<getInProgressProducts, getInProgressProductsVariables>(
    GET_IN_PROGRESS_PRODUCTS,
    {
      variables: {
        input: {
          page: inProgressPage,
        },
      },
    }
  );

  const [
    updateWatingProducts,
    { data: waitingProducts, loading: waitingProductsLoading },
  ] = useLazyQuery<getWaitingProducts, getWaitingProductsVariables>(
    GET_WAITING_PRODUCTS,
    {
      variables: {
        input: {
          page: waitingPage,
        },
      },
    }
  );

  useEffect(() => {
    updateInProgressProducts();
    updateWatingProducts();
  }, [updateInProgressProducts, updateWatingProducts]);

  return (
    <React.Fragment>
      <Helmet>
        <title>Fresh Meat</title>
      </Helmet>
      <main>
        {/* Progress Status Choose Button */}
        <div className={classes.progressButton}>
          <Container maxWidth="sm">
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant={tab ? "contained" : "outlined"}
                  color="secondary"
                  style={{ minWidth: "130px" }}
                  onClick={() => setTab(true)}
                >
                  In Progress
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant={tab ? "outlined" : "contained"}
                  color="secondary"
                  style={{ minWidth: "130px" }}
                  onClick={() => setTab(false)}
                >
                  Waiting
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>

        {/* Product Card */}
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {tab === true ? (
              <>
                {/* In Progress */}
                {inProgressProductsLoading ? (
                  <Container className={classes.loading}>
                    <CircularProgress size={24} color="secondary" />
                  </Container>
                ) : inProgressProducts?.getInProgressProducts.products
                    ?.length === 0 ? (
                  <Container className={classes.noContent}>
                    <Typography variant="h3">Oops!</Typography>
                    <Typography variant="subtitle1">
                      There is no product in progress 🦴
                    </Typography>
                  </Container>
                ) : (
                  inProgressProducts?.getInProgressProducts.products?.map(
                    (product) => (
                      <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.cardImage}
                            image={
                              product.pictures.length !== 0
                                ? product.pictures[0].url
                                : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                            }
                            title="Image title"
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {product.productName}
                            </Typography>
                            <Typography variant="subtitle1">
                              {product.bidPrice} ₩
                            </Typography>
                            <Container
                              style={{
                                minHeight: "50px",
                                maxHeight: "50px",
                                padding: 0,
                              }}
                            >
                              <Typography variant="subtitle2">
                                {product.description
                                  ? product.description
                                  : "No description"}
                              </Typography>
                            </Container>
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="primary">
                              View
                            </Button>
                            <Button size="small" color="primary">
                              Edit
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    )
                  )
                )}
                {/* Page Button */}
                <Container>
                  <div className={classes.page}>
                    <Container maxWidth="sm">
                      <Grid container spacing={2} justify="center">
                        <Grid item>
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                              if (inProgressPage > 1) {
                                setInProgressPage(inProgressPage - 1);
                                updateInProgressProducts();
                                window.scrollTo(0, 0);
                              }
                            }}
                          >
                            ◀
                          </Button>
                        </Grid>
                        <Grid item>
                          <Box className={classes.pageNumber}>
                            {inProgressPage}
                          </Box>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                              if (
                                inProgressProducts &&
                                inProgressProducts.getInProgressProducts
                                  .maxPage !== null &&
                                inProgressPage <
                                  inProgressProducts.getInProgressProducts
                                    .maxPage
                              ) {
                                setInProgressPage(inProgressPage + 1);
                                updateInProgressProducts();
                                window.scrollTo(0, 0);
                              }
                            }}
                          >
                            ▶
                          </Button>
                        </Grid>
                      </Grid>
                    </Container>
                  </div>
                </Container>
              </>
            ) : (
              <>
                {/* Waiting */}
                {waitingProductsLoading ? (
                  <Container className={classes.loading}>
                    <CircularProgress size={24} color="secondary" />
                  </Container>
                ) : waitingProducts?.getWaitingProducts.products?.length ===
                  0 ? (
                  <Container className={classes.noContent}>
                    <Typography variant="h3">Oops!</Typography>
                    <Typography variant="subtitle1">
                      There are no products waiting for auction 🦴
                    </Typography>
                  </Container>
                ) : (
                  // If product exist
                  waitingProducts?.getWaitingProducts.products?.map(
                    (product) => (
                      <Grid item key={product.id} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.cardImage}
                            image={
                              product.pictures.length !== 0
                                ? product.pictures[0].url
                                : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                            }
                            title="Image title"
                          />
                          <CardContent className={classes.cardContent}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="h2"
                            >
                              {product.productName}
                            </Typography>
                            <Typography variant="subtitle1">
                              {product.startPrice} ₩
                            </Typography>
                            <Container
                              style={{
                                minHeight: "50px",
                                maxHeight: "50px",
                                padding: 0,
                              }}
                            >
                              <Typography variant="subtitle2">
                                {product.description
                                  ? product.description
                                  : "No description"}
                              </Typography>
                            </Container>
                          </CardContent>
                          <CardActions>
                            <Button size="small" color="primary">
                              View
                            </Button>
                            <Button size="small" color="primary">
                              Bidding
                            </Button>
                          </CardActions>
                        </Card>
                      </Grid>
                    )
                  )
                )}
                {/* Page Button */}
                <Container>
                  <div className={classes.page}>
                    <Container maxWidth="sm">
                      <Grid container spacing={2} justify="center">
                        <Grid item>
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                              if (waitingPage > 1) {
                                setWaitingPage(waitingPage - 1);
                                updateWatingProducts();
                                window.scrollTo(0, 0);
                              }
                            }}
                          >
                            ◀
                          </Button>
                        </Grid>
                        <Grid item>
                          <Box className={classes.pageNumber}>
                            {waitingPage}
                          </Box>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="text"
                            color="secondary"
                            onClick={() => {
                              if (
                                waitingProducts &&
                                waitingProducts.getWaitingProducts.maxPage !==
                                  null &&
                                waitingPage <
                                  waitingProducts.getWaitingProducts.maxPage
                              ) {
                                setWaitingPage(waitingPage + 1);
                                updateWatingProducts();
                                window.scrollTo(0, 0);
                              }
                            }}
                          >
                            ▶
                          </Button>
                        </Grid>
                      </Grid>
                    </Container>
                  </div>
                </Container>
              </>
            )}
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};
