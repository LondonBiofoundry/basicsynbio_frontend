import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ApiEndpoint } from "../../../../ApiConnection";
import { Assembly } from "../../../../interfaces/Assembly";

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
  currentBuild: Assembly[];
}

export const CSVCard: React.FC<Props> = ({ currentBuild }) => {
  const classes = useStyles();

  const downloadBuildCSV = () => {
    fetch(ApiEndpoint + "buildcsvs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentBuild),
    }).then((response) => {
      response.blob().then((blob) => {
        let url = window.URL.createObjectURL(blob);
        let a = document.createElement("a");
        a.href = url;
        a.download = "csvs.zip";
        a.click();
      });
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent style={{ height: "100px" }}>
          <Typography gutterBottom variant="h5" component="h2">
            CSV's
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Download csv's containing information about clips and ...
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={downloadBuildCSV}
        className={classes.downloadButton}
        variant="contained"
        color="primary"
      >
        Download CSV's
      </Button>
    </Card>
  );
};
