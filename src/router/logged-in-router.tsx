import React from "react";
import { isLoggedInVar } from "../apollo";
import Button from "@material-ui/core/Button";

export const LoggedInRouter = () => {
  return (
    <div>
      <div>Logged in now</div>
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
