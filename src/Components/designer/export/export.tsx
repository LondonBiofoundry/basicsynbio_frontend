import React from "react";
import Grid from "@material-ui/core/Grid";
import { CSVCard } from "./CSV.Components/csvcard";
import { JSONCard } from "./JSON.Components/JSONCard";
import { UniqueParts } from "./UniqueParts.Components/UniqueParts";
import { UniqueAssemblies } from "./UniqueAssemblies.Components/UniqueAssemblies";
import { Assembly } from "../../../interfaces/Assembly";

interface Props {
  currentBuild: Assembly[];
}

export const Export: React.FC<Props> = ({ currentBuild }) => {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      spacing={2}
    >
      <Grid item xs={12} sm={3}>
        <CSVCard currentBuild={currentBuild} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <JSONCard currentBuild={currentBuild} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <UniqueParts currentBuild={currentBuild} />
      </Grid>
      <Grid item xs={12} sm={3}>
        <UniqueAssemblies currentBuild={currentBuild} />
      </Grid>
    </Grid>
  );
};
