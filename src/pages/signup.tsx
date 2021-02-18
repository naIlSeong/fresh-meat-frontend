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
import { Helmet } from "react-helmet-async";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { SubmitButton } from "../components/button";
import { gql, useMutation } from "@apollo/client";
import { createUser, createUserVariables } from "../__generated__/createUser";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { useHistory } from "react-router-dom";

type IForm = {
  username: string;
  email: string;
  password: string;
};

const CREATE_USER = gql`
  mutation createUser($input: CreateUserDto!) {
    createUser(input: $input) {
      ok
      error
    }
  }
`;

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
  const history = useHistory();

  const {
    register,
    handleSubmit,
    getValues,
    errors,
    formState,
  } = useForm<IForm>({ mode: "onChange" });

  const onSubmit = () => {
    const { username, email, password } = getValues();
    createUserMutation({
      variables: {
        input: {
          username,
          email,
          password,
        },
      },
    });
  };

  const onCompleted = (data: createUser) => {
    const {
      createUser: { ok },
    } = data;
    if (ok) {
      history.push("/");
    }
  };

  const [createUserMutation, { data: createUserOutput, loading }] = useMutation<
    createUser,
    createUserVariables
  >(CREATE_USER, { onCompleted });

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
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
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
            inputRef={register({ required: true })}
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
            inputRef={register({
              required: true,
              pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
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
            inputRef={register({ required: true, minLength: 8 })}
          />
          {errors.password?.type === "minLength" && (
            <FormError errorMessage={"Password must be at least 8 chars"} />
          )}
          <SubmitButton
            message="Sign Up"
            validate={!formState.isValid}
            loading={loading}
          />
          {createUserOutput?.createUser.error && (
            <FormError errorMessage={createUserOutput.createUser.error} />
          )}
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
