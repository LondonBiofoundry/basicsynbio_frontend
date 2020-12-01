import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CSVCard from "./CSV.Components/csvcard";
import JSONCard from "./JSON.Components/JSONCard";

export default function Export(props) {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      padding={6}
      spacing={2}
    >
      <Grid item xs={12} sm={6}>
        <CSVCard currentBuild={props.currentBuild} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <JSONCard currentBuild={props.currentBuild} />
      </Grid>
    </Grid>
  );
}
