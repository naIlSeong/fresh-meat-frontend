import React from "react";
import {
  Avatar,
  Container,
  Grid,
  Link,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import { Helmet } from "react-helmet";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { SubmitButton } from "../components/button";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    minHeight: "100vh",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
}));

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "green",
      },
    },
  },
})(TextField);

export const Signup = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Fresh Meat - Signup</title>
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome!
        </Typography>
        <form className={classes.form} noValidate>
          <CssTextField
            margin="normal"
            autoComplete="fname"
            name="username"
            variant="outlined"
            required
            fullWidth
            id="username"
            label="User Name"
            autoFocus
          />
          <CssTextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />
          <CssTextField
            margin="normal"
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <SubmitButton message="Sign Up" validate={false} loading={true} />
          <Grid container>
            <Grid item>
              Already have an account?{" "}
              <Link href="/login" variant="body2" color="secondary">
                Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
