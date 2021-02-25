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
import { gql, useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import {
  getWaitingProducts,
  getWaitingProductsVariables,
} from "../__generated__/getWaitingProducts";
import {
  getInProgressProducts,
  getInProgressProductsVariables,
} from "../__generated__/getInProgressProducts";
import { useHistory } from "react-router-dom";
import indigo from "@material-ui/core/colors/indigo";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  createBidding,
  createBiddingVariables,
} from "../__generated__/createBidding";
import { useForm } from "react-hook-form";
import {
  updateBidding,
  updateBiddingVariables,
} from "../__generated__/updateBidding";
import Countdown from "react-countdown";
import { isLoggedInVar } from "../apollo";

type IForm = {
  bidPrice: string;
};

interface IRenderer {
  minutes: number;
  seconds: number;
  completed: boolean;
}

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

const CREATE_BIDDING = gql`
  mutation createBidding($input: CreateBiddingDto!) {
    createBidding(input: $input) {
      ok
      error
    }
  }
`;

const UPDATE_BIDDING = gql`
  mutation updateBidding($input: UpdateBiddingDto!) {
    updateBidding(input: $input) {
      ok
      error
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
  uploadContainer: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: theme.spacing(4),
  },
  uploadButton: {
    backgroundColor: indigo[900],
    color: "white",
    minWidth: "100px",
    "&.MuiButton-root:hover": {
      backgroundColor: "#000051",
    },
  },
}));

export const Home = () => {
  const classes = useStyles();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const history = useHistory();
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

  const { register, handleSubmit, getValues } = useForm<IForm>();

  const onCreateCompleted = (data: createBidding) => {
    const {
      createBidding: { ok },
    } = data;
    if (ok) {
      window.location.reload();
    }
  };

  const onUpdateCompleted = (data: updateBidding) => {
    const {
      updateBidding: { ok },
    } = data;
    if (ok) {
      window.location.reload();
    }
  };

  const [
    createBiddingMutation,
    { data: createBiddingOutput, loading: createBiddingLoading },
  ] = useMutation<createBidding, createBiddingVariables>(CREATE_BIDDING, {
    onCompleted: onCreateCompleted,
  });

  const [
    updateBiddingMutation,
    { data: updateBiddingOutput, loading: updateBiddingLoading },
  ] = useMutation<updateBidding, updateBiddingVariables>(UPDATE_BIDDING, {
    onCompleted: onUpdateCompleted,
  });

  useEffect(() => {
    updateInProgressProducts();
    updateWatingProducts();
  }, [updateInProgressProducts, updateWatingProducts]);

  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState<number | null>(null);
  const [startPrice, setStartPrice] = useState<number | null>(null);
  const [isInProgress, setIsInProgress] = useState(true);

  const handleClickOpen = (
    productId: number,
    productStartPrice: number,
    productProgress: boolean
  ) => {
    setOpen(true);
    setProductId(productId);
    setStartPrice(productStartPrice);
    setIsInProgress(productProgress);
  };

  const handleClose = () => {
    setOpen(false);
  };

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

  const IN_PROGRESS_TEXT_1 = (
    <span>
      The Current price is{" "}
      <span style={{ fontWeight: "bold" }}>{startPrice}</span> won. The bid
      price must be more than{" "}
      <span style={{ fontWeight: "bold" }}>{startPrice}</span> won.
    </span>
  );

  const IN_PROGRESS_TEXT_2 = (
    <span>
      If you are sure, Please type more than{" "}
      <span style={{ fontWeight: "bold" }}>{startPrice}</span> to higher bid.
    </span>
  );

  const WAITING_TEXT_1 = (
    <span>
      The starting price is{" "}
      <span style={{ fontWeight: "bold" }}>{startPrice}</span> won. Are you
      sure?
    </span>
  );

  const WAITING_TEXT_2 = (
    <span>
      If you are sure, Please type{" "}
      <span style={{ fontWeight: "bold" }}>{startPrice}</span> to bid.
    </span>
  );

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

          {/* Upload Button */}
          {isLoggedIn && (
            <Container className={classes.uploadContainer}>
              <Button
                className={classes.uploadButton}
                variant={"contained"}
                onClick={() => {
                  history.push("/product/new");
                }}
              >
                Upload
              </Button>
            </Container>
          )}
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
                            <Countdown
                              date={product.remainingTime}
                              renderer={renderer}
                            />

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
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => {
                                history.push(`/product/${product.id}`);
                              }}
                            >
                              View
                            </Button>
                            {isLoggedIn && (
                              <Button
                                size="small"
                                color="primary"
                                onClick={() => {
                                  handleClickOpen(
                                    product.id,
                                    product.bidPrice ? product.bidPrice : 33,
                                    true
                                  );
                                }}
                              >
                                Bidding
                              </Button>
                            )}
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
                      There are no product waiting for auction 🦴
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
                            <Button
                              size="small"
                              color="primary"
                              onClick={() => {
                                history.push(`/product/${product.id}`);
                              }}
                            >
                              View
                            </Button>
                            {isLoggedIn && (
                              <Button
                                size="small"
                                color="primary"
                                onClick={() => {
                                  handleClickOpen(
                                    product.id,
                                    product.startPrice,
                                    false
                                  );
                                }}
                              >
                                Bidding
                              </Button>
                            )}
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
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">
                {isInProgress === true
                  ? "Higher bid on a product"
                  : "Bid on a product"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                  {isInProgress === true ? IN_PROGRESS_TEXT_1 : WAITING_TEXT_1}
                </DialogContentText>
                <DialogContentText>
                  {isInProgress === true ? IN_PROGRESS_TEXT_2 : WAITING_TEXT_2}
                </DialogContentText>
                {createBiddingOutput?.createBidding.error && (
                  <DialogContentText color="error">
                    {createBiddingOutput.createBidding.error}
                  </DialogContentText>
                )}
                {updateBiddingOutput?.updateBidding.error && (
                  <DialogContentText color="error">
                    {updateBiddingOutput.updateBidding.error}
                  </DialogContentText>
                )}
                <form
                  onSubmit={handleSubmit(() => {
                    const { bidPrice } = getValues();
                    if (productId) {
                      if (isInProgress) {
                        updateBiddingMutation({
                          variables: {
                            input: {
                              productId,
                              bidPrice: +bidPrice,
                            },
                          },
                        });
                      }
                      if (!isInProgress) {
                        createBiddingMutation({
                          variables: {
                            input: {
                              productId,
                              startPrice: +bidPrice,
                            },
                          },
                        });
                      }
                    }
                  })}
                >
                  <TextField
                    autoFocus
                    margin="dense"
                    id="bidPrice"
                    label={
                      isInProgress === true
                        ? `Current price: ${startPrice}`
                        : `Starting price: ${startPrice}`
                    }
                    type="text"
                    fullWidth
                    name="bidPrice"
                    inputRef={register}
                  />
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button color="primary" type="submit">
                    {createBiddingLoading || updateBiddingLoading ? (
                      <CircularProgress size={24} />
                    ) : (
                      "Bidding"
                    )}
                  </Button>
                </form>
                {/* TODO : Error */}
              </DialogContent>
              <DialogActions></DialogActions>
            </Dialog>
          </Grid>
        </Container>
      </main>
    </React.Fragment>
  );
};
