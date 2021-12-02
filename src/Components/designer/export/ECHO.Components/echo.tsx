import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { API, ApiEndpoint } from "../../../../Api";
import { BasicAssembly } from "../../../../generated-sources";
import { returnFilesFromJsonAssemblyArray } from "../../../../utils/getFilesFromParts";
import saveAs from "file-saver";

const useStyles = makeStyles({
  root: {
    width: "100%",
    height: "100%",
  },
  media: {
    height: 140,
  },
  downloadButton: {
    width: "100%",
    padding: "5px",
  },
});

interface Props {
  currentBuild: BasicAssembly[];
}

export const EchoCard: React.FC<Props> = ({ currentBuild }) => {
  const classes = useStyles();

  const downloadBuildJson = async () => {
    const response = await API.buildEchoInstructionsBuildechoinstructionsPost(
      JSON.stringify(currentBuild),
      returnFilesFromJsonAssemblyArray(currentBuild),
      {
        responseType: "blob",
      }
    );
    saveAs(response.data, "EchoInstructions.zip");
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent style={{ height: "100px" }}>
          <Typography gutterBottom variant="h5" component="h2">
            Echo Instructions
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Lab automation instructions for Echo Machine clips to assemblies
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={downloadBuildJson}
        className={classes.downloadButton}
        variant="contained"
        color="primary"
      >
        Download Echo Instructions
      </Button>
    </Card>
  );
};
