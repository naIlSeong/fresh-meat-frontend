import React, { useEffect } from "react";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { Link, useHistory, useParams } from "react-router-dom";
import { Progress } from "../__generated__/globalTypes";
import { gql, useLazyQuery, useMutation, useReactiveVar } from "@apollo/client";
import { useMe } from "../hooks/use-me";
import {
  productDetail,
  productDetailVariables,
} from "../__generated__/productDetail";
import {
  editProgress,
  editProgressVariables,
} from "../__generated__/editProgress";
import { FormError } from "../components/form-error";
import {
  deleteProduct,
  deleteProductVariables,
} from "../__generated__/deleteProduct";
import { isLoggedInVar } from "../apollo";
import { NotFound } from "../components/not-found";

type IParams = {
  id: string;
};

export const PRODUCT_DETAIL = gql`
  query productDetail($input: ProductDetailDto!) {
    productDetail(input: $input) {
      ok
      error
      product {
        id
        productName
        startPrice
        bidPrice
        description
        picture {
          key
          fileName
        }
        seller {
          id
          username
        }
        bidder {
          id
          username
        }
        progress
      }
    }
  }
`;

const EDIT_PROGRESS = gql`
  mutation editProgress($input: EditProgressDto!) {
    editProgress(input: $input) {
      ok
      error
    }
  }
`;

