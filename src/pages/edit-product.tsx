import { useLazyQuery } from "@apollo/client";
import {
  Avatar,
  Button,
  CircularProgress,
  Container,
  makeStyles,
  TextField,
  Typography,
  withStyles,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useParams } from "react-router-dom";
import { NotFound } from "../components/not-found";
import { useMe } from "../hooks/use-me";
import {
  productDetail,
  productDetailVariables,
} from "../__generated__/productDetail";
import { PRODUCT_DETAIL } from "./product-detail";
import EditIcon from "@material-ui/icons/EditOutlined";
import { useForm } from "react-hook-form";
import { SubmitButton } from "../components/button";
import { FormError } from "../components/form-error";
import indigo from "@material-ui/core/colors/indigo";

interface IParam {
  id: string;
}

interface IForm {
  productName?: string;
  description?: string;
  startPrice?: string;
  image: IFile;
}

interface IFile {
  [index: number]: { name: string };
}

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

export const EditProduct = () => {
  const { id } = useParams<IParam>();
  const history = useHistory();
  const classes = useStyles();
  const [fileName, setFileName] = useState<string | null>();
  const { data: meOutput, loading: meLoading } = useMe();
  const [
    productDetailQuery,
    { data: productDetailOutput, loading: productDetailLoading },
  ] = useLazyQuery<productDetail, productDetailVariables>(PRODUCT_DETAIL);

  useEffect(() => {
    if (!id) {
      history.push("/");
    }
    if (id) {
      productDetailQuery({
        variables: {
          input: {
            productId: +id,
          },
        },
      });
    }
    if (!productDetailLoading && productDetailOutput?.productDetail.ok) {
      setFileName(productDetailOutput.productDetail.product?.picture?.fileName);
    }
  }, [
    history,
    id,
    productDetailQuery,
    productDetailLoading,
    productDetailOutput,
  ]);

  const {
    register,
    handleSubmit,
    getValues,
    errors,
    formState,
    reset,
    watch,
  } = useForm<IForm>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const { productName, description, startPrice, image } = getValues();
    console.log(image);
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Fresh Meat - Edit Product</title>
      </Helmet>
      <main>
        <Container maxWidth="md">
          {meLoading || productDetailLoading ? (
            <Container className={classes.loading}>
              <CircularProgress size={24} color="secondary" />
            </Container>
          ) : !meOutput ||
            !productDetailOutput?.productDetail.ok ||
            meOutput.me.id !==
              productDetailOutput.productDetail.product?.seller.id ? (
            <NotFound />
          ) : (
            <Container maxWidth="xs">
              <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                  <EditIcon />
                </Avatar>

                {/* Title */}
                <Typography component="h1" variant="h5">
                  Let's edit your product!
                </Typography>

                {/* Form */}
                <form
                  className={classes.form}
                  noValidate
                  onSubmit={handleSubmit(onSubmit)}
                >
                  {/* Product name */}
                  <CssTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="productName"
                    label="New product name"
                    type="text"
                    id="productName"
                    defaultValue={
                      productDetailOutput.productDetail.product.productName
                    }
                  />
                  {/* TODO : Error */}

                  {/* Description */}
                  <CssTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="description"
                    label="New description"
                    type="text"
                    id="description"
                    defaultValue={
                      productDetailOutput.productDetail.product.description
                        ? productDetailOutput.productDetail.product.description
                        : ""
                    }
                  />
                  {/* TODO : Error */}

                  {/* Starting price */}
                  <CssTextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    name="startPrice"
                    label="New starting price"
                    type="text"
                    id="startPrice"
                    defaultValue={
                      productDetailOutput.productDetail.product.startPrice
                    }
                    inputRef={register({ required: true, pattern: /^\d+$/ })}
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
                          Delete
                        </Button>
                      </Container>
                    )}
                  </Container>

                  {/* Submit button */}
                  <SubmitButton
                    message="Update"
                    validate={!formState.isValid}
                    // TODO : Loading
                    loading={false}
                  />
                </form>
              </div>
            </Container>
          )}
        </Container>
      </main>
    </React.Fragment>
  );
};
