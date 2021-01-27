import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonBase from "./AboutImages";
import AboutPapers from "./AboutPapers";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "left",
    padding: "60px",
  },
  textSect: {
    paddingTop: "35px",
    paddingBottom: "15px",
  },
  textTitle: {
    paddingTop: "35px",
  },
  centerSvg: {
    display: "block",
    margin: "auto",
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h2">About the BasicSynBio Web App</Typography>
      <Divider variant="fullWidth" />
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Typography className={classes.textSect} variant="body1">
            Welcome to the BasicSynBio web app! Here, users can implement the
            BasicSynBio workflow via a user-friendly web interface. For further
            information on the basicsynbio package or BASIC DNA assembly please
            refer to the additional sources below.
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            href="https://londonbiofoundry.github.io/basicsynbio/usage.html"
          >
            BasicSynBio Workflow
          </Button>
          <Typography className={classes.textTitle} variant="h6">
            Disclaimer
          </Typography>
          <Typography className={classes.textSect} variant="body1">
            Please note this web app is currently under development. For issues
            or feedback please add a "new issue" via the source repository
            issues
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            href="https://github.com/LondonBiofoundry/basicsynbio_frontend/issues"
          >
            Source repository issues
          </Button>
          <Typography className={classes.textTitle} variant="h6">
            BasicSynBio Package
          </Typography>
        </Grid>
        <Grid item className={classes.centerSvg} xs={12} md={5}>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item className={classes.centerSvg}>
              <img
                src={process.env.PUBLIC_URL + "DNA_Flatline.svg"}
                width="600"
                height="380"
                alt="logo"
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <ButtonBase />
        </Grid>
        <Grid item xs={12}>
          <Typography className={classes.textTitle} variant="h6">
            BASIC DNA assembly
          </Typography>
          <AboutPapers />
        </Grid>
      </Grid>
    </div>
  );
}