const DELETE_PRODUCT = gql`
  mutation deleteProduct($input: DeleteProductDto!) {
    deleteProduct(input: $input) {
      ok
      error
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
  stepper: {
    padding: theme.spacing(3, 0, 8),
    backgroundColor: theme.palette.primary.main,
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  listItem: {
    padding: theme.spacing(1, 0),
  },
  textLink: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    "&:hover": {
      textDecoration: "underline",
    },
  },
  buttonContainer: {
    padding: 0,
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(6),
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    minWidth: "180px",
    "&.MuiButton-root:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
  deleteButton: {
    backgroundColor: "#9a0007",
    color: "white",
    minWidth: "180px",
    "&.MuiButton-root:hover": {
      backgroundColor: "#650000",
    },
  },
  editButton: {
    marginRight: theme.spacing(2),
    backgroundColor: theme.palette.secondary.main,
    color: "white",
    minWidth: "180px",
    "&.MuiButton-root:hover": {
      backgroundColor: theme.palette.secondary.dark,
    },
  },
}));

export const ProductDetail = () => {
  const { id } = useParams<IParams>();
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const classes = useStyles();
  const history = useHistory();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const { data: meOutput } = useMe();
  const [
    productDetailQuery,
    { data: productDetailOutput, loading: productDetailLoading },
  ] = useLazyQuery<productDetail, productDetailVariables>(PRODUCT_DETAIL, {
    variables: {
      input: {
        productId: +id,
      },
    },
  });

  const onCompleted = (data: editProgress) => {
    const {
      editProgress: { ok },
    } = data;
    if (ok) {
      handleClose();
      window.location.reload();
      window.scrollTo(0, 0);
    }
  };

  const onDeleteCompleted = (data: deleteProduct) => {
    const {
      deleteProduct: { ok },
    } = data;
    if (ok) {
      handleClose();
      history.push("/");
      window.location.reload();
      window.scrollTo(0, 0);
    }
  };

  const [
    editProgressMutation,
    { data: editProgressOutput, loading: editProgressLoading },
  ] = useMutation<editProgress, editProgressVariables>(EDIT_PROGRESS, {
    onCompleted,
  });

  const [
    deleteProductMutation,
    { data: deleteProductOutput, loading: deleteProductLoading },
  ] = useMutation<deleteProduct, deleteProductVariables>(DELETE_PRODUCT, {
    onCompleted: onDeleteCompleted,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const steps = ["Waiting", "In progress", "Closed", "Paid", "Completed"];

  useEffect(() => {
    if (!id) {
      history.push("/");
    }
    if (id) {
      productDetailQuery({
        variables: {
          input: {
            productId: +id,
          },
        },
      });
    }

    if (
      productDetailOutput?.productDetail.product?.progress === Progress.Waiting
    ) {
      setActiveStep(0);
    }
    if (
      productDetailOutput?.productDetail.product?.progress ===
      Progress.InProgress
    ) {
      setActiveStep(1);
    }
    if (
      productDetailOutput?.productDetail.product?.progress === Progress.Closed
    ) {
      setActiveStep(2);
    }
    if (
      productDetailOutput?.productDetail.product?.progress === Progress.Paid
    ) {
      setActiveStep(3);
    }
    if (
      productDetailOutput?.productDetail.product?.progress ===
      Progress.Completed
    ) {
      setActiveStep(4);
    }
  }, [
    history,
    id,
    meOutput,
    productDetailOutput?.productDetail.product?.progress,
    productDetailQuery,
  ]);

  return !productDetailOutput?.productDetail.ok ? (
    <NotFound />
  ) : (
    <React.Fragment>
      <Helmet>
        <title>{`Fresh Meat - ${productDetailOutput?.productDetail.product?.productName}`}</title>
      </Helmet>
      <main className={classes.layout}>
        <Container maxWidth="md">
          {productDetailLoading &&
          productDetailOutput?.productDetail.product ? (
            <Container className={classes.loading}>
              <CircularProgress size={24} color="secondary" />
            </Container>
          ) : (
            <div>
              {/* Stepper */}
              <Typography variant="h5">Progress status</Typography>
              <Stepper
                activeStep={activeStep}
                className={classes.stepper}
                alternativeLabel
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>
                      <Typography variant="overline">{label}</Typography>
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>

              {/* Detail */}
              <Typography variant="h5" gutterBottom>
                Product detail
              </Typography>

              {/* Product name */}
              <List disablePadding>
                <ListItem
                  className={classes.listItem}
                  key={productDetailOutput?.productDetail.product?.productName}
                >
                  <ListItemText
                    primary="Product name"
                    secondary={
                      productDetailOutput?.productDetail.product?.productName
                    }
                  />
                </ListItem>

                {/* Starting price */}
                <ListItem
                  className={classes.listItem}
                  key={productDetailOutput?.productDetail.product?.startPrice}
                >
                  <ListItemText
                    primary="Starting price"
                    secondary={`${productDetailOutput?.productDetail.product?.startPrice}₩`}
                  />
                </ListItem>

                {/* Current Price */}
                {productDetailOutput?.productDetail.product?.bidder && (
                  <ListItem
                    className={classes.listItem}
                    key={productDetailOutput?.productDetail.product?.bidPrice}
                  >
                    <ListItemText
                      primary="Current price"
                      secondary={`${productDetailOutput?.productDetail.product?.bidPrice}₩`}
                    />
                  </ListItem>
                )}

                {/* Seller */}
                <ListItem
                  className={classes.listItem}
                  key={
                    productDetailOutput?.productDetail.product?.seller.username
                  }
                >
                  <ListItemText
                    primary="Seller"
                    secondary={
                      <Typography variant="body2">
                        <Link
                          to={`/user/${productDetailOutput?.productDetail.product?.seller.id}`}
                          className={classes.textLink}
                        >
                          {
                            productDetailOutput?.productDetail.product?.seller
                              .username
                          }
                        </Link>
                      </Typography>
                    }
                  />
                </ListItem>

                {/* Buyer */}
                {productDetailOutput?.productDetail.product?.bidder && (
                  <ListItem
                    className={classes.listItem}
                    key={
                      productDetailOutput?.productDetail.product?.bidder
                        .username
                    }
                  >
                    <ListItemText
                      primary="Buyer"
                      secondary={
                        <Typography variant="body2">
                          <Link
                            to={`/user/${productDetailOutput.productDetail.product.bidder.id}`}
                            className={classes.textLink}
                          >
                            {
                              productDetailOutput.productDetail.product.bidder
                                .username
                            }
                          </Link>
                        </Typography>
                      }
                    />
                  </ListItem>
                )}
              </List>

              {/* Button */}
              {isLoggedIn && (
                <Container className={classes.buttonContainer}>
                  {/* closed -> paid */}
                  {productDetailOutput?.productDetail.product?.bidder &&
                    meOutput?.me.id ===
                      productDetailOutput.productDetail.product.bidder.id &&
                    productDetailOutput.productDetail.product.progress ===
                      Progress.Closed && (
                      <>
                        <Button
                          className={classes.button}
                          onClick={handleClickOpen}
                        >
                          Request confirm
                        </Button>

                        {/* Dialog */}
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            Request confirm
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Have you paid and would you like to ask for
                              confirmation?
                            </DialogContentText>
                            {editProgressOutput?.editProgress.error && (
                              <FormError
                                errorMessage={
                                  editProgressOutput.editProgress.error
                                }
                              />
                            )}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              No
                            </Button>
                            <Button
                              onClick={() => {
                                if (productDetailOutput.productDetail.product) {
                                  editProgressMutation({
                                    variables: {
                                      input: {
                                        productId:
                                          productDetailOutput.productDetail
                                            .product.id,
                                      },
                                    },
                                  });
                                }
                              }}
                              color="primary"
                              autoFocus
                            >
                              {editProgressLoading ? (
                                <CircularProgress size={14} />
                              ) : (
                                "Yes"
                              )}
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    )}

                  {/* paid -> completed */}
                  {meOutput?.me.id ===
                    productDetailOutput?.productDetail.product?.seller.id &&
                    productDetailOutput?.productDetail.product?.progress ===
                      Progress.Paid && (
                      <>
                        <Button
                          className={classes.button}
                          onClick={handleClickOpen}
                        >
                          Confirm payment
                        </Button>

                        {/* Dialog */}
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            Confirm payment
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Have you received payment and want to complete the
                              transaction?
                            </DialogContentText>
                            {editProgressOutput?.editProgress.error && (
                              <FormError
                                errorMessage={
                                  editProgressOutput.editProgress.error
                                }
                              />
                            )}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                if (productDetailOutput.productDetail.product) {
                                  editProgressMutation({
                                    variables: {
                                      input: {
                                        productId:
                                          productDetailOutput.productDetail
                                            .product.id,
                                      },
                                    },
                                  });
                                }
                              }}
                              color="primary"
                              autoFocus
                            >
                              {editProgressLoading ? (
                                <CircularProgress size={14} />
                              ) : (
                                "Yes"
                              )}
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    )}

                  {/* Edit Button */}
                  {meOutput?.me.id ===
                    productDetailOutput?.productDetail.product?.seller.id &&
                    productDetailOutput?.productDetail.product?.progress ===
                      Progress.Waiting && (
                      <Button
                        className={classes.editButton}
                        onClick={() => {
                          history.push(
                            `/edit-product/${productDetailOutput.productDetail.product?.id}`
                          );
                          window.scrollTo(0, 0);
                        }}
                      >
                        Edit product
                      </Button>
                    )}

                  {/* Delete Button */}
                  {meOutput?.me.id ===
                    productDetailOutput?.productDetail.product?.seller.id &&
                    (productDetailOutput?.productDetail.product?.progress ===
                      Progress.Waiting ||
                      productDetailOutput?.productDetail.product?.progress ===
                        Progress.Completed) && (
                      <>
                        <Button
                          className={classes.deleteButton}
                          onClick={handleClickOpen}
                        >
                          Delete product
                        </Button>

                        {/* Dialog */}
                        <Dialog
                          open={open}
                          onClose={handleClose}
                          aria-labelledby="alert-dialog-title"
                          aria-describedby="alert-dialog-description"
                        >
                          <DialogTitle id="alert-dialog-title">
                            Delete product
                          </DialogTitle>
                          <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                              Are you sure you want to delete the product?
                            </DialogContentText>
                            {deleteProductOutput?.deleteProduct.error && (
                              <FormError
                                errorMessage={
                                  deleteProductOutput.deleteProduct.error
                                }
                              />
                            )}
                          </DialogContent>
                          <DialogActions>
                            <Button onClick={handleClose} color="primary">
                              Cancel
                            </Button>
                            <Button
                              onClick={() => {
                                // TODO : Delete Product
                                if (productDetailOutput.productDetail.product) {
                                  deleteProductMutation({
                                    variables: {
                                      input: {
                                        productId:
                                          productDetailOutput.productDetail
                                            .product.id,
                                      },
                                    },
                                  });
                                }
                              }}
                              color="primary"
                              autoFocus
                            >
                              {deleteProductLoading ? (
                                <CircularProgress size={14} />
                              ) : (
                                "Yes"
                              )}
                            </Button>
                          </DialogActions>
                        </Dialog>
                      </>
                    )}
                </Container>
              )}
            </div>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
};
