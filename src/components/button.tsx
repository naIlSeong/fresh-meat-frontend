import React from "react";
import { Button, CircularProgress, makeStyles } from "@material-ui/core";

interface ISubmitButton {
  message: string;
  validate?: boolean;
  loading: boolean;
}

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SubmitButton: React.FC<ISubmitButton> = ({
  message,
  validate,
  loading,
}) => {
  const classes = useStyles();

  return (
    <Button
      type="submit"
      fullWidth
      variant="contained"
      color="secondary"
      className={classes.submit}
      disabled={validate}
    >
      {loading ? <CircularProgress size={24} /> : message}
    </Button>
  );
};
