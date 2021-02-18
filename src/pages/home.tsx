import React from "react";
import { Helmet } from "react-helmet-async";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  progressButton: {
    paddingBottom: theme.spacing(4),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  page: {
    paddingTop: theme.spacing(4),
  },
  pageNumber: {
    backgroundColor: theme.palette.secondary.main,
    width: "40px",
    height: "40px",
    fontSize: "large",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "4px",
  },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export const Home = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Helmet>
        <title>Fresh Meat</title>
      </Helmet>
      <main>
        {/* Progress Status Choose Button */}
        <div className={classes.progressButton}>
          <Container maxWidth="sm">
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button
                  variant="contained"
                  color="secondary"
                  style={{ minWidth: "130px" }}
                >
                  In Progress
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="secondary"
                  style={{ minWidth: "130px" }}
                >
                  Waiting
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>

        {/* Product Card */}
        <Container maxWidth="md">
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                  <CardMedia
                    className={classes.cardImage}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Product Name
                    </Typography>
                    <Typography>
                      Description Description Description Description
                      Description Description
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View
                    </Button>
                    <Button size="small" color="primary">
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Page Button */}
        <div className={classes.page}>
          <Container maxWidth="sm">
            <Grid container spacing={2} justify="center">
              <Grid item>
                <Button variant="text" color="secondary">
                  ◀
                </Button>
              </Grid>
              <Grid item>
                <Box className={classes.pageNumber}>88</Box>
              </Grid>
              <Grid item>
                <Button variant="text" color="secondary">
                  ▶
                </Button>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
    </React.Fragment>
  );
};
