import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },
  imagePosition: {
    textAlign: "center",
  },
  responsiveImage: {
    textAlign: "center",

    [theme.breakpoints.up("xs")]: {
      height: "200px",
      maxHeight: "200px",
    },
    [theme.breakpoints.up("sm")]: {
      height: "300px",
      maxHeight: "300px",
    },
    [theme.breakpoints.up("md")]: {
      height: "400px",
      maxHeight: "400px",
    },
    [theme.breakpoints.up("lg")]: {
      height: "550px",
      maxHeight: "550px",
    },
    [theme.breakpoints.up("xl")]: {
      height: "750px",
      maxHeight: "750px",
    },
  },
}));

export default function HomeImage(props) {
  const classes = useStyles();

  return (
    <div className={classes.responsiveImage}>
      <img
        src={process.env.PUBLIC_URL + "homeimg.svg"}
        className={classes.responsiveImage}
        alt="robot"
      />
    </div>
  );
}
