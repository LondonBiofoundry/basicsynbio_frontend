import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@material-ui/core/styles";
import BasicSynBio from "./basicsynbio";

let theme = createMuiTheme();
theme = responsiveFontSizes(theme);

const ColorButton = withStyles((theme) => ({
  root: {
    color: "#FFFFFF",
    backgroundColor: "#FF6F90",
    "&:hover": {
      backgroundColor: "#FF6F90",
    },
  },
}))(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    color: "white",
  },
  mybutton: {
    paddingTop: "20px",
  },
}));

export default function HomeText(props) {
  const classes = useStyles();

  const navStyle = {
    color: "white",
    textDecoration: "none",
    background: "",
  };

  return (
    <div className={classes.root}>
      <div className={classes.textsection}>
        <ThemeProvider theme={theme}>
          <BasicSynBio />
          <Typography id="intotext" variant={"h5"}>
            A Web Interface for the basicsynbio python package. Get started
            creating and analysing you constructs and build below
          </Typography>
          <div className={classes.mybutton}>
            <Link style={navStyle} to="/designer">
              <ColorButton size="large" variant="contained">
                Go to designer
              </ColorButton>
            </Link>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}
