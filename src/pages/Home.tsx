import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import { HomeImg } from "../components/home/homeimg";
import HomeText from "../components/home/hometext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: "#3D5A80",
    minHeight: "90vh",
    paddingTop: "5vh",
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Grid item xs={1} />
        <Grid item xs={11} sm={4}>
          <HomeText></HomeText>
        </Grid>
        <Grid item xs={12} sm={7}>
          <HomeImg></HomeImg>
        </Grid>
      </Grid>
    </div>
  );
}
