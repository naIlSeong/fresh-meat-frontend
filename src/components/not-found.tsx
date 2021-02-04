import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100vh",
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const NotFound = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Fresh Meat - Not found</title>
      </Helmet>
      <div className={classes.paper}>
        <Typography variant="h2">Oops!</Typography>
        <Box paddingTop="24px">
          <Typography variant="h5">Not Found</Typography>
        </Box>
        <Box paddingTop="10px" paddingBottom="16px">
          This is not the page you are looking for T^T
        </Box>
        <Box>
          Go back to{" "}
          <Box component="span" color="secondary">
            <Link to="/" style={{ color: "#4c8c4a" }}>
              Home
            </Link>
          </Box>
        </Box>
      </div>
    </Container>
  );
};
