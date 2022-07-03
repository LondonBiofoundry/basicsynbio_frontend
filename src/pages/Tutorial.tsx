import React from "react";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Tutorial() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2">Tutorial</Typography>
      <Divider variant="fullWidth" />
      <iframe
        width="560"
        height="315"
        src="https://www.youtube.com/embed/rQsUzkat7TM"
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
