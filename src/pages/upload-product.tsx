import { gql, useMutation, useReactiveVar } from "@apollo/client";
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
import {
  uploadProduct,
  uploadProductVariables,
} from "../__generated__/uploadProduct";
import {
  uploadImage,
  uploadImageVariables,
} from "../__generated__/uploadImage";

type IForm = {
  productName: string;
  description?: string;
  startPrice: string;
  image: IFile;
};

type IFile = {
  [index: number]: { name: string };
};

const UPLOAD_PRODUCT = gql`
  mutation uploadProduct($input: UploadProductDto!) {
    uploadProduct(input: $input) {
      ok
      error
      productId
    }
  }
`;

const UPLOAD_IMAGE = gql`
  mutation uploadImage($productId: Float!, $file: Upload!) {
    uploadImage(productId: $productId, file: $file) {
      ok
      error
    }
  }
`;

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
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing(24),
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
  const [productId, setProductId] = useState<number | null>();

  useEffect(() => {
    if (!isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);

  const onSubmit = () => {
    const { productName, description, startPrice } = getValues();
    uploadProductMutation({
      variables: {
        input: {
          productName,
          description,
          startPrice: +startPrice,
        },
      },
    });
  };

  const onProductCompleted = (data: uploadProduct) => {
    const { image } = getValues();
    const {
      uploadProduct: { ok, productId },
    } = data;
    if (ok && productId && image[0]) {
      uploadImageMutation({
        variables: {
          productId,
          file: image[0],
        },
      });
      setProductId(productId);
    } else {
      history.push(`/product/${productId}`);
      window.scrollTo(0, 0);
    }
  };

  const onImageCompleted = (data: uploadImage) => {
    const {
      uploadImage: { ok },
    } = data;
    if (ok) {
      history.push(`/product/${productId}`);
      window.scrollTo(0, 0);
    }
  };

  const [
    uploadProductMutation,
    { data: uploadProductOutput, loading: uploadProductLoading },
  ] = useMutation<uploadProduct, uploadProductVariables>(UPLOAD_PRODUCT, {
    onCompleted: onProductCompleted,
  });

  const [
    uploadImageMutation,
    { data: uploadImageOutput, loading: uploadImageLoading },
  ] = useMutation<uploadImage, uploadImageVariables>(UPLOAD_IMAGE, {
    onCompleted: onImageCompleted,
  });

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
        <Container maxWidth="md">
          <Container className={classes.paper} maxWidth="xs">
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
                loading={uploadProductLoading || uploadImageLoading}
                validate={!formState.isValid}
              />

              {/* Error */}
              {uploadProductOutput?.uploadProduct.error && (
                <FormError
                  errorMessage={uploadProductOutput.uploadProduct.error}
                />
              )}
              {uploadImageOutput?.uploadImage.error && (
                <FormError errorMessage={uploadImageOutput.uploadImage.error} />
              )}
            </form>
          </Container>
        </Container>
      </main>
    </React.Fragment>
  );
};
