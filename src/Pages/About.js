import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonBase from "./AboutImages";
import AboutPapers from "./AboutPapers";

const markdown = `
# About the BasicSynBio web app

Welcome to the BasicSynBio web app! :dna: Here, users can implement the [basicsynbio workflow](https://londonbiofoundry.github.io/BasicSynBio/usage.html#BasicSynBio-workflow) via a user-friendly web interface.

For further information on the basicsynbio package or BASIC DNA assembly please refer to the additional sources below.

## Disclaimer

*Please note this web app is currently under development. For issues or feedback please add a "new issue" via the [source repository issues section](https://github.com/LondonBiofoundry/basicsynbio_frontend/issues).*

## Additional sources

### basicsynbio package

- [basicsynbio package documentation](https://londonbiofoundry.github.io/basicsynbio/index.html)
- [basicsynbio package source](https://github.com/LondonBiofoundry/basicsynbio)
- [basicsynbio pypi](https://pypi.org/project/basicsynbio/)

### BASIC DNA assembly

- [Storch, M., Dwijayanti, A., Mallick, H., Haines, M. C., & Baldwin, G. S. (2020). BASIC: A Simple and Accurate Modular DNA Assembly Method. Methods in Molecular Biology (Clifton, N.J.), 2205, 239–253. https://doi.org/10.1007/978-1-0716-0908-8_14](https://link.springer.com/protocol/10.1007%2F978-1-0716-0908-8_14)
- [Storch, M., Haines, M. C., & Baldwin, G. S. (2020). DNA-BOT: a low-cost, automated DNA assembly platform for synthetic biology. Synthetic Biology, 5(1). https://doi.org/10.1093/synbio/ysaa010](https://academic.oup.com/synbio/article/5/1/ysaa010/5869449)
- [Storch, M., Casini, A., Mackrow, B., Fleming, T., Trewhitt, H., Ellis, T., & Baldwin, G. S. (2015). BASIC: A New Biopart Assembly Standard for Idempotent Cloning Provides Accurate, Single-Tier DNA Assembly for Synthetic Biology. ACS Synthetic Biology, 4(7), 781–787. https://doi.org/10.1021/sb500356d](https://pubs.acs.org/doi/10.1021/sb500356d)
`;

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
      <Grid container spacing={3} padding={3}>
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
