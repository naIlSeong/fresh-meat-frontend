import React, { useEffect, useState } from "react";
import { useMe } from "../hooks/use-me";
import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, withStyles } from "@material-ui/core";
import { Helmet } from "react-helmet-async";
import { FormError } from "../components/form-error";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { SubmitButton } from "../components/button";
import EditIcon from "@material-ui/icons/EditOutlined";
import TextField from "@material-ui/core/TextField";
import { useForm } from "react-hook-form";
import { gql, useMutation, useReactiveVar } from "@apollo/client";
import { updateUser, updateUserVariables } from "../__generated__/updateUser";
import { useLogout } from "../hooks/use-logout";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import { isLoggedInVar } from "../apollo";

type IForm = {
  username?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const UPDATE_USER = gql`
  mutation updateUser($input: UpdateUserDto!) {
    updateUser(input: $input) {
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
  paper: {
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
  deleteButton: {
    margin: theme.spacing(5, 0, 2),
    backgroundColor: "#9a0007",
    color: "white",
    "&.MuiButton-root:hover": {
      backgroundColor: "#650000",
    },
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

export const EditAccount = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const classes = useStyles();
  const { data, loading } = useMe();
  const history = useHistory();
  const [logoutMutation] = useLogout();
  const [samePassword, setSamePassword] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);

  const {
    register,
    handleSubmit,
    getValues,
    errors,
    formState,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const { username, email, password, confirmPassword } = getValues();
    if (password !== confirmPassword) {
      setSamePassword(true);
    } else {
      setSamePassword(false);

      // TODO
      if (username && email === "" && password === "") {
        updateUserMutation({
          variables: {
            input: {
              username,
            },
          },
        });
      }

      if (username === "" && email && password === "") {
        updateUserMutation({
          variables: {
            input: {
              email,
            },
          },
        });
      }

      if (username === "" && email === "" && password) {
        updateUserMutation({
          variables: {
            input: {
              password,
            },
          },
        });
      }

      if (username && email && password === "") {
        updateUserMutation({
          variables: {
            input: {
              username,
              email,
            },
          },
        });
      }

      if (username && email === "" && password) {
        updateUserMutation({
          variables: {
            input: {
              username,
              password,
            },
          },
        });
      }

      if (username === "" && email && password) {
        updateUserMutation({
          variables: {
            input: {
              email,
              password,
            },
          },
        });
      }

      if (username && email && password) {
        updateUserMutation({
          variables: {
            input: {
              username,
              email,
              password,
            },
          },
        });
      }
    }
  };

  const onCompleted = (data: updateUser) => {
    const {
      updateUser: { ok },
    } = data;
    if (ok) {
      logoutMutation();
    }
  };

  const [
    updateUserMutation,
    { data: updateUserOutput, loading: updateUserLoading },
  ] = useMutation<updateUser, updateUserVariables>(UPDATE_USER, {
    onCompleted,
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Fresh Meat - Edit Account</title>
      </Helmet>
      <main>
        <Container maxWidth="md">
          {loading ? (
            <Container className={classes.loading}>
              <CircularProgress size={24} color="secondary" />
            </Container>
          ) : (
            <Container maxWidth="xs">
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <EditIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Let's edit your profile!
                </Typography>
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <CssTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="username"
                    label="New username"
                    type="text"
                    id="username"
                    inputRef={register({
                      validate: {
                        sameUsername: (value) => value !== data?.me.username,
                      },
                    })}
                  />
                  {errors.username?.type === "sameUsername" && (
                    <div>
                      <FormError errorMessage={"Same username"} />
                    </div>
                  )}
                  <CssTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="email"
                    label="New email"
                    name="email"
                    autoComplete="email"
                    inputRef={register({
                      pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    })}
                  />
                  {errors.email?.type === "pattern" && (
                    <div>
                      <FormError errorMessage={"Check email pattern"} />
                    </div>
                  )}
                  <CssTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="password"
                    label="New password"
                    type="password"
                    id="password"
                    inputRef={register({ minLength: 8 })}
                  />
                  {errors.password?.type === "minLength" && (
                    <div>
                      <FormError
                        errorMessage={"Password must be at least 8 chars"}
                      />
                    </div>
                  )}
                  <CssTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="confirmPassword"
                    label="Confirm new password "
                    type="password"
                    id="confirmPassword"
                    inputRef={register({ minLength: 8 })}
                  />
                  {errors.confirmPassword?.type === "minLength" && (
                    <div>
                      <FormError
                        errorMessage={"Password must be at least 8 chars"}
                      />
                    </div>
                  )}
                  {samePassword && (
                    <FormError errorMessage={"Check password again"} />
                  )}
                  <SubmitButton
                    message="Update"
                    validate={!formState.isValid}
                    loading={updateUserLoading}
                  />
                  {updateUserOutput?.updateUser.error && (
                    <div>
                      <FormError
                        errorMessage={updateUserOutput.updateUser.error}
                      />
                    </div>
                  )}
                </form>
                <Button
                  type="button"
                  fullWidth
                  variant="contained"
                  className={classes.deleteButton}
                  onClick={() => {
                    history.push("/delete-account");
                    window.scrollTo(0, 0);
                  }}
                >
                  Delete account
                </Button>
              </div>
            </Container>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
};
