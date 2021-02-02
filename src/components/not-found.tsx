import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import { Helmet } from "react-helmet";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: "100%",
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

export const NotFound = () => {
  const classes = useStyles();
  const preventDefault = (event: React.SyntheticEvent) =>
    event.preventDefault();

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Fresh meat - Not found</title>
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
          <Link href="#" onClick={preventDefault} color="secondary">
            Home
          </Link>
        </Box>
      </div>
    </Container>
  );
};
