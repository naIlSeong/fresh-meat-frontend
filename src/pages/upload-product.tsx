import { useReactiveVar } from "@apollo/client";
import {
  Avatar,
  Button,
  Container,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import PublishOutlinedIcon from "@material-ui/icons/PublishOutlined";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../components/button";
import indigo from "@material-ui/core/colors/indigo";
import { FormError } from "../components/form-error";

type IForm = {
  productName: string;
  description?: string;
  startPrice: string;
  image: IFile;
};

type IFile = {
  [index: number]: { name: string };
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
  buttonContainer: {
    margin: theme.spacing(2, 0, 6),
    padding: 0,
  },
  button: {
    backgroundColor: indigo[900],
    color: "white",
    "&.MuiButton-root:hover": {
      backgroundColor: "#000051",
    },
  },
  fileList: {
    padding: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  deleteButton: {
    padding: theme.spacing(0.4, 1.2),
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

export const UploadProduct = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const history = useHistory();
  const classes = useStyles();
  const [fileName, setFileName] = useState<string | null>();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);

  const onSubmit = () => {
    // TODO
    const { productName, description, startPrice, image } = getValues();
  };

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    errors,
    formState,
    reset,
  } = useForm<IForm>({
    mode: "onChange",
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Fresh Meat - Upload Product</title>
      </Helmet>
      <main>
        <Container maxWidth="xs">
          <div className={classes.paper}>
            {/* Title */}
            <Avatar className={classes.avatar}>
              <PublishOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Let's sell something!
            </Typography>

            {/* Form */}
            <form
              className={classes.form}
              noValidate
              onSubmit={handleSubmit(onSubmit)}
            >
              {/* Product Name */}
              <CssTextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="productName"
                label="Product name"
                type="text"
                id="productName"
                required
                inputRef={register({ required: true })}
              />
              {/* TODO : Error */}

              {/* Description */}
              <CssTextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="description"
                label="Description"
                type="text"
                id="description"
                inputRef={register}
              />

              {/* Starting price */}
              <CssTextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="startPrice"
                label="Starting Price"
                type="text"
                id="startPrice"
                required
                inputRef={register({ required: true, pattern: /^\d+$/ })}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₩</InputAdornment>
                  ),
                }}
              />
              {/* TODO : Error */}
              {errors.startPrice?.type === "pattern" && (
                <FormError errorMessage="Only numbers are allowed" />
              )}

              {/* Image */}
              <Container className={classes.buttonContainer}>
                <Button
                  variant="contained"
                  fullWidth
                  className={classes.button}
                  component="label"
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="image"
                    name="image"
                    hidden
                    ref={register}
                    onChange={() => {
                      setFileName(watch().image[0].name);
                    }}
                  />
                  Select File
                </Button>
                {fileName && (
                  <Container className={classes.fileList}>
                    <Typography>{`File : ${fileName}`}</Typography>
                    <Button
                      className={classes.deleteButton}
                      variant="contained"
                      onClick={() => {
                        reset();
                        setFileName(null);
                      }}
                    >
                      Reset
                    </Button>
                  </Container>
                )}
              </Container>

              {/* Submit button */}
              <SubmitButton
                message="Upload"
                // TODO : loading
                loading={false}
                validate={!formState.isValid}
              />
            </form>
          </div>
        </Container>
      </main>
    </React.Fragment>
  );
};
