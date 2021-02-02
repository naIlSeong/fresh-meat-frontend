import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import { GitHub } from "@material-ui/icons";
import Box from "@material-ui/core/Box";

const Github = () => {
  return (
    <Box>
      <Link
        color="inherit"
        href="https://github.com/naIlSeong"
        rel="noopener noreferrer"
        target="_blank"
      >
        <GitHub />
      </Link>
      <Box paddingY="6px">
        <Link
          color="inherit"
          href="https://github.com/naIlSeong/fresh-meat-backend"
          rel="noopener noreferrer"
          target="_blank"
        >
          Backend Repo
        </Link>
      </Box>
      <Box>
        <Link
          color="inherit"
          href="mailto:ilseongdev@gmail.com"
          rel="noopener noreferrer"
          target="_blank"
        >
          ilseongdev@gmail.com
        </Link>
        <Box paddingTop="6px">&copy; {new Date().getFullYear()} Fresh meat</Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
    minHeight: "100vh",
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.primary.main,
    borderTop: "2",
    borderTopColor: theme.palette.primary.light,
  },
}));

export const Footer = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <footer className={classes.footer}>
        <Container maxWidth="sm">
          <Github />
        </Container>
      </footer>
    </div>
  );
};
