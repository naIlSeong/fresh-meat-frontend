import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import Cookies from "js-cookie";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useMe } from "../hooks/use-me";
import CircularProgress from "@material-ui/core/CircularProgress";

type IProps = {
  title: string;
};

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    paddingBottom: theme.spacing(8),
    paddingTop: theme.spacing(2),
  },
  toolbarTitle: {
    flex: 1,
  },
}));

export const Header = ({ title }: IProps) => {
  const history = useHistory();
  const classes = useStyles();
  const { data, loading } = useMe();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button
          style={{ marginRight: "36px" }}
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
          style={{ width: "100px" }}
          variant="outlined"
          size="small"
          onClick={handleClick}
        >
          Account
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem
            onClick={() => {
              if (loading) {
                handleClose();
              }
              if (!loading && data) {
                history.push(`/user/${data.me.username}`);
              }
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/edit-account");
            }}
          >
            Edit account
          </MenuItem>
          <MenuItem
            onClick={() => {
              Cookies.remove("connect.sid");
              isLoggedInVar(false);
              history.push("/");
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </React.Fragment>
  );
};
