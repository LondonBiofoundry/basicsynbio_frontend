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

export const JSONCard: React.FC<Props> = ({ currentBuild }) => {
  const classes = useStyles();

  const downloadBuildJson = async () => {
    const response = await API.buildJsonBuildjsonPost(
      JSON.stringify(currentBuild),
      returnFilesFromJsonAssemblyArray(currentBuild)
    );
    console.log(response);
    console.log(response.data);
    var blob = new Blob([JSON.stringify(response.data)], {
      type: "application/json",
    });
    saveAs(blob, "json_basic_buils.json");
    // fetch(ApiEndpoint + "buildjson", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(currentBuild),
    // }).then((response) => {
    //   response.blob().then((blob) => {
    //     let url = window.URL.createObjectURL(blob);
    //     let a = document.createElement("a");
    //     a.href = url;
    //     a.download = "my_build.json";
    //     a.click();
    //   });
    // });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent style={{ height: "100px" }}>
          <Typography gutterBottom variant="h5" component="h2">
            JSON
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Machine readable output for the build in JSON format
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={downloadBuildJson}
        className={classes.downloadButton}
        variant="contained"
        color="secondary"
      >
        Download JSON
      </Button>
    </Card>
  );
};
