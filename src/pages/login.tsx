import React from "react";
import Avatar from "@material-ui/core/Avatar";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { login, loginVariables } from "../__generated__/login";
import { Helmet } from "react-helmet";
import { FormError } from "../components/form-error";
import { SubmitButton } from "../components/button";

type IForm = {
  email: string;
  password: string;
};

const LOGIN = gql`
  mutation login($input: LoginDto!) {
    login(input: $input) {
      ok
      error
    }
  }
`;

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

export const Login = () => {
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    getValues,
    errors,
    formState,
    watch,
  } = useForm<IForm>({
    mode: "onChange",
  });

  // Delete
  console.log(watch());

  const onSubmit = () => {
    const { email, password } = getValues();
    console.log("email : ", email);
    console.log("password : ", password);
    loginMutation({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  const onCompleted = (data: login) => {
    const {
      login: { ok, error },
    } = data;
    // TODO
    console.log("ok : ", ok);
    console.log("error : ", error);
  };

  const [loginMutation, { data: loginOutput, loading }] = useMutation<
    login,
    loginVariables
  >(LOGIN, { onCompleted });

  return (
    <Container component="main" maxWidth="xs">
      <Helmet>
        <title>Fresh Meat - Login</title>
      </Helmet>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome back!
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <CssTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            inputRef={register({
              required: true,
              pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            })}
          />
          <CssTextField
            variant="outlined"
            margin="normal"
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
            message="Login"
            validate={!formState.isValid}
            loading={loading}
          />
          {loginOutput?.login.error && (
            <FormError errorMessage={loginOutput.login.error} />
          )}
          <Grid container>
            <Grid item>
              Don't have an account?{" "}
              <Link href="/signup" variant="body2" color="secondary">
                {"Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};
