import React from "react";
import { Helmet } from "react-helmet-async";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import HandIcon from "@material-ui/icons/PanToolOutlined";
import { makeStyles, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type IForm = {
  password: string;
};

const useStyles = makeStyles((theme) => ({
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
    margin: theme.spacing(7, 0, 2),
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

export const DeleteAccount = () => {
  const classes = useStyles();
  const { register, handleSubmit, getValues, errors } = useForm<IForm>();

  const onSubmit = () => {};

  return (
    <React.Fragment>
      <Helmet>
        <title>Fresh Meat - Delete Account</title>
      </Helmet>
      <main>
        <Container maxWidth="xs">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <HandIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              It was nice to meet you!
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
                name="password"
                label="Password"
                type="password"
                id="password"
                inputRef={register()}
              />
              <Button
                type="button"
                fullWidth
                variant="contained"
                className={classes.deleteButton}
                onClick={() => {
                  // TODO
                }}
              >
                Delete account
              </Button>
            </form>
          </div>
        </Container>
      </main>
    </React.Fragment>
  );
};
