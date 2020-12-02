import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
    "http://127.0.0.1:5000/buildjson?build=" +
    JSON.stringify(props.currentBuild);

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            JSON
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Machine readable output for the build in JSON format
          </Typography>
        </CardContent>
      </CardActionArea>
      <a href={downloadURL} download style={{ textDecoration: "none" }}>
        <Button
          className={classes.downloadButton}
          variant="contained"
          color="secondary"
        >
          Download JSON
        </Button>
      </a>
    </Card>
  );
}
