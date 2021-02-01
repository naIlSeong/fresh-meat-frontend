import React from "react";
import { isLoggedInVar } from "../apollo";
import Button from "@material-ui/core/Button";

export const LoggedOutRouter = () => {
  return (
    <div>
      <div>Please login</div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => isLoggedInVar(false)}
      >
        Logout
      </Button>
    </div>
  );
};
