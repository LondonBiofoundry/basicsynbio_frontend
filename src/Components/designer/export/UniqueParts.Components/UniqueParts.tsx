import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ApiEndpoint } from "../../../../Api";
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

export const UniqueParts: React.FC<Props> = ({ currentBuild }) => {
  const classes = useStyles();

  const downloadUniquePart = () => {
    fetch(ApiEndpoint + "builduniqueparts", {
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
        a.download = "Unique_Parts.gb";
        a.click();
      });
    });
  };

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent style={{ height: "100px" }}>
          <Typography gutterBottom variant="h5" component="h2">
            Unique Parts
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Download a genbank file containing inforamtion for every unique part
            within the build
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button
        onClick={downloadUniquePart}
        className={classes.downloadButton}
        variant="contained"
        color="primary"
      >
        Download Unique Parts
      </Button>
    </Card>
  );
};
