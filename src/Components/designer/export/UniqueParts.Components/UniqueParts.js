import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { ApiEndpoint } from "../../../../index";

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

export default function JSONCard(props) {
  const classes = useStyles();

  var downloadURL =
    ApiEndpoint +
    "builduniqueparts?build=" +
    JSON.stringify(props.currentBuild);

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
      <a href={downloadURL} download style={{ textDecoration: "none" }}>
        <Button
          className={classes.downloadButton}
          variant="contained"
          color="primary"
        >
          Download Unique Parts
        </Button>
      </a>
    </Card>
  );
}
