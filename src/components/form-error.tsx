import React from "react";
import { Typography } from "@material-ui/core";

interface IErrorMessage {
  errorMessage: string;
}

export const FormError: React.FC<IErrorMessage> = ({ errorMessage }) => {
  return (
    <Typography variant="caption" color="error">
      {errorMessage}
    </Typography>
  );
};
