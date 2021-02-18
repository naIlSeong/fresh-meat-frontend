import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import Cookies from "js-cookie";

type IProps = {
  title: string;
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(8),
  },
  toolbarTitle: {
    flex: 1,
  },
}));

export const Header = ({ title }: IProps) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button
          size="small"
          onClick={() => {
            history.push("/");
          }}
        >
          <img
            alt="home"
            width="40px"
            height="40px"
            src={process.env.PUBLIC_URL + "/meat-logo.png"}
          />
        </Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <Button
          variant="outlined"
          size="small"
          onClick={() => {
            Cookies.remove("connect.sid");
            isLoggedInVar(false);
            history.push("/");
          }}
        >
          Logout
        </Button>
      </Toolbar>
    </React.Fragment>
  );
};
