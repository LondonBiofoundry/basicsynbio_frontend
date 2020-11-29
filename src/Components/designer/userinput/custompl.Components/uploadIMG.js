import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
  },

  responsiveImage: {
    textAlign: "center",

    [theme.breakpoints.up("xs")]: {
      height: "155px",
      paddingTop: "5px",
    },
  },
}));

export default function UploadIMG(props) {
  const classes = useStyles();

  return (
    <div className={classes.responsiveImage}>
      <img
        src={process.env.PUBLIC_URL + "upload.svg"}
        alt="robot"
        className={classes.responsiveImage}
      />
    </div>
  );
}
