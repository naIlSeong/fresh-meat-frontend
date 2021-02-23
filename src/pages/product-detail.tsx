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
import { Link, useParams } from "react-router-dom";
import { Header } from "../components/header";
import { Progress } from "../__generated__/globalTypes";

type IParams = {
  id: string;
};

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
}));

export const ProductDetail = () => {
  const { id } = useParams<IParams>();
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Delete
  const loading = false;
  const steps = ["Waiting", "In progress", "Closed", "Paid", "Completed"];
  const product = {
    id: 1,
    productName: "MacBook Pro",
    startPrice: "5000",
    bidPrice: "14000",
    // progress: "Waiting",
    // progress: "InProgress",
    // progress: "Closed",
    // progress: "Paid",
    progress: "Completed",
    seller: { id: 4444, username: "Anonymous" },
    bidder: { id: 6666, username: "nailseong" },
  };
  const me = { id: 4444 };
  //   const me = { id: 6666 };
  // Delete

  useEffect(() => {
    if (product.progress === Progress.Waiting) {
      setActiveStep(0);
    }
    if (product.progress === Progress.InProgress) {
      setActiveStep(1);
    }
    if (product.progress === Progress.Closed) {
      setActiveStep(2);
    }
    if (product.progress === Progress.Paid) {
      setActiveStep(3);
    }
    if (product.progress === Progress.Completed) {
      setActiveStep(4);
    }
  }, []);

  return (
    <React.Fragment>
      <Helmet>
        <title>{`Fresh Meat - productname`}</title>
      </Helmet>
      <Header title={product.productName} />
      <main className={classes.layout}>
        <Container maxWidth="md">
          {loading ? (
            <Container className={classes.loading}>
              <CircularProgress size={24} color="secondary" />
            </Container>
          ) : (
            <div>
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
              <Typography variant="h5" gutterBottom>
                Product detail
              </Typography>
              <List disablePadding>
                <ListItem
                  className={classes.listItem}
                  key={product.productName}
                >
                  <ListItemText
                    primary="Product name"
                    secondary={product.productName}
                  />
                </ListItem>
                <ListItem className={classes.listItem} key={product.startPrice}>
                  <ListItemText
                    primary="Starting price"
                    secondary={`${product.startPrice}₩`}
                  />
                </ListItem>
                <ListItem className={classes.listItem} key={product.bidPrice}>
                  <ListItemText
                    primary="Final price"
                    secondary={`${product.bidPrice}₩`}
                  />
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  key={product.seller.username}
                >
                  <ListItemText
                    primary="Seller"
                    secondary={
                      <Typography variant="body2">
                        <Link
                          to={`/user/${product.seller.id}`}
                          className={classes.textLink}
                        >
                          {product.seller.username}
                        </Link>
                      </Typography>
                    }
                  />
                </ListItem>
                <ListItem
                  className={classes.listItem}
                  key={product.bidder.username}
                >
                  <ListItemText
                    primary="Buyer"
                    secondary={
                      <Typography variant="body2">
                        <Link
                          to={`/user/${product.bidder.id}`}
                          className={classes.textLink}
                        >
                          {product.bidder.username}
                        </Link>
                      </Typography>
                    }
                  />
                </ListItem>
              </List>

              <Container className={classes.buttonContainer}>
                {/* closed -> paid */}
                {me.id === product.bidder.id &&
                  product.progress === Progress.Closed && (
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
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            No
                          </Button>
                          <Button
                            onClick={() => {
                              handleClose();
                              // TODO : Closed -> Paid
                            }}
                            color="primary"
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}

                {/* paid -> completed */}
                {me.id === product.seller.id &&
                  product.progress === Progress.Paid && (
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
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              handleClose();
                              // TODO : Paid -> Completed
                            }}
                            color="primary"
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}

                {/* Delete Button */}
                {me.id === product.seller.id &&
                  (product.progress === Progress.Waiting ||
                    product.progress === Progress.Completed) && (
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
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose} color="primary">
                            Cancel
                          </Button>
                          <Button
                            onClick={() => {
                              handleClose();
                              // TODO : Delete Product
                            }}
                            color="primary"
                            autoFocus
                          >
                            Yes
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </>
                  )}
              </Container>
            </div>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
};
